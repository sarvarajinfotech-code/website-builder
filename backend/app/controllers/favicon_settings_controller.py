from fastapi import APIRouter, Depends, HTTPException,UploadFile,Form,File
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.favicon_settings_service import (
    create_favicon_settings,
    get_favicon_settings,
    get_all_favicon_settings,
    update_favicon_settings,
    delete_favicon_settings
)
from pydantic import BaseModel
from app.utils.upload_file import (save_file, delete_file)

router = APIRouter()

# Create new favicon settings and upload the logo
@router.post("/favicon-settings/")
async def create_new_favicon_settings(
    title: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Create new favicon settings with an empty logo path
    new_favicon_settings = create_favicon_settings(db,title ,"")
    
    # Save the uploaded logo file and generate the logo path
    logo_path = save_file(file, f"favicon_{new_favicon_settings.ID}.png")
    
    # Update favicon settings with the logo path
    update_favicon_settings(db, new_favicon_settings.ID,title ,logo_path)

    return {"detail": "favicon settings created successfully", "logo_path": logo_path}

# Get favicon settings by ID
@router.get("/favicon-settings/{favicon_id}")
async def read_favicon_settings(favicon_id: int, db: Session = Depends(get_db)):
    favicon_settings = get_favicon_settings(db, favicon_id)
    if not favicon_settings:
        raise HTTPException(status_code=404, detail="favicon settings not found")
    return favicon_settings

# Get all favicon settings
@router.get("/favicon-settings/")
async def read_all_favicon_settings(db: Session = Depends(get_db)):
    return get_all_favicon_settings(db)

@router.put("/favicon-settings/{favicon_id}")
async def update_favicon_settings_entry(
    favicon_id: int,
    title: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    favicon_settings = get_favicon_settings(db, favicon_id)
    if not favicon_settings:
        raise HTTPException(status_code=404, detail="favicon settings not found")

    # Use the existing logo path if no new logo is uploaded
    logo_path = favicon_settings.FAVICON_PATH
    if file:
        logo_path = save_file(file, f"favicon_{favicon_id}.png")

    # Update favicon settings in the database
    updated_favicon_settings = update_favicon_settings(db, favicon_id, title, logo_path )

    return {"detail": "favicon settings updated successfully", "favicon_settings": updated_favicon_settings}

# Delete favicon settings
@router.delete("/favicon-settings/{favicon_id}")
async def delete_favicon_settings_entry(favicon_id: int, db: Session = Depends(get_db)):
    # Retrieve the favicon settings to get the file path
    favicon_settings = get_favicon_settings(db, favicon_id)
    if not favicon_settings:
        raise HTTPException(status_code=404, detail="favicon settings not found")

    # Get the logo path from the favicon settings
    logo_path = favicon_settings.FAVICON_PATH

    # Delete the favicon settings from the database
    deleted_favicon_settings = delete_favicon_settings(db, favicon_id)
    if not deleted_favicon_settings:
        raise HTTPException(status_code=404, detail="favicon settings not found")
    
    # Delete the logo file from the public folder
    delete_file(logo_path)

    return {"detail": f"favicon settings and logo file deleted successfully {logo_path}"}
