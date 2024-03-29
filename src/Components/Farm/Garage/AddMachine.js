import React, { useState, useEffect } from 'react';

const AddMachine = (props) => {

    const [name,setName] = useState('');
    const [production_date,setDate] = useState('');
    const [working_width,setWorkingWidth] = useState(0);
    const [image_path,setImage] = useState('');
    const [vehicle_type_id,setType] = useState(1);
    const [status_id,setStatus] = useState(1);
    const [farm_id,setFarm] = useState(0);

    useEffect(() => {
        setFarm(props.farmId);
    },[])

    const addHandler = (event) => {
        event.preventDefault();
        document.querySelector('#addMachineInfo').innerHTML='';
        console.log(name)
        console.log(production_date);
        console.log(vehicle_type_id);
        console.log(farm_id);

        if(validation()){
            document.querySelector('#addMachineInfo').innerHTML='Dodawanie...';
            //Create request body
            let body = {name,farm_id,vehicle_type_id,status_id};
            if(production_date) body['production_date']=production_date;
            if(working_width) body['working_width']=working_width;
            if(image_path) body['image_path']=image_path;
            console.log(body);

            //Send request
            fetch(process.env.REACT_APP_SERVER+'/api/machine/create',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(body),
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {
                if(res.message === 'Success'){
                    console.log(res);
                    const updateMachines= [...props.machines,res.data];
                    props.setMachines(updateMachines);
                    props.setTrigger(false);
                    clearFormData();
                } else document.querySelector('#addMachineInfo').innerHTML='Błąd podczas dodawania';
            })
            .catch(err => {console.log(err);document.querySelector('#addMachineInfo').innerHTML='Błąd podczas dodawania';})
        }
    }

    const validation = () => {
        let validate = true;

        //Name validation
        if(!name){
            validate=false;
            document.querySelector('#machineName').innerHTML='Podaj nazwę!';
        } else document.querySelector('#machineName').innerHTML='';

        //Production date validation
        if(production_date){
            let date = new Date();
            let productionDate = new Date(production_date);
            if(productionDate.getTime()>date.getTime()){
                validate=false;
                document.querySelector('#machineYear').innerHTML='Wprowadź minioną datę!'
            } else document.querySelector('#machineYear').innerHTML='';
        }

        //

        return validate;
    }

    const clearFormData = () => {
        setName('');setDate('');setWorkingWidth(0);setImage('');setType(1);
    }

    return(props.trigger ? <div className='popup'>
        <section className='popup-main'>
            <p>Dodawanie sprzętu</p>
            <section className='popupForm'>
                <form onSubmit={addHandler} id='addForm'>
                <label>Nazwa* <input type='text' onChange={e => setName(e.target.value)}/>
                        <span className='info' id='machineName'></span></label>
                    <label>Rok produkcji <input type='date' onChange={e => setDate(e.target.value)}/>
                        <span className='info' id='machineYear'></span></label>
                    <label>Rodzaj sprzętu 
                        <select onChange={e => setType(e.target.value)}>
                            <option value='1'>Ciągnik</option>
                            <option value='2'>Opryskiwacz</option>
                            <option value='3'>Pług</option>
                        </select>
                    </label>
                    <label>Status
                        <select onChange={e => setStatus(e.target.value)}>
                            <option value='1'>Dostępny</option>
                            <option value='2'>Niedostępny</option>
                            <option value='3'>Zepsuty</option>
                        </select>
                        <span className='info' id='machineStatus'></span>
                    </label>
                    <label>Szerokość robocza <input type='number' min='0' onChange={e => setWorkingWidth(e.target.value)}/></label>
                </form>
            </section>
            <section className='popupButtons'>
                <button onClick={() => {props.setTrigger(false); clearFormData();}}>Anuluj</button>
                <button form='addForm'>Potwierdź</button>
                <h3 className='info' id='addMachineInfo'></h3>
            </section>
        </section>
    </div> : "")
}

export default AddMachine;