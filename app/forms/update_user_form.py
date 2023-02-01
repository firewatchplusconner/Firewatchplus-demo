from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class UpdateUserForm(FlaskForm):
    firstName = StringField('First Name', validators=[DataRequired(message='First Name is required.')])
    lastName = StringField('Last Name', validators=[DataRequired(message='Last Name is required.')])
