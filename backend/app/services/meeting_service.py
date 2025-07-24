from sqlalchemy.orm import Session
from app.models.meeting_model import MeetingModel

# Create a new meeting entry
def create_meeting(
    db: Session,
    show_calendly: bool,
    calendly_link: str,
    show_whatsapp: bool,
    whatsapp_number: str,
    show_tawkto: bool,
    tawkto_property_id: str,
    button_text: str
):
    new_meeting = MeetingModel(
        SHOW_CALENDLY=show_calendly,
        CALENDLY_LINK=calendly_link,
        SHOW_WHATSAPP=show_whatsapp,
        WHATSAPP_NUMBER=whatsapp_number,
        SHOW_TAWKTO=show_tawkto,
        TAWKTO_PROPERTY_ID=tawkto_property_id,
        BUTTON_TEXT=button_text
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
def update_meeting(
    db: Session,
    meeting_id: int,
    show_calendly: bool,
    calendly_link: str,
    show_whatsapp: bool,
    whatsapp_number: str,
    show_tawkto: bool,
    tawkto_property_id: str,
    button_text: str
):
    meeting = db.query(MeetingModel).filter(MeetingModel.ID == meeting_id).first()
    if meeting:
        meeting.SHOW_CALENDLY = show_calendly
        meeting.CALENDLY_LINK = calendly_link
        meeting.SHOW_WHATSAPP = show_whatsapp
        meeting.WHATSAPP_NUMBER = whatsapp_number
        meeting.SHOW_TAWKTO = show_tawkto
        meeting.TAWKTO_PROPERTY_ID = tawkto_property_id
        meeting.BUTTON_TEXT = button_text
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
