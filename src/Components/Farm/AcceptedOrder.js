import React from 'react';

const AcceptedOrder = () => {

    const onCancelClick = () => {
        console.log('przerwano')
    }

    const onFinishClick = () => {
        console.log('zakończono');
    }

    return(<section className='order-info '>
        <div className='orderDTO'>
            <span>Zadanie Oprysk</span>
            <span>Miejsce Działka nr. 222/54</span>
            <label>Czas rozpoczęcia:<input type='datetime-local'/></label>
            <label>Czas zakończenia<input type='datetime-local'/></label>
            <label>Stan paliwa<select>
                <option value={1}>Wymaga zatankowania</option>    
            </select></label>
            <label>Status pojazdu<select>
                <option value={1}>Sprawny</option>    
            </select></label>
            <label>Status maszyny<select>
                <option value={1}>Sprawny</option>    
            </select></label>
        </div>
        <div>
            <label>Informacje zwrotne<textarea id='feedback'/></label>
        </div>
        <section className='vehicle-actions'>
            <button className='MachEdit' onClick={() => onCancelClick()}>Przerwij</button>
            <button className='MachDelete' onClick={() => onFinishClick()}>Zakończ</button>
        </section>
    </section>)
}

export default AcceptedOrder;