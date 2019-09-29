from flask_praetorian import roles_required, roles_accepted


@roles_required('admin')
def role_admin(**kwargs):
    pass


@roles_accepted('first-level', 'admin', 'second-level', 'third-level')
def role_first_level(**kwargs):
    pass


@roles_accepted('second-level', 'admin', 'third-level')
def role_second_level(**kwargs):
    pass


@roles_accepted('third-level', 'admin')
def role_third_level(**kwargs):
    pass
