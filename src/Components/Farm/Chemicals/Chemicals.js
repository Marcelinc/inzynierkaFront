import React, { useState,useEffect } from 'react';
import AddChemicals from './AddChemicals';
import ChemicalsInfo from './ChemicalsInfo';


const Chemicals = (props) => {

    const [trigger,setTrigger] = useState(false);
    const [loading,setloading] = useState(true);

    const [chemicals,setChemicals] = useState([]);
    const [chemical,setChemical] = useState({});

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
            setChemicals(res.data);
            setDisplayed(res.data);
            setloading(false);
            console.log(res.data)
        })
        .catch(err => console.log(err));
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

    return(<section className='data'>
        {dataType === 'list' &&<div className='equipment-list'> 
            <h3>Środki chemiczne</h3>
            <div id='farmResMenu'>
                <div id='options'>
                    <p>Wyszukaj</p>
                    <input type='text' className='searchButton' placeholder='Typ...' onChange={filterHandler}/>
                </div>
                <span id='addCrops' onClick={() => setTrigger(true)}>+Dodaj środek chemiczny</span>
            </div>
            <div id='chemicalsLegend' className='legend'>
                    <span>Nazwa</span>
                    <span>Typ</span>
                    <span>Ilość</span>
                    <span>Jednostka</span>
            </div>
            <div id='chemicals'>
                <p className='filterInfo'></p>
                {loading && <p className='getDataStatus'>Ładowanie danych...</p>} 
                {displayed.map(c => (
                    <div key={c.name} className='unit'>
                        <span>{c.name}</span>
                        <span>{c.number}</span>
                        <span>{c.product_quantity_in_package}</span>
                        <span>{c.unit.name}</span>
                </div>))}
            </div>
            <AddChemicals trigger={trigger} setTrigger={setTrigger} farmId={farm_id} chemicals={chemicals} setChemicals={setChemicals}
                display={displayed} setDisplayed={setDisplayed}/>
        </div>}
        {dataType === 'chemical' && <ChemicalsInfo setType={setType}/>}
    </section>)
}

export default Chemicals;