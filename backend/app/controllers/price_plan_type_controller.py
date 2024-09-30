from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.price_plan_type_service import (
    create_price_plan_type,
    get_price_plan_type,
    get_all_price_plans,
    update_price_plan_type,
    delete_price_plan_type
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic models
class PricePlanCreate(BaseModel):
    plan_type: str

class PricePlanUpdate(BaseModel):
    plan_type: str

# Create a new price plan
@router.post("/price-plan/")
async def create_price_plan(plan: PricePlanCreate, db: Session = Depends(get_db)):
    return create_price_plan_type(db, plan.plan_type)

# Get a specific price plan by ID
@router.get("/price-plan/{plan_id}")
async def read_price_plan(plan_id: int, db: Session = Depends(get_db)):
    plan = get_price_plan_type(db, plan_id)
    if not plan:
        raise HTTPException(status_code=404, detail="Price plan not found")
    return plan

# Get all price plans
@router.get("/price-plans/")
async def read_all_price_plans(db: Session = Depends(get_db)):
    return get_all_price_plans(db)

# Update a price plan by ID
@router.put("/price-plan/{plan_id}")
async def update_price_plan(plan_id: int, plan: PricePlanUpdate, db: Session = Depends(get_db)):
    updated_plan = update_price_plan_type(db, plan_id, plan.plan_type)
    if not updated_plan:
        raise HTTPException(status_code=404, detail="Price plan not found")
    return updated_plan

# Delete a price plan by ID
@router.delete("/price-plan/{plan_id}")
async def delete_price_plan(plan_id: int, db: Session = Depends(get_db)):
    plan = delete_price_plan_type(db, plan_id)
    if not plan:
        raise HTTPException(status_code=404, detail="Price plan not found")
    return {"detail": "Price plan deleted successfully"}
