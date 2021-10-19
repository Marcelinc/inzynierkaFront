import React from 'react';

const FarmManage = () => {
    return(<section className='data'>
        <h3>Zarządzanie gospodarstwem</h3>
        <div id='farmInfo'>
            <span>Nazwa: Moje gospodarstwo</span>
            <span>Miejscowość: Podlesie</span>
            <span>Ulica: </span>
            <span>Nr. domu: </span>
        </div>
        <div id='farmCodeManage'>
            <p>Kod dostępu: 46dry6n6e6</p>
            <button>Generuj nowy</button>
        </div>
        <div id='farmDelete'>
            <button>Edytuj dane</button>
            <button>Usuń</button>
        </div>
        
    </section>)
}

export default FarmManage;