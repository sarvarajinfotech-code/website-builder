from sqlalchemy.orm import Session
from app.models.home_page_settings_model import HomePageSettingsModel

# Create new home page settings
def create_home_page_settings(
    db: Session, 
    header_text: str, 
    header_text_alignment: str, 
    tagline_text: str, 
    tagline_alignment: str, 
    primary_button_text: str, 
    primary_button_type: str, 
    primary_button_link: str, 
    secondary_button_text: str, 
    secondary_button_type: str, 
    secondary_button_link: str, 
    show_in_slider: bool, 
    opacity: int, 
    background_image_path: str
):
    new_home_page_settings = HomePageSettingsModel(
        HEADER_TEXT=header_text,
        HEADER_TEXT_ALIGNMENT=header_text_alignment,
        TAGLINE_TEXT=tagline_text,
        TAGLINE_ALIGNMENT=tagline_alignment,
        PRIMARY_BUTTON_TEXT=primary_button_text,
        PRIMARY_BUTTON_TYPE=primary_button_type,
        PRIMARY_BUTTON_LINK=primary_button_link,
        SECONDARY_BUTTON_TEXT=secondary_button_text,
        SECONDARY_BUTTON_TYPE=secondary_button_type,
        SECONDARY_BUTTON_LINK=secondary_button_link,
        SHOW_IN_SLIDER=show_in_slider,
        OPACITY=opacity,
        BACKGROUND_IMAGE_PATH=background_image_path
    )
    db.add(new_home_page_settings)
    db.commit()
    db.refresh(new_home_page_settings)
    return new_home_page_settings

# Get home page settings by ID
def get_home_page_settings(db: Session, home_page_id: int):
    return db.query(HomePageSettingsModel).filter(HomePageSettingsModel.ID == home_page_id).first()

# Get all home page settings
def get_all_home_page_settings(db: Session):
    return db.query(HomePageSettingsModel).all()

# Update home page settings by ID
def update_home_page_settings(
    db: Session, 
    home_page_id: int, 
    header_text: str, 
    header_text_alignment: str, 
    tagline_text: str, 
    tagline_alignment: str, 
    primary_button_text: str, 
    primary_button_type: str, 
    primary_button_link: str, 
    secondary_button_text: str, 
    secondary_button_type: str, 
    secondary_button_link: str, 
    show_in_slider: bool, 
    opacity: int, 
    background_image_path: str
):
    home_page_settings = db.query(HomePageSettingsModel).filter(HomePageSettingsModel.ID == home_page_id).first()
    if home_page_settings:
        home_page_settings.HEADER_TEXT = header_text
        home_page_settings.HEADER_TEXT_ALIGNMENT = header_text_alignment
        home_page_settings.TAGLINE_TEXT = tagline_text
        home_page_settings.TAGLINE_ALIGNMENT = tagline_alignment
        home_page_settings.PRIMARY_BUTTON_TEXT = primary_button_text
        home_page_settings.PRIMARY_BUTTON_TYPE = primary_button_type
        home_page_settings.PRIMARY_BUTTON_LINK = primary_button_link
        home_page_settings.SECONDARY_BUTTON_TEXT = secondary_button_text
        home_page_settings.SECONDARY_BUTTON_TYPE = secondary_button_type
        home_page_settings.SECONDARY_BUTTON_LINK = secondary_button_link
        home_page_settings.SHOW_IN_SLIDER = show_in_slider
        home_page_settings.OPACITY = opacity
        home_page_settings.BACKGROUND_IMAGE_PATH = background_image_path
        db.commit()
        db.refresh(home_page_settings)
        return home_page_settings
    return None

# Delete home page settings by ID
def delete_home_page_settings(db: Session, home_page_id: int):
    home_page_settings = db.query(HomePageSettingsModel).filter(HomePageSettingsModel.ID == home_page_id).first()
    if home_page_settings:
        db.delete(home_page_settings)
        db.commit()
        return home_page_settings
    return None
