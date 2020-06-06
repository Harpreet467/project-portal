from flask import jsonify

from src.main.model import db
from src.main.model.role import Role
from src.main.model.staff import Staff


def get_staff_count_for_roles():
    result_json = []
    results = db.session\
        .query(Role.name, db.func.count(Staff.id))\
        .join(Staff.roles)\
        .group_by(Role.name)\
        .all()
    for result in results:
        result_json.append({
            'name': result[0],
            'y': result[1]
        })
    return jsonify(result_json)
