from app.models import db, environment, SCHEMA, InspectionType, Question, QuestionCategory

def seed_inspection_types():
    # commerial questions
    egress_question_1 = Question(question='Exit doors unlocked.')
    egress_question_2 = Question(question='Exit access in unobstructed/clear.')
    egress_question_3 = Question(question='Exit doors are operable.')
    egress_question_4 = Question(question='Enclosed exit stairways are clear and free of storage.')
    egress_question_5 = Question(question='Exit lights are operable.')
    egress_question_6 = Question(question='No added surface bolts/latches/locks on exit doors.')
    egress_question_7 = Question(question='Exit doors readily distinguishable as such, with no mirrors or other coverings over doors.')

    systems_question_1 = Question(question='Fire alarm, fire sprinkler and suppression systems are inspected and tested annually')
    systems_question_2 = Question(question='Sprinkler connection (FDC) is unobstructed and accessible.')
    systems_question_3 = Question(question='FDC caps in place and FDC couplings freely spin')
    systems_question_4 = Question(question='Sprinkler heads are unobstructed with no storage with- in 18 inches (36 inches for ESFR and Large Drop fire sprinklers).')
    systems_question_5 = Question(question='Sprinkler heads are free of paint, corrosion, or other debris.')
    systems_question_6 = Question(question='Sprinkler valve rooms are accessible and free of storage, and their location identified.')
    systems_question_7 = Question(question='Fire alarm devices (pull stations, control panels, etc.) are accessible.')
    systems_question_8 = Question(question='Fire Alarm Control Panel (FACP) accessible and location identified.')
    systems_question_9 = Question(question='Fire alarm system horns and strobes are not obstructed.')
    systems_question_10 = Question(question='Kitchen hood suppression system inspected at 6 month intervals.')
    systems_question_11 = Question(question='Kitchen hood vent system inspected and cleaned at required intervals.')
    systems_question_12 = Question(question='Kitchen hood suppression system remote pull is accessible.')
    systems_question_13 = Question(question='Fire extinguishers inspected annually.')
    systems_question_14 = Question(question='Fire extinguishers are accessible and mounted.')
    systems_question_15 = Question(question='Travel distance from all portions of the building less than 75’ to a fire extinguisher')

    assemblies_question_1 = Question(question='Fire doors are operable by self-closing and latching')
    assemblies_question_2 = Question(question='Fire doors are not wedged or propped open.')
    assemblies_question_3 = Question(question='Roll down fire doors drop tested by outside testing agency each year')
    assemblies_question_4 = Question(question='Fire rated walls, floor, and ceiling construction not breached.')

    hazmat_question_1 = Question(question='No open containers of flammable or combustible liquids')
    hazmat_question_2 = Question(question='Material Safety Data Sheets (MSDS) are on site (hard copy or electronic version must be available).')
    hazmat_question_3 = Question(question='Compressed gas cylinders secured upright.')

    electrical_question_1 = Question(question='Emergency lights tested each year.')
    electrical_question_2 = Question(question='Emergency generator is fully tested annually.')
    electrical_question_3 = Question(question='Extension cords not used in place of permanent wiring.')
    electrical_question_4 = Question(question='Outlet/switch/electrical covers in place')
    electrical_question_5 = Question(question='Covers for junction boxes, panels, etc. are in place.')
    electrical_question_6 = Question(question='Electrical rooms are identified as such.')

    housekeeping_question_1 = Question(question='No accumulation of combustible waste.')
    housekeeping_question_2 = Question(question='Electrical, mechanical, boiler rooms are accessible and free of storage.')
    housekeeping_question_3 = Question(question='3-foot clearance maintained around electrical panels.')
    housekeeping_question_4 = Question(question='Electrical equipment and motors free of debris and build-up (i.e. sawdust, lint, etc.).')

    misc_question_1 = Question(question='Street address numbers posted and clearly visible')
    misc_question_2 = Question(question='No combustible decorative material in exit corridors or assembly occupancies.')
    misc_question_3 = Question(question='Privately-owned fire hydrants accessible.')
    misc_question_4 = Question(question='Privately-owned fire hydrants painted per Fire Department regulations')
    misc_question_5 = Question(question='LPG gas tanks subjected to vehicle traffic protected from damage.')
    misc_question_6 = Question(question='Access road unobstructed.')
    misc_question_7 = Question(question='If required, KNOX Box installed, and keys updated.')

    # commerial categories
    egress_category = QuestionCategory(category='Exits/Means of Egress', questions=[egress_question_1, egress_question_2, egress_question_3, egress_question_4, egress_question_5, egress_question_6, egress_question_7])

    system_category = QuestionCategory(category='Fire Protection Systems', questions=[systems_question_1, systems_question_2, systems_question_3, systems_question_4, systems_question_5, systems_question_6, systems_question_7, systems_question_8, systems_question_9, systems_question_10, systems_question_11, systems_question_12, systems_question_13, systems_question_14, systems_question_15])

    assemblies_category = QuestionCategory(category='Fire Protection Assemblies', questions=[assemblies_question_1, assemblies_question_2, assemblies_question_3, assemblies_question_4])

    hazmat_category = QuestionCategory(category='Hazardous Materials', questions=[hazmat_question_1, hazmat_question_2, hazmat_question_3])

    electrical_category = QuestionCategory(category='Electrical', questions=[electrical_question_1, electrical_question_2, electrical_question_3, electrical_question_4, electrical_question_5, electrical_question_6])

    housekeeping_category = QuestionCategory(category='Housekeeping', questions=[housekeeping_question_1, housekeeping_question_2, housekeeping_question_3, housekeeping_question_4])

    misc_category = QuestionCategory(category='Miscellaneous', questions=[misc_question_1, misc_question_2, misc_question_3, misc_question_4, misc_question_5, misc_question_6, misc_question_7])

    # commerial inspection type
    commercial = InspectionType(type='Commercial', question_categories=[egress_category, system_category, assemblies_category, hazmat_category, electrical_category, housekeeping_category, misc_category])

    # residential inspection questions
    general_question_1 = Question(question='Home has smoke alarms on every level.')
    general_question_2 = Question(question='Home has a smoke alarm in every bedroom.')
    general_question_3 = Question(question='Smoke alarms are located outside each separate sleeping area.')
    general_question_4 = Question(question='Smoke alarms are located at least 10 feet from a stationary or fixed cooking appliance.')
    general_question_5 = Question(question='For larger homes (where the interior floor area on a given level is greater than 1,000 square feet), there is an average of at least 1 smoke alarm for every 500 square feet. [See NFPA 72-2007 11.5.1.3, 29.5.1.3 (2010)]')
    general_question_6 = Question(question='Home has ionization, photoelectric, or combination smoke alarms.')
    general_question_7 = Question(question='All smoke alarms are working.')
    general_question_8 = Question(question='Family has a home fire escape plan.')
    general_question_9 = Question(question='If the home has occupant(s) that require assistance to escape. Occupants discuss escape planning and occupant requirements in case of a fire or emergency escape.')
    general_question_10 = Question(question='House number is visible from the street.')
    general_question_11 = Question(question='Windows used for escape open easily — not blocked by furniture, security bars or nailed/painted shut.')
    general_question_12 = Question(question='Security bars, if present, have a quick release-device.')
    general_question_13 = Question(question='Home has a carbon monoxide alarm outside each separate sleeping area. ')
    general_question_14 = Question(question='Home has a carbon monoxide alarm on every level.')
    general_question_15 = Question(question='Carbon monoxide alarms are working.')

    throughout_question_1 = Question(question='No evidence of smoking in the home.')
    throughout_question_2 = Question(question='Large ashtrays are provided outside for smokers')
    throughout_question_3 = Question(question='Matches and lighters are stored in a secure cabinet.')
    throughout_question_4 = Question(question='Lit candles are not left unattended.')
    throughout_question_5 = Question(question='Flammable liquids, if stored in the home, are limited in quantify. ')
    throughout_question_6 = Question(question='The home is not cluttered with clothes, magazines, newspapers and other items that can burn.')

    kitchen_question_1 = Question(question='Things that can burn are removed from the stovetop.')
    kitchen_question_2 = Question(question='Small appliances are unplugged when not in use.')
    kitchen_question_3 = Question(question='Adult stays in the kitchen when stovetop is in use.')

    living_question_1 = Question(question='Fireplace has proper screen and hearth.')
    living_question_2 = Question(question='Things that can burn are at least 3 feet from space heaters and fireplaces.')

    bedroom_question_1 = Question(question='All bedrooms have two ways out — window and a door.')

    basement_question_1 = Question(question='Workshop area is clean of things that can burn')
    basement_question_2 = Question(question='Hot water heater is set at no higher than 120° Fahrenheit.')
    basement_question_3 = Question(question='Things that can burn are at least 3 feet from the furnace.')
    basement_question_4 = Question(question='Furnace is inspected and cleaned annually.')
    basement_question_5 = Question(question='Chimney is inspected annually and cleaned as needed.')
    basement_question_6 = Question(question='Clothes dryer lint filter and vent pipe are clean')

    garage_question_1 = Question(question='There is a solid door between garage and residence.')
    garage_question_2 = Question(question='Gas powered equipment is stored in an outside shed or garage, separate from the home.')
    garage_question_3 = Question(question='Gasoline is stored in an approved safety container in an outside shed or garage, separate from the home.')

    outside_question_1 = Question(question='Outside electrical receptacles are GFCI and they are in good working condition.')
    outside_question_2 = Question(question='There is no rubbish, trash, brush or tree trimmings accumulation on the property. ')
    outside_question_3 = Question(question='Barbecue grill is only used outdoors.')
    outside_question_4 = Question(question='Swimming pool or hot tub is enclosed by a four-sided fence and locked gate. Filter, heater or hot tub is properly grounded.')

    residential_electrical_question_1 = Question(question='AFCIs (arc-fault circuit interrupters) are installed throughout the home and they are working properly (new home construction only).')
    residential_electrical_question_2 = Question(question='Kitchen and bathrooms have GFCI outlets on countertop surfaces within 6 feet of running water outlets and they are working properly.')
    residential_electrical_question_3 = Question(question='All receptacle and switch faceplates are installed and in good condition.')
    residential_electrical_question_4 = Question(question='Receptacles have been tested and are in good working condition — no evidence of arcing or overheating.')
    residential_electrical_question_5 = Question(question='Switches are in good condition — no evidence of arcing or overheating.')
    residential_electrical_question_6 = Question(question='Lighting fixture canopies are fastened in place and fixture is in good condition')
    residential_electrical_question_7 = Question(question='Bulbs in light fixtures are the correct wattage for the lighting fixture.')
    residential_electrical_question_8 = Question(question='Flexible cords and cables are not used as fixed wiring, run through holes in walls, ceiling or floor, run through doorways or windows or under carpets or attached to building surfaces.')
    residential_electrical_question_9 = Question(question='If there are young children in the home, the home has tamper-resistant outlets.')
    residential_electrical_question_10 = Question(question='Panel board and distribution equipment is accessible for inspection and in good condition — no evidence of overheating, corrosion or other damage.')
    residential_electrical_question_11 = Question(question='Service entrance raceways or cables are fastened in place, grounded, readily accessible and in good condition.')

    stair_question_1 = Question(question='Stair is provided with a handrail(s).')
    stair_question_2 = Question(question='Stair can be illuminated for night time use.')
    stair_question_3 = Question(question='Stair tread depth and riser height are uniform.')
    stair_question_4 = Question(question='Stair landing nosing projections are consistent with other nosings on the stair flight. (You can determine this by doing a “crouch and sight” test. Crouch down at the top landing of the stair. All the nosings from the landing to the bottom step should line up.)')

    # residential question categories
    general_category = QuestionCategory(category='General', questions=[general_question_1, general_question_2, general_question_3, general_question_4, general_question_5, general_question_6, general_question_7, general_question_8, general_question_9, general_question_10, general_question_11, general_question_12, general_question_13, general_question_14, general_question_15])

    throughout_category = QuestionCategory(category='Throughout the Home', questions=[throughout_question_1, throughout_question_2, throughout_question_3, throughout_question_4, throughout_question_5, throughout_question_6])

    kitchen_category = QuestionCategory(category='Kitchen', questions=[kitchen_question_1, kitchen_question_2, kitchen_question_3])

    living_category = QuestionCategory(category='Living/Family Room', questions=[living_question_1, living_question_2])

    bedroom_category = QuestionCategory(category='Bedrooms', questions=[bedroom_question_1])

    basement_category = QuestionCategory(category='Basement', questions=[basement_question_1, basement_question_2, basement_question_3, basement_question_4, basement_question_5, basement_question_6])

    garage_category = QuestionCategory(category='Garage', questions=[garage_question_1, garage_question_2, garage_question_3])

    outside_category = QuestionCategory(category='Outside the Home', questions=[outside_question_1, outside_question_2, outside_question_3, outside_question_4])

    residential_electrical_category = QuestionCategory(category='Electrical', questions=[residential_electrical_question_1, residential_electrical_question_2, residential_electrical_question_3, residential_electrical_question_4, residential_electrical_question_5, residential_electrical_question_6, residential_electrical_question_7, residential_electrical_question_8, residential_electrical_question_9, residential_electrical_question_10, residential_electrical_question_11])

    stair_category = QuestionCategory(category='Stair Safety', questions=[stair_question_1, stair_question_2, stair_question_3, stair_question_4])

    # residential inspection type
    residential = InspectionType(type='Residential', question_categories=[general_category, throughout_category, kitchen_category, living_category, bedroom_category, basement_category, garage_category, outside_category, residential_electrical_category, stair_category])

    # brush inspection questions
    defensible_question_1 = Question(question='No branches within 10 feet of any stovepipe or chimney outlet.')
    defensible_question_2 = Question(question='No leaves, needles or other vegetation on roofs, gutters, decks, porches and stairways etc.')
    defensible_question_3 = Question(question='No dead or dying trees, branches, shrubs or other plants adjacent to or overhanging buildings.')
    defensible_question_4 = Question(question='Lower branches of trees trimmed to a height of 6 to 15 feet (or 1/3 tree height for trees under 18 feet).')
    defensible_question_5 = Question(question='No dead or dying grass, leaves, needles or other vegetation.')
    defensible_question_6 = Question(question='No live flammable ground cover and shrubs.')

    reduced_fuel_question_1 = Question(question='Dead or dying grass trimmed to a maximum of 4 inches in height. (Trimmings may remain on the ground)')
    reduced_fuel_question_2 = Question(question='Live flammable ground cover trimmed to less than 18 inches in height.')
    reduced_fuel_question_3 = Question(question='Lower branches of trees trimmed to a height of 6 to 15 feet from the top of the vegetation below. (1/3 of the tree height for trees under 30 feet)')
    reduced_fuel_question_4 = Question(question='All ground fuels trimmed to less than four inches in height. Single trees or other vegetation may be kept if they are well spaced, well pruned, well maintained, free of all dead material, and will not spread fire to other vegetation or structures.')
    reduced_fuel_question_5 = Question(question='All grass is less than four inches in height. If fuels are isolated from other fuels or where necessary to stabilize soil, grasses may reach a height of 18 inches.')
    reduced_fuel_question_6 = Question(question='Proper clearance between shrubs/trees according to the slope of the land and type of vegetation. 0-20 percent slope = 2 times the height of the plant or 10 feet for trees. 20-40 percent slope = 4 times the height of the plant or 20 feet for trees. More than 40 percent slope = 6 times the height of the plant or 30 feet for trees.')

    defensible_reduced_question_1 = Question(question='Logs or stumps embedded in the soil are removed or isolated from structures and other vegetation.')
    defensible_reduced_question_2 = Question(question='No dead or dying brush and trees.')
    defensible_reduced_question_3 = Question(question='No dead or dying tree branches within 15 feet of the ground.')

    other_reqs_question_1 = Question(question='No flammable vegetation, trash, and other combustible materials 10 feet around and above propane tanks.')
    other_reqs_question_2 = Question(question='Address numbers properly displayed in contrasting colors (4” Min. Size) and readable from the street or access road.')
    other_reqs_question_3 = Question(question='Chimney or stovepipe openings properly equipped with a metal screen having openings between 3/8 inch and 1/2 inch.')
    other_reqs_question_4 = Question(question='Clearance of 10 feet around and 15 feet above fuels (e.g. Woodpiles, lumber, scrap etc.). Woodpiles moved as far as possible from structures.')
    other_reqs_question_5 = Question(question='Flammable materials not stored under decks and similar overhangs of structures.')
    other_reqs_question_6 = Question(question='Vegetation cleared 10 feet from sides and 15 feet above all driveways and turnaround areas.')

    # brush inspection categories
    defensible_space_category = QuestionCategory(category='Defensible Space Zone (within 30 feet of all structures or to property line)', questions=[defensible_question_1, defensible_question_2, defensible_question_3, defensible_question_4, defensible_question_5, defensible_question_6])

    reduced_fuel_category = QuestionCategory(category='Reduced Fuel Zone (within 30 - 100 feet of all structures or to property line)', questions=[reduced_fuel_question_1, reduced_fuel_question_2, reduced_fuel_question_3, reduced_fuel_question_4, reduced_fuel_question_5, reduced_fuel_question_6])

    defensible_reduced_category = QuestionCategory(category='Defensible and Reduced Fuel Zone (within 100 feet of all structures or to property line)', questions=[defensible_reduced_question_1, defensible_reduced_question_2, defensible_reduced_question_3])

    other_requirements_category = QuestionCategory(category='Other Requirements', questions=[other_reqs_question_1, other_reqs_question_2, other_reqs_question_3, other_reqs_question_4, other_reqs_question_5, other_reqs_question_6])


    # brush inspection type
    brush = InspectionType(type='Brush', question_categories=[defensible_space_category, reduced_fuel_category, defensible_reduced_category, other_requirements_category])

    db.session.add(commercial)
    db.session.add(residential)
    db.session.add(brush)
    db.session.commit()

def undo_inspection_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.inspection_types RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.question_categories RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM inspection_types")
        db.session.execute("DELETE FROM question_categories")
        db.session.execute("DELETE FROM questions")

    db.session.commit()
