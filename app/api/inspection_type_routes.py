from flask import Blueprint
from flask_login import login_required
from app.models import InspectionType

inspection_type_routes = Blueprint('inspection-types', __name__)

@inspection_type_routes.route('/')
@login_required
def inspection_routes():
    '''
    Query for all inspection routes and return them in a list of dictionaries with associated categories and questions
    '''
    inspectionTypes = InspectionType.query.all()
    return {'inspectionTypes': [inspectionType.to_dict() for inspectionType in inspectionTypes]}, 200
