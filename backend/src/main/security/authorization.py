from flask_praetorian import roles_required


@roles_required('admin')
def role_admin(**kwargs):
    pass


@roles_required('first-level')
def role_first_level(**kwargs):
    pass


@roles_required('second-level')
def role_second_level(**kwargs):
    pass


@roles_required('third-level')
def role_third_level(**kwargs):
    pass
