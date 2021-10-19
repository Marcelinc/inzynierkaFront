import React, {useState} from 'react';

const ChemicalsInfo = (props) => {
    const [triggerDeleteM,setTriggerDeleteM] = useState(false);
    const [editMode,setMode] = useState(false);

    return(<div>
        <p className='backToList' onClick={() => props.setType('list')}>Powrót do listy</p>
        <div className='vehicleContent'>
        <section className='overall-info'>
            <div className='vehicle-infoname'>
                <h1>środek chemiczny</h1>
            </div>
        </section>
        <section className='vehicle-info'>
                <p><span>Rok produkcji</span> </p>
                <p><span>Rodzaj pojazdu</span> </p>
                <p><span>Szerokość </span> </p>
                <section className='vehicle-actions'>
                    <button className='MachEdit' >Edytuj</button>
                    <button className='MachDelete'>Usuń</button>
                </section>
        </section>
        </div>
    </div>)
}

export default ChemicalsInfo;