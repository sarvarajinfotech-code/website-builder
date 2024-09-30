from sqlalchemy.orm import Session
from app.models.product_category_model import ProductCategoryModel
from app.models.blog_category_model import BlogCategoryModel

# Common CRUD functions

# Create category
def create_category(db: Session, model, category_name: str):
    new_category = model(CATEGORY_NAME=category_name)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

# Get category by ID
def get_category(db: Session, model, category_id: int):
    return db.query(model).filter(model.ID == category_id).first()

# Get all categories
def get_all_categories(db: Session, model):
    return db.query(model).all()

# Update category
def update_category(db: Session, model, category_id: int, category_name: str):
    category = db.query(model).filter(model.ID == category_id).first()
    if category:
        category.CATEGORY_NAME = category_name
        db.commit()
        db.refresh(category)
        return category
    return None

# Delete category
def delete_category(db: Session, model, category_id: int):
    category = db.query(model).filter(model.ID == category_id).first()
    if category:
        db.delete(category)
        db.commit()
        return category
    return None
