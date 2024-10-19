from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.subscribers_service import (
    create_subscriber,
    get_subscriber,
    get_all_subscribers,
    update_subscriber,
    delete_subscriber
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for Subscriber input
class SubscriberCreate(BaseModel):
    email: str

# Create new subscriber
@router.post("/subscribers/")
async def create_new_subscriber(subscriber: SubscriberCreate, db: Session = Depends(get_db)):
    return create_subscriber(db, subscriber.email)

# Get subscriber by ID
@router.get("/subscribers/{subscriber_id}")
async def read_subscriber(subscriber_id: int, db: Session = Depends(get_db)):
    subscriber = get_subscriber(db, subscriber_id)
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    return subscriber

# Get all subscribers
@router.get("/subscribers/")
async def read_all_subscribers(db: Session = Depends(get_db)):
    return get_all_subscribers(db)

# Update subscriber by ID
@router.put("/subscribers/{subscriber_id}")
async def update_subscriber_entry(subscriber_id: int, subscriber: SubscriberCreate, db: Session = Depends(get_db)):
    updated_subscriber = update_subscriber(db, subscriber_id, subscriber.email)
    if not updated_subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    return updated_subscriber

# Delete subscriber by ID
@router.delete("/subscribers/{subscriber_id}")
async def delete_subscriber_entry(subscriber_id: int, db: Session = Depends(get_db)):
    deleted_subscriber = delete_subscriber(db, subscriber_id)
    if not deleted_subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    return {"detail": "Subscriber deleted successfully"}
