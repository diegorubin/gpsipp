import json

from flask import Blueprint, Response, request
from users.usecases import crud
from users.usecases.exceptions import ContractError, ValidationError

mod = Blueprint('users', __name__)

@mod.route('/users/empty', methods=['GET'])
def users_empty():
    result = json.dumps({'empty': len(crud.list_users()) == 0})
    return Response(result, mimetype='application/json')

@mod.route('/users', methods=['POST'])
def users():
    return create_user()

def create_user():
    try:
        attributes = request.get_json()
        crud.create_user(attributes)
        return Response(json.dumps(attributes), mimetype='application/json', status=201)
    except ContractError as e:
        result = {
            'message': str(e),
        }
        return Response(json.dumps(result), mimetype='application/json', status=422)
    except ValidationError as e:
        result = {
            'message': str(e),
            'errors': e.errors
        }
        return Response(json.dumps(result), mimetype='application/json', status=400)

