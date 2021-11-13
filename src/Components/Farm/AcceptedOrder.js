import React from 'react';

const AcceptedOrder = () => {

    const onCancelClick = () => {
        console.log('przerwano')
    }

    const onFinishClick = () => {
        console.log('zakończono');
    }

    return(<section className='vehicle-info'>
        <div>
            <p><span>Zadanie</span> Oprysk</p>
            <p><span>Miejsce</span> Działka nr. 222/54</p>
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
            <label>Informacje zwrotne<textarea/></label>
        </div>
        <section className='vehicle-actions'>
            <button className='MachEdit' onClick={() => onCancelClick()}>Przerwij</button>
            <button className='MachDelete' onClick={() => onFinishClick()}>Zakończ</button>
        </section>
    </section>)
}

export default AcceptedOrder;