import React from "react";

const PlotsDelete = (props) => {

    const deleteHandler = () => {
        //fetch
        props.setTrigger(false)
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-delete'>
            <p>Czy usunąć wybraną działkę?</p>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>Anuluj</button>
                <button onClick={deleteHandler}>Potwierdź</button>
            </section>
        </section>
    </div> : "")
}

export default PlotsDelete;