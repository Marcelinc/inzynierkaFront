import React from 'react';
import { useHistory } from 'react-router';

const OwnOrderInfo = (props) => {
    
    const history = useHistory();

    const onReturnHandler = () => {
        props.setType('list');
        history.push('/user/zlecenia');
    }

    const onCancelClick = () => {
        console.log('przerwano')
    }

    const onFinishClick = () => {
        console.log('zakończono');
    }

    return(<div>
        <p className='backToList' onClick={onReturnHandler}>Powrót do listy</p>
        <div className='vehicleContent'>
        <section className='overall-info'>
            <div className='vehicle-infoname'>
                <h1>Numer zlecenia: 86</h1>
            </div>
        </section>
             <section className='vehicle-info'>
                 <div>
                    <p><span>Zadanie</span> Oprysk</p>
                    <p><span>Miejsce</span> Działka nr. 222/54</p>
                    <p><span>Czas rozpoczęcia</span> 2020-05-21</p>
                    <p><span>Czas zakończenia</span> 2020-05-21</p>
                    <p><span>Stan paliwa</span> Wymaga zatankowania</p>
                    <p><span>Status pojazdu</span> Sprawny</p>
                    <p><span>Status maszyny</span> Sprawny</p>
                 </div>
                 <div>
                     <label>Informacje zwrotne<textarea/></label>
                 </div>
                <section className='vehicle-actions'>
                    <button className='MachEdit' onClick={() => onCancelClick()}>Przerwij</button>
                    <button className='MachDelete' onClick={() => onFinishClick()}>Zakończ</button>
                </section>
            </section>
        </div>
    </div>)
}

export default OwnOrderInfo;