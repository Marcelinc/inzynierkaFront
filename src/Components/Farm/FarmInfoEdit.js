import React, { useState } from 'react';

const FarmInfoEdit = (props) => {

    const [name,setName] = useState(props.farm.name);
    const [town,setTown] = useState(props.farm.town);
    const [street,setStreet] = useState(props.farm.street);
    const [house_number,setHouse] = useState(props.farm.house_number);
    const [budget,setBudget] = useState(props.farm.budget);

    const [act_name,setActName] = useState(props.farm.name);
    const [act_town,setActTown] = useState(props.farm.town);
    const [act_street,setActStreet] = useState(props.farm.street);
    const [act_house_number,setActHouse] = useState(props.farm.house_number);
    const [act_budget,setActBudget] = useState(props.farm.budget);

    const editHandler = () => {
        //Set body and validate
        let body= {'farm_id':props.farm.id};
        let validated = false;
        if(act_name!=name){
            body['name']=name;
            validated=true;
        }
        if(act_town!=town){
            body['town']=town;
            validated=true;
        } 
        if(act_street!=street){
            body['street']=street;
            validated=true;
        }
        if(act_house_number!=house_number){
            body['house_number']=house_number;
            validated=true;
        }
        if(act_budget!=budget){
            body['budget']=budget;
            validated=true;
        }

        if(validated){
            document.querySelector('#editFarmInfo').innerHTML='Zapisywanie zmian...';
            /*fetch(process.env.REACT_APP_SERVER+'/api/field/update',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(body),
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {console.log(res.message);if(res.message === 'Success') {
                const updatedPlot = props.plot;
                Object.keys(body).forEach(key => {if(key!='field_id') updatedPlot[key]=body[key]})
                props.setPlot(updatedPlot);
                props.setMode(false);
            }})
            .catch(err => {console.log(err);
                document.querySelector('#editPlotInfo').innerHTML='Wystąpił problem podczas edycji!';});*/
        } else document.querySelector('#editFarmInfo').innerHTML='Wprowadź jakieś zmiany!';
    }

    return(<div className='popup'>
        <div className='popupGarageEdit'>        
            <section className='popupForm'>
                <p>Edycja danych gospodarstwa</p>
                <form className='editForm'>
                    <label>Nazwa <input type='text' value={name} onChange={e => setName(e.target.value)} /></label>
                    <label>Miejscowość <input type='text' value={town} onChange={e => setTown(e.target.value)}></input></label>
                    <label>Ulica <input type='text' value={street} onChange={e => setStreet(e.target.value)}/></label>
                    <label>Nr. domu <input type='text' value={house_number} onChange={e => setHouse(e.target.value)}/></label>
                    <label>Budżet <input type='number' value={budget} onChange={e => setBudget(e.target.value)}/></label>
                </form>
                <section className='vehicle-actions'>
                    <button onClick={editHandler}>Zapisz</button>
                    <button onClick={() => props.setMode(false)}>Anuluj</button>
                </section>
                <h3 className='info' id='editFarmInfo'></h3>
            </section>
        </div>
    </div>)
}

export default FarmInfoEdit;