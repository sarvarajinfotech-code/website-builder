from sqlalchemy.orm import Session
from app.models.path_model import PathModel

# Create a new path entry
def create_path(db: Session, page_name: str, page_path: str, show: bool, disabled: bool, dynamic_page_id:int):
    new_path = PathModel(
        PAGE_NAME=page_name,
        PAGE_PATH=page_path,
        SHOW=show,
        DISABLED=disabled,
        DYNAMIC_PAGE_ID=dynamic_page_id
    )
    db.add(new_path)
    db.commit()
    db.refresh(new_path)
    return new_path

# Get path by ID
def get_path(db: Session, path_id: int):
    return db.query(PathModel).filter(PathModel.ID == path_id).first()

# Get all paths
def get_all_paths(db: Session):
    return db.query(PathModel).all()

# Update path by ID
def update_path(db: Session, dynamic_page_id: int, page_name: str, page_path: str, show: bool, disabled: bool):
    path = db.query(PathModel).filter(PathModel.DYNAMIC_PAGE_ID == dynamic_page_id).first()
    if path:
        path.PAGE_NAME = page_name
        path.PAGE_PATH = page_path
        path.SHOW = show
        path.DISABLED = disabled
        db.commit()
        db.refresh(path)
        return path
    return None

# Bulk update paths
def bulk_update_paths(db: Session, path_updates: list):
    updated_paths = []
    for update in path_updates:
        path = db.query(PathModel).filter(PathModel.ID == update["id"]).first()
        if path:
            path.PAGE_NAME = update.get("page_name", path.PAGE_NAME)
            path.PAGE_PATH = update.get("page_path", path.PAGE_PATH)
            path.SHOW = update.get("show", path.SHOW)
            path.DISABLED = update.get("disabled", path.DISABLED)
            db.commit()
            db.refresh(path)
            updated_paths.append(path)
    return updated_paths

# Delete path by DYNAMIC_PAGE_ID
def delete_path(db: Session, dynamic_page_id: int):
    path = db.query(PathModel).filter(PathModel.DYNAMIC_PAGE_ID == dynamic_page_id).first()
    if path:
        db.delete(path)
        db.commit()
        return path
    return None


