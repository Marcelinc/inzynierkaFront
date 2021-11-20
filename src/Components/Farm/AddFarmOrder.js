import React, { useEffect, useState } from 'react';



export const AddFarmOrder = (props) => {

    const [farmVehicles, setFarmVehicles] = useState([]);
    const [farmMachines, setFarmMachines] = useState([]);
    const [farmPlots, setFarmPlots] = useState([]);
    const [loadingGarage,setLoadingGarage] = useState(true);
    const [loadingPlots,setLoadingPlots] = useState(true);
    const [error,setError] = useState(false);
    const [farm_id,setFarm] = useState(props.farmId);

    const [type_of_task,setType] = useState(1);
    const [orderVehicles,setVehicles] = useState([1]);
    const [orderMachines,setMachines] = useState([1]);

    const [vehicleAddButton,setVStyle] = useState({'display':'inherit'});
    const [machineAddButton,setMStyle] = useState({'display':'inherit'});

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
        }
    },[props.trigger])

    const addHandler = (e) => {
        e.preventDefault();
        clearData();
    }

    const addVehicle = () => {
        let vehicles = orderVehicles;
        if(vehicles.length < 3){
            vehicles = orderVehicles.concat(1);
            setVehicles(vehicles);
        } 
        if(vehicles.length === 3) setVStyle({'display':'none'})
    }

    const setVehicle = (id,index) => {
        let modifiedVehicles = orderVehicles;
        modifiedVehicles[index] = id;
        setVehicles(modifiedVehicles);
    }

    const addMachine = () => {
        let machines = orderMachines;
        if(machines.length < 3){
            machines = orderMachines.concat(1);
            setMachines(machines);
        }
        if(machines.length === 3) setMStyle({'display':'none'})
    }

    const setMachine = (id,index) => {
        let modifiedMachines = orderMachines;
        modifiedMachines[index] = id;
        setMachines(modifiedMachines);
    }

    const clearData = () => {
        setType(1);
        setMachines([1]);
        setVehicles([1]);
        setVStyle({'display':'inherit'});
        setMStyle({'display':'inherit'});
        setError(false);
        setLoadingGarage(true);
        setLoadingPlots(true);
    }

    const backHandler = () => {
        clearData();
        props.setTrigger(false);
    }

    return (props.trigger ? <div className='popup'>
    <section className='popup-main'>
        <p>Dodawanie zlecenia</p>
        {!loadingGarage && !loadingPlots && !error ? <section className='popupForm'>
            <form onSubmit={addHandler} id='addForm'>
                <label>Rodzaj zabiegu
                    <select onChange={e => setType(e.target.value)}>
                        <option value={1}>Pryskanie</option>
                        <option value={2}>Nawożenie</option>
                        <option value={3}>Inne</option>
                    </select>
                </label>
                <label>Wybierz działkę
                    <select >
                        {farmPlots.map(plot => <option key={plot.id} value={plot.id}>{plot.registration_number}</option>)}
                    </select>
                </label>
                <div className='ordersEquipment'>
                    <h4>Pojazdy</h4>
                    {orderVehicles.map((v,index) => (<label key={index}>Wybierz pojazd
                        <select onChange={e => setVehicle(e.target.value,index)}>
                            {farmVehicles.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                        </select>
                    </label>))}
                    <h4 onClick={addVehicle} style={vehicleAddButton} className='addEqButton'>+Dodaj kolejny</h4>
                </div>
                <div className='ordersEquipment'>
                    <h4>Sprzęt</h4>
                    {orderMachines.map((m,index) => <label key={index}>Wybierz sprzęt
                    <select onChange={e => setMachine(e.target.value,index)}>
                        {farmMachines.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                    </label>)}
                    <h4 onClick={addMachine} style={machineAddButton} className='addEqButton'>+Dodaj kolejny</h4>
                </div>
                <label>Planowana data rozpoczęcia <input type='datetime-local'/>
                    <span className='info' id='startDateInfo'></span></label>
                <label>Planowana data zakończenia <input type='datetime-local'/>
                    <span className='info' id='endDateInfo'></span></label>
                {type_of_task !== '3' ? <div className='extendedOrderInfo'>
                    {type_of_task === '1' ? <label>Wybierz oprysk
                        <select >
                            <option value={1}>Oprysk 1</option>
                            <option value={2}>Oprysk 2</option>
                        </select>
                    </label> : <label>Wybierz nawóz
                        <select >
                            <option value={1}>Nawóz 1</option>
                            <option value={2}>Nawóz 2</option>
                        </select>
                    </label>}
                    <label>Dawka l/kg <input type='number'/></label>
                    <label>Ilość wody <input type='number'/></label>
                    <label>Dodatkowe informacje<textarea></textarea></label>
                </div> : ''}
                
            </form>
        </section> : !loadingGarage && !loadingPlots && error ? <h3>Błąd podczas ładowania zawartości! Spróbuj później</h3> : <h3>Ładowanie...</h3>}
        <section className='popupButtons'>
            <button onClick={backHandler}>Anuluj</button>
            <button form='addForm'>Dodaj</button>
            <h3 className='info' id='addPlotInfo'></h3>
        </section>
    </section>
</div> : "")
}