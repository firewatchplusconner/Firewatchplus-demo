from .db import db, environment, SCHEMA

class Address(db.Model):
    __tablename__ = 'addresses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstAddressLine = db.Column(db.String(80), nullable=False)
    secondAddressLine = db.Column(db.String(80))
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zipCode = db.Column(db.String, nullable=False)
    ownerName = db.Column(db.String)
    ownerPhone = db.Column(db.String)
    ownerEmail = db.Column(db.String)
    ownerFirstAddressLine = db.Column(db.String(80))
    ownerSecondAddressLine = db.Column(db.String(80))
    ownerCity = db.Column(db.String)
    ownerState = db.Column(db.String)
    ownerZipCode = db.Column(db.String)
    notes = db.Column(db.Text)
    nextInspectionDate = db.Column(db.String)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)

    inspections = db.relationship('Inspection', back_populates='address', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'firstAddressLine': self.firstAddressLine,
            'secondAddressLine': self.secondAddressLine,
            'city': self.city,
            'state': self.state,
            'zipCode': self.zipCode,
            'ownerName': self.ownerName,
            'ownerPhone': self.ownerPhone,
            'ownerEmail': self.ownerEmail,
            'ownerFirstAddressLine': self.ownerFirstAddressLine,
            'ownerSecondAddressLine': self.ownerSecondAddressLine,
            'ownerCity': self.ownerCity,
            'ownerState': self.ownerState,
            'ownerZipCode': self.ownerZipCode,
            'notes': self.notes,
            'nextInspectionDate': self.nextInspectionDate,
            'lat': self.lat,
            'lng': self.lng,
            'inspections': [inspection.to_dict() for inspection in self.inspections]
        }

    def to_dict_basic_info(self):
        return {
            'id': self.id,
            'firstAddressLine': self.firstAddressLine,
            'secondAddressLine': self.secondAddressLine,
            'city': self.city,
            'state': self.state,
            'zipCode': self.zipCode,
            'ownerName': self.ownerName,
            'ownerPhone': self.ownerPhone,
            'ownerEmail': self.ownerEmail,
            'ownerFirstAddressLine': self.ownerFirstAddressLine,
            'ownerSecondAddressLine': self.ownerSecondAddressLine,
            'ownerCity': self.ownerCity,
            'ownerState': self.ownerState,
            'ownerZipCode': self.ownerZipCode,
            'notes': self.notes,
            'nextInspectionDate': self.nextInspectionDate
        }
