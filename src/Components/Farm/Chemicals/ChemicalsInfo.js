import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import ChemicalDelete from './ChemicalDelete';

const ChemicalsInfo = (props) => {
    const [triggerDelete,setTriggerDelete] = useState(false);
    const [loading,setLoading] = useState(true);

    const history = useHistory();

    const {id} = useParams();
    const [chemical_id,setId] = useState(null);
    const [chemical,setChemical] = useState({});

    useEffect(() => {
        let idState;
        if(window.history.state)
            idState = window.history.state.id;
        else idState = id;
        setId(idState);
        //send request
        fetch(process.env.REACT_APP_SERVER+`/api/farm-ppp/${idState}`,{
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res);
            if(res.message === 'Success') {
                setChemical(res.data);
                setLoading(false);
            }else document.querySelector('#getInfoStatus').innerHTML='Błąd podczas pobierania danych!';
        }).catch(err => console.log(err))
    }, [])

    const onReturnHandler = () => {
        props.setContent('chemicals');
        window.history.pushState(null,'MyFarm','/gospodarstwo/srodkiChemiczne');
    }

    return(<section className='data'>
        <div>
            <p className='backToList' onClick={onReturnHandler}>Powrót do listy</p>
            <div className='vehicleContent'>
                {loading ? <p id='getInfoStatus'>Ładowanie...</p> : <div>
                    <section className='overall-info'>
                        <div className='vehicle-infoname'>
                            <h1>{chemical.name}</h1>
                        </div>
                    </section>
                    <section className='vehicle-info'>
                            <p><span>Rodzaj:</span> </p>
                            <p><span>Termin ważności</span>{chemical.expiration_date} </p>
                            <p><span>Ilość w opakowaniu: </span>{chemical.product_quantity_in_package} </p>
                            <p><span>Jednostka: </span>{chemical.unit.name} </p>
                            <p><span>Oznaczenie opakowania: </span>{chemical.number} </p>
                            <section className='vehicle-actions'>
                                <button className='MachDelete' onClick={() => setTriggerDelete(true)}>Usuń</button>
                            </section>
                    </section>
                </div>}
            </div>
        </div>
        <ChemicalDelete setContent={onReturnHandler} id={chemical.id} trigger={triggerDelete} setTrigger={setTriggerDelete}/>
    </section>)
}

export default ChemicalsInfo;