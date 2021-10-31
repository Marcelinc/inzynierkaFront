import React, {useState} from 'react';
import AddPlot from './AddPlot';
import PlotsInfo from './PlotsInfo';

const Plots = () => {

    const [trigger,setTrigger] = useState(false);
    const [dataType,setType] = useState('list');


    const onEditClick = (id) => {
        console.log('edit clicked '+id);
    }

    const onDeleteClick = (id) => {
        console.log('delete clicked '+id);
    }

    const filterHandler = () => {
        console.log('filtr');
    }

    return(<section className='data'>
        {dataType === 'list' && <div className='equipment-content'>
            <h3>Działki</h3>
            <div id='farmResMenu'>
                <div id='options'>
                    <p>Wyszukaj</p>
                    <input type='text' className='searchButton' placeholder='Lokalizacja...' onChange={filterHandler}/>
                </div>
                <span id='addCrops' onClick={() => setTrigger(true)}>+Dodaj działkę</span>
            </div>
            <div id='plots'>
                <div id='legend'>
                    <span>Numer</span>
                    <span>Lokalizacja</span>
                </div>
                <div className='unit' onClick={() => setType('plot')}>
                    <span>222/54</span>
                    <span>Polanówka, obok lasu</span>
                </div>
                <div className='unit' onClick={() => setType('plot')}>
                    <span>312/37</span>
                    <span>Widniówka, za mostem</span>
                </div>
                <div className='unit' onClick={() => setType('plot')}>
                    <span>167/9</span>
                    <span>Wronów, przy szkole</span>
                </div>
            </div>
            <AddPlot trigger={trigger} setTrigger={setTrigger}/>
        </div>}
        {dataType === 'plot' && <PlotsInfo setType={setType}/>}
    </section>)
}

export default Plots;