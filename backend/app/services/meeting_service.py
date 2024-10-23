from sqlalchemy.orm import Session
from app.models.meeting_model import MeetingModel

# Create a new meeting entry
def create_meeting(db: Session, show_meeting: bool, button_text: str, meeting_link: str):
    new_meeting = MeetingModel(
        SHOW_MEETING=show_meeting,
        BUTTON_TEXT=button_text,
        MEETING_LINK=meeting_link
    )
    db.add(new_meeting)
    db.commit()
    db.refresh(new_meeting)
    return new_meeting

# Get meeting by ID
def get_meeting(db: Session, meeting_id: int):
    return db.query(MeetingModel).filter(MeetingModel.ID == meeting_id).first()

# Get all meetings
def get_all_meetings(db: Session):
    return db.query(MeetingModel).all()

# Update meeting by ID
def update_meeting(db: Session, meeting_id: int, show_meeting: bool, button_text: str, meeting_link: str):
    meeting = db.query(MeetingModel).filter(MeetingModel.ID == meeting_id).first()
    if meeting:
        meeting.SHOW_MEETING = show_meeting
        meeting.BUTTON_TEXT = button_text
        meeting.MEETING_LINK = meeting_link
        db.commit()
        db.refresh(meeting)
        return meeting
    return None

# Delete meeting by ID
def delete_meeting(db: Session, meeting_id: int):
    meeting = db.query(MeetingModel).filter(MeetingModel.ID == meeting_id).first()
    if meeting:
        db.delete(meeting)
        db.commit()
        return meeting
    return None
