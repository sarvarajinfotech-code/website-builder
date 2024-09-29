from sqlalchemy.orm import Session
from app.models.footer_section_model import FooterSectionModel

# Create a new footer section entry
def create_footer_section(db: Session, section_header: str, section_item_name: str,
                          link_type: str, link: str):
    new_footer_section = FooterSectionModel(
        SECTION_HEADER=section_header,
        SECTION_ITEM_NAME=section_item_name,
        LINK_TYPE=link_type,
        LINK=link
    )
    db.add(new_footer_section)
    db.commit()
    db.refresh(new_footer_section)
    return new_footer_section

# Get footer section by ID
def get_footer_section(db: Session, footer_section_id: int):
    return db.query(FooterSectionModel).filter(FooterSectionModel.ID == footer_section_id).first()

# Get all footer section entries
def get_all_footer_sections(db: Session):
    return db.query(FooterSectionModel).all()

# Update footer section by ID
def update_footer_section(db: Session, footer_section_id: int, section_header: str,
                          section_item_name: str, link_type: str, link: str):
    footer_section = db.query(FooterSectionModel).filter(FooterSectionModel.ID == footer_section_id).first()
    if footer_section:
        footer_section.SECTION_HEADER = section_header
        footer_section.SECTION_ITEM_NAME = section_item_name
        footer_section.LINK_TYPE = link_type
        footer_section.LINK = link
        db.commit()
        db.refresh(footer_section)
        return footer_section
    return None

# Delete footer section by ID
def delete_footer_section(db: Session, footer_section_id: int):
    footer_section = db.query(FooterSectionModel).filter(FooterSectionModel.ID == footer_section_id).first()
    if footer_section:
        db.delete(footer_section)
        db.commit()
        return footer_section
    return None
