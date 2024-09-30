from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.product_service import (
    create_product,
    get_product,
    get_all_products,
    update_product,
    delete_product
)
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for product input
class ProductCreate(BaseModel):
    product_name: str
    product_category: str
    svg_icon: str
    product_description: str
    learn_more: bool
    learn_more_link: str = None

# Create a new product
@router.post("/products/")
async def create_new_product(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product(
        db,
        product.product_name,
        product.product_category,
        product.svg_icon,
        product.product_description,
        product.learn_more,
        product.learn_more_link
    )

# Get a product by ID
@router.get("/products/{product_id}")
async def read_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Get all products
@router.get("/products/")
async def read_all_products(db: Session = Depends(get_db)):
    return get_all_products(db)

# Update a product by ID
@router.put("/products/{product_id}")
async def update_product_details(product_id: int, product: ProductCreate, db: Session = Depends(get_db)):
    updated_product = update_product(
        db,
        product_id,
        product.product_name,
        product.product_category,
        product.svg_icon,
        product.product_description,
        product.learn_more,
        product.learn_more_link
    )
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

# Delete a product by ID
@router.delete("/products/{product_id}")
async def delete_product_by_id(product_id: int, db: Session = Depends(get_db)):
    deleted_product = delete_product(db, product_id)
    if not deleted_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"detail": "Product deleted successfully"}
