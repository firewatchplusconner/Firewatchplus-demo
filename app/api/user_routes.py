from flask import Blueprint, request
from flask_login import login_required, logout_user, current_user
from app.models import User, db
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
def update_user(id):
    '''
    Update a user and return that user in a dictionary
    '''
    updateUser = User.query.get(id)

    if not updateUser:
        return {'errors': ['User not found']}, 404

    form = UpdateUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(updateUser)

        db.session.add(updateUser)
        db.session.commit()

        user = User.query.get(id)

        return user.to_dict(), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    '''
    Delete a user and return a successful message
    '''
    if id != current_user.id:
        return {'errors': ['You are not authorized to delete this user']}, 401

    deleteUser = User.query.get(id)
    db.session.delete(deleteUser)
    db.session.commit()

    user = User.query.get(id)

    if not user:
        logout_user()
        return {'message': 'User successfully deleted'}, 200

    return {'message': 'Unable to delete user'}, 400
