from sqlalchemy import Column, DateTime, Integer, String
from database import Base

class Meeting(Base):
    __tablename__ = 'meetings'
    id = Column(Integer, primary_key=True)
    group_id = Column(Integer, unique=False)
    date = Column(DateTime, unique=False)
    number_of_participants = Column(Integer, unique=False)
    number_of_visitors = Column(Integer, unique=False)
    number_of_children = Column(Integer, unique=False)

    def __init__(self, group_id= None, date=None, number_of_participants=None):
        self.group_id = group_id
        self.date = date
        self.number_of_participants = number_of_participants

    def set_number_of_visitors(self, number_of_visitors):
        self.number_of_visitors = number_of_visitors

    def set_number_of_children(self, number_of_children):
        self.number_of_children = number_of_children

    def __repr__(self):
        return '<Meeting %r(%r)>' % (self.group_id, self.date)

