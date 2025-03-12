from sqlalchemy.orm import Session
from app.models.seo_tags_model import SeoTagsModel

# Create new SEO tag
def create_seo_tag(db: Session, section: str, title: str, description: str, keywords: str):
    new_seo_tag = SeoTagsModel(
        section=section,
        title=title,
        description=description,
        keywords=keywords
    )
    db.add(new_seo_tag)
    db.commit()
    db.refresh(new_seo_tag)
    return new_seo_tag

# Get SEO tag by section
def get_seo_tag(db: Session, section: str):
    return db.query(SeoTagsModel).filter(SeoTagsModel.section == section).first()

# Get all SEO tags
def get_all_seo_tags(db: Session):
    return db.query(SeoTagsModel).all()

# Update SEO tag by section
def update_seo_tag(db: Session, section: str, title: str, description: str, keywords: str):
    seo_tag = db.query(SeoTagsModel).filter(SeoTagsModel.section == section).first()
    if seo_tag:
        seo_tag.title = title
        seo_tag.description = description
        seo_tag.keywords = keywords
        db.commit()
        db.refresh(seo_tag)
        return seo_tag
    return None

# Delete SEO tag by section
def delete_seo_tag(db: Session, section: str):
    seo_tag = db.query(SeoTagsModel).filter(SeoTagsModel.section == section).first()
    if seo_tag:
        db.delete(seo_tag)
        db.commit()
        return seo_tag
    return None
