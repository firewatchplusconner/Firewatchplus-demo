from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Address

def if_email(form, field):
    if form.data['ownerEmail']:
        Email(form.data['ownerEmail'])


class UpdateAddressForm(FlaskForm):
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
