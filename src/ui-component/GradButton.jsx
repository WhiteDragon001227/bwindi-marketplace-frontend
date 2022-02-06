import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const GradButton = (props) => {
    const [style, setStyle] = useState('');
    useEffect(() => {
        if (!props.disabled) setStyle('text-white px-4');
    }, [props])
    return (
        <Button className={`btn btn-grad btn_create flex items-center p-2 ${(props.className || ' ') + ' ' + style}`} disabled={props.disabled} onClick={props.onClick}>
            {props.disabled && (<><span className="spinner-border spinner-border-sm"></span>&nbsp;</>)}
            {props.children}
        </Button>
    )
}

export default GradButton;