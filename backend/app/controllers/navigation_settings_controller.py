from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.navigation_settings_service import (
    create_navigation_settings,
    get_navigation_settings,
    get_all_navigation_settings,
    update_navigation_settings,
    delete_navigation_settings
)
from app.utils.upload_file import save_file, delete_file
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for navigation settings input
class NavigationSettingsCreate(BaseModel):
    dark_mode: bool

# Create new navigation settings and upload the logo
@router.post("/navigation-settings/")
async def create_new_navigation_settings(
    dark_mode: bool = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Create new navigation settings with an empty logo path
    new_navigation_settings = create_navigation_settings(db, "", dark_mode)
    
    # Save the uploaded logo file and generate the logo path
    logo_path = save_file(file, f"logo_{new_navigation_settings.ID}.png")
    
    # Update navigation settings with the logo path
    update_navigation_settings(db, new_navigation_settings.ID, logo_path, dark_mode)

    return {"detail": "Navigation settings created successfully", "logo_path": logo_path}

# Get navigation settings by ID
@router.get("/navigation-settings/{navigation_id}")
async def read_navigation_settings(navigation_id: int, db: Session = Depends(get_db)):
    navigation_settings = get_navigation_settings(db, navigation_id)
    if not navigation_settings:
        raise HTTPException(status_code=404, detail="Navigation settings not found")
    return navigation_settings

# Get all navigation settings
@router.get("/navigation-settings/")
async def read_all_navigation_settings(db: Session = Depends(get_db)):
    return get_all_navigation_settings(db)

@router.put("/navigation-settings/{navigation_id}")
async def update_navigation_settings_entry(
    navigation_id: int,
    dark_mode: bool = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    navigation_settings = get_navigation_settings(db, navigation_id)
    if not navigation_settings:
        raise HTTPException(status_code=404, detail="Navigation settings not found")

    # Use the existing logo path if no new logo is uploaded
    logo_path = navigation_settings.LOGO
    if file:
        logo_path = save_file(file, f"logo_{navigation_id}.png")

    # Update navigation settings in the database
    updated_navigation_settings = update_navigation_settings(db, navigation_id, logo_path, dark_mode)

    return {"detail": "Navigation settings updated successfully", "navigation_settings": updated_navigation_settings}

# Delete navigation settings
@router.delete("/navigation-settings/{navigation_id}")
async def delete_navigation_settings_entry(navigation_id: int, db: Session = Depends(get_db)):
    # Retrieve the navigation settings to get the file path
    navigation_settings = get_navigation_settings(db, navigation_id)
    if not navigation_settings:
        raise HTTPException(status_code=404, detail="Navigation settings not found")

    # Get the logo path from the navigation settings
    logo_path = navigation_settings.LOGO

    # Delete the navigation settings from the database
    deleted_navigation_settings = delete_navigation_settings(db, navigation_id)
    if not deleted_navigation_settings:
        raise HTTPException(status_code=404, detail="Navigation settings not found")
    
    # Delete the logo file from the public folder
    delete_file(logo_path)

    return {"detail": f"Navigation settings and logo file deleted successfully {logo_path}"}