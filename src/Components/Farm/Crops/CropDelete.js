import React, { useState } from 'react';

const CropDelete = (props) => {

    const deleteHandler = () => {
        //fetch
        props.setTrigger(false)
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-delete'>
            <p>Czy usunąć wybrany plon?</p>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button onClick={deleteHandler}>Potwierdź</button>
            </section>
        </section>
    </div> : "")
}

export default CropDelete;