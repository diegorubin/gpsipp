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

def get_meetings(group_id):
    result = json.dumps(crud.list_meetings(group_id))
    return Response(result, mimetype='application/json')

def create_meeting():
    attributes = request.get_json()
    crud.create_meeting(attributes)
    return Response(json.dumps(attributes), mimetype='application/json', status=201)

