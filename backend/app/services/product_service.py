from sqlalchemy.orm import Session
from app.models.product_model import ProductModel

# Create a new product
def create_product(db: Session, product_name: str, product_category: str, svg_icon: str, product_description: str, learn_more: bool, learn_more_link: str):
    new_product = ProductModel(
        PRODUCT_NAME=product_name,
        PRODUCT_CATEGORY=product_category,
        SVG_ICON=svg_icon,
        PRODUCT_DESCRIPTION=product_description,
        LEARN_MORE=learn_more,
        LEARN_MORE_LINK=learn_more_link if learn_more else None
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# Get product by ID
def get_product(db: Session, product_id: int):
    return db.query(ProductModel).filter(ProductModel.ID == product_id).first()

# Get all products
def get_all_products(db: Session):
    return db.query(ProductModel).all()

# Update product by ID
def update_product(db: Session, product_id: int, product_name: str, product_category: str, svg_icon: str, product_description: str, learn_more: bool, learn_more_link: str):
    product = db.query(ProductModel).filter(ProductModel.ID == product_id).first()
    if product:
        product.PRODUCT_NAME = product_name
        product.PRODUCT_CATEGORY = product_category
        product.SVG_ICON = svg_icon
        product.PRODUCT_DESCRIPTION = product_description
        product.LEARN_MORE = learn_more
        product.LEARN_MORE_LINK = learn_more_link if learn_more else None
        db.commit()
        db.refresh(product)
        return product
    return None

# Delete product by ID
def delete_product(db: Session, product_id: int):
    product = db.query(ProductModel).filter(ProductModel.ID == product_id).first()
    if product:
        db.delete(product)
        db.commit()
        return product
    return None
