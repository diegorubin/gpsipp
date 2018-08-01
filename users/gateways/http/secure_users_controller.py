import json

from flask import Blueprint, Response
from flask_jwt import jwt_required
from users.usecases import crud

mod = Blueprint('secure_users', __name__)

@mod.route('/users', methods=['GET'])
@jwt_required()
def security_users():
    return get_users()

def get_users():
    result = json.dumps(crud.list_users())
    return Response(result, mimetype='application/json')

