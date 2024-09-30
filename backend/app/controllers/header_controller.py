from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.header_service import (
    create_header_info,
    get_header_info,
    get_all_headers,
    update_header_info,
    delete_header_info
)
from pydantic import BaseModel


router = APIRouter()

class HeaderCreate(BaseModel):
    header_text: str
    tagline: str
    page: str

class HeaderUpdate(BaseModel):
    header_text: str
    tagline: str
    page: str

@router.post("/header/")
async def create_header(header: HeaderCreate, db: Session = Depends(get_db)):
    header_info = create_header_info(db, header.header_text, header.tagline, header.page)
    return header_info

@router.get("/header/{header_id}")
async def read_header(header_id: int, db: Session = Depends(get_db)):
    header = get_header_info(db, header_id)
    if not header:
        raise HTTPException(status_code=404, detail="Header not found")
    return header

@router.get("/headers/")
async def read_all_headers(db: Session = Depends(get_db)):
    headers = get_all_headers(db)
    return headers

@router.put("/header/{header_id}")
async def update_header(header_id: int, header: HeaderUpdate, db: Session = Depends(get_db)):
    updated_header = update_header_info(db, header_id, header.header_text, header.tagline, header.page)
    if not updated_header:
        raise HTTPException(status_code=404, detail="Header not found")
    return updated_header

@router.delete("/header/{header_id}")
async def delete_header(header_id: int, db: Session = Depends(get_db)):
    header = delete_header_info(db, header_id)
    if not header:
        raise HTTPException(status_code=404, detail="Header not found")
    return {"detail": "Header deleted successfully"}