from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class InspectionForm(FlaskForm):
    addressId = IntegerField('Address ID', validators=[DataRequired()])
    inspectionTypeId = IntegerField('Inspection Type ID', validators=[DataRequired()])
    inspectionNumber = IntegerField('Inspection Number', validators=[DataRequired()])
    passing = BooleanField('Passing')
    notes = TextAreaField('Notes')

