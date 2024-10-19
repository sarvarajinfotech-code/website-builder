from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.path_service import (
    create_path,
    get_path,
    get_all_paths,
    update_path,
    delete_path,
    bulk_update_paths
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for path input
class PathCreate(BaseModel):
    page_name: str
    page_path: str
    show: bool
    disabled: bool
    dynamic_page_id:Optional[int]

# Pydantic model for bulk update
class PathBulkUpdate(BaseModel):
    id: int
    page_name: str = None
    page_path: str = None
    show: bool = None
    disabled: bool = None  
      

# Create a new path entry
@router.post("/path/")
async def create_new_path( path: PathCreate, db: Session = Depends(get_db)):
    return create_path(
        db,
        path.page_name,
        path.page_path,
        path.show,
        path.disabled,
        path.dynamic_page_id
    )

# Get a path entry by ID
@router.get("/path/{path_id}")
async def read_path(path_id: int, db: Session = Depends(get_db)):
    path = get_path(db, path_id)
    if not path:
        raise HTTPException(status_code=404, detail="Path entry not found")
    return path

# Get all path entries
@router.get("/path/")
async def read_all_paths(db: Session = Depends(get_db)):
    return get_all_paths(db)

# Update a path entry by ID
@router.put("/path/{dynamic_page_id}")
async def update_path_entry(dynamic_page_id: int, path: PathCreate, db: Session = Depends(get_db)):
    updated_path = update_path(
        db,
        dynamic_page_id,
        path.page_name,
        path.page_path,
        path.show,
        path.disabled
    )
    if not updated_path:
        raise HTTPException(status_code=404, detail="Path entry not found")
    return updated_path

# Bulk update paths
@router.put("/bulk/path")
async def bulk_update_path_entries(path_updates: list[PathBulkUpdate], db: Session = Depends(get_db)):
    updated_paths = bulk_update_paths(db, [update.dict() for update in path_updates])
    if not updated_paths:
        raise HTTPException(status_code=404, detail="No paths were updated")
    return updated_paths

# Delete a path entry by ID
@router.delete("/path/{dynamic_page_id}")
async def delete_path_entry(dynamic_page_id: int, db: Session = Depends(get_db)):
    deleted_path = delete_path(db, dynamic_page_id)
    if not deleted_path:
        raise HTTPException(status_code=404, detail="Path entry not found")
    return {"detail": "Path entry deleted successfully"}


