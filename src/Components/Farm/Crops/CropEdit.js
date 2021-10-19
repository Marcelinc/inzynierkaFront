import React from "react";

const CropEdit = (props) => {
    return(<div className='popup'>
        <div className='popupGarageEdit'>        
            <section className='popupForm'>
                <form>
                    <label>Rok produkcji <input type='date' /></label>
                    <label>Termin badania technicznego <input type='date' value='props.vehicle.technical_examination_date'></input></label>
                    <label>Rodzaj pojazdu <input type='text' value='props.vehicle.number'/></label>
                    <label>Status <input type='text'/></label>
                    <label>Pojemność <input type='number'/></label>
                    <label>Moc <input type='number'/></label>
                    <label>Status <input type='number'/></label>
                    <label>VIN <input type='number'/></label>
                    <label>Stan paliwa <input type='text'/></label>
                </form>
                <section className='vehicle-actions'>
                    <button onClick={() => {props.setMode(false);}}>Zapisz</button>
                    <button onClick={() => props.setMode(false)}>Anuluj</button>
                </section>
            </section>
        </div>
    </div>)
}

export default CropEdit;