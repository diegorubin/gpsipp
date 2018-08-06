from database import db_session
from datetime import datetime
from groups.domains.group import Group
from groups.domains.member import Member
from groups.domains.meeting import Meeting

def list_groups():
    groups = []
    for g in Group.query.all():
        attributes = g.__dict__
        del attributes['_sa_instance_state']
        groups.append(attributes)
    return groups

def find_group(id):
    group = Group.query.filter(Group.id == id).first()
    attributes = group.__dict__
    del attributes['_sa_instance_state']
    return attributes

def create_group(attributes):
    g = Group(attributes['name'], attributes['day_of_week'])
    g.set_address = attributes['address']
    db_session.add(g)
    db_session.commit()

    return g

def list_members():
    members = []
    for m in Member.query.all():
        attributes = m.__dict__
        del attributes['_sa_instance_state']
        members.append(attributes)
    return members

def create_member(attributes):
    m = Member(attributes['name'])
    m.set_telephone = attributes['telephone']
    m.set_group_id = attributes['group_id']
    db_session.add(m)
    db_session.commit()

    return m

def list_meetings(group_id):
    meetings = []
    for m in Meeting.query.filter(Meeting.group_id == group_id).all():
        attributes = m.__dict__
        del attributes['_sa_instance_state']
        attributes['date'] = datetime.strftime(attributes['date'], '%d/%m/%Y')
        meetings.append(attributes)
    return meetings

def create_meeting(attributes):
    date = datetime.strptime(attributes['date'], '%d/%m/%Y')
    m = Meeting(attributes['group_id'], date, attributes['number_of_participants'])
    db_session.add(m)
    db_session.commit()

    return m

