from sqlalchemy.orm import Session
from app.models.user_model import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def create_user(db: Session, user_name: str, password: str, role: str):
    hashed_password = hash_password(password)
    user = User(USER_NAME=user_name, PASSWORD=hashed_password, ROLE=role)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.USER_ID == user_id).first()

def get_user_by_name(db: Session, user_name: str):
    return db.query(User).filter(User.USER_NAME == user_name).first()

def update_user(db: Session, user_id: int, user_name: str, role: str):
    user = get_user_by_id(db, user_id)
    if user:
        user.USER_NAME = user_name
        user.ROLE = role
        db.commit()
        db.refresh(user)
        return user
    return None

def update_user_with_pass(db: Session, user_name: str, password: str,):
    user = get_user_by_name(db, user_name)
    if user:
        user.USER_NAME = user_name
        user.PASSWORD = password
        db.commit()
        db.refresh(user)
        return user
    return None

def delete_user(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)
    if user:
        db.delete(user)
        db.commit()
        return user
    return None
