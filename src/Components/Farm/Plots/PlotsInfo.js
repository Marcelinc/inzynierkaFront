import React, {useState} from "react";
import PlotsDelete from "./PlotsDelete";
import PlotsEdit from "./PlotsEdit";

const PlotsInfo = (props) => {

    const [triggerDelete,setTriggerDelete] = useState(false);
    const [editMode,setMode] = useState(false);

    return(<div><p className='backToList' onClick={() => props.setType('list')}>Powrót do listy</p>
        <div className='vehicleContent'>
            <section className='overall-info'>
                <div className='vehicle-infoname'>
                    <h1>Działka </h1>
                </div>
            </section>
            <section className='plot-info'>
                <div className='plotOverall'>
                    <p>Aktualna uprawa </p>
                    <div className='plotHistory'>
                        <p>Historia upraw</p>
                        <div>
                            <p>Pszenica 07.21.2020</p>
                            <p>Owies 04.25.2020</p>
                        </div>
                    </div>
                    <div className='plotHistory'>
                        <p>Historia zabiegów</p>
                        <div>
                            <p>Orka 17.03.2020</p>
                            <p>Oprysk 30.09.2020</p>
                        </div>
                    </div>
                </div>
                <div className='plotLocalization'>
                    <p>Lokalizacja Polanówka, obok lasu</p>
                    <div className='plotsMap'>
                        
                    </div>
                </div>
            </section>
            <section className='vehicle-actions'>
                <button className='MachEdit' onClick={() => setMode(true)}>Edytuj</button>
                <button className='MachDelete' onClick={() => setTriggerDelete(true)}>Usuń</button>
            </section>
        </div>
        <PlotsDelete trigger={triggerDelete} setTrigger={setTriggerDelete} setDataType={props.setType} />
        {editMode && <PlotsEdit setMode={setMode}/>}
    </div>)
}

export default PlotsInfo;