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
from app.models.product_category_model import ProductCategoryModel
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for category input
class CategoryCreate(BaseModel):
    category_name: str

# Create a new product category
@router.post("/product-categories/")
async def create_product_category(category: CategoryCreate, db: Session = Depends(get_db)):
    return create_category(db, ProductCategoryModel, category.category_name)

# Get a product category by ID
@router.get("/product-categories/{category_id}")
async def read_product_category(category_id: int, db: Session = Depends(get_db)):
    category = get_category(db, ProductCategoryModel, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Product category not found")
    return category

# Get all product categories
@router.get("/product-categories/")
async def read_all_product_categories(db: Session = Depends(get_db)):
    return get_all_categories(db, ProductCategoryModel)

# Update a product category by ID
@router.put("/product-categories/{category_id}")
async def update_product_category(category_id: int, category: CategoryCreate, db: Session = Depends(get_db)):
    updated_category = update_category(db, ProductCategoryModel, category_id, category.category_name)
    if not updated_category:
        raise HTTPException(status_code=404, detail="Product category not found")
    return updated_category

# Delete a product category by ID
@router.delete("/product-categories/{category_id}")
async def delete_product_category(category_id: int, db: Session = Depends(get_db)):
    deleted_category = delete_category(db, ProductCategoryModel, category_id)
    if not deleted_category:
        raise HTTPException(status_code=404, detail="Product category not found")
    return {"detail": "Product category deleted successfully"}
