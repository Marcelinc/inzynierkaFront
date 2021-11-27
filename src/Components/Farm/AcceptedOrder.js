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
            <span>Zadanie: Oprysk</span>
            <span>Miejsce: Działka nr. 222/54</span>
            <span>Czas rozpoczęcia: 12-12-2012</span>
            <span >Czas zakończenia: 12-12-2012</span>
            <form>
                <label className='orderForm'>Stan paliwa<select>
                    <option value={1}>Wymaga zatankowania</option>    
                </select></label>
                <label className='orderForm'>Status pojazdu<select>
                    <option value={1}>Sprawny</option>    
                </select></label>
                <label className='orderForm'>Status maszyny<select>
                    <option value={1}>Sprawny</option>    
                </select></label>
            </form>
        </div>
        <div id='feedbackInput'>
            <label><p>Informacje zwrotne</p><textarea id='feedback'/></label>
        </div>
        <section className='order-actions'>
            <button className='MachEdit' onClick={() => onCancelClick()}>Przerwij</button>
            <button className='MachDelete' onClick={() => onFinishClick()}>Zakończ</button>
        </section>
    </section>)
}

export default AcceptedOrder;