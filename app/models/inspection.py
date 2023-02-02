from .db import db, environment, SCHEMA, add_prefix_for_prod

class Inspection(db.Model):
    __tablename__ = 'inspections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    inspectionNumber = db.Column(db.Integer, nullable=False)
    passing = db.Column(db.Boolean, server_default='true', default=True)
    notes = db.Column(db.Text)
    date = db.Column(db.String, nullable=False)
    addressId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('addresses.id')), nullable=False)
    inspectionTypeId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('inspection_types.id')), nullable=False)
    inspectorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    address = db.relationship('Address', back_populates='inspections')
    inspectionType = db.relationship('InspectionType', back_populates='inspections')
    inspector = db.relationship('User', back_populates='inspections')
    inspectionAnswers = db.relationship('InspectionAnswer', back_populates='inspection', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'inspectionNumber': self.inspectionNumber,
            'passing': self.passing,
            'notes': self.notes,
            'date': self.date,
            'addressId': self.addressId,
            'inspectionTypeId': self.inspectionTypeId,
            'inspectorId': self.inspectorId,
            'address': self.address.to_dict_basic_info(),
            'inspectionType': self.inspectionType.to_dict_basic_info(),
            'inspector': self.inspector.to_dict(),
            'inspectionAnswers': [inspectionAnswer.to_dict() for inspectionAnswer in self.inspectionAnswers]
        }

    def to_dict_basic_info(self):
        return {
            'id': self.id,
            'inspectionNumber': self.inspectionNumber,
            'passing': self.passing,
            'notes': self.notes,
            'date': self.date,
            'addressId': self.addressId,
            'inspectionTypeId': self.inspectionTypeId,
            'inspectorId': self.inspectorId,
            'address': self.address.to_dict_basic_info(),
            'inspectionType': self.inspectionType.to_dict_basic_info(),
            'inspector': self.inspector.to_dict(),
        }

class InspectionAnswer(db.Model):
    __tablename__ = 'inspection_answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    passing = db.Column(db.Boolean, server_default='true', default=True)
    comment = db.Column(db.Text)
    imgUrl = db.Column(db.Text)
    inspectionId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('inspections.id')), nullable=False)
    questionId = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)

    inspection = db.relationship('Inspection', back_populates='inspectionAnswers')
    question = db.relationship('Question', back_populates='inspections')

    def to_dict(self):
        return {
            'id': self.id,
            'passing': self.passing,
            'comment': self.comment,
            'imgUrl': self.imgUrl,
            'inspectionId': self.inspectionId,
            'questionId': self.questionId,
            'question': self.question.to_dict()
        }
