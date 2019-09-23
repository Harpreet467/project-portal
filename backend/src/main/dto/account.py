from flask import jsonify


def logout():
    return jsonify({
        'message': 'logged out'
    })
