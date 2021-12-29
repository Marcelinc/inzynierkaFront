import React, { useEffect, useState } from 'react';



export const AddFarmOrder = (props) => {

    const [farmVehicles, setFarmVehicles] = useState([]);
    const [farmMachines, setFarmMachines] = useState([]);
    const [farmPlots, setFarmPlots] = useState([]);
    const [farmChem,setFarmChem] = useState([]);
    const [workTypes,setWorkTypes] = useState([]);
    const [loadingGarage,setLoadingGarage] = useState(true);
    const [loadingPlots,setLoadingPlots] = useState(true);
    const [loadingChem,setLoadingChem] = useState(true);
    const [loadingWorkTypes,setLoadingWorkTypes] = useState(true);
    const [loadingVehicles,setLoadingVehicles] = useState(true);
    const [error,setError] = useState(false);
    const [farm_id,setFarm] = useState(props.farmId);

    const [work_type_id,setType] = useState('2');
    const [description,setDescription] = useState('');
    const [field_id,setField] = useState(1);
    const [reserved_from,setReservedFrom] = useState('');
    const [reserved_to,setReservedTo] = useState('');
    const [vehicle_id,setVehicles] = useState([]);
    const [machine_id,setMachines] = useState([]);

    const [farm_plant_protection_product_id,setProduct] = useState(1);
    const [product_quantity,setQuantity] = useState(0);
    const [water_amount,setWater] = useState(0);

    const [vehicleAddButton,setVStyle] = useState({'display':'inherit'});
    const [machineAddButton,setMStyle] = useState({'display':'inherit'});

    const [emptyReservedFrom,setEmptyReservedFrom] = useState(false);
    const [badReservedFrom,setBadReservedFrom] = useState(false);
    const [emptyReservedTo,setEmptyReservedTo] = useState(false);
    const [badReservedTo,setBadReservedTo] = useState(false);

    const [addingOrder,setAddingOrder] = useState(false);
    const [addingError,setAddingError] = useState(false);


    
//Get farm equipment to create order
    useEffect(() => {
        if(props.trigger){
             //Get vehicles and machines
            fetch(process.env.REACT_APP_SERVER+'/api/garage',{
                method:"POST",
                headers: {'Content-Type':'application/json',
                    'Accept': 'application/json'},
                credentials: 'include'
            })
            .then(response => response.json())
            .then(res => {
                if(res.message && res.message==='Success'){
                    setFarmMachines(res.data.machines);
                    setFarmVehicles(res.data.vehicles);
                    if(res.data.vehicles.length > 0)
                        setVehicles([res.data.vehicles[0].id])
                    if(res.data.machines.length > 0)
                        setMachines([res.data.machines[0].id])
                    console.log(res.data)
                } else setError(true);
                setLoadingGarage(false);
            }).catch(err => console.log(err))

            //get plots
            fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/get-fields`,{
                headers: {'Content-Type':'application/json',
                    'Accept': 'application/json'},
                credentials: 'include'
            })
            .then(response => response.json())
            .then(res => {
                if(res.message === 'Success'){
                    setFarmPlots(res.data);
                    console.log(res.data)
                } else setError(true);
                setLoadingPlots(false);
            }).catch(err => console.log(err));

            //Get chemicals
            fetch(process.env.REACT_APP_SERVER+'/api/farm-ppp/get-all',{
                method:"POST",
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({farm_id}),
                credentials: 'include'
            })
            .then(response => response.json())
            .then(res => {
                if(res.message === 'Success'){
                    setFarmChem(res.data);
                    console.log(res.data);
                } else setError(true);
                setLoadingChem(false);
            }).catch(err => console.log(err));

            //Get work types
            fetch(process.env.REACT_APP_SERVER+'/api/lookup-table/work-type/getAll',{
                headers: {'Content-Type':'application/json','Accept':'application/json'},
                credentials: 'include'
            })
            .then(response => response.json())
            .then(res => {
                if(res.message === 'Success'){
                    setWorkTypes(res.data);
                    console.log(res.data);
                } else setError(true);
                setLoadingWorkTypes(false);
            }).catch(err => console.log(err));
        }
    },[props.trigger])

//Get vehicles and machines after insert order date's
   /* useEffect(() => {
        if(reserved_to !== '' && reserved_from !== ''){
            //Get available vehicles
            fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/get-available-vehicles`,{
                method:"POST",
                headers: {'Content-Type':'application/json',
                    'Accept': 'application/json'},
                    body: JSON.stringify({'reserved_from':'10.10.2022 10:00:00','reserved_to':'20.10.2022 10:00:00'}),
                credentials: 'include'
            })
            .then(response => response.json())
            .then(res => {
                if(res.message && res.message==='Success'){
                    console.log('Dostepne pojazdy:')
                    console.log(res.data)
                } else setError(true);
                setLoadingVehicles(false);
            }).catch(err => console.log(err))
        }
    },[reserved_from,reserved_to])*/

//Prepare and send request to add order
    const addHandler = (e) => {
        e.preventDefault();
        setAddingError(false);
        if(validation()){
            setAddingOrder(true);
            let dose = null;
            let body;
            if(work_type_id !== '2' && work_type_id !== '10' && work_type_id !== '8' && work_type_id !== '6')
                dose = {'farm_plant_protection_product_id':farm_plant_protection_product_id,'product_quantity':product_quantity,
                'water_amount':water_amount}
            if(work_type_id === '6')
                dose = {'water_amount':water_amount}
            if(dose !== null)
                body = {description,machine_id,vehicle_id,reserved_from,reserved_to,work_type_id,field_id,dose}
            else body = {description,machine_id,vehicle_id,reserved_from,reserved_to,work_type_id,field_id}
            fetch(process.env.REACT_APP_SERVER+`/api/farm/${farm_id}/order/create`,{
                method:'POST',
                headers: {'Content-Type':'application/json','Accept':'application/json'},
                body:JSON.stringify(body),
                credentials: 'include'
            })
            .then(response => response.json())
            .then(res => {
                if(res.message === 'Success'){
                    console.log(res.data);
                    props.setOrders([...props.orders,res.data]);
                    props.pendingFilter && props.setDisplayed([res.data,...props.displayed])
                    backHandler();
                } else setAddingError(true);
                setAddingOrder(false);
            }).catch(err => console.log(err));
        }
        
    }

    /*const addVehicle = () => {
        let vehicles = vehicle_id;
        if(vehicles.length < 3){
            vehicles = vehicle_id.concat(1);
            setVehicles(vehicles);
        } 
        if(vehicles.length === 3) setVStyle({'display':'none'})
    }

//Set chosen vehicle
    const setVehicle = (id,index) => {
        let modifiedVehicles = vehicle_id;
        modifiedVehicles[index] = id;
        setVehicles(modifiedVehicles);
    }

   /* const addMachine = () => {
        let machines = machine_id;
        if(machines.length < 3){
            machines = machine_id.concat(1);
            setMachines(machines);
        }
        if(machines.length === 3) setMStyle({'display':'none'})
    }*/

//set chosen
    const setMachine = (id,index) => {
        let modifiedMachines = machine_id;
        modifiedMachines[index] = id;
        setMachines(modifiedMachines);
    }

//Clear inputs and variables after close pop-up
    const clearData = () => {
        setType('2');
        setMachines([1]);
        setVehicles([1]);
        setVStyle({'display':'inherit'});
        setMStyle({'display':'inherit'});
        setError(false);
        setLoadingGarage(true);
        setLoadingPlots(true);
        setReservedFrom('');
        setReservedTo('');
        setEmptyReservedTo(false);
        setEmptyReservedFrom(false);
        setBadReservedFrom(false);
        setBadReservedTo(false);
        setAddingOrder(false);
        setAddingError(false);
    }

//Return to order's list
    const backHandler = () => {
        clearData();
        props.setTrigger(false);
    }

//Validation
    const validation = () => {
        let validated = true;
        let actDate = new Date();
        let fromDate = new Date(reserved_from);
        let toDate = new Date(reserved_to);

        if(!reserved_from){
            validated = false;
            setEmptyReservedFrom(true);
        } else setEmptyReservedFrom(false);
        if(fromDate.getTime()<actDate.getTime()){
            validated = false;
            setBadReservedFrom(true);
        } else setBadReservedFrom(false);

        if(!reserved_to){
            validated=false;
            setEmptyReservedTo(true);
        } else setEmptyReservedTo(false);
        if(toDate.getTime()<actDate.getTime()){
            validated=false;
            setBadReservedTo(true);
        } else setBadReservedTo(false);

        return validated;
    }

    return (props.trigger ? <div className='popup'>
    <section className='popup-main'>
        <p>Dodawanie zlecenia</p>
        {!loadingGarage && !loadingPlots && !loadingChem && !loadingWorkTypes && !error ? <section className='popupForm'>
            <form onSubmit={addHandler} id='addForm'>
                <label>Rodzaj zabiegu
                    <select onChange={e => setType(e.target.value)}>
                        {workTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                    </select>
                </label>
                <label>Wybierz działkę
                    <select onChange={e => setField(e.target.value)}>
                        {farmPlots.map(plot => <option key={plot.id} value={plot.id}>{plot.registration_number}</option>)}
                    </select>
                </label>
                <div className='ordersEquipment'>
                    <h4>Pojazd</h4>
                    {farmVehicles.length !== 0 ? vehicle_id.map((v,index) => (<label key={index}>Wybierz pojazd
                        <select onChange={e => setVehicles(e.target.value,index)}>
                            {farmVehicles.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                        </select>
                    </label>)) : loadingVehicles ? 'Wybierz datę realizacji zlecenia' : 'Brak dostepnych pojazdów'}
                    {/*farmVehicles.length !== 0 ? <h4 onClick={addVehicle} style={vehicleAddButton} className='addEqButton'>+Dodaj kolejny</h4> : <h5>Brak pojazdów</h5>*/}
                    
                </div>
                <div className='ordersEquipment'>
                    <h4>Sprzęt</h4>
                    {machine_id.map((m,index) => <label key={index}>Wybierz sprzęt
                    <select onChange={e => setMachines(e.target.value,index)}>
                        {farmMachines.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                    </label>)}
                    {/*<h4 onClick={addMachine} style={machineAddButton} className='addEqButton'>+Dodaj kolejny</h4>*/}
                </div>
                <label>Planowana data rozpoczęcia <input type='datetime-local' onChange={e => setReservedFrom(e.target.value)}/>
                    <span className='info' id='startDateInfo'>{emptyReservedFrom ? 'Wybierz datę' : badReservedFrom ? 'Wprowadzono minioną datę' : ''}</span></label>
                <label>Planowana data zakończenia <input type='datetime-local' onChange={e => setReservedTo(e.target.value)}/>
                    <span className='info' id='endDateInfo'>{emptyReservedTo ? 'Wybierz datę' : badReservedTo ? 'Wprowadzono minioną datę' : ''}</span></label>
                {work_type_id !== '2' && work_type_id !== '10' && work_type_id !== '8' ? <div className='extendedOrderInfo'>
                    {work_type_id === '1' ? <label>Wybierz oprysk
                        <select onChange={e => setProduct(e.target.value)}>
                            {farmChem.map(chem => <option key={chem.id} value={chem.id}>{chem.name}</option>)}
                        </select>
                    </label> : 
                    work_type_id === '7' && work_type_id !== '6' ?<label>Wybierz nawóz
                        <select onChange={e => setProduct(e.target.value)}>
                            {farmChem.map(chem => <option key={chem.id} value={chem.id}>{chem.name}</option>)}
                        </select>
                    </label> :
                    (work_type_id === '5' || work_type_id === '4' || work_type_id === '3') && <label>Wybierz plon
                        <select>
                            <option>Pszenica</option>
                            <option>Owies</option>
                        </select>
                    </label>}
                    {work_type_id !== '6' && <label>Dawka [L/kg] <input type='number' value={product_quantity} 
                        onChange={e => setQuantity(e.target.value)}/></label>}
                    <label>Ilość wody [L]<input type='number' value={water_amount} onChange={e => setWater(e.target.value)}/></label>
                </div> : ''}
                <label>Dodatkowe informacje<textarea className='addOrderRemarks' onChange={e => setDescription(e.target.value)}></textarea></label>
            </form>
        </section> : !loadingGarage && !loadingPlots && !loadingChem && error ? <h3>Błąd podczas ładowania zawartości! Spróbuj później</h3> : <h3>Ładowanie...</h3>}
        <section className='popupButtons'>
            <button onClick={backHandler}>Anuluj</button>
            <button form='addForm' onClick={addHandler}>Dodaj</button>
            <h3 className='info' id='addPlotInfo'>{addingOrder ? 'Dodawanie...' : addingError ? 'Błąd podczas dodawania' : ''}</h3>
        </section>
    </section>
</div> : "")
}