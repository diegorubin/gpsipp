import json

from flask import Blueprint, Response, request
from flask_jwt import jwt_required
from groups.usecases import crud

mod = Blueprint('secure_members', __name__)

@mod.route('/members', methods=['GET', 'POST'])
@jwt_required()
def members():
    if request.method == 'GET':
        return get_members()

    if request.method == 'POST':
        return create_member()

def get_members():
    result = json.dumps(crud.list_members())
    return Response(result, mimetype='application/json')

def create_member():
    pass

