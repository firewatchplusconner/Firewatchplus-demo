from flask import Blueprint
from flask_login import login_required
from app.models import InspectionType

inspection_type_routes = Blueprint('inspection-types', __name__)

@inspection_type_routes.route('/')
@login_required
def inspection_types():
    '''
    Query for all inspection routes and return them in a list of dictionaries with basic type info
    '''
    inspectionTypes = InspectionType.query.all()

    return {'inspectionTypes': [inspectionType.to_dict_basic_info() for inspectionType in inspectionTypes]}, 200

@inspection_type_routes.route('/<int:id>')
@login_required
def inspection_type(id):
    '''
    Query for an inspection type and return it in a dictionary with all associated categories and questions
    '''
    inspectionType = InspectionType.query.get(id)

    if not inspectionType:
        return {'errors': ['Inspection type not found.']}, 404

    return inspectionType.to_dict(), 200
