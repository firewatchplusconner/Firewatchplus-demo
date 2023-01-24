from app.models import db, environment, SCHEMA, Address

def seed_addresses():
    address1 = Address(
        firstAddressLine = '180 Geary St',
        secondAddressLine = 'Fl 6',
        city = 'San Francisco',
        state = 'CA',
        zipCode = '94108',
        ownerName = 'Kush Patel',
        ownerPhone = '4154171991',
        ownerEmail = 'owner@aa.io',
        ownerFirstAddressLine = '180 Geary St',
        ownerSecondAddressLine = 'Fl 6',
        ownerCity = 'San Francisco',
        ownerState = 'CA',
        ownerZipCode = '94108',
        notes = 'App Academy San Fracisco Location',
        nextInspectionDate = ''
    )
    address2 = Address(
        firstAddressLine = '90 5th Ave',
        city = 'New York',
        state = 'NY',
        zipCode = '10011',
        ownerName = 'Ned Ruggeri',
        ownerPhone = '4154171991',
        ownerEmail = 'owner@aa.io',
        ownerFirstAddressLine = '90 5th Ave',
        ownerCity = 'New York',
        ownerState = 'NY',
        ownerZipCode = '10011',
        notes = 'App Academy New York Location',
    )
    address3 = Address(
        firstAddressLine = '1600 Pennsylvania Ave NW',
        city = 'Washington',
        state = 'DC',
        zipCode = '20500',
        ownerName = 'John Adams',
        ownerPhone = '2024561111',
        ownerEmail = 'president@usa.com',
        ownerFirstAddressLine = '1600 Pennsylvania Ave NW',
        ownerCity = 'Washington',
        ownerState = 'DC',
        ownerZipCode = '20500',
        notes = 'The White House',
    )

    db.session.add(address1)
    db.session.add(address2)
    db.session.add(address3)
    db.session.commit()


def undo_addresses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.addresses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM addresses")

    db.session.commit()
