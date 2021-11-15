import React from 'react';

const FinishedOrder = () => {
    return(<section className='finishedOrder-info'>
        <h3>Informacje ogólne </h3>
        <div className='overallOrderDTO'>
            
            <p><span>Wykonawca</span>Andrzej Rolny</p>
            <p><span>Status zlecenia</span> Przerwane/Zakończone</p>
            <p><span>Zadanie</span> Oprysk</p>
            <p><span>Miejsce</span> Działka nr. 222/54</p>
            <p><span>Przewidywany czas rozpoczęcia</span> 2020-05-21</p>
            <p><span>Przewidywany czas zakończenia</span> 2020-05-21</p>
            <p><span>Uwagi</span> Brak dodatkowych informacji</p>
        </div>
        <h3>Informacje zwrotne</h3>
        <div className='feedbackOrderDTO'>
            <p><span>Czas rozpoczęcia</span> 2020-05-21</p>
            <p><span>Czas zakończenia</span> 2020-05-21</p>
            <p><span>Pojazd</span>Fendt 209S</p>
            <p><span>Status pojazdu</span> Sprawny</p>
            <p><span>Stan paliwa</span> Połowa zbiornika</p>
            <p><span>Sprzęt</span>Opryskiwacz Agrola</p>
            <p><span>Status maszyny</span> Sprawny</p>

            <p><span>Środek chemiczny</span>KristaLeaf Foto</p>
            <p><span>Dawka na 1ha</span>3kg</p>
            <p><span>Woda na 1ha</span> 600l</p>

            <p><span>Informacje zwrotne</span> Brak dodatkowych informacji. eryeryergeryeryerg dhr dfh hrehtyert. ererhdfgg tryry , rt rt .</p>
        </div>
        
</section>)
}

export default FinishedOrder;