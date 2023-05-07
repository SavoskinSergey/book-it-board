class OrderStatus:
    DRAFT = 'draft'
    APROVE = 'aprove'
    PAID = 'paid'
    CANCELED = 'canceled'

    CHOICES = [
        (
            DRAFT,
            'Заявка на участие принята',
        ),
        (
            APROVE,
            'Участие подтверждено администратором',
        ),
        (
            PAID,
            'Участие оплачено',
        ),
        (
            CANCELED,
            'Заявка отменена',
        ),
    ]
