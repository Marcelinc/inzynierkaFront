import React, {useState, useEffect} from "react";
import { useHistory, useParams } from 'react-router';
import PlotsDelete from "./PlotsDelete";
import PlotsEdit from "./PlotsEdit";

const PlotsInfo = (props) => {

    const [triggerDelete,setTriggerDelete] = useState(false);
    const [editMode,setMode] = useState(false);
    const [loading,setLoading] = useState(true);

    const history = useHistory();

    const {id} = useParams();
    const [plot_id,setId] = useState(null);
    const [plot,setPlot] = useState({});
    const [farm_id,setFarmId] = useState(props.farmId);

    useEffect(() => {
        let idState;
        if(window.history.state)
            idState = window.history.state.id;
        else idState = id;
        setId(idState);
        //send request
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/field/${idState}`,{
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res);
            if(res.message === 'Success') {
                setPlot(res.data);
                setLoading(false);
            }else document.querySelector('#getInfoStatus').innerHTML='Błąd podczas pobierania danych!';
        }).catch(err => {console.log(err); document.querySelector('#getInfoStatus').innerHTML='Błąd podczas pobierania danych!'})
    }, [])

    const onReturnHandler = () => {
        props.setContent('plots');
        window.history.pushState(null,'MyFarm','/gospodarstwo/dzialki');
    }

    const moreInfo = (id) => {
        let info = document.querySelectorAll(`.historyUnit${id}`);
        info.forEach(p => {p.style.display==='none' ? p.style.display='inherit': p.style.display='none'})
    }

    return(<section className='data'>
        <div><p className='backToList' onClick={onReturnHandler}>Powrót do listy</p>
            <div className='vehicleContent'>
                {loading ? <p id='getInfoStatus'>Ładowanie...</p> :<div>
                        <section className='overall-info'>
                            <div className='vehicle-infoname'>
                                <h1>Działka {plot.registration_number}</h1>
                            </div>
                        </section>
                        <section className='plot-info'>
                            <div className='plotOverall'>
                                <p className='plotInfo'>Aktualna uprawa: {plot.actual_plant.name} </p>
                                <p className='plotInfo'>Data siewu: {plot.plant_seed_date.slice(0,10)} </p>
                                <div>
                                    <p className='plotHistoryHeader'>Historia upraw</p>
                                    <div className='plotHistory'>
                                        {plot.history.length ? plot.history.map((h,index) => <p key={index} className='plotHistoryUnit' onClick={() => moreInfo(index)}>{h.plant.name} {h.plant_liquidation_date}
                                            <p className={`historyUnit${index}`}>Data siewu: {h.plant_seed_date}</p>
                                            <p className={`historyUnit${index}`}>Data zbioru: {h.plant_liquidation_date}</p>
                                        </p>) : <p className='emptyPlotHistory'>Brak wpisów</p>}
                                    </div>
                                </div>
                                <div>
                                    <p className='plotHistoryHeader'>Historia zabiegów</p>
                                    <div className='plotHistory'>
                                        <p className='plotHistoryUnit'>Orka 17.03.2020</p>
                                        <p className='plotHistoryUnit'>Oprysk 30.09.2020</p>
                                    </div>
                                </div>
                            </div>
                            <div className='plotLocalization'>
                                <p>Lokalizacja: {plot.localization}</p>
                                <div className='plotsMap'>
                                </div>
                            </div>
                        </section>
                        <section className='vehicle-actions'>
                            <button className='MachEdit' onClick={() => setMode(true)}>Edytuj</button>
                            <button className='MachDelete' onClick={() => setTriggerDelete(true)}>Usuń</button>
                        </section>
                    </div>}
                </div>
            <PlotsDelete trigger={triggerDelete} setTrigger={setTriggerDelete} setDataType={props.setType} />
            {editMode && <PlotsEdit setMode={setMode}/>}
        </div>
    </section>)
}

export default PlotsInfo;