from flask import Blueprint, request
from flask_login import login_required
from app.models import User
from app.forms import UpdateUserForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}, 200


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if not user:
        return {'errors': ['User not found']}, 404
    
    return user.to_dict(), 200


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def user(id):
    '''
    Update a user and return that user in a dictionary
    '''
    user = User.query.get(id)

    if not user:
        return {'errors': ['User not found']}, 404

    form = UpdateUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(user)

        return user.to_dict(), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
