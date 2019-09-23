def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Set whatever other headers you like...
    return response
