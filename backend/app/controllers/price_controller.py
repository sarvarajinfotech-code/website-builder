from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.price_service import (
    create_price,
    get_price,
    get_all_prices,
    update_price,
    delete_price
)
from pydantic import BaseModel, condecimal
from typing import Optional

router = APIRouter()

# Pydantic models
class PriceCreate(BaseModel):
    price_tagline: str
    plan_type: str
    currency_type: str
    price: condecimal(max_digits=10, decimal_places=2)
    offer: bool
    offer_price: Optional[condecimal(max_digits=10, decimal_places=2)] = None
    features_included: Optional[str] = None
    features_excluded: Optional[str] = None
    cta_button_text: Optional[str] = None
    cta_button_link: Optional[str] = None
    highlighted_plan:  Optional[str] = None

class PriceUpdate(PriceCreate):
    pass

# Create a new price
@router.post("/prices/")
async def create_new_price(price: PriceCreate, db: Session = Depends(get_db)):
    return create_price(db, price.dict())

# Get a specific price by ID
@router.get("/prices/{price_id}")
async def read_price(price_id: int, db: Session = Depends(get_db)):
    price = get_price(db, price_id)
    if not price:
        raise HTTPException(status_code=404, detail="Price not found")
    return price

# Get all prices
@router.get("/prices/")
async def read_all_prices(db: Session = Depends(get_db)):
    return get_all_prices(db)

# Update a price by ID
@router.put("/prices/{price_id}")
async def update_existing_price(price_id: int, price: PriceUpdate, db: Session = Depends(get_db)):
    updated_price = update_price(db, price_id, price.dict())
    if not updated_price:
        raise HTTPException(status_code=404, detail="Price not found")
    return updated_price

# Delete a price by ID
@router.delete("/prices/{price_id}")
async def delete_existing_price(price_id: int, db: Session = Depends(get_db)):
    price = delete_price(db, price_id)
    if not price:
        raise HTTPException(status_code=404, detail="Price not found")
    return {"detail": "Price deleted successfully"}
