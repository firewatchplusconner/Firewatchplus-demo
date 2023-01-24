from flask import Blueprint, request
from flask_login import login_required
from app.models import Address, db
from app.forms import AddressForm

address_routes = Blueprint('addresses', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@address_routes.route('/')
@login_required
def addresses():
    '''
    Query for all addresses and return them in a list of user dictionaries without associated inspections
    '''
    addresses = Address.query.all()
    return {addresses: [address.to_dict_basic_info() for address in addresses]}, 200


@address_routes.route('/<int:id>')
@login_required
def address(id):
    '''
    Query for an address by id and return it in a dictionary with all associated data
    '''
    address = Address.query.get(id)
    if not address:
        return {'errors': ['No address found']}, 404

    return address.to_dict(), 200


@address_routes.route('/', methods=['POST'])
@login_required
def add_address():
    '''
    Add an address and return it in a dictionary with all associated data
    '''
    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        address = Address()
        form.populate_obj(address)
        db.session.add(address)
        db.session.commit()

        return address.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@address_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_address(id):
    '''
    Update an address and return it in a dictionary with all associated data
    '''
    address = Address.query.get(id)

    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not address:
        return {'errors': ['No address found']}, 404

    if form.validate_on_submit():
        form.populate_obj(address)
        db.session.add(address)
        db.session.commit()

        return address.to_dict(), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@address_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_address(id):
    '''
    Delete an address and return a successful message
    '''
    deleteAddress = Address.query.get(id)

    if not deleteAddress:
        return {'errors': ['No address found']}, 404

    db.session.delete(deleteAddress)
    db.session.commit()

    address = Address.query.get(id)

    if not address:
        return {'message': 'Address successfully deleted'}, 200

    return {'message': 'Unable to delete address. Try again'}, 400
