from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length, Email
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
    firstAddressLine = StringField('First Address Line', validators=[DataRequired(message='Please provide a valid Street Address.'), address_exists, Length(max=80, message='Street Address must be under 80 characters.')])
    secondAddressLine = StringField('Second Address Line', validators=[Length(max=80, message='Secondary Address must be under 80 characters.')])
    city = StringField('City', validators=[DataRequired(message='Please provide a valid city.')])
    state = StringField('State', validators=[DataRequired(message='Please provide a valid state.')])
    zipCode = StringField('Zipcode', validators=[DataRequired(message='Please provide a valid zip code.')])
    ownerName = StringField('Owner Name')
    ownerPhone = StringField('Owner Phone Number')
    ownerEmail = StringField('Owner Email Address', validators=[DataRequired(message='Please provide an Owner Email'), Email(message='Please provide a valid Owner Email')])
    ownerFirstAddressLine = StringField('Owners Address - First Line', validators=[Length(max=80, message='Owner Street Address must be under 80 characters.')])
    ownerSecondAddressLine = StringField('Owners Address - Second Line', validators=[Length(max=80, message='Owner Secondary Address must be under 80 characters.')])
    ownerCity = StringField('Owner City')
    ownerState = StringField('Owner State')
    ownerZipCode = StringField('Owner Zip Code')
    notes = TextAreaField('Notes')
    nextInspectionDate = StringField('Next Inspection Date')
    lat = StringField('Latitude')
    lng = StringField('Longitude')
