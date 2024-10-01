from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.blog_service import (
    create_blog,
    get_blog,
    get_all_blogs,
    update_blog,
    delete_blog
)
from app.utils.upload_file import save_file, delete_file
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for blog input
class BlogCreate(BaseModel):
    blog_name: str
    blog_description: str
    author_name: str

# Create new blog and upload the author's image
@router.post("/blogs/")
async def create_new_blog(
    blog_name: str = Form(...),
    blog_description: str = Form(...),
    author_name: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
   
    
    # Create new blog in the database
    new_blog = create_blog(db, blog_name, blog_description, author_name, "")
    
   # Save the uploaded author's image and generate the image path
    author_image_path = save_file(file, f"blog_author_{new_blog.ID}.png")

     # update blog in the database
    new_blog = update_blog(db, new_blog.ID, blog_name, blog_description, author_name, author_image_path)


    return {"detail": "Blog created successfully", "blog_id": new_blog.ID}

# Get blog by ID
@router.get("/blogs/{blog_id}")
async def read_blog(blog_id: int, db: Session = Depends(get_db)):
    blog = get_blog(db, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

# Get all blogs
@router.get("/blogs/")
async def read_all_blogs(db: Session = Depends(get_db)):
    return get_all_blogs(db)

# Update blog
@router.put("/blogs/{blog_id}")
async def update_blog_entry(
    blog_id: int,
    blog_name: str = Form(...),
    blog_description: str = Form(...),
    author_name: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    blog = get_blog(db, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")

    # Use the existing image path if no new image is uploaded
    author_image_path = blog.AUTHOR_IMAGE
    if file:
        author_image_path = save_file(file, f"blog_author_{blog_id}.png")

    # Update blog in the database
    updated_blog = update_blog(db, blog_id, blog_name, blog_description, author_name, author_image_path)

    return {"detail": "Blog updated successfully", "blog": updated_blog}

# Delete blog
@router.delete("/blogs/{blog_id}")
async def delete_blog_entry(blog_id: int, db: Session = Depends(get_db)):
    blog = get_blog(db, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")

    # Delete the blog from the database
    deleted_blog = delete_blog(db, blog_id)
    if not deleted_blog:
        raise HTTPException(status_code=404, detail="Blog not found")

    # Optionally delete the author's image file from the public folder
    delete_file(blog.AUTHOR_IMAGE)

    return {"detail": "Blog deleted successfully"}
