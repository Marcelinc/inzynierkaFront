import React, {useState} from "react";

const PlotsEdit = (props) => {

    const [registration_number,setNumber] = useState(props.plot.registration_number);
    const [localization,setLocalization] = useState(props.plot.localization);
    const [plant_type_id,setActCrop] = useState(props.plot.actual_plant.id);
    const [plant_seed_date,setDate] = useState(props.plot.plant_seed_date.slice(0,10));
    const [area,setArea] = useState(props.plot.area);

    const [act_registration_number,setActNumber] = useState(props.plot.registration_number);
    const [act_localization,setActLocalization] = useState(props.plot.localization);
    const [act_plant_type_id,setAActCrop] = useState(props.plot.actual_plant.id);
    const [act_plant_seed_date,setActDate] = useState(props.plot.plant_seed_date.slice(0,10));
    const [act_area,setActArea] = useState(props.plot.area);

    const editHandler = () => {
        //Set body and validate
        let body= {'field_id':props.plot.id};
        let validated = false;
        if(act_registration_number!=registration_number){
            body['registration_number']=registration_number;
            validated=true;
        }
        if(act_localization!=localization){
            body['localization']=localization;
            validated=true;
        } 
        if(act_plant_type_id!=plant_type_id){
            body['plant_type_id']=plant_type_id;
            validated=true;
        }
        if(act_plant_seed_date!=plant_seed_date){
            body['plant_seed_date']=plant_seed_date;
            validated=true;
        }
        if(act_area!=area){
            body['area']=area;
            validated=true;
        }

        if(validated){
            document.querySelector('#editPlotInfo').innerHTML='Zapisywanie zmian...';
            fetch(process.env.REACT_APP_SERVER+'/api/field/update',{
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
                document.querySelector('#editPlotInfo').innerHTML='Wystąpił problem podczas edycji!';});
        } else document.querySelector('#editPlotInfo').innerHTML='Wprowadź jakieś zmiany!';
    }


    return(<div className='popup'>
        <div className='popupGarageEdit'>        
            <section className='popupForm'>
                <form className='editForm'>
                    <label>Numer działki <input type='text' value={registration_number} onChange={e => setNumber(e.target.value)} /></label>
                    <label>Lokalizacja <input type='text' value={localization} onChange={e => setLocalization(e.target.value)}></input></label>
                    <label>Powierzchnia <input type='number' value={area} onChange={e => setArea(e.target.value)}/></label>
                    <label>Aktualna roślina <select value={plant_type_id} onChange={e => setActCrop(e.target.value)}>
                        <option value={1}>Pszenica</option>    
                    </select></label>
                    <label>Data siewu <input type='date' value={plant_seed_date} onChange={e => setDate(e.target.value)}/></label>
                </form>
                <section className='vehicle-actions'>
                    <button onClick={editHandler}>Zapisz</button>
                    <button onClick={() => props.setMode(false)}>Anuluj</button>
                </section>
                <h3 className='info' id='editPlotInfo'></h3>
            </section>
        </div>
    </div>)
}

export default PlotsEdit;