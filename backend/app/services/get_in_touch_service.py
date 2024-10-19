from sqlalchemy.orm import Session
from app.models.get_in_touch_model import GetInTouchFormModel

# Create new "Get in Touch" entry
def create_get_in_touch_entry(db: Session, first_name: str, last_name: str, email: str,
                               phone_number: str, query: str):
    new_entry = GetInTouchFormModel(
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone_number=phone_number,
        query=query
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry

# Get "Get in Touch" entry by ID
def get_get_in_touch_entry(db: Session, entry_id: int):
    return db.query(GetInTouchFormModel).filter(GetInTouchFormModel.ID == entry_id).first()

# Get all "Get in Touch" entries
def get_all_get_in_touch_entries(db: Session):
    return db.query(GetInTouchFormModel).all()

# Update "Get in Touch" entry by ID
def update_get_in_touch_entry(db: Session, entry_id: int, first_name: str, last_name: str,
                               email: str, phone_number: str, query: str):
    entry = db.query(GetInTouchFormModel).filter(GetInTouchFormModel.ID == entry_id).first()
    if entry:
        entry.first_name = first_name
        entry.last_name = last_name
        entry.email = email
        entry.phone_number = phone_number
        entry.query = query
        db.commit()
        db.refresh(entry)
        return entry
    return None

# Delete "Get in Touch" entry by ID
def delete_get_in_touch_entry(db: Session, entry_id: int):
    entry = db.query(GetInTouchFormModel).filter(GetInTouchFormModel.ID == entry_id).first()
    if entry:
        db.delete(entry)
        db.commit()
        return entry
    return None
