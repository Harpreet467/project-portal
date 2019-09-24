from flask import jsonify


def get_security_payload(staff):
    return jsonify({
        'id': staff.id,
        'name': staff.name,
        'email': staff.email,
        'roles': list(row.name for row in staff.roles)
    })


def exclude_columns():
    return ['password']
