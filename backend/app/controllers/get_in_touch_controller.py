from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.get_in_touch_service import (
    create_get_in_touch_entry,
    get_get_in_touch_entry,
    get_all_get_in_touch_entries,
    update_get_in_touch_entry,
    delete_get_in_touch_entry
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for Get In Touch entry input
class GetInTouchCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone_number: str
    query: str

# Create new Get In Touch entry
@router.post("/get_in_touch/")
async def create_new_get_in_touch_entry(entry: GetInTouchCreate, db: Session = Depends(get_db)):
    return create_get_in_touch_entry(
        db,
        entry.first_name,
        entry.last_name,
        entry.email,
        entry.phone_number,
        entry.query
    )

# Get Get In Touch entry by ID
@router.get("/get_in_touch/{entry_id}")
async def read_get_in_touch_entry(entry_id: int, db: Session = Depends(get_db)):
    entry = get_get_in_touch_entry(db, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Get In Touch entry not found")
    return entry

# Get all Get In Touch entries
@router.get("/get_in_touch/")
async def read_all_get_in_touch_entries(db: Session = Depends(get_db)):
    return get_all_get_in_touch_entries(db)

# Update Get In Touch entry by ID
@router.put("/get_in_touch/{entry_id}")
async def update_get_in_touch_entry(entry_id: int, entry: GetInTouchCreate, db: Session = Depends(get_db)):
    updated_entry = update_get_in_touch_entry(
        db,
        entry_id,
        entry.first_name,
        entry.last_name,
        entry.email,
        entry.phone_number,
        entry.query
    )
    if not updated_entry:
        raise HTTPException(status_code=404, detail="Get In Touch entry not found")
    return updated_entry

# Delete Get In Touch entry by ID
@router.delete("/get_in_touch/{entry_id}")
async def delete_get_in_touch_entry(entry_id: int, db: Session = Depends(get_db)):
    deleted_entry = delete_get_in_touch_entry(db, entry_id)
    if not deleted_entry:
        raise HTTPException(status_code=404, detail="Get In Touch entry not found")
    return {"detail": "Get In Touch entry deleted successfully"}
