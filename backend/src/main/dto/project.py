from flask import jsonify


def project_file_upload():
    return jsonify({
        'message': 'Successfully uploaded!!!'
    }), 200
