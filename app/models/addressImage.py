from .db import db, environment, SCHEMA, add_prefix_for_prod

class AddressImage(db.Model):
    __tablename__ = 'address_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    url = db.Column(db.Text, nullable=False)
    addressId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('addresses.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    address = db.relationship('Address', back_populates='images')
    user = db.relationship('User', back_populates='addressImages')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'url': self.url,
            'addressId': self.addressId,
            'userId': self.userId
        }
