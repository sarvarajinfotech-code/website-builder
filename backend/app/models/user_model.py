from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class User(Base):
    __tablename__ = 'users'

    USER_ID = Column(Integer, primary_key=True, index=True)
    USER_NAME = Column(String(255), unique=True, nullable=False)
    PASSWORD = Column(String(255), nullable=False)
    ROLE = Column(String(50), nullable=False)

def create_default_user(session, username="demo.admin@gmail.com", password="Admin@123", role="admin"):
    """
    Create a default user if it does not exist.
    Call this after tables are created and session is available.
    """
    # Import hash_password from user_service
    from app.services.user_service import hash_password

    try:
        user = session.query(User).filter_by(USER_NAME=username).one_or_none()
        if not user:
            hashed_password = hash_password(password)
            default_user = User(
                USER_NAME=username,
                PASSWORD=hashed_password,
                ROLE=role
            )
            session.add(default_user)
            session.commit()
    except Exception as e:
        session.rollback()
        raise e
