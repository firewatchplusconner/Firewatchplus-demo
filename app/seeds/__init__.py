from flask.cli import AppGroup
from .users import seed_users, undo_users
from .inspectionTypes import seed_inspection_types, undo_inspection_types
from .addresses import seed_addresses, undo_addresses
from .inspections import seed_inspections, undo_inspections

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_inspection_types()
        undo_addresses()
        undo_inspections()
    seed_users()
    seed_inspection_types()
    seed_addresses()
    seed_inspections()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_inspection_types()
    undo_addresses()
    undo_inspections()
    # Add other undo functions here
