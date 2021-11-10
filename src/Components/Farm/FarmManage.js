import React from 'react';

const FarmManage = () => {
    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Zarządzanie gospodarstwem</h3>
            <div id='farmInfo'>
                <span>Nazwa: Moje gospodarstwo</span>
                <span>Miejscowość: Podlesie</span>
                <span>Ulica: </span>
                <span>Nr. domu: </span>
            </div>
            <div id='farmCodeManage'>
                <p>Kod dostępu: <button className='farmManageButton'>Generuj nowy</button></p>
                
            </div>
            <div id='farmDelete'>
                <button className='farmManageButton'>Edytuj dane</button>
                <button className='farmManageButton'>Usuń</button>
            </div>
        </div>
    </section>)
}

export default FarmManage;