from fastapi import APIRouter, BackgroundTasks
from app.services.mail_service import send_subscription_email, send_query_email
from sqlalchemy.orm import Session
from app.utils.database import get_db
from fastapi import Depends
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for Subscription Email input
class SubscriptionEmailRequest(BaseModel):
    email: str

# Pydantic model for Query Email input
class QueryEmailRequest(BaseModel):
    first_name: str
    last_name:str
    email:str
    phone_number:str
    query:str

# Send subscription email
@router.post("/send-subscription-email/")
async def send_subscription_email_endpoint(email_request: SubscriptionEmailRequest, background_tasks: BackgroundTasks,db: Session = Depends(get_db)):
    background_tasks.add_task(
        send_subscription_email,
        email_request.email,
        db
    )
    return {"message": "Subscription email is being sent in the background"}

# Send query email
@router.post("/send-query-email/")
async def send_query_email_endpoint(email_request: QueryEmailRequest, background_tasks: BackgroundTasks,db: Session = Depends(get_db)):
    background_tasks.add_task(
        send_query_email,
        email_request.first_name,
        email_request.last_name,
        email_request.email,
        email_request.phone_number,
        email_request.query,
        db

    )
    return {"message": "Query email is being sent in the background"}
