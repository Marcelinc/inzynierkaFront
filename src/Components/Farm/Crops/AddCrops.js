import React, { useState, useEffect } from 'react';

const AddCrops = (props) => {

    const [crop_id,setCropName] = useState(1);
    const [quantity,setQuantity] = useState(0);
    const [unit_id,setDenomination] = useState(1);

    const [farm_id,setFarmId] = useState(props.farmId)
    const [error,setError] = useState(false);
    const [crops,setCrops] = useState([]);

    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(process.env.REACT_APP_SERVER+'/api/lookup-table/crops',{
            headers: {'Content-Type':'application/json',
                'Accept': 'application/json'},
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res); 
            if(res.message === 'Success') {
                console.log(res.data)
                setCrops(res.data);
            } else setError(true);
            setLoading(false);
        })
        .catch(err => console.log(err))
    },[])

    const addHandler = (e) => {
        e.preventDefault();
        document.querySelector('#addCropInfo').innerHTML='';
        console.log(crop_id)
        console.log(quantity);
        console.log(unit_id);

        if(validation()){
            document.querySelector('#addCropInfo').innerHTML='Dodawanie...';

            fetch(process.env.REACT_APP_SERVER+'/api/farm-crop/create',{
                method: 'POST',
                headers: {'Content-Type':'application/json',
                    'Accept': 'application/json'},
                body: JSON.stringify({crop_id,farm_id,quantity,unit_id}),
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {console.log(res); 
                if(res.message === 'The given data was invalid.') 
                    document.querySelector('#addCropInfo').innerHTML='Plon już istnieje!'
                else if(res.message === 'Success') {
                    const updatedCrops = [...props.crops,res.data];
                    props.setCrops(updatedCrops);
                    const updatedDisplay = [...props.displayed,res.data];
                    props.setDisplay(updatedDisplay);
                    props.setTrigger(false);
                    clearFormData();
                } else document.querySelector('#addCropInfo').innerHTML='Błąd podczas dodawania';
            })
            .catch(err => {console.log(err); document.querySelector('#addCropInfo').innerHTML='Błąd podczas dodawania'})
        }
    }

    const validation = () => {
        let validate = true;

        //quantity
        if(!quantity){
            validate=false;
            document.querySelector('#quantityInfo').innerHTML='Podaj ilość!';
        } else document.querySelector('#quantityInfo').innerHTML='';

        return validate;
    }

    const clearFormData = () => {
        setCropName(1);setQuantity(0);setDenomination(1);
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-main'>
            <p>Dodawanie plonu</p>
            {loading ? 'Wczytywanie...' : error ? 'Błąd podczas wczytywania. Spróbuj później.' : <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                <label>Plon 
                        <select onChange={e => setCropName(e.target.value)}>
                            {crops.length > 0 && crops.map(crop => <option key={crop.id} value={crop.id}>{crop.name}</option>)}
                        </select>
                    </label>
                    <label>Jednostka
                        <select onChange={e => setDenomination(e.target.value)}>
                            <option value='1'>Kilogram</option>
                        </select>
                    </label>
                    <label>Ilość <input type='number' onChange={e => setQuantity(e.target.value)}/>
                        <span className='info' id='quantityInfo'></span></label>
                </form>
            </section>}
            {loading || error ? '' : <section className='popupButtons'>
                <button onClick={() => {props.setTrigger(false); clearFormData();}}>Anuluj</button>
                <button form='addForm'>Potwierdź</button>
                <h3 className='info' id='addCropInfo'></h3>
            </section>}
        </section>
    </div> : "")
}

export default AddCrops;