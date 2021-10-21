import React, { useEffect, useState } from 'react';
import AddVehicle from './AddVehicle';
import '../../../css/garage.css';
import AddMachine from './AddMachine';
import VehicleInfo from './VehicleInfo';
import MachineInfo from './MachineInfo';

const Garage = (props) => {

    const [machines,setMachines] = useState([]);
    const [vehicles,setVehicles] = useState([]);

    const [loading,setloading] = useState(true);
    const [dataType,setDataType] = useState('list');

    var machineResources='';
    const [triggerAddV,setTriggerAddV] = useState(false);
    const [triggerAddM,setTriggerAddM] = useState(false);
   

    const [equipmentID,setEquipmentID] = useState(0);
    const [vehicle,setV] = useState({});
    const [machine,setM] = useState({});
    
    const [machineFilter,setMF] = useState(true);
    const [vehicleFilter,setVF] = useState(true);

    useEffect(() => {
        console.log(props.farmId)
        fetch(process.env.REACT_APP_SERVER+'/api/garage',{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            setMachines(res.data.machines);
            setVehicles(res.data.vehicles);
            //renderMachines(res.data.vehicles,'vehicle');
            //renderMachines(res.data.machines,'machine');
            console.log(res.data)
            setloading(false);
        });
    },[]);

    const renderMachines = (machine,type) => {
        machine.map(m => {
            machineResources=` <div class='unit ${type}'>
            <span>${m.name}</span>
            <span>${m.id}</span>
            <button class='MachInfo'>Więcej</button>
            <button class='MachEdit'>Edytuj</button>
            <button class='MachDelete'>Usuń</button>
            </div>`;
            document.querySelector('#machines').insertAdjacentHTML('beforeend',machineResources);
            console.log('Dodano '+m.name)
            
           /* let divUnit = document.createElement('div')//.classList.add(`unit ${type}`);
            let name = document.createElement('span')
            name.appendChild(document.createTextNode(m.name));
            let number = document.createElement('span')
            number.appendChild(document.createTextNode(m.id));
            let info = document.createElement('button');
            let edit = document.createElement('button').appendChild(document.createTextNode('Edytuj')); 
            let deleteB = document.createElement('button').appendChild(document.createTextNode('Usuń')); 
            info.appendChild(document.createTextNode('Więcej'));
            info.setAttribute('class','MachInfo'); 
            info.setAttribute('onclick',onInfoClick)
            divUnit.appendChild(name);
            divUnit.appendChild(number);
            divUnit.appendChild(info);
            divUnit.appendChild(edit)
            divUnit.setAttribute('class',`unit ${type}`)
            document.querySelector('#machines').appendChild(divUnit);
            //console.log(machineResources)*/
            //document.querySelector('#machines').insertAdjacentHTML('beforeend',machineResources);
        })

        
    }

    const onInfoClick = function onInfoHandler(id,type){
        console.log('info clicked '+id);
        setEquipmentID(id);
        if(type === 'v'){
            setV(vehicles.find(v => v.id === id));
            setDataType('vehicle');
        }
        else if(type === 'm'){
            setM(machines.find(m => m.id === id));
            setDataType('machine');
        }
    }

    const onEditClick = function (id){
        console.log('edit clicked '+id);
    }

    /*const onDeleteClick = (id,type) => {
        console.log('delete clicked '+id);
        setEquipmentID(id);
        if(type === 'vehicle')
            setTriggerDeleteV(true);
        else if(type === 'machine')
            setTriggerDeleteM(true);
    }*/

    const filterHandler = (e) => {
        const {name,checked} = e.target;
        console.log(name+': '+checked)
        if(name === 'machineFilter'){
            setMF(checked);
            if(checked)
                document.querySelectorAll('.machine').forEach(unit => unit.style.display='grid');//renderMachines(machines,'machine');
            else document.querySelectorAll('.machine').forEach(unit => unit.style.display='none');
            //document.querySelectorAll('.machine').forEach(unit => unit.remove());
        } 
        else {
            setVF(checked);
            if(checked)
            document.querySelectorAll('.vehicle').forEach(unit => unit.style.display='grid');//renderMachines(vehicles,'vehicle');
            else document.querySelectorAll('.vehicle').forEach(unit => unit.style.display='none');
        }
    }


    return(<section className='data'>
        {dataType === 'list' && 
        <div className='equipment-content'>
            <h3>Pojazdy i sprzęt rolniczy</h3>
            <div id='garageMenu'>
                <div id='options'>
                <label><input type='checkbox' name='vehicleFilter' checked={vehicleFilter} onChange={filterHandler}/> Pojazdy</label>
                <label><input type='checkbox' name='machineFilter' checked={machineFilter} onChange={filterHandler}/> Sprzęt rolniczy</label>
                </div>
                <span id='addMachine' onClick={() => setTriggerAddV(true)}>+Dodaj pojazd</span>
                <span id='addMachine' onClick={() => setTriggerAddM(true)}>+Dodaj sprzęt</span>
            </div>
            <div id='machines'>
                <div id='legend'>
                    <span>Nazwa</span>
                    <span>Numer</span>
                </div>
                {loading ? <p className='getDataStatus'>Ładowanie danych...</p>: machines.map(m => (
                    <div key={m.id} className='unit machine' onClick={() => onInfoClick(m.id,'m')}>
                        <span>{m.name}</span>
                        <span>{m.number}</span>
                </div>))} 
                {vehicles.map(v => (
                    <div key={v.id} className='unit vehicle' onClick={() => onInfoClick(v.id,'v')}>
                        <span>{v.name}</span>
                        <span>{v.number}</span>
                </div>))}
            </div>
            <AddVehicle trigger={triggerAddV} setTrigger={setTriggerAddV} vehicles={vehicles} setVehicles={setVehicles} farmId={props.farmId}/>
            <AddMachine trigger={triggerAddM} setTrigger={setTriggerAddM} machines={machines} setMachines={setMachines} farmId={props.farmId}/>
        </div>}
        {dataType === 'vehicle' && <VehicleInfo id={equipmentID} setDataType={setDataType} vehicle={vehicle} vehicles={vehicles} setVehicles={setVehicles}/>}
        {dataType === 'machine' && <MachineInfo setDataType={setDataType} machine={machine} machines={machines} setMachines={setMachines}/>}
    </section>)
}

export default Garage;