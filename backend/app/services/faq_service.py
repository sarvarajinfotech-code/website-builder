from sqlalchemy.orm import Session
from app.models.faq_model import FAQModel

# Create a new FAQ entry
def create_faq(db: Session, question: str, answer: str):
    new_faq = FAQModel(
        QUESTION=question,
        ANSWER=answer
    )
    db.add(new_faq)
    db.commit()
    db.refresh(new_faq)
    return new_faq

# Get FAQ by ID
def get_faq(db: Session, faq_id: int):
    return db.query(FAQModel).filter(FAQModel.ID == faq_id).first()

# Get all FAQs
def get_all_faqs(db: Session):
    return db.query(FAQModel).all()

# Update FAQ by ID
def update_faq(db: Session, faq_id: int, question: str, answer: str):
    faq = db.query(FAQModel).filter(FAQModel.ID == faq_id).first()
    if faq:
        faq.QUESTION = question
        faq.ANSWER = answer
        db.commit()
        db.refresh(faq)
        return faq
    return None

# Delete FAQ by ID
def delete_faq(db: Session, faq_id: int):
    faq = db.query(FAQModel).filter(FAQModel.ID == faq_id).first()
    if faq:
        db.delete(faq)
        db.commit()
        return faq
    return None
