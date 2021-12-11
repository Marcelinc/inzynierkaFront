import React, {useState, useEffect} from 'react';
import AddPlot from './AddPlot';
import PlotsInfo from './PlotsInfo';

const Plots = (props) => {

    const [trigger,setTrigger] = useState(false);
    const [dataType,setType] = useState('list');
    const [error,setError] = useState(false);

    const [loading,setloading] = useState(true);

    const [plots,setPlots] = useState([]);
    const [farm_id,setId] = useState(props.farmId);

    const [displayedPlots,setDisplay] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/get-fields`,{
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            if(res.message === 'Success'){
                setPlots(res.data);
                setDisplay(res.data);
                console.log(res.data)
            } else setError(true);
            setloading(false);
        })
        .catch(err => console.log(err));

        return(() => {
            setPlots([])
            setDisplay([])
            setError(false)
            setloading(true)
        })
    }, [])

    const filterHandler = (event) => {
        let reg = new RegExp(event.target.value,'i');
        let selectedPlots = plots.filter(p => p.localization.match(reg));
        setDisplay(selectedPlots);
        if(selectedPlots.length === 0){
            document.querySelector('.filterInfo').innerHTML='Brak szukanych plonów';
            document.querySelector('.filterInfo').style.display='inherit';
        }else{
            document.querySelector('.filterInfo').innerHTML='';
            document.querySelector('.filterInfo').style.display='none';
        } 
    }

    const infoHandler = (id) => {
        console.log('info clicked '+id);
        props.setContent('plot');
        window.history.pushState({'id':id},'MyFarm',`/gospodarstwo/dzialka/${id}`);

    }

    return(<section className='data'>
        {dataType === 'list' && <div className='equipment-content'>
            <h3>Działki</h3>
            <div id='farmResMenu'>
                <div id='options'>
                    <p>Wyszukaj</p>
                    <input type='text' className='searchButton' placeholder='Lokalizacja...' onChange={filterHandler}/>
                </div>
                <span id='addCrops' className='addContent' onClick={() => setTrigger(true)}>+Dodaj działkę</span>
            </div>
            <div className='legend' id='plotsLegend'>
                    <span>Numer</span>
                    <span>Lokalizacja</span>
                    <span>Uprawa</span>
            </div>
            <div id='plots'>
                <p className='filterInfo'></p>
                {loading && !error && <p className='getDataStatus'>Ładowanie danych...</p>}
                {!loading && error && <p className='getDataStatus'>Błąd podczas pobierania</p>} 
                {displayedPlots.map(plot => (
                    <div key={plot.id} className='unit' onClick={() => infoHandler(plot.id)}>
                        <span>{plot.registration_number}</span>
                        <span>{plot.localization}</span>
                        <span>{plot.actual_plant.name}</span>
                </div>))}
            </div>
            <AddPlot trigger={trigger} setTrigger={setTrigger} farmId={farm_id} plots={plots} setPlots={setPlots} 
                display={displayedPlots} setDisplayed={setDisplay}/>
        </div>}
    </section>)
}

export default Plots;