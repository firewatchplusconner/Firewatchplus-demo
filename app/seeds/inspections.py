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
    sanFranInspection1.inspectionAnswers[0].passing = False
    sanFranInspection1.inspectionAnswers[4].passing = False
    sanFranInspection1.inspectionAnswers[5].passing = False
    sanFranInspection1.inspectionAnswers[8].passing = False
    sanFranInspection1.inspectionAnswers[9].passing = False
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
