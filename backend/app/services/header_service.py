from sqlalchemy.orm import Session
from app.models.header_model import HeaderInfo

def create_header_info(db: Session, header_text: str, tagline: str, page: str):
    new_header = HeaderInfo(HEADER_TEXT=header_text, TAG_LINE=tagline, PAGE=page)
    db.add(new_header)
    db.commit()
    db.refresh(new_header)
    return new_header

def get_header_info(db: Session, header_id: int):
    return db.query(HeaderInfo).filter(HeaderInfo.ID == header_id).first()

def get_header_info_by_page(db: Session, page: str):
    return db.query(HeaderInfo).filter(HeaderInfo.PAGE == page).all()

def get_all_headers(db: Session):
    return db.query(HeaderInfo).all()

def update_header_info(db: Session, header_id: int, header_text: str, tagline: str, page: str):
    header_info = db.query(HeaderInfo).filter(HeaderInfo.ID == header_id).first()
    if header_info:
        header_info.HEADER_TEXT = header_text
        header_info.TAG_LINE = tagline
        header_info.PAGE = page
        db.commit()
        db.refresh(header_info)
        return header_info
    return None

def delete_header_info(db: Session, header_id: int):
    header_info = db.query(HeaderInfo).filter(HeaderInfo.ID == header_id).first()
    if header_info:
        db.delete(header_info)
        db.commit()
        return header_info
    return None
