from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Form
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.navigation_settings_service import (
    create_navigation_settings,
    get_navigation_settings,
    get_all_navigation_settings,
    update_navigation_settings,
    delete_navigation_settings
)
from app.utils.upload_file import save_file
from pydantic import BaseModel

router = APIRouter()

class NavigationSettingsCreate(BaseModel):
    dark_mode: bool

@router.post("/navigation-settings/")
async def create_new_navigation_settings(file: UploadFile = File(...), dark_mode: bool =Form(...), db: Session = Depends(get_db)):

    # Create navigation settings in the database
    new_navigation_settings = create_navigation_settings(db, "", dark_mode)
    logo_path = save_file(file,f"logo_{new_navigation_settings.ID}.png")
    update_navigation_settings(db,new_navigation_settings.ID,logo_path ,new_navigation_settings.DARK_MODE)

    return {"detail": "Navigation settings created successfully", "navigation_logo_path": new_navigation_settings.LOGO}

# Other CRUD operations for navigation settings
@router.get("/navigation-settings/{navigation_id}")
def read_navigation_settings(navigation_id: int, db: Session = Depends(get_db)):
    navigation_settings = get_navigation_settings(db, navigation_id)
    if not navigation_settings:
        raise HTTPException(status_code=404, detail="Navigation settings not found")
    return navigation_settings

@router.get("/navigation-settings/")
def read_all_navigation_settings(db: Session = Depends(get_db)):
    return get_all_navigation_settings(db)

@router.put("/navigation-settings/{navigation_id}")
def update_navigation(navigation_id: int, file: UploadFile = File(None), dark_mode: bool = True, db: Session = Depends(get_db)):
    logo_name = None
    if file:
        logo_name = save_file(file, file.filename)

    updated_navigation = update_navigation_settings(db, navigation_id, logo_name, dark_mode)
    if not updated_navigation:
        raise HTTPException(status_code=404, detail="Navigation settings not found")
    return {"detail": "Navigation settings updated successfully"}

@router.delete("/navigation-settings/{navigation_id}")
def delete_navigation(navigation_id: int, db: Session = Depends(get_db)):
    success = delete_navigation_settings(db, navigation_id)
    if not success:
        raise HTTPException(status_code=404, detail="Navigation settings not found")
    return {"detail": "Navigation settings deleted successfully"}
