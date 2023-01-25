from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Address



class UpdateAddressForm(FlaskForm):
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
