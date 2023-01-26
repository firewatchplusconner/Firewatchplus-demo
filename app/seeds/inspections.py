from app.models import db, environment, SCHEMA, Inspection

def seed_inspections():
    pass

def undo_inspections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.inspections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM inspections")

    db.session.commit()
