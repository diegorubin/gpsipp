from sqlalchemy import Column, Integer, String
from database import Base

class Presence(Base):
    __tablename__ = 'presences'
    id = Column(Integer, primary_key=True)
    meeting_id = Column(Integer, unique=False)
    member_id = Column(Integer, unique=False)

    def __init__(self, meeting_id=None, member_id=None):
        self.meeting_id = meeting_id
        self.member_id = member_id

    def __repr__(self):
        return '<Presence %r(%r)>' % (self.meeting_id, self.member_id)

