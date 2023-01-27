from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Address

def address_exists(form, field):
    firstAddressLine = form.data['firstAddressLine']
    secondAddressLine = form.data['secondAddressLine']
    city = form.data['city']
    state = form.data['state']
    zipCode = form.data['zipCode']
    address = Address.query.filter(
        Address.firstAddressLine == firstAddressLine,
        Address.secondAddressLine == secondAddressLine,
        Address.city == city,
        Address.state == state,
        Address.zipCode == zipCode
    ).first()
    if address:
        raise ValidationError('Address is already in the database.')

class AddressForm(FlaskForm):
    firstAddressLine = StringField('First Address Line', validators=[DataRequired(), address_exists])
    secondAddressLine = StringField('Second Address Line', validators=[address_exists])
    city = StringField('City', validators=[DataRequired(), address_exists])
    state = StringField('State', validators=[DataRequired(), address_exists])
    zipCode = StringField('Zipcode', validators=[DataRequired(), address_exists])
    ownerName = StringField('Owner Name')
    ownerPhone = StringField('Owner Phone Number')
    ownerEmail = StringField('Owner Email Address')
    ownerFirstAddressLine = StringField('Owners Address - First Line')
    ownerSecondAddressLine = StringField('Owners Address - Second Line')
    ownerCity = StringField('Owner City')
    ownerState = StringField('Owner State')
    ownerZipCode = StringField('Owner Zip Code')
    notes = TextAreaField('Notes')
    nextInspectionDate = StringField('Next Inspection Date')
