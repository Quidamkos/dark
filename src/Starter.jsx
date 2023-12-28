import React, { useState, useEffect } from 'react';

import ImportLocalStorage from './import.jsx';

import clickSound from './assets/autre/sound/clickSound.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

function starter() {

    const [whatName, setWhatname] = useState(true);
    const [whatAge, setWhatAge] = useState(false);
    const [whatLevel, setWhatLevel] = useState(false);

      const whatIsYourAge = () => {
        setWhatname(!whatName);
        setWhatAge(!whatAge);
        const audio = new Audio(clickSound);
        audio.play();
      };

      const whatIsYourLevel = () => {
        setWhatAge(!whatAge);
        setWhatLevel(!whatLevel);
        const audio = new Audio(clickSound);
        audio.play();
      };



  return (
    <article className='starter-container'>

        {whatName && (
            <div className='div-starter'>
                <div className='task-Starter'>
                    <p>quel est ton nom ?</p>
                </div>
                <input type="text" />
                <button className='ImpBtn' onClick={whatIsYourAge}>continue</button>
            </div>
        )}

        {whatAge && (
            <div className='div-starter'>
                <div className='task-Starter'>
                    <p>quel est ton age ?</p>
                </div>
                <input type="date" />
                <button className='ImpBtn' onClick={whatIsYourLevel}>continue</button>
            </div>
        )}

        {whatLevel && (
            <div className='div-starter'>
                <div className='task-Starter'>
                    <p>quel est ton niveau ?</p>
                </div>
                <button className='ImpBtn' onClick={whatIsYourAge}>continue</button>
            </div>
        )} 

        <section>
            
        </section>
    </article>
  );
}

export default starter;
