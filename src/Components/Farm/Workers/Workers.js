import React from 'react';

const Workers = () => {

    const onInfoClick = (id) => {
        console.log('info clicked '+id);
    }

    const onEditClick = (id) => {
        console.log('edit clicked '+id);
    }

    const onDeleteClick = (id) => {
        console.log('delete clicked '+id);
    }

    const onAddClick = () => {
        console.log('add clicked');
    }

    const filterHandler = () => {
        console.log('filtr');
    }

    return(<section className='data'>
        <h3>Pracownicy</h3>
        <div id='farmResMenu'>
            <div id='options'>
                <p>Wyszukaj</p>
                <input type='text' onChange={filterHandler}/>
            </div>
            <button id='addCrops' onClick={onAddClick}>Pobierz kod gospodarstwa</button>
        </div>
        <div id='workers'>
            <div id='legend'>
                <span>Imię i Nazwisko</span>
                <span>Stanowisko</span>
            </div>
            <div className='unit'>
                <span>Jan Kowalski</span>
                <span>Pracownik biurowy</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Piotr Nowak</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            <div className='unit'>
                <span>Karol Piotrowski</span>
                <span>Pracownik rolny</span>
                <button className='MachInfo' onClick={() => onInfoClick(2)}>Wyświetl dane</button>
                <button className='MachEdit' onClick={() => onEditClick(5)}>Zmień stanowisko</button>
                <button className='MachDelete' onClick={() => onDeleteClick(7)}>Zwolnij</button>
            </div>
            
        </div>
    </section>)
}

export default Workers;