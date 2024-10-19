from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.page_service import (
    create_page,
    get_page,
    get_all_pages,
    update_page,
    delete_page
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for Page input
class PageCreate(BaseModel):
    page_name: str
    content_header: str
    content: str

# Create a new Page entry
@router.post("/dynamic-page/")
async def create_new_page(page: PageCreate, db: Session = Depends(get_db)):
    return create_page(
        db,
        page.page_name,
        page.content_header,
        page.content
    )

# Get a Page entry by PAGE_NAME
@router.get("/dynamic-page/{page_name}")
async def read_page(page_name: str, db: Session = Depends(get_db)):
    page = get_page(db, page_name)
    if not page:
        raise HTTPException(status_code=404, detail="Page entry not found")
    return page

# Get all Page entries
@router.get("/dynamic-page/")
async def read_all_pages(db: Session = Depends(get_db)):
    return get_all_pages(db)

# Update a Page entry by ID
@router.put("/dynamic-page/{page_id}")
async def update_page_entry(page_id: int, page: PageCreate, db: Session = Depends(get_db)):
    updated_page = update_page(
        db,
        page_id,
        page.page_name,
        page.content_header,
        page.content
    )
    if not updated_page:
        raise HTTPException(status_code=404, detail="Page entry not found")
    return updated_page

# Delete a Page entry by ID
@router.delete("/dynamic-page/{page_id}")
async def delete_page_entry(page_id: int, db: Session = Depends(get_db)):
    deleted_page = delete_page(db, page_id)
    if not deleted_page:
        raise HTTPException(status_code=404, detail="Page entry not found")
    return {"detail": "Page entry deleted successfully"}
