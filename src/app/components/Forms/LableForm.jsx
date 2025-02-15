import React from 'react'
import { cairo200 } from '../../../../fonts';

function LableForm(props) {
    const { lable } = props;
    return (
        <div>
            <h1 className={` text-[#ffff] pr-4 حغ-2 ${cairo200.className}`}>{lable}</h1>
        </div>
    )
}

export default LableForm