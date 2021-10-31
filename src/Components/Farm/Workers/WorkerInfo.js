import React from 'react';
import Photo from './../../../img/userDefault.png';

const WorkerInfo = (props) => {



    return(<section className='workerData'>
        <p className='backToList' onClick={() => props.setType('list')}>Powrót do listy</p>
        <div className='userInfo'>
            <h3>Dane osobowe</h3>
            <div className='userInfoContent'>
                <div>
                    <img className='userPhoto' src={Photo} alt='userImage'></img>
                </div>
                <div className='userData'>
                    <p className='uData'>Imie: user.name</p>
                    <p className='uData'>Nazwisko: user.surname</p>
                    <p className='uData'>Kraj: user.country</p>
                    <p className='uData'>Aktualne stanowisko: user.job_title</p>  
                </div>
            </div>     
        </div>
        <div className='userContact'>
            <h3>Dane kontaktowe</h3>
            <p className='uData'>Email: user.email</p>
            <p className='uData'>Miejscowość: user.town</p>
            <p className='uData'>Ulica:  user.street</p>
            <p className='uData'>Nr.domu: user.house_number</p>
            <p className='uData'>Nr. mieszkania user.flat_number</p>
        </div>
        <div className='userInfoButtons'>
            <button>Zmień stanowisko</button>
            <button>Zwolnij</button>
        </div>
    </section>)
}

export default WorkerInfo;