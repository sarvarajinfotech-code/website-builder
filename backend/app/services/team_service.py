from sqlalchemy.orm import Session
from app.models.team_model import TeamModel

# Create new team member
def create_team_member(db: Session, employee_name: str, designation: str, linkedin_profile: str, twitter_profile: str, photo_path: str):
    new_team_member = TeamModel(
        EMPLOYEE_NAME=employee_name,
        DESIGNATION=designation,
        LINKEDIN_PROFILE=linkedin_profile,
        TWITTER_PROFILE=twitter_profile,
        PHOTO_PATH=photo_path
    )
    db.add(new_team_member)
    db.commit()
    db.refresh(new_team_member)
    return new_team_member

# Get team member by ID
def get_team_member(db: Session, team_id: int):
    return db.query(TeamModel).filter(TeamModel.ID == team_id).first()

# Get all team members
def get_all_team_members(db: Session):
    return db.query(TeamModel).all()

# Update team member by ID
def update_team_member(db: Session, team_id: int, employee_name: str, designation: str, linkedin_profile: str, twitter_profile: str, photo_path: str):
    team_member = db.query(TeamModel).filter(TeamModel.ID == team_id).first()
    if team_member:
        team_member.EMPLOYEE_NAME = employee_name
        team_member.DESIGNATION = designation
        team_member.LINKEDIN_PROFILE = linkedin_profile
        team_member.TWITTER_PROFILE = twitter_profile
        team_member.PHOTO_PATH = photo_path
        db.commit()
        db.refresh(team_member)
        return team_member
    return None

# Delete team member by ID
def delete_team_member(db: Session, team_id: int):
    team_member = db.query(TeamModel).filter(TeamModel.ID == team_id).first()
    if team_member:
        db.delete(team_member)
        db.commit()
        return team_member
    return None
