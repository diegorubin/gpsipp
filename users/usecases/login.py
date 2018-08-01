import hashlib

from users.domains.user import User

def authenticate(username, raw_password):
    password = hashlib.sha224(raw_password.encode()).hexdigest()
    return User.query.filter(User.email == username).filter(User.password == password).first()

def identity(payload):
    user_id = payload['identity']
    return User.query.filter(User.id == user_id)

