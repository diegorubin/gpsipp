import json

from datetime import date

from flask import Blueprint, Response
from flask_jwt import jwt_required
from reports.usecases.meetings import prepare as meetings_report

mod = Blueprint('secure_reports', __name__)

@mod.route('/reports/meetings', methods=['GET'])
@jwt_required()
def meetings():
    result = json.dumps(meetings_report(date(2018,8,7), date(2018,12,7)))
    return Response(result, mimetype='application/json')

