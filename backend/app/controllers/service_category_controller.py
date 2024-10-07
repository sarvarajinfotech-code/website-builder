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
from app.models.service_category_model import ServiceCategoryModel  # Import your service category model
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for service category input
class ServiceCategoryCreate(BaseModel):
    category_name: str

# Create a new service category
@router.post("/service-categories/")
async def create_service_category(category: ServiceCategoryCreate, db: Session = Depends(get_db)):
    return create_category(db, ServiceCategoryModel, category.category_name)

# Get a service category by ID
@router.get("/service-categories/{category_id}")
async def read_service_category(category_id: int, db: Session = Depends(get_db)):
    category = get_category(db, ServiceCategoryModel, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Service category not found")
    return category

# Get all service categories
@router.get("/service-categories/")
async def read_all_service_categories(db: Session = Depends(get_db)):
    return get_all_categories(db, ServiceCategoryModel)

# Update a service category by ID
@router.put("/service-categories/{category_id}")
async def update_service_category(category_id: int, category: ServiceCategoryCreate, db: Session = Depends(get_db)):
    updated_category = update_category(db, ServiceCategoryModel, category_id, category.category_name)
    if not updated_category:
        raise HTTPException(status_code=404, detail="Service category not found")
    return updated_category

# Delete a service category by ID
@router.delete("/service-categories/{category_id}")
async def delete_service_category(category_id: int, db: Session = Depends(get_db)):
    deleted_category = delete_category(db, ServiceCategoryModel, category_id)
    if not deleted_category:
        raise HTTPException(status_code=404, detail="Service category not found")
    return {"detail": "Service category deleted successfully"}
