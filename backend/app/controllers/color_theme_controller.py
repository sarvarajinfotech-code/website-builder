from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.color_theme_service import (
    create_color_theme,
    get_color_theme,
    get_all_color_themes,
    update_color_theme,
    delete_color_theme
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for color theme input
class ColorThemeCreate(BaseModel):
    color1: str
    color2: str
    color3: str

# Create new color theme
@router.post("/color-themes/")
async def create_new_color_theme(color_theme: ColorThemeCreate, db: Session = Depends(get_db)):
    return create_color_theme(
        db,
        color_theme.color1,
        color_theme.color2,
        color_theme.color3
    )

# Get color theme by ID
@router.get("/color-themes/{color_theme_id}")
async def read_color_theme(color_theme_id: int, db: Session = Depends(get_db)):
    color_theme = get_color_theme(db, color_theme_id)
    if not color_theme:
        raise HTTPException(status_code=404, detail="Color theme not found")
    return color_theme

# Get all color themes
@router.get("/color-themes/")
async def read_all_color_themes(db: Session = Depends(get_db)):
    return get_all_color_themes(db)

# Update color theme by ID
@router.put("/color-themes/{color_theme_id}")
async def update_color_theme_entry(color_theme_id: int, color_theme: ColorThemeCreate, db: Session = Depends(get_db)):
    updated_color_theme = update_color_theme(
        db,
        color_theme_id,
        color_theme.color1,
        color_theme.color2,
        color_theme.color3
    )
    if not updated_color_theme:
        raise HTTPException(status_code=404, detail="Color theme not found")
    return updated_color_theme

# Delete color theme by ID
@router.delete("/color-themes/{color_theme_id}")
async def delete_color_theme_entry(color_theme_id: int, db: Session = Depends(get_db)):
    deleted_color_theme = delete_color_theme(db, color_theme_id)
    if not deleted_color_theme:
        raise HTTPException(status_code=404, detail="Color theme not found")
    return {"detail": "Color theme deleted successfully"}
