import React, {useState, useEffect, useContext} from 'react';
import { useHistory, useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import ChemicalDelete from './ChemicalDelete';
import {JobTitleContext} from './../../User'; 

const ChemicalsInfo = (props) => {
    const job_title = useContext(JobTitleContext)

    const [triggerDelete,setTriggerDelete] = useState(false);
    const [loading,setLoading] = useState(true);

    const history = useHistory();

    const {id} = useParams();
    const [chemical_id,setId] = useState(null);
    const [chemical,setChemical] = useState({});

    useEffect(() => {
        if(job_title === 'Pracownik biurowy' || job_title === 'Właściciel' || job_title === 'Pracownik rolny'){
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
                }else if(document.querySelector('#getInfoStatus'))
                    document.querySelector('#getInfoStatus').innerHTML='Błąd podczas pobierania danych!';
            }).catch(err => console.log(err))
        }
        return(() =>{
            setChemical({})
            setLoading(true)
        })
    }, [])

    const onReturnHandler = () => {
        props.setContent('chemicals');
        window.history.pushState(null,'MyFarm','/gospodarstwo/srodkiChemiczne');
    }

    if(job_title !== 'Pracownik biurowy' && job_title !== 'Właściciel' && job_title !== 'Pracownik rolny')
        return <Redirect to='/gospodarstwo' />

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
                            <p><span>Rodzaj:</span>{chemical.type.name} </p>
                            <p><span>Termin ważności</span>{chemical.expiration_date} </p>
                            <p><span>Ilość w opakowaniu: </span>{chemical.product_quantity_in_package} </p>
                            <p><span>Jednostka: </span>{chemical.unit.name} </p>
                            <p><span>Oznaczenie opakowania: </span>{chemical.number} </p>
                            {(job_title === 'Pracownik biurowy' || job_title === 'Właściciel') &&  <section className='vehicle-actions'>
                                <button className='MachDelete' onClick={() => setTriggerDelete(true)}>Usuń</button>
                            </section>}
                    </section>
                </div>}
            </div>
        </div>
        <ChemicalDelete setContent={onReturnHandler} id={chemical.id} trigger={triggerDelete} setTrigger={setTriggerDelete}/>
    </section>)
}

export default ChemicalsInfo;