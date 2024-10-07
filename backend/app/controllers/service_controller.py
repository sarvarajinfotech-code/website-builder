from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.service_service import (
    create_service,
    get_service,
    get_all_services,
    update_service,
    delete_service
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for service input
class ServiceCreate(BaseModel):
    service_name: str
    service_category: str
    svg_icon: str
    service_description: str
    learn_more: bool
    learn_more_link: str = None

# Create a new service
@router.post("/services/")
async def create_new_service(service: ServiceCreate, db: Session = Depends(get_db)):
    return create_service(
        db,
        service.service_name,
        service.service_category,
        service.svg_icon,
        service.service_description,
        service.learn_more,
        service.learn_more_link
    )

# Get a service by ID
@router.get("/services/{service_id}")
async def read_service(service_id: int, db: Session = Depends(get_db)):
    service = get_service(db, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

# Get all services
@router.get("/services/")
async def read_all_services(db: Session = Depends(get_db)):
    return get_all_services(db)

# Update a service by ID
@router.put("/services/{service_id}")
async def update_service_details(service_id: int, service: ServiceCreate, db: Session = Depends(get_db)):
    updated_service = update_service(
        db,
        service_id,
        service.service_name,
        service.service_category,
        service.svg_icon,
        service.service_description,
        service.learn_more,
        service.learn_more_link
    )
    if not updated_service:
        raise HTTPException(status_code=404, detail="Service not found")
    return updated_service

# Delete a service by ID
@router.delete("/services/{service_id}")
async def delete_service_by_id(service_id: int, db: Session = Depends(get_db)):
    deleted_service = delete_service(db, service_id)
    if not deleted_service:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"detail": "Service deleted successfully"}
