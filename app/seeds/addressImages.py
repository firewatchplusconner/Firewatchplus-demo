from app.models import db, environment, SCHEMA, AddressImage, Address, User

def seed_address_images():
    demo = User.query.get(1)

    sanFran = Address.query.get(1)
    newYork = Address.query.get(2)
    whiteHouse = Address.query.get(3)

    whiteHouseImg1 = AddressImage(address=whiteHouse, user=demo, title='Basement/Sub-basement Floor Plan', url='https://ready-response-bucket.s3.us-west-1.amazonaws.com/basement-subbasement-floor-plan.png')
    whiteHouseImg2 = AddressImage(address=whiteHouse, user=demo, title='Ground Floor Axonometric', url='https://ready-response-bucket.s3.us-west-1.amazonaws.com/ground-floor-axonometric.jpg')
    whiteHouseImg3 = AddressImage(address=whiteHouse, user=demo, title='Ground Floor Diagram', url='https://ready-response-bucket.s3.us-west-1.amazonaws.com/ground-floor-diagram.jpg')
    whiteHouseImg4 = AddressImage(address=whiteHouse, user=demo, title='Ground Floor Plan', url='https://ready-response-bucket.s3.us-west-1.amazonaws.com/ground-floor-plan.jpg')
    whiteHouseImg5 = AddressImage(address=whiteHouse, user=demo, title='First Floor Axonometric', url='https://ready-response-bucket.s3.us-west-1.amazonaws.com/first-floor-axonometric.jpg')
    whiteHouseImg6 = AddressImage(address=whiteHouse, user=demo, title='First Floor Diagram', url='https://ready-response-bucket.s3.us-west-1.amazonaws.com/first-floor-diagram.jpg')
    whiteHouseImg7 = AddressImage(address=whiteHouse, user=demo, title='First Floor Plan', url='https://ready-response-bucket.s3.us-west-1.amazonaws.com/first-floor-plan.jpg')
    whiteHouseImg8 = AddressImage(address=whiteHouse, user=demo, title='Second Floor Diagram', url='https://ready-response-bucket.s3.us-west-1.amazonaws.com/second-floor-diagram.jpg')
    whiteHouseImg9 = AddressImage(address=whiteHouse, user=demo, title='Second Floor Plan', url='https://ready-response-bucket.s3.us-west-1.amazonaws.com/second-floor-plan.jpg')
    whiteHouseImg10 = AddressImage(address=whiteHouse, user=demo, title='Third Floor Diagram', url='https://ready-response-bucket.s3.us-west-1.amazonaws.com/third-floor-diagram.jpg')
    whiteHouseImg11 = AddressImage(address=whiteHouse, user=demo, title='Third Floor Plan', url='https://ready-response-bucket.s3.us-west-1.amazonaws.com/third-floor-plan.jpg')
    db.session.add(whiteHouse)
    db.session.commit()

def undo_address_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.address_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM address_images")

    db.session.commit()
