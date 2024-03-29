import React, { useState, useEffect } from 'react';

const AddChemicals = (props) => {

    const [farm_id,setFarm] = useState(props.farmId);
    const [name,setName] = useState('');
    const [expiration_date,setExpDate] = useState('');
    const [product_quantity_in_package,setQuantity] = useState(0);
    const [usedChem,setUsedChem] = useState(0);//?
    const [designation,setDesignation] = useState(3);//dopisane, oznaczenie
    const [unit_id,setUnit] = useState(1);
    const [ppp_type_id,setType] = useState(1);
    const [chemicals,setChemicals] = useState([]);

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(process.env.REACT_APP_SERVER+'/api/lookup-table/ppp-type/getAll',{
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res); 
            if(res.message === 'Success') {
                console.log(res.data)
                setChemicals(res.data);
            } else setError(true);
            setLoading(false);
        })
        .catch(err => console.log(err))
    },[])

    const addHandler = (e) => {
        e.preventDefault();
        document.querySelector('#addChemicalInfo').innerHTML='';

        if(validation()){
            document.querySelector('#addChemicalInfo').innerHTML='Dodawanie...';
            //Send request
            fetch(process.env.REACT_APP_SERVER+'/api/farm-ppp/create',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({farm_id,name,product_quantity_in_package,unit_id,ppp_type_id,expiration_date}),
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {console.log(res); 
                const updatedChemicals = [...props.chemicals,res.data];
                props.setChemicals(updatedChemicals);
                const updatedDisplay = [...props.display,res.data];
                props.setDisplayed(updatedChemicals);
                props.setTrigger(false); 
                clearFormData();})
            .catch(err => {console.log(err);document.querySelector('#addChemicalInfo').innerHTML='Błąd podczas dodawania';})
        }
    }

    const validation = () => {
        let validate = true;

        //name
        if(!name){
            validate = false;
            document.querySelector('#nameInfo').innerHTML='Wprowadź nazwę!';
        } else document.querySelector('#nameInfo').innerHTML='';

        //product in package   
        if(!product_quantity_in_package){
            validate=false;
            document.querySelector('#quantityInfo').innerHTML='Wprowadź ilość!';
        } else document.querySelector('#quantityInfo').innerHTML='';

        //Exp. date
        if(!expiration_date){
            validate=false;
            document.querySelector('#dateInfo').innerHTML='Wprowadź date!';
        } else {
            let data = new Date();
            let expDate = new Date(expiration_date);
            if(expDate < data){
                validate=false;
                document.querySelector('#dateInfo').innerHTML='Wprowadź przyszłą datę!';
            } else document.querySelector('#dateInfo').innerHTML='';
        }

        return validate;
    }

    const clearFormData = () => {
        setName('');setExpDate('');setQuantity(0);setUsedChem(0);setDesignation(1);setUnit(1);setType(1);
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-main'>
            <p>Dodawanie środka chemicznego</p>
            {loading ? 'Wczytywanie...' : error ? 'Błąd podczas wczytywania. Spróbuj później.' : <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                    <label>Nazwa* <input type='text' onChange={e => setName(e.target.value)}/>
                        <span className='info' id='nameInfo'></span></label>
                    <label>Ilość/opakowanie* <input type='number' min={1} onChange={e => setQuantity(e.target.value)}/>
                        <span className='info' id='quantityInfo'></span></label>
                    <label>Typ*
                        <select onChange={e => setType(e.target.value)}>
                            {chemicals.map(chemical => <option key={chemical.id} value={chemical.id}>{chemical.name}</option>)}
                        </select>
                    </label>
                    <label>Jednostka* 
                        <select onChange={e => setUnit(e.target.value)}>
                            <option value={1}>Litr</option>
                            <option value={2}>Kilogram</option>
                        </select>
                    </label>
                    <label>Termin ważności* <input type='date' onChange={e => setExpDate(e.target.value)}/>
                        <span className='info' id='dateInfo'></span></label>
                    {/*<label>Ilość zużytego środka <input type='number' onChange={e => setUsedChem(e.target.value)}/>
                        <span className='info' id='usedChemInfo'></span></label>
                    <label>Oznaczenie opakowania <input type='text' onChange={e => setDesignation(e.target.value)}/>
<span className='info' id='signInfo'></span></label>*/}
                </form>
            </section>}
            {loading || error ? '' : <section className='popupButtons'>
                <button onClick={() => {props.setTrigger(false); clearFormData();}}>Anuluj</button>
                <button form='addForm'>Potwierdź</button>
                <h3 className='info' id='addChemicalInfo'></h3>
            </section>}
        </section>
    </div> : "")
}

export default AddChemicals;