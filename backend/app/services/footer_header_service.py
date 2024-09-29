from sqlalchemy.orm import Session
from app.models.footer_header_model import FooterHeaderModel

# Create a new footer header entry
def create_footer_header(db: Session, tagline: str, show_newsletter: bool,
                         newsletter_header_text: str, newsletter_tagline: str,
                         copyright_text: str):
    new_footer_header = FooterHeaderModel(
        TAGLINE=tagline,
        SHOW_NEWSLETTER=show_newsletter,
        NEWSLETTER_HEADER_TEXT=newsletter_header_text,
        NEWSLETTER_TAGLINE=newsletter_tagline,
        COPYRIGHT_TEXT=copyright_text
    )
    db.add(new_footer_header)
    db.commit()
    db.refresh(new_footer_header)
    return new_footer_header

# Get footer header by ID
def get_footer_header(db: Session, footer_header_id: int):
    return db.query(FooterHeaderModel).filter(FooterHeaderModel.ID == footer_header_id).first()

# Get all footer header entries
def get_all_footer_headers(db: Session):
    return db.query(FooterHeaderModel).all()

# Update footer header by ID
def update_footer_header(db: Session, footer_header_id: int, tagline: str,
                         show_newsletter: bool, newsletter_header_text: str,
                         newsletter_tagline: str, copyright_text: str):
    footer_header = db.query(FooterHeaderModel).filter(FooterHeaderModel.ID == footer_header_id).first()
    if footer_header:
        footer_header.TAGLINE = tagline
        footer_header.SHOW_NEWSLETTER = show_newsletter
        footer_header.NEWSLETTER_HEADER_TEXT = newsletter_header_text
        footer_header.NEWSLETTER_TAGLINE = newsletter_tagline
        footer_header.COPYRIGHT_TEXT = copyright_text
        db.commit()
        db.refresh(footer_header)
        return footer_header
    return None

# Delete footer header by ID
def delete_footer_header(db: Session, footer_header_id: int):
    footer_header = db.query(FooterHeaderModel).filter(FooterHeaderModel.ID == footer_header_id).first()
    if footer_header:
        db.delete(footer_header)
        db.commit()
        return footer_header
    return None
