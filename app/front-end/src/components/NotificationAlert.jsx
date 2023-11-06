import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Alert } from 'react-bootstrap'

const NotificationAlert = forwardRef((_, ref) => {

    const defaultValue = {
        hasShow: false,
        content: <div> </div>,
        variant: 'success'
    }
    const [show, setShow] = useState(defaultValue)

    useImperativeHandle(ref, () => ({
        setShow: (value) => {
            setShow(value)
        },
    }))

    return (
        <Alert show={show.hasShow} variant={show.variant ==
            'success'
            ? 'success'
            : 'danger'}
            onClose={() => setShow(defaultValue)} dismissible>
            {show.content}
        </Alert>
    )
})

NotificationAlert.displayName = 'NotificationAlert'
export default NotificationAlert