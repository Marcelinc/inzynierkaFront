import React, { useState,useEffect } from 'react';
import AddChemicals from './AddChemicals';
import ChemicalsInfo from './ChemicalsInfo';


const Chemicals = () => {

    const [trigger,setTrigger] = useState(false);
    const [chemicals,setChemicals] = useState([]);
    const [chemical,setChemical] = useState({});

    const [dataType,setType] = useState('list');

    useEffect(() => {
        //fetch()
    }, [])

    const filterHandler = () => {
        console.log('filtr');
    }

    const onInfoClick = (id) => {
        console.log('info clicked ');
        //console.log(machines)
        //console.log(vehicles)
        setType('chemical');
    }

    return(<section className='data'>
        {dataType === 'list' &&<div className='equipment-list'> 
            <h3>Środki chemiczne</h3>
            <div id='farmResMenu'>
                <div id='options'>
                    <p>Wyszukaj</p>
                    <input type='text' placeholder='Typ...' onChange={filterHandler}/>
                </div>
                <span id='addCrops' onClick={() => setTrigger(true)}>+Dodaj środek chemiczny</span>
            </div>
            <div id='chemicals'>
                <div id='legend'>
                    <span>Nazwa</span>
                    <span>Typ</span>
                    <span>Ilość</span>
                    <span>Jednostka</span>
                </div>
                <div className='unit'>
                    <span>Safran</span>
                    <span>Oprysk</span>
                    <span>50</span>
                    <span>l</span>
                    <button className='MachInfo' onClick={() => onInfoClick(2)}>Więcej</button>
                    <button className='MachDelete' onClick={() => console.log(7)}>Usuń</button>
                </div>
                <div className='unit'>
                    <span>Tytanit</span>
                    <span>Oprysk</span>
                    <span>5</span>
                    <span>l</span>
                    <button className='MachInfo' onClick={() => onInfoClick(2)}>Więcej</button>
                    <button className='MachDelete' onClick={() => console.log(7)}>Usuń</button>
                </div>
                <div className='unit'>
                    <span>YaraLiva Complex</span>
                    <span>Nawóz</span>
                    <span>3000</span>
                    <span>kg</span>
                    <button className='MachInfo' onClick={() => onInfoClick(2)}>Więcej</button>
                    <button className='MachDelete' onClick={() => console.log(7)}>Usuń</button>
                </div>
            </div>
            <AddChemicals trigger={trigger} setTrigger={setTrigger}/>
        </div>}
        {dataType === 'chemical' && <ChemicalsInfo setType={setType}/>}
    </section>)
}

export default Chemicals;