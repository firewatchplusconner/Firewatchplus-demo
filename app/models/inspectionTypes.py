from .db import db, environment, SCHEMA, add_prefix_for_prod

class InspectionType(db.Model):
    __tablename__ = 'inspection_types'

    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(40), nullable=False, unique=True)

    question_categories = db.relationship('QuestionCategory', back_populates='inspection_type', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'question_categories': [category.to_dict() for category in self.question_categories]
        }

class QuestionCategory(db.Model):
    __tablename__ = 'question_categories'

    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(255), nullable=False)
    inspection_type_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('inspection_types.id')), nullable=False)

    inspection_type = db.relationship('InspectionType', back_populates='question_categories')
    questions = db.relationship('Question', back_populates='question_category')

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'questions': [question.to_dict() for question in self.questions]
        }

class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False, unique=True)
    question_category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('question_categories.id')), nullable=False)

    question_category = db.relationship('QuestionCategory', back_populates='questions')

    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
        }
