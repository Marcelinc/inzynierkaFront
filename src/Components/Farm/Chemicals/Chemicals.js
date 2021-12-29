import React, { useState,useEffect, useContext } from 'react';
import { JobTitleContext } from '../../User';
import AddChemicals from './AddChemicals';


const Chemicals = (props) => {

    const job_title = useContext(JobTitleContext)

    const [trigger,setTrigger] = useState(false);
    const [loading,setloading] = useState(true);
    const [error,setError] = useState(false);

    const [chemicals,setChemicals] = useState([]);

    const [farm_id,setId] = useState(props.farmId);

    const [dataType,setType] = useState('list');
    const [displayed,setDisplayed] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+'/api/farm-ppp/get-all',{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({farm_id}),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            if(res.message==='Success'){
                setChemicals(res.data);
                setDisplayed(res.data);
                console.log(res.data)
                setloading(false);
            }else setError(true);
        })
        .catch(err => {console.log(err); document.querySelector('.getDataStatus').innerHTML=''});

        return(() => {
            setChemicals([])
            setDisplayed([])
            setloading(true)
            setError(false)
        })
    }, [])

    const filterHandler = (event) => {
        let reg = new RegExp(event.target.value,'i');
        let selectedChemicals = chemicals.filter(c => c.name.match(reg));
        setDisplayed(selectedChemicals);
        if(selectedChemicals.length === 0){
            document.querySelector('.filterInfo').innerHTML='Brak szukanych środków chemicznych';
            document.querySelector('.filterInfo').style.display='inherit';
        }else{
            document.querySelector('.filterInfo').innerHTML='';
            document.querySelector('.filterInfo').style.display='none';
        } 
    }

    const infoHandler = (id) => {
        console.log('info clicked '+id);
        props.setContent('chemical');
        window.history.pushState({'id':id},'MyFarm',`/gospodarstwo/srodekChemiczny/${id}`);

    }

    return(<section className='data'>
        {dataType === 'list' &&<div className='equipment-content'> 
            <h3>Środki chemiczne</h3>
            <div id='farmResMenu'>
                <div id='options'>
                    <p>Wyszukaj</p>
                    <input type='text' className='searchButton' placeholder='Typ...' onChange={filterHandler}/>
                </div>
                {(job_title === 'Pracownik biurowy' || job_title === 'Właściciel') && <span className='addContent' onClick={() => setTrigger(true)}>+Dodaj środek chemiczny</span>}
            </div>
            <div id='chemicalsLegend' className='legend'>
                    <span>Nazwa</span>
                    <span>Typ</span>
                    <span>Ilość</span>
                    <span>Jednostka</span>
            </div>
            <div id='chemicals'>
                <p className='filterInfo'></p>
                {loading && !error && <p className='getDataStatus'>Ładowanie danych...</p>}
                {loading && error && <p className='getDataStatus'>Błąd podczas pobierania danych</p>} 
                {!loading && displayed.map(c => (
                    <div key={c.name} className='unit' onClick={() => infoHandler(c.id)}>
                        <span>{c.name}</span>
                        <span>{c.type.name}</span>
                        <span>{c.product_quantity_in_package}</span>
                        <span>{c.unit.name}</span>
                </div>))}
            </div>
            <AddChemicals trigger={trigger} setTrigger={setTrigger} farmId={farm_id} chemicals={chemicals} setChemicals={setChemicals}
                display={displayed} setDisplayed={setDisplayed}/>
        </div>}
    </section>)
}

export default Chemicals;