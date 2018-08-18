import json

from flask import Blueprint, Response, request
from flask_jwt import jwt_required
from groups.usecases import crud

mod = Blueprint('secure_meetings', __name__)

@mod.route('/meetings', methods=['GET', 'POST'])
@jwt_required()
def meetings():
    if request.method == 'GET':
        return get_meetings(request.args.get('group_id'))

    if request.method == 'POST':
        return create_meeting()

@mod.route('/meetings/<id>', methods=['GET', 'UPDATE', 'DELETE'])
@jwt_required()
def meeting(id):
    if request.method == 'GET':
        return get_meeting(id)

    if request.method == 'UPDATE':
        return update_meeting(id)

    if request.method == 'DELETE':
        return delete_meeting(id)

def get_meetings(group_id):
    result = json.dumps(crud.list_meetings(group_id))
    return Response(result, mimetype='application/json')

def create_meeting():
    attributes = request.get_json()
    crud.create_meeting(attributes)
    return Response(json.dumps(attributes), mimetype='application/json', status=200)

def get_meeting(id):
    result = json.dumps(crud.get_meeting(id))
    return Response(result, mimetype='application/json')

def update_meeting(id):
    attributes = request.get_json()
    result = json.dumps(crud.update_meeting(id, attributes))
    return Response(result, mimetype='application/json', status=200)

def delete_meeting(id):
    crud.delete_meeting(id)
    return Response(json.dumps({}), mimetype='application/json', status=204)

