import hashlib

from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    email = Column(String(120), unique=True)
    password = Column(String(60), unique=False)

    def __init__(self, name=None, email=None):
        self.name = name
        self.email = email

    def __repr__(self):
        return '<User %r(%r)>' % (self.name, self.email)

    def set_password(self, raw_password):
        self.password = hashlib.sha224(raw_password.encode()).hexdigest()

