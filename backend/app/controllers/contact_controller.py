from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.contact_service import (
    create_contact,
    get_contact,
    get_all_contacts,
    update_contact,
    delete_contact
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for contact input
class ContactCreate(BaseModel):
    header: str
    tagline: str
    phone: str
    address: str
    email: str

# Create a new contact entry
@router.post("/contact/")
async def create_new_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    return create_contact(
        db,
        contact.header,
        contact.tagline,
        contact.phone,
        contact.address,
        contact.email
    )

# Get a contact entry by ID
@router.get("/contact/{contact_id}")
async def read_contact(contact_id: int, db: Session = Depends(get_db)):
    contact = get_contact(db, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact entry not found")
    return contact

# Get all contact entries
@router.get("/contact/")
async def read_all_contacts(db: Session = Depends(get_db)):
    return get_all_contacts(db)

# Update a contact entry by ID
@router.put("/contact/{contact_id}")
async def update_contact_entry(contact_id: int, contact: ContactCreate, db: Session = Depends(get_db)):
    updated_contact = update_contact(
        db,
        contact_id,
        contact.header,
        contact.tagline,
        contact.phone,
        contact.address,
        contact.email
    )
    if not updated_contact:
        raise HTTPException(status_code=404, detail="Contact entry not found")
    return updated_contact

# Delete a contact entry by ID
@router.delete("/contact/{contact_id}")
async def delete_contact_entry(contact_id: int, db: Session = Depends(get_db)):
    deleted_contact = delete_contact(db, contact_id)
    if not deleted_contact:
        raise HTTPException(status_code=404, detail="Contact entry not found")
    return {"detail": "Contact entry deleted successfully"}
