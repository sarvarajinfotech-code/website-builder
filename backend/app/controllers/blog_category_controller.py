from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.category_service import (
    create_category,
    get_category,
    get_all_categories,
    update_category,
    delete_category
)
from app.models.blog_category_model import BlogCategoryModel
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for category input
class CategoryCreate(BaseModel):
    category_name: str

# Create a new blog category
@router.post("/blog-category/")
async def create_blog_category(category: CategoryCreate, db: Session = Depends(get_db)):
    return create_category(db, BlogCategoryModel, category.category_name)

# Get a blog category by ID
@router.get("/blog-category/{category_id}")
async def read_blog_category(category_id: int, db: Session = Depends(get_db)):
    category = get_category(db, BlogCategoryModel, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Blog category not found")
    return category

# Get all blog categories
@router.get("/blog-categories/")
async def read_all_blog_categories(db: Session = Depends(get_db)):
    return get_all_categories(db, BlogCategoryModel)

# Update a blog category by ID
@router.put("/blog-category/{category_id}")
async def update_blog_category(category_id: int, category: CategoryCreate, db: Session = Depends(get_db)):
    updated_category = update_category(db, BlogCategoryModel, category_id, category.category_name)
    if not updated_category:
        raise HTTPException(status_code=404, detail="Blog category not found")
    return updated_category

# Delete a blog category by ID
@router.delete("/blog-category/{category_id}")
async def delete_blog_category(category_id: int, db: Session = Depends(get_db)):
    deleted_category = delete_category(db, BlogCategoryModel, category_id)
    if not deleted_category:
        raise HTTPException(status_code=404, detail="Blog category not found")
    return {"detail": "Blog category deleted successfully"}
