import React, { useState } from 'react';
import WorkerInfo from './WorkerInfo';

const Workers = () => {

    const [dataType,setType] = useState('list');

    const onAddClick = () => {
        console.log('add clicked');
    }

    const filterHandler = () => {
        console.log('filtr');
    }

    return(<section className='data'>
        {dataType === 'list' && <div className='equipment-content'>
            <h3>Pracownicy</h3>
            <div id='farmResMenu'>
                <div id='options'>
                    <p>Wyszukaj</p>
                    <input type='text' className='searchButton' onChange={filterHandler}/>
                </div>
                <button id='addCrops' onClick={onAddClick}>Pobierz kod gospodarstwa</button>
            </div>
            <div id='legend'>
                <span>Imię i Nazwisko</span>
                <span>Stanowisko</span>
            </div>
            <div id='workers'>
                <div className='unit' onClick={() => setType('worker')}>
                    <span>Jan Kowalski</span>
                    <span>Pracownik biurowy</span>
                </div>
                <div className='unit'>
                    <span>Piotr Nowak</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
                <div className='unit'>
                    <span>Karol Piotrowski</span>
                    <span>Pracownik rolny</span>
                </div>
            </div>
        </div>}
        {dataType === 'worker' && <WorkerInfo setType={setType}/>}
    </section>)
}

export default Workers;