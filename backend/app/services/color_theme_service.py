from sqlalchemy.orm import Session
from app.models.color_theme_model import ColorThemeModel

# Create new color theme
def create_color_theme(db: Session, color1: str, color2: str, color3: str):
    new_color_theme = ColorThemeModel(
        COLOR1=color1,
        COLOR2=color2,
        COLOR3=color3
    )
    db.add(new_color_theme)
    db.commit()
    db.refresh(new_color_theme)
    return new_color_theme

# Get color theme by ID
def get_color_theme(db: Session, color_theme_id: int):
    return db.query(ColorThemeModel).filter(ColorThemeModel.ID == color_theme_id).first()

# Get all color themes
def get_all_color_themes(db: Session):
    return db.query(ColorThemeModel).all()

# Update color theme by ID
def update_color_theme(db: Session, color_theme_id: int, color1: str, color2: str, color3: str):
    color_theme = db.query(ColorThemeModel).filter(ColorThemeModel.ID == color_theme_id).first()
    if color_theme:
        color_theme.COLOR1 = color1
        color_theme.COLOR2 = color2
        color_theme.COLOR3 = color3
        db.commit()
        db.refresh(color_theme)
        return color_theme
    return None

# Delete color theme by ID
def delete_color_theme(db: Session, color_theme_id: int):
    color_theme = db.query(ColorThemeModel).filter(ColorThemeModel.ID == color_theme_id).first()
    if color_theme:
        db.delete(color_theme)
        db.commit()
        return color_theme
    return None
