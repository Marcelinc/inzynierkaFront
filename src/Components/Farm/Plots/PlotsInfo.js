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
        fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/worker/${idState}`,{
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
                                <p>Aktualna uprawa: Burak cukrowy </p>
                                <div>
                                    <p>Historia upraw</p>
                                    <div className='plotHistory'>
                                        <p>Pszenica 07.21.2020</p>
                                        <p>Owies 04.25.2020</p>
                                        <p>Owies 04.25.2020</p>
                                        <p>Burak cukrowy 04.25.2020</p>
                                        <p>Owies 04.25.2020</p>
                                        <p>Ziemniaki 04.25.2020</p>
                                        <p>Owies 04.25.2020</p>
                                        <p>Maliny 04.25.2020</p>
                                        <p>Owies 04.25.2020</p>
                                    </div>
                                </div>
                                <div>
                                    <p>Historia zabiegów</p>
                                    <div className='plotHistory'>
                                        <p>Orka 17.03.2020</p>
                                        <p>Oprysk 30.09.2020</p>
                                    </div>
                                </div>
                            </div>
                            <div className='plotLocalization'>
                                <p>Lokalizacja: Polanówka, obok lasu</p>
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