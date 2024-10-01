from sqlalchemy.orm import Session
from app.models.blog_model import BlogModel

# Create new blog
def create_blog(db: Session, blog_name: str, blog_description: str, author_name: str, author_image: str):
    new_blog = BlogModel(
        BLOG_NAME=blog_name,
        BLOG_DESCRIPTION=blog_description,
        AUTHOR_NAME=author_name,
        AUTHOR_IMAGE=author_image
    )
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

# Get blog by ID
def get_blog(db: Session, blog_id: int):
    return db.query(BlogModel).filter(BlogModel.ID == blog_id).first()

# Get all blogs
def get_all_blogs(db: Session):
    return db.query(BlogModel).all()

# Update blog by ID
def update_blog(db: Session, blog_id: int, blog_name: str, blog_description: str, author_name: str, author_image: str):
    blog = db.query(BlogModel).filter(BlogModel.ID == blog_id).first()
    if blog:
        blog.BLOG_NAME = blog_name
        blog.BLOG_DESCRIPTION = blog_description
        blog.AUTHOR_NAME = author_name
        blog.AUTHOR_IMAGE = author_image
        db.commit()
        db.refresh(blog)
        return blog
    return None

# Delete blog by ID
def delete_blog(db: Session, blog_id: int):
    blog = db.query(BlogModel).filter(BlogModel.ID == blog_id).first()
    if blog:
        db.delete(blog)
        db.commit()
        return blog
    return None
