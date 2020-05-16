def exclude_columns():
    return [
        'staffs.password',
        'staffs.created_at',
        'staffs.updated_at',
        'staffs.last_updated_by',
        'staffs.last_login_at',
        'staffs.current_login_at',
        'staffs.last_login_ip',
        'staffs.current_login_ip',
        'staffs.login_count',
        'students.phone_number',
        'students.description',
        'students.city',
        'students.country',
        'students.is_in_team',
        'students.project',
        'students.comments',
    ]
