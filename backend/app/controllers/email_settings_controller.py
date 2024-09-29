from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.email_settings_service import (
    create_email_settings,
    get_email_settings,
    get_all_email_settings,
    update_email_settings,
    delete_email_settings
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for email settings input
class EmailSettingsCreate(BaseModel):
    from_mail: str
    to_mail: str
    smtp_host: str
    smtp_port: int
    smtp_username: str
    smtp_password: str

# Create new email settings
@router.post("/email_settings/")
async def create_new_email_settings(email_settings: EmailSettingsCreate, db: Session = Depends(get_db)):
    return create_email_settings(
        db,
        email_settings.from_mail,
        email_settings.to_mail,
        email_settings.smtp_host,
        email_settings.smtp_port,
        email_settings.smtp_username,
        email_settings.smtp_password
    )

# Get email settings by ID
@router.get("/email_settings/{email_settings_id}")
async def read_email_settings(email_settings_id: int, db: Session = Depends(get_db)):
    email_settings = get_email_settings(db, email_settings_id)
    if not email_settings:
        raise HTTPException(status_code=404, detail="Email settings entry not found")
    return email_settings

# Get all email settings entries
@router.get("/email_settings/")
async def read_all_email_settings(db: Session = Depends(get_db)):
    return get_all_email_settings(db)

# Update email settings by ID
@router.put("/email_settings/{email_settings_id}")
async def update_email_settings_entry(email_settings_id: int, email_settings: EmailSettingsCreate, db: Session = Depends(get_db)):
    updated_email_settings = update_email_settings(
        db,
        email_settings_id,
        email_settings.from_mail,
        email_settings.to_mail,
        email_settings.smtp_host,
        email_settings.smtp_port,
        email_settings.smtp_username,
        email_settings.smtp_password
    )
    if not updated_email_settings:
        raise HTTPException(status_code=404, detail="Email settings entry not found")
    return updated_email_settings

# Delete email settings entry by ID
@router.delete("/email_settings/{email_settings_id}")
async def delete_email_settings_entry(email_settings_id: int, db: Session = Depends(get_db)):
    deleted_email_settings = delete_email_settings(db, email_settings_id)
    if not deleted_email_settings:
        raise HTTPException(status_code=404, detail="Email settings entry not found")
    return {"detail": "Email settings entry deleted successfully"}
