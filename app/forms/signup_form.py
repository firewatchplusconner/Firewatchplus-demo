from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Username is required.'), username_exists])
    email = StringField('email', validators=[DataRequired(message='Email is required'), user_exists, Email(message='Please provide a valid email address.')])
    password = StringField('password', validators=[DataRequired(message='Password is required')])
    firstName = StringField('First Name', validators=[DataRequired(message='First Name is required')])
    lastName = StringField('Last Name', validators=[DataRequired(message='Last Name is required')])
