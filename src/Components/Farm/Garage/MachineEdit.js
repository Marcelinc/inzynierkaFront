import React, { useState, useEffect } from 'react'

const MachineEdit = (props) => {
    const [production_date,setDate] = useState(null);
    const [number,setNumber] = useState(0);
    const [technical_examination_date,setTechDate] = useState(null);


    return(<div className='popup'>
        <div className='popupGarageEdit'>
            <section className='popupForm'>
                <form>
                    <label>Rok produkcji <input type='date' defaultValue={props.machine.production_date} onChange={(e) => setDate(e.target.defaultValue)}/></label>
                    <label>Termin badania technicznego <input type='date' value={props.machine.technical_examination_date} onChange={
                        e => setTechDate(e.target.value)}></input></label>
                    <label>Rodzaj pojazdu <input type='text' value={props.machine.vehicle_type_id}/></label>
                
                </form>
                <section className='vehicle-actions'>
                    <button onClick={() => {props.setMode(false); console.log(production_date+'|'+technical_examination_date)}}>Zapisz</button>
                    <button onClick={() => props.setMode(false)}>Anuluj</button>
                </section>
            </section>
        </div>
    </div>)
}

export default MachineEdit;