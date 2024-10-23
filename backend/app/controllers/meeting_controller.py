from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.meeting_service import (
    create_meeting,
    get_meeting,
    get_all_meetings,
    update_meeting,
    delete_meeting
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for Meeting input
class MeetingCreate(BaseModel):
    show_meeting: bool
    button_text: str
    meeting_link: str

# Create a new Meeting entry
@router.post("/meeting/")
async def create_new_meeting(meeting: MeetingCreate, db: Session = Depends(get_db)):
    return create_meeting(
        db,
        meeting.show_meeting,
        meeting.button_text,
        meeting.meeting_link
    )

# Get a Meeting entry by ID
@router.get("/meeting/{meeting_id}")
async def read_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = get_meeting(db, meeting_id)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting entry not found")
    return meeting

# Get all Meeting entries
@router.get("/meeting/")
async def read_all_meetings(db: Session = Depends(get_db)):
    return get_all_meetings(db)

# Update a Meeting entry by ID
@router.put("/meeting/{meeting_id}")
async def update_meeting_entry(meeting_id: int, meeting: MeetingCreate, db: Session = Depends(get_db)):
    updated_meeting = update_meeting(
        db,
        meeting_id,
        meeting.show_meeting,
        meeting.button_text,
        meeting.meeting_link
    )
    if not updated_meeting:
        raise HTTPException(status_code=404, detail="Meeting entry not found")
    return updated_meeting

# Delete a Meeting entry by ID
@router.delete("/meeting/{meeting_id}")
async def delete_meeting_entry(meeting_id: int, db: Session = Depends(get_db)):
    deleted_meeting = delete_meeting(db, meeting_id)
    if not deleted_meeting:
        raise HTTPException(status_code=404, detail="Meeting entry not found")
    return {"detail": "Meeting entry deleted successfully"}
