from sqlalchemy import Column, Integer, String
from database import Base

class Member(Base):
    __tablename__ = 'members'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    telephone = Column(String(12), unique=False)
    group_id = Column(Integer)

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return '<Member %r>' % (self.name)

