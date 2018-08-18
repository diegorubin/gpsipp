import json

from flask import Blueprint, Response, request
from flask_jwt import jwt_required
from groups.usecases import crud

mod = Blueprint('secure_groups', __name__)

@mod.route('/groups/<id>', methods=['GET'])
@jwt_required()
def group(id):
    result = json.dumps(crud.find_group(id))
    return Response(result, mimetype='application/json')

@mod.route('/groups', methods=['GET', 'POST'])
@jwt_required()
def groups():
    if request.method == 'GET':
        return get_groups()

    if request.method == 'POST':
        return create_group()

def get_groups():
    result = json.dumps(crud.list_groups())
    return Response(result, mimetype='application/json')

def create_group():
    attributes = request.get_json()
    crud.create_group(attributes)
    return Response(json.dumps(attributes), mimetype='application/json', status=201)

