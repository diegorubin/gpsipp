from os import environ

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

connection_string = environ.get('CONNECTION_STRING', 'sqlite:////tmp/test.db')

engine = create_engine(connection_string, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    import users.domains.user
    import groups.domains.group
    import groups.domains.member
    import groups.domains.meeting
    import groups.domains.presence
    Base.metadata.create_all(bind=engine)
