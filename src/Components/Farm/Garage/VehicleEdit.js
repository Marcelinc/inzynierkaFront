import React, { useState, useEffect } from 'react'

const VehicleEdit = (props) => {
    const [production_date,setDate] = useState(null);
    const [number,setNumber] = useState(0);
    const [technical_examination_date,setTechDate] = useState(null);


    return(<div className='popup'>
        <div className='popupGarageEdit'>        
            <section className='popupForm'>
                <form>
                    <label>Rok produkcji <input type='date' defaultValue={props.vehicle.production_date} onChange={(e) => setDate(e.target.defaultValue)}/></label>
                    <label>Termin badania technicznego <input type='date' value={props.vehicle.technical_examination_date} onChange={
                        e => setTechDate(e.target.value)}></input></label>
                    <label>Rodzaj pojazdu <input type='text' value={props.vehicle.number}/></label>
                    <label>Status <input type='text'/></label>
                    <label>Pojemność <input type='number'/></label>
                    <label>Moc <input type='number'/></label>
                    <label>Status <input type='number'/></label>
                    <label>VIN <input type='number'/></label>
                    <label>Stan paliwa <input type='text'/></label>
                </form>
                <section className='vehicle-actions'>
                    <button onClick={() => {props.setMode(false); console.log(production_date+'|'+technical_examination_date)}}>Zapisz</button>
                    <button onClick={() => props.setMode(false)}>Anuluj</button>
                </section>
            </section>
        </div>
    </div>)
}

export default VehicleEdit;