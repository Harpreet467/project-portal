def exclude_columns():
    return [
        'sent_by.password',
        'sent_by.created_at',
        'sent_by.updated_at',
        'sent_by.last_updated_by',
        'sent_by.last_login_at',
        'sent_by.current_login_at',
        'sent_by.last_login_ip',
        'sent_by.current_login_ip',
        'sent_by.login_count',
        'student.phone_number',
        'student.description',
        'student.city',
        'student.country',
        'student.is_in_team',
        'student.project',
        'student.comments',
    ]
