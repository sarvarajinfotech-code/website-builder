from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.home_page_settings_service import (
    create_home_page_settings,
    get_home_page_settings,
    get_all_home_page_settings,
    update_home_page_settings,
    delete_home_page_settings
)
from app.utils.upload_file import save_file, delete_file
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for home page settings input
class HomePageSettingsCreate(BaseModel):
    header_text: str
    header_text_alignment: str
    tagline_text: str
    tagline_alignment: str
    primary_button_text: str
    primary_button_type: str
    primary_button_link: str
    secondary_button_text: str
    secondary_button_type: str
    secondary_button_link: str
    show_in_slider: bool
    opacity: int

# Create new home page settings and upload the background image
@router.post("/home-page-settings/")
async def create_new_home_page_settings(
    header_text: str = Form(...),
    header_text_alignment: str = Form(...),
    tagline_text: str = Form(...),
    tagline_alignment: str = Form(...),
    primary_button_text: str = Form(...),
    primary_button_type: str = Form(...),
    primary_button_link: str = Form(...),
    secondary_button_text: str = Form(...),
    secondary_button_type: str = Form(...),
    secondary_button_link: str = Form(...),
    show_in_slider: bool = Form(...),
    opacity: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Create new home page settings with an empty background image path
    new_home_page_settings = create_home_page_settings(
        db, header_text, header_text_alignment, tagline_text, tagline_alignment, 
        primary_button_text, primary_button_type, primary_button_link, 
        secondary_button_text, secondary_button_type, secondary_button_link, 
        show_in_slider, opacity, ""
    )
    
    # Save the uploaded background image file and generate the image path
    background_image_path = save_file(file, f"background_{new_home_page_settings.ID}.png")
    
    # Update home page settings with the background image path
    update_home_page_settings(
        db, new_home_page_settings.ID, header_text, header_text_alignment, tagline_text, tagline_alignment, 
        primary_button_text, primary_button_type, primary_button_link, 
        secondary_button_text, secondary_button_type, secondary_button_link, 
        show_in_slider, opacity, "/"+background_image_path
    )

    return {"detail": "Home page settings created successfully", "background_image_path": background_image_path}

# Get home page settings by ID
@router.get("/home-page-settings/{home_page_id}")
async def read_home_page_settings(home_page_id: int, db: Session = Depends(get_db)):
    home_page_settings = get_home_page_settings(db, home_page_id)
    if not home_page_settings:
        raise HTTPException(status_code=404, detail="Home page settings not found")
    return home_page_settings

# Get all home page settings
@router.get("/home-page-settings/")
async def read_all_home_page_settings(db: Session = Depends(get_db)):
    return get_all_home_page_settings(db)

# Update home page settings entry
@router.put("/home-page-settings/{home_page_id}")
async def update_home_page_settings_entry(
    home_page_id: int,
    header_text: str = Form(...),
    header_text_alignment: str = Form(...),
    tagline_text: str = Form(...),
    tagline_alignment: str = Form(...),
    primary_button_text: str = Form(...),
    primary_button_type: str = Form(...),
    primary_button_link: str = Form(...),
    secondary_button_text: str = Form(...),
    secondary_button_type: str = Form(...),
    secondary_button_link: str = Form(...),
    show_in_slider: bool = Form(...),
    opacity: int = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    home_page_settings = get_home_page_settings(db, home_page_id)
    if not home_page_settings:
        raise HTTPException(status_code=404, detail="Home page settings not found")

    # Use the existing background image path if no new image is uploaded
    background_image_path = home_page_settings.BACKGROUND_IMAGE_PATH
    if file:
        background_image_path = save_file(file, f"background_{home_page_id}.png")

    # Update home page settings in the database
    updated_home_page_settings = update_home_page_settings(
        db, home_page_id, header_text, header_text_alignment, tagline_text, tagline_alignment, 
        primary_button_text, primary_button_type, primary_button_link, 
        secondary_button_text, secondary_button_type, secondary_button_link, 
        show_in_slider, opacity, "/"+background_image_path
    )

    return {"detail": "Home page settings updated successfully", "home_page_settings": updated_home_page_settings}

# Delete home page settings
@router.delete("/home-page-settings/{home_page_id}")
async def delete_home_page_settings_entry(home_page_id: int, db: Session = Depends(get_db)):
    # Retrieve the home page settings to get the file path
    home_page_settings = get_home_page_settings(db, home_page_id)
    if not home_page_settings:
        raise HTTPException(status_code=404, detail="Home page settings not found")

    # Get the background image path from the home page settings
    background_image_path = home_page_settings.BACKGROUND_IMAGE_PATH

    # Delete the home page settings from the database
    deleted_home_page_settings = delete_home_page_settings(db, home_page_id)
    if not deleted_home_page_settings:
        raise HTTPException(status_code=404, detail="Home page settings not found")
    
    # Delete the background image file from the public folder
    delete_file(background_image_path)

    return {"detail": f"Home page settings and background image file deleted successfully: {background_image_path}"}

