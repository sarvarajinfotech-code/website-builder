from sqlalchemy.orm import Session
from app.models.why_choose_us_model import WhyChooseUsModel

# Create new "Why Choose Us" entry
def create_why_choose_us(db: Session, header: str, explanation: str, image: str):
    new_entry = WhyChooseUsModel(
        HEADER=header,
        EXPLANATION=explanation,
        IMAGE=image
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry

# Get "Why Choose Us" entry by ID
def get_why_choose_us(db: Session, entry_id: int):
    return db.query(WhyChooseUsModel).filter(WhyChooseUsModel.ID == entry_id).first()

# Get all "Why Choose Us" entries
def get_all_why_choose_us(db: Session):
    return db.query(WhyChooseUsModel).all()

# Update "Why Choose Us" entry by ID
def update_why_choose_us(db: Session, entry_id: int, header: str, explanation: str, image: str):
    entry = db.query(WhyChooseUsModel).filter(WhyChooseUsModel.ID == entry_id).first()
    if entry:
        entry.HEADER = header
        entry.EXPLANATION = explanation
        entry.IMAGE = image
        db.commit()
        db.refresh(entry)
        return entry
    return None

# Delete "Why Choose Us" entry by ID
def delete_why_choose_us(db: Session, entry_id: int):
    entry = db.query(WhyChooseUsModel).filter(WhyChooseUsModel.ID == entry_id).first()
    if entry:
        db.delete(entry)
        db.commit()
        return entry
    return None
