from sqlalchemy.orm import Session
from app.models.blog_model import BlogModel

# Create new blog
def create_blog(db: Session, blog_name: str, blog_description: str, author_name: str, author_image: str, category: str):
    new_blog = BlogModel(
        BLOG_NAME=blog_name,
        AUTHOR_NAME=author_name,
        AUTHOR_IMAGE=author_image,
        CATEGORY=category
    )
    new_blog.set_blog_description(blog_description)  # Compress and set blog description
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog.to_dict()  # Return dictionary with decompressed blog description

# Get blog by ID
def get_blog(db: Session, blog_id: int):
    blog = db.query(BlogModel).filter(BlogModel.ID == blog_id).first()
    if blog:
        return blog.to_dict()  # Return dictionary with decompressed blog description
    return None

# Get all blogs
def get_all_blogs(db: Session):
    blogs = db.query(BlogModel).all()
    return [blog.to_dict() for blog in blogs]  # Return list of dictionaries

# Update blog by ID
def update_blog(db: Session, blog_id: int, blog_name: str, blog_description: str, author_name: str, author_image: str, category: str):
    blog = db.query(BlogModel).filter(BlogModel.ID == blog_id).first()
    if blog:
        blog.BLOG_NAME = blog_name
        blog.AUTHOR_NAME = author_name
        blog.AUTHOR_IMAGE = author_image
        blog.CATEGORY = category
        blog.set_blog_description(blog_description)  # Compress and set blog description
        db.commit()
        db.refresh(blog)
        return blog.to_dict()  # Return dictionary with decompressed blog description
    return None

# Delete blog by ID
def delete_blog(db: Session, blog_id: int):
    blog = db.query(BlogModel).filter(BlogModel.ID == blog_id).first()
    if blog:
        db.delete(blog)
        db.commit()
        return blog.to_dict()  # Return dictionary with decompressed blog description
    return None
