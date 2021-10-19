import React, {useState} from 'react';
import '../../../css/crops.css';
import AddCrops from './AddCrops';
import CropInfo from './CropInfo';

const Crops = () => {

    const [trigger,setTrigger] = useState(false);
    const [dataType,setType] = useState('list');

    const filterHandler = () => {
        console.log('filtr');
    }

    return(<section className='data'>
        {dataType === 'list' && <div className='equipment-content'>
            <h3>Plony</h3>
            <div id='farmResMenu'>
                <div id='options'>
                    <p>Wyszukaj</p>
                    <input type='text' onChange={filterHandler}/>
                </div>
                <span id='addCrops' onClick={() => setTrigger(true)}>+Dodaj nowy plon</span>
            </div>
            <div id='crops'>
                <div id='cropsLegend'>
                    <span>Nazwa</span>
                    <span>Ilość</span>
                    <span>Jednostka</span>
                </div>
                <div className='unit' onClick={() => setType('crop')}>
                    <span>Pszenica</span>
                    <span>1400</span>
                    <span>t</span>
                </div>
                <div className='unit' onClick={() => setType('crop')}>
                    <span>Owies</span>
                    <span>1400</span>
                    <span>t</span>
                </div>
                <div className='unit' onClick={() => setType('crop')}>
                    <span>Maliny</span>
                    <span>600</span>
                    <span>kg</span>
                </div>
            </div>
            <AddCrops trigger={trigger} setTrigger={setTrigger}/>
        </div>}
        {dataType === 'crop' && <CropInfo setType={setType}/>}
    </section>)
}

export default Crops;