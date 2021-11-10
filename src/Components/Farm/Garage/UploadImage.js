import React from 'react';

const UploadImage = (props) => {
    return(props.trigger ? <div className='popup'>
        <section className='popup-main uploadImagePopup'>
            <p>Nieprawidłowe wymiary zdjęcia. Oczekiwany rozmiar to maksymalnie 500x500</p>
            <section className='popupButtons'>
                <button onClick={() => props.setTrigger(false)}>OK</button>
            </section>
        </section>
    </div> : "")
}

export default UploadImage;