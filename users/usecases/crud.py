from database import db_session
from users.domains.user import User
from users.usecases.exceptions import *

def list_users():
    return User.query.all()

def create_user(attributes):
    if attributes is None:
        raise ContractError('bad contract')
    errors = {}
    if not 'name' in attributes or attributes['name'] == '':
        errors['name'] = 'name_blank_error'

    if not 'email' in attributes or attributes['email'] == '':
        errors['email'] = 'email_blank_error'
    else:
        if not 'email_confirmation' in attributes or attributes['email'] != attributes['email_confirmation']:
            errors['email'] = 'email_confirmation_error'

    if not 'password' in attributes or attributes['password'] == '':
        errors['password'] = 'password_blank_error'

    if len(errors) > 0:
        raise ValidationError('user validation error', errors)

    u = User(attributes['name'], attributes['email'])
    u.set_password(attributes['password'])
    db_session.add(u)
    db_session.commit()

    return u

