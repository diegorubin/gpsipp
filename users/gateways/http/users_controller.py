import json

from flask import Blueprint, Response, jsonify, request
from users.usecases import crud

mod = Blueprint('users', __name__)

@mod.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        return create_user()
    else:
        return get_users()

def create_user():
    user = User(request.get_json())
    crud.create_user(user)
    result = json.dumps(user.to_json())
    return Response(result, mimetype='application/json', status=201)

def get_users():
    result = json.dumps(crud.list_users())
    return Response(result, mimetype='application/json')

