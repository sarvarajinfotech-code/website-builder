from sqlalchemy.orm import Session
from app.models.subscribers_model import SubscriberModel

# Create new subscriber
def create_subscriber(db: Session, email: str):
    new_subscriber = SubscriberModel(email=email)
    db.add(new_subscriber)
    db.commit()
    db.refresh(new_subscriber)
    return new_subscriber

# Get subscriber by ID
def get_subscriber(db: Session, subscriber_id: int):
    return db.query(SubscriberModel).filter(SubscriberModel.ID == subscriber_id).first()

# Get all subscribers
def get_all_subscribers(db: Session):
    return db.query(SubscriberModel).all()

# Update subscriber by ID
def update_subscriber(db: Session, subscriber_id: int, email: str):
    subscriber = db.query(SubscriberModel).filter(SubscriberModel.ID == subscriber_id).first()
    if subscriber:
        subscriber.email = email
        db.commit()
        db.refresh(subscriber)
        return subscriber
    return None

# Delete subscriber by ID
def delete_subscriber(db: Session, subscriber_id: int):
    subscriber = db.query(SubscriberModel).filter(SubscriberModel.ID == subscriber_id).first()
    if subscriber:
        db.delete(subscriber)
        db.commit()
        return subscriber
    return None
