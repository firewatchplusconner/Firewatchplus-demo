from flask_wtf import FlaskForm
from wtforms import TextAreaField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def notPassingComment(form, field):
    passing = form.data['passing']
    comment = form.data['comment']
    if not passing and not comment:
        raise ValidationError('Comment is required if field is not passing.')
    commentList = [x for x in comment]
    if not passing and all(x == ' ' for x in commentList):
        raise ValidationError('Please provide an actual comment.')


class InspectionAnswerForm(FlaskForm):
    id = IntegerField('Question Answer ID', validators=[DataRequired()])
    passing = BooleanField('Passing')
    comment = TextAreaField('Notes', validators=[notPassingComment])
