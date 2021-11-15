import React from 'react';

const PendingOrder = () => {
    return(<section className='pendingOrder-info'>
        <h3>Informacje ogólne</h3>
        <p><span>Zadanie</span> Oprysk</p>
        <p><span>Miejsce</span> Działka nr. 222/54</p>
        <p><span>Przewidywany czas rozpoczęcia</span> 2020-05-21</p>
        <p><span>Przewidywany czas zakończenia</span> 2020-05-21</p>
        <p><span>Pojazd</span>Fendt 209S</p>
        <p><span>Sprzęt</span>Opryskiwacz Agrola</p>

        <p><span>Środek chemiczny</span>KristaLeaf Foto</p>
        <p><span>Dawka na 1ha</span>3kg</p>
        <p><span>Woda na 1ha</span> 600l</p>

        <p><span>Uwagi</span> Brak dodatkowych informacji</p>
    </section>)
}

export default PendingOrder;