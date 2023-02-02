from app.models import db, environment, SCHEMA, Inspection, Address, InspectionAnswer, User, InspectionType
from datetime import datetime

def seed_inspections():
    demo = User.query.get(1)

    whiteHouse = Address.query.get(1)
    sanFran = Address.query.get(2)
    newYork = Address.query.get(3)

    commercial = InspectionType.query.get(1)
    commercialQuestionCategories = [category for category in commercial.question_categories]
    commercialQuestionList = [commercialQuestionCategory.questions for commercialQuestionCategory in commercialQuestionCategories]
    commercialQuestions = [question for questionList in commercialQuestionList for question in questionList]

    residential = InspectionType.query.get(2)
    residentialQuestionCategories = [category for category in residential.question_categories]
    residentialQuestionsList = [residentialQuestionCategory.questions for residentialQuestionCategory in residentialQuestionCategories]
    residentialQuestions = [question for questionList in residentialQuestionsList for question in questionList]


    whiteHouseInspection = Inspection(
        address=whiteHouse,
        inspectionType=residential,
        inspector=demo,
        inspectionNumber=1,
        date=f'{datetime.now()}'
    )
    whiteHouseAnswers = [InspectionAnswer(inspection=whiteHouseInspection, question=question) for question in residentialQuestions]
    db.session.add(whiteHouseInspection)

    sanFranInspection1 = Inspection(
        address=sanFran,
        inspectionType=commercial,
        inspector=demo,
        inspectionNumber=1,
        date=f'{datetime.now()}',
        passing=False
    )
    sanFran1Answers = [InspectionAnswer(inspection=sanFranInspection1, question=question) for question in commercialQuestions]
    sanFranInspection1.inspectionAnswers[0].passing = False # Exit doors unlocked
    sanFranInspection1.inspectionAnswers[0].comment = 'Exit door is permanently latched shut.'
    sanFranInspection1.inspectionAnswers[0].imgUrl = 'https://ready-response-bucket.s3.us-west-1.amazonaws.com/bolted-exit-door.webp'
    sanFranInspection1.inspectionAnswers[4].passing = False # Exit lights are operable
    sanFranInspection1.inspectionAnswers[4].comment = 'Exit light is broken and needs repair.' # Exit lights are operable
    sanFranInspection1.inspectionAnswers[4].imgUrl = 'https://ready-response-bucket.s3.us-west-1.amazonaws.com/broken-exit-light.jpg' # Exit lights are operable
    sanFranInspection1.inspectionAnswers[5].passing = False # No added surface bolts/latches/locks on exit doors
    sanFranInspection1.inspectionAnswers[5].comment = 'Exit door is permanently latched shut.' # No added surface bolts/latches/locks on exit doors
    sanFranInspection1.inspectionAnswers[5].imgUrl = 'https://ready-response-bucket.s3.us-west-1.amazonaws.com/bolted-exit-door.webp' # No added surface bolts/latches/locks on exit doors
    sanFranInspection1.inspectionAnswers[8].passing = False # FDC is unobstructed and operable
    sanFranInspection1.inspectionAnswers[8].comment = 'FDC is blocked by snow. Maintenance needs to remove snow drift around FDC connections.' # FDC is unobstructed and operable
    sanFranInspection1.inspectionAnswers[8].imgUrl = 'https://ready-response-bucket.s3.us-west-1.amazonaws.com/blocked-FDC.jpg' # FDC is unobstructed and operable
    sanFranInspection1.inspectionAnswers[9].passing = False # FDC caps in place and freely spin
    sanFranInspection1.inspectionAnswers[9].comment = 'Standpipe cap is painted and rusted shut.' # FDC caps in place and freely spin
    sanFranInspection1.inspectionAnswers[9].imgUrl = 'https://ready-response-bucket.s3.us-west-1.amazonaws.com/rusted-standpipe-connection.jpg' # FDC caps in place and freely spin
    db.session.add(sanFranInspection1)

    sanFranInspection2 = Inspection(
        address=sanFran,
        inspectionType=commercial,
        inspector=demo,
        inspectionNumber=2,
        date=f'{datetime.now()}'
    )
    sanFran2Answers = [InspectionAnswer(inspection=sanFranInspection2, question=question) for question in commercialQuestions]
    db.session.add(sanFranInspection2)

    newYorkInspection = Inspection(
        address=newYork,
        inspectionType=commercial,
        inspector=demo,
        inspectionNumber=1,
        date=f'{datetime.now()}'
    )
    newYorkAnswers = [InspectionAnswer(inspection=newYorkInspection, question=question) for question in commercialQuestions]
    db.session.add(newYorkInspection)


    db.session.commit()

def undo_inspections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.inspections RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.inspection_answers RESTART IDENTITY CASCADE")
    else:
        db.session.execute("DELETE FROM inspections")
        db.session.execute('DELETE FROM inspection_answers')

    db.session.commit()
