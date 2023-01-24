from .db import db, environment, SCHEMA, add_prefix_for_prod

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

    def to_dict(self):
        return {
            'id': self.id,
            'firstAddressLine': self.firstAddressLine,
            'secondAddresLine': self.secondAddressLine,
            'city': self.city,
            'state': self.state,
            'zipCode': self.zipCode,
            'ownerName': self.ownerName,
            'ownerPhone': self.ownerPhone,
            'ownerFirstAddressLine': self.ownerFirstAddressLine,
            'ownerSecondAddressLine': self.ownerSecondAddressLine,
            'ownerCity': self.ownerCity,
            'ownerState': self.ownerState,
            'ownerZipCode': self.ownerZipCode,
            'notes': self.notes,
            'nextInspectionDate': self.nextInspectionDate
        }

    def to_dict_basic_info(self):
        return {
            'id': self.id,
            'firstAddressLine': self.firstAddressLine,
            'secondAddresLine': self.secondAddressLine,
            'city': self.city,
            'state': self.state,
            'zipCode': self.zipCode,
            'ownerName': self.ownerName,
            'ownerPhone': self.ownerPhone,
            'ownerFirstAddressLine': self.ownerFirstAddressLine,
            'ownerSecondAddressLine': self.ownerSecondAddressLine,
            'ownerCity': self.ownerCity,
            'ownerState': self.ownerState,
            'ownerZipCode': self.ownerZipCode,
            'notes': self.notes,
            'nextInspectionDate': self.nextInspectionDate
        }
