from flask import Blueprint, request, Flask
from flask_login import login_required, current_user
from app.models import Address, db, Inspection, InspectionAnswer, InspectionType
from app.forms import InspectionForm, InspectionAnswerForm
from datetime import datetime

inpsection_routes = Blueprint('inspections', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@inpsection_routes.route('/')
@login_required
def inspections():
    '''
    Query for all inspection and return them in a list of dictionaries with basic inspection info
    '''
    inspections = Inspection.query.all()
    return {inspection.id: inspection.to_dict_basic_info() for inspection in inspections}, 200


@inpsection_routes.route('/', methods=['POST'])
@login_required
def add_inspection():
    '''
    Add a inspection, create all inspection answers as passing and return it in a dictionary with all associated data.
    '''
    form = InspectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # addressId, inspectionTypeId, inspectionNumber, passing, notes

    if form.validate_on_submit():
        inspection = Inspection()
        form.populate_obj(inspection)
        inspection.passing = True
        inspection.inspectorId = current_user.id
        inspection.date = datetime.now()

        inspectionType = InspectionType.query.get(form.data['inspectionTypeId'])
        questionCategories = [category for category in inspectionType.question_categories]
        questionListArray = [category.questions for category in questionCategories]
        questions = [question for questionList in questionListArray for question in questionList]

        inspectionAnswers = [InspectionAnswer(inspection=inspection, question=question) for question in questions]

        db.session.add(inspection)
        [db.session.add(inspectionAnswer) for inspectionAnswer in inspectionAnswers]
        db.session.commit()

        return inspection.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@inpsection_routes.route('/<int:id>')
@login_required
def inspection(id):
    '''
    Query for a single inspection and return it in a dictionary with all associated data
    '''
    inspection = Inspection.query.get(id)
    if not inspection:
        return {'errors': ['No inspection found']}, 404

    return inspection.to_dict(), 200



@inpsection_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_inspection(id):
    '''
    Update an inspection and return it in a dictionary with all associated data.
    '''
    form = InspectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # addressId, inspectionTypeId, inspectionNumber, passing, notes

    inspection = Inspection.query.get(id)

    if not inspection:
        return {'errors': ['No inspection found']}, 404

    if form.validate_on_submit():
        form.populate_obj(inspection)
        inspection.inspectorId = current_user.id
        inspection.date = datetime.now()

        db.session.add(inspection)
        db.session.commit()

        return inspection.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@inpsection_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_inspection(id):
    '''
    Delete an inspection and return a successful message
    '''
    deleteInspection = Inspection.query.get(id)

    if not deleteInspection:
        return {'errors': ['No inspection found']}, 404

    db.session.delete(deleteInspection)
    db.session.commit()

    inspection = Inspection.query.get(id)

    if not inspection:
        return {'message': 'Inspection successfully deleted'}, 200

    return {'message': 'Unable to delete inspection.'}


@inpsection_routes.route('/<int:id>/answer', methods=["PUT"])
@login_required
def update_inspection_answer(id):
    '''
    Update an inspection answer and return the inspection in a dictionary with all associated data
    '''
    form = InspectionAnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # id(inspectionAnswerId), passing, comment


    if form.validate_on_submit():
        inspectionAnswer = InspectionAnswer.query.get(form.data['id'])

        if not inspectionAnswer:
            return {'errors': ['Inspection error not found']}, 404

        inspectionAnswer.passing = form.data['passing']
        inspectionAnswer.comment = form.data['comment']

        db.session.add(inspectionAnswer)
        db.session.commit()

        inspection = Inspection.query.get(id)

        if not inspection:
            return {'errors': ['No inspection found']}, 404

        return inspection.to_dict(), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
