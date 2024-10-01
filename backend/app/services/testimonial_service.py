from sqlalchemy.orm import Session
from app.models.testimonial_model import TestimonialModel

# Create new testimonial
def create_testimonial(db: Session, person_name: str, designation: str, person_photo: str, review: str):
    new_testimonial = TestimonialModel(
        PERSON_NAME=person_name,
        DESIGNATION=designation,
        PERSON_PHOTO=person_photo,
        REVIEW=review
    )
    db.add(new_testimonial)
    db.commit()
    db.refresh(new_testimonial)
    return new_testimonial

# Get testimonial by ID
def get_testimonial(db: Session, testimonial_id: int):
    return db.query(TestimonialModel).filter(TestimonialModel.ID == testimonial_id).first()

# Get all testimonials
def get_all_testimonials(db: Session):
    return db.query(TestimonialModel).all()

# Update testimonial by ID
def update_testimonial(db: Session, testimonial_id: int, person_name: str, designation: str, person_photo: str, review: str):
    testimonial = db.query(TestimonialModel).filter(TestimonialModel.ID == testimonial_id).first()
    if testimonial:
        testimonial.PERSON_NAME = person_name
        testimonial.DESIGNATION = designation
        testimonial.PERSON_PHOTO = person_photo
        testimonial.REVIEW = review
        db.commit()
        db.refresh(testimonial)
        return testimonial
    return None

# Delete testimonial by ID
def delete_testimonial(db: Session, testimonial_id: int):
    testimonial = db.query(TestimonialModel).filter(TestimonialModel.ID == testimonial_id).first()
    if testimonial:
        db.delete(testimonial)
        db.commit()
        return testimonial
    return None
