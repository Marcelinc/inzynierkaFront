import React, {useState, useEffect} from 'react';
import '../../../css/crops.css';
import AddCrops from './AddCrops';
import CropInfo from './CropInfo';

const Crops = (props) => {

    const [trigger,setTrigger] = useState(false);
    const [dataType,setType] = useState('list');
    const [loading,setloading] = useState(true);

    const [crops,setCrops] = useState([]);
    const [farm_id,setId] = useState(props.farmId);

    const [displayedCrops,setDisplay] = useState([]);


    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+'/api/farm-crop/get-all',{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({farm_id}),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            setCrops(res.data);
            setDisplay(res.data);
            console.log(res.data)
            setloading(false);
        })
        .catch(err => console.log(err));
    },[]);

    const filterHandler = (event) => {
        let reg = new RegExp(event.target.value,'i');
        let selectedCrops = crops.filter(c => c.crop.match(reg));
        setDisplay(selectedCrops);
        if(selectedCrops.length === 0){
            document.querySelector('.filterInfo').innerHTML='Brak szukanych plonów';
            document.querySelector('.filterInfo').style.display='inherit';
        }else{
            document.querySelector('.filterInfo').innerHTML='';
            document.querySelector('.filterInfo').style.display='none';
        } 
    }

    const infoHandler = (id) => {
        console.log('info clicked '+id);
        props.setContent('crop');
        window.history.pushState({'id':id},'MyFarm',`/gospodarstwo/plon/${id}`);

    }

    return(<section className='data'>
        {dataType === 'list' && <div className='equipment-content'>
            <h3>Plony</h3>
            <div id='farmResMenu'>
                <div id='options'>
                    <p>Wyszukaj</p>
                    <input type='text' className='searchButton' placeholder='Nazwa plonu...' onChange={filterHandler}/>
                </div>
                <span className='addContent' onClick={() => setTrigger(true)}>+Dodaj nowy plon</span>
            </div>
            <div id='cropsLegend'>
                    <span>Nazwa</span>
                    <span>Ilość</span>
                    <span>Jednostka</span>
            </div>
            <div id='crops'>
            <p className='filterInfo'></p>
                {loading && <p className='getDataStatus'>Ładowanie danych...</p>} 
                {displayedCrops.map(c => (
                    <div key={c.crop} className='unit' onClick={() => infoHandler(c.id)}>
                        <span>{c.crop}</span>
                        <span>{c.quantity}</span>
                        <span>{c.unit}</span>
                </div>))}
            </div>
            <AddCrops trigger={trigger} setTrigger={setTrigger} farmId={props.farmId} crops={crops} setCrops={setCrops} 
                displayed={displayedCrops} setDisplay={setDisplay}/>
        </div>}
        {dataType === 'crop' && <CropInfo setType={setType}/>}
    </section>)
}

export default Crops;