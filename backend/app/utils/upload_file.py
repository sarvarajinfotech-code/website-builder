import os
import shutil
from fastapi import UploadFile, HTTPException
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Read the upload folder path from the environment variables
UPLOAD_FOLDER = os.environ.get("PUBLIC_FOLDER_PATH", "/app/media")

def save_file(file: UploadFile, file_name: str) -> str:
    """
    Save an uploaded file to the specified folder from the .env.
    
    Parameters:
    - file: The uploaded file.
    - file_name: The name under which the file will be saved.
    
    Returns:
    - The path of the saved file.
    """
    # Ensure the uploaded file is valid
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    # Create the full path for the file
    file_location = os.path.join(UPLOAD_FOLDER, file_name)

    # Ensure the directory exists
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    # Save the uploaded file
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    return file_name

def delete_file(file_path: str) -> None:
    """
    Delete a file from the specified path.
    
    Parameters:
    - file_path: The full path of the file to be deleted.
    
    Raises:
    - HTTPException: If the file does not exist or cannot be deleted.
    """
    try:
        # Log the file path being deleted
        file_path = os.path.join(UPLOAD_FOLDER, file_path.lstrip("/"))
        print(f"Attempting to delete file: {file_path}")

        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"File deleted successfully: {file_path}")
        else:
            print(f"File not found: {file_path}")
            raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        print(f"Error deleting file: {e}")
        raise HTTPException(status_code=500, detail=str(e))

