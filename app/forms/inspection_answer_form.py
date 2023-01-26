from flask_wtf import FlaskForm
from wtforms import TextAreaField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class InspectionAnswerForm(FlaskForm):
    questionId = IntegerField('Question ID', validators=[DataRequired()])
    passing = BooleanField('Passing')
    comment = TextAreaField('Notes', validators=[DataRequired()])
