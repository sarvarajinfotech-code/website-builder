from sqlalchemy.orm import Session
from app.models.contact_model import ContactModel

# Create a new contact entry
def create_contact(db: Session, header: str, tagline: str, phone: str, address: str, email: str):
    new_contact = ContactModel(
        HEADER=header,
        TAGLINE=tagline,
        PHONE_NUMBER=phone,
        ADDRESS=address,
        EMAIL=email
    )
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    return new_contact

# Get contact by ID
def get_contact(db: Session, contact_id: int):
    return db.query(ContactModel).filter(ContactModel.ID == contact_id).first()

# Get all contacts
def get_all_contacts(db: Session):
    return db.query(ContactModel).all()

# Update contact by ID
def update_contact(db: Session, contact_id: int, header: str, tagline: str, phone: str, address: str, email: str):
    contact = db.query(ContactModel).filter(ContactModel.ID == contact_id).first()
    if contact:
        contact.HEADER = header
        contact.TAGLINE = tagline
        contact.PHONE_NUMBER = phone
        contact.ADDRESS = address
        contact.EMAIL = email
        db.commit()
        db.refresh(contact)
        return contact
    return None

# Delete contact by ID
def delete_contact(db: Session, contact_id: int):
    contact = db.query(ContactModel).filter(ContactModel.ID == contact_id).first()
    if contact:
        db.delete(contact)
        db.commit()
        return contact
    return None
