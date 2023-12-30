import { useState, useEffect } from 'react';


import Starter from './Elements 1e/Starter.jsx';
import Newtask from './Elements 2e/newtask.jsx';
import CalendarNow from './Elements 2e/CalendarCheck.jsx';
import List from './Elements 1e/CHecklist.jsx';
import Profil from './Elements 1e/profil.jsx';

import './assets/style/css/style.css';
import './assets/style/scss/style.scss';

import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';

import { soundBtn } from './Functions/sound.jsx';

function App() {
  
  const storedsettings = JSON.parse(localStorage.getItem('player'));

  const [showPopUp, setShowPopUp] = useState(true);
  const [viewTask, setViewTask] = useState(false);
  const [SarterView, setSarterView] = useState(false);

  const [isSaved, setIsSaved] = useState(true);
  const [starterView, setStarterView] = useState(false);

  const [isSettingsEmpty, setIsSettingsEmpty] = useState(false);

  const [dataImported, setDataImported] = useState(false);

  useEffect(() => {
    // Vérifier si les settings sont vides après chaque changement de dataImported
    const checkSettings = () => {
      const storedSettings = JSON.parse(localStorage.getItem('player'));
      const isEmpty = !storedSettings || storedSettings.nickname === '';
      setIsSettingsEmpty(isEmpty);
    };
    checkSettings();
  }, [dataImported]);

  const changeNormalView = () => {
    setStarterView(!SarterView);
  };
  
  const StarterStory = () => {
    setIsSaved(!isSaved);
    setStarterView(!starterView);
    soundBtn();
  };

  const changeViewPopUp = () => {
    setShowPopUp(!showPopUp);
    soundBtn();
  };

  const changeViewTask = () => {
    setViewTask(!viewTask);
    soundBtn();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
      const data = JSON.parse(event.target.result);
      
      Object.keys(data).forEach(key => {
        localStorage.setItem(key, data[key]);
      });

      setDataImported(true);
    };

    reader.readAsText(file);
    
  };


  return (

      <>
        {isSettingsEmpty   ? (
          <div>
            {isSaved && (
              <article className='starter-container'>
                <div className='div-starter'>
                    <FontAwesomeIcon className='fire-Logo' icon={faFire} />
                    <button className='ImpBtn' onClick={StarterStory}>commencer une nouvelle histoire</button>
                    <p>ou</p>
                    <div>
                    <input
                      type="file"
                      id="fileInput" // Vous pouvez personnaliser le style selon vos besoins
                      onChange={importData}
                    />
                    </div>
                </div>
              </article>
            )}

            {starterView && (
              <Starter/>
            )}
          </div>
          ) : (
            <main className='main'>
              
              <section className='board section-app'>
                  {showPopUp ? (
                    viewTask ? (
                      <article className='test'>
                          <button className='ImpBtn' onClick={changeViewPopUp}><FontAwesomeIcon icon={faPlus} /></button>
                          <button className='ImpBtn' onClick={changeViewTask}><FontAwesomeIcon icon={faCalendarDays} /></button>
                            <h2 className='titre'>Calendrier</h2>
                            <Calendar/>
                            <CalendarNow/>
                        </article>
                      ) : (
                        <article>
                          <h2 className='titre'>Liste des tâches</h2>
                          <List/>
                        </article>
                      )
                  ):(
                    <article>
                      <h2 className='titre'>Nouvelle tache</h2>
                      <Newtask/> 
                    </article>
                  )}
              </section>

              <section className='profil'>
                <Profil/>
              </section>

            </main>
          )}

    </>
  )
}

export default App
