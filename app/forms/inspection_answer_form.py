from flask_wtf import FlaskForm
from wtforms import TextAreaField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def notPassingComment(form, field):
    passing = form.data['passing']
    comment = form.data['comment']
    if not passing and not comment:
        raise ValidationError('Comment is required if field is not passing.')


class InspectionAnswerForm(FlaskForm):
    questionId = IntegerField('Question ID', validators=[DataRequired()])
    passing = BooleanField('Passing')
    comment = TextAreaField('Notes', validators=[notPassingComment])
