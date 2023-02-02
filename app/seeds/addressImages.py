from app.models import db, environment, SCHEMA, AddressImage, Address

def seed_address_images():
    pass

def undo_address_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.address-images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM address-images")

    db.session.commit()
