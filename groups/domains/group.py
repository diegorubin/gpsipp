from sqlalchemy import Column, Integer, String
from database import Base

class Group(Base):
    __tablename__ = 'groups'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    day_of_week = Column(String(15), unique=False)
    address = Column(String(150), unique=True)

    def __init__(self, name=None, day_of_week=None):
        self.name = name
        self.day_of_week = day_of_week

    def set_address(self, address):
        self.address = address

    def __repr__(self):
        return '<Group %r(%r)>' % (self.name, self.day_of_week)

