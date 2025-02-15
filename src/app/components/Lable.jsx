import React from 'react'
import { cairo100 } from '../../../fonts';
function Lable(props) {
    const { lable } = props;
    return (
        <div>
            <h1 className={`text-2xl text-white p-5 ${cairo100.className}`} >{lable}</h1>
        </div>
    )
}

export default Lable