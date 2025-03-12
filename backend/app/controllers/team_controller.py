from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.team_service import (
    create_team_member,
    get_team_member,
    get_all_team_members,
    update_team_member,
    delete_team_member
)
from app.utils.upload_file import save_file, delete_file
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for team member input
class TeamMemberCreate(BaseModel):
    employee_name: str
    designation: str
    linkedin_profile: str = None
    twitter_profile: str = None

# Create new team member and upload the photo
@router.post("/team/")
async def create_new_team_member(
    employee_name: str = Form(...),
    designation: str = Form(...),
    linkedin_profile: str = Form(...),
    twitter_profile: str = Form(...),
    youtube_profile: str = Form(...),
    facebook_profile: str = Form(...),
    twitterX_profile: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
   
    
    # Create new team member
    new_team_member = create_team_member(
        db, employee_name, designation, linkedin_profile, twitter_profile, youtube_profile, facebook_profile, twitterX_profile, " "
    )

     # Save the uploaded photo file and generate the photo path
    photo_path = save_file(file, f"team_member_{new_team_member.ID}.png")

     # Create new team member
    new_team_member = update_team_member(
        db, new_team_member.ID, employee_name, designation, linkedin_profile, twitter_profile, youtube_profile, facebook_profile, twitterX_profile, "/"+photo_path
    )

    return {"detail": "Team member created successfully", "team_member_id": new_team_member.ID, "photo_path": photo_path}

# Get team member by ID
@router.get("/team/{team_id}")
async def read_team_member(team_id: int, db: Session = Depends(get_db)):
    team_member = get_team_member(db, team_id)
    if not team_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    return team_member

# Get all team members
@router.get("/team/")
async def read_all_team_members(db: Session = Depends(get_db)):
    return get_all_team_members(db)

# Update team member by ID
@router.put("/team/{team_id}")
async def update_team_member_entry(
    team_id: int,
    employee_name: str = Form(...),
    designation: str = Form(...),
    linkedin_profile: str = Form(None),
    twitter_profile: str = Form(None),
    youtube_profile: str = Form(None),
    facebook_profile: str = Form(None),
    twitterX_profile: str = Form(None),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    team_member = get_team_member(db, team_id)
    if not team_member:
        raise HTTPException(status_code=404, detail="Team member not found")

    # Use the existing photo path if no new photo is uploaded
    photo_path = team_member.PHOTO_PATH
    if file:
        photo_path = save_file(file, f"team_member_{team_id}.png")

    # Update team member in the database
    updated_team_member = update_team_member(
        db, team_id, employee_name, designation, linkedin_profile, twitter_profile, youtube_profile, facebook_profile, twitterX_profile, "/"+photo_path
    )

    return {"detail": "Team member updated successfully", "team_member": updated_team_member}

# Delete team member by ID
@router.delete("/team/{team_id}")
async def delete_team_member_entry(team_id: int, db: Session = Depends(get_db)):
    team_member = get_team_member(db, team_id)
    if not team_member:
        raise HTTPException(status_code=404, detail="Team member not found")

    # Delete the team member from the database
    deleted_team_member = delete_team_member(db, team_id)
    if not deleted_team_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    # Delete the photo file from the public folder if it exists
    if team_member.PHOTO_PATH:
        delete_file(team_member.PHOTO_PATH)

    return {"detail": "Team member deleted successfully"}
