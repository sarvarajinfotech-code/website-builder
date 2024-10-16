from sqlalchemy.orm import Session
from app.models.page_model import PageModel

# Create a new Page entry
def create_page(db: Session, page_name: str, content_header: str, content: str):
    new_page = PageModel(
        PAGE_NAME=page_name,
        CONTENT_HEADER=content_header,
        CONTENT=content
    )
    db.add(new_page)
    db.commit()
    db.refresh(new_page)
    return new_page

# Get Page by ID
def get_page(db: Session, page_id: int):
    return db.query(PageModel).filter(PageModel.ID == page_id).first()

# Get all Pages
def get_all_pages(db: Session):
    return db.query(PageModel).all()

# Update Page by ID
def update_page(db: Session, page_id: int, page_name: str, content_header: str, content: str):
    page = db.query(PageModel).filter(PageModel.ID == page_id).first()
    if page:
        page.PAGE_NAME = page_name
        page.CONTENT_HEADER = content_header
        page.CONTENT = content
        db.commit()
        db.refresh(page)
        return page
    return None

# Delete Page by ID
def delete_page(db: Session, page_id: int):
    page = db.query(PageModel).filter(PageModel.ID == page_id).first()
    if page:
        db.delete(page)
        db.commit()
        return page
    return None
