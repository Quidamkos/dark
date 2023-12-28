import { useState, useEffect } from 'react';
import ExportLocalStorage from './export.jsx';
import Starter from './Starter.jsx';
import Newtask from './newtask';
import CalendarNow from './calendarNow.jsx';
import List from './list.jsx';
import Profil from './profil.jsx';
import './assets/style/css/style.css';
import './assets/style/scss/style.scss';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';

import clickSound from './assets/autre/sound/clickSound.mp3';

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
    const audio = new Audio(clickSound);
    audio.play();
  };

  const StarterStory = () => {
    setIsSaved(!isSaved);
    setStarterView(!starterView);
    const audio = new Audio(clickSound);
    audio.play();
  };

  const changeViewPopUp = () => {
    setShowPopUp(!showPopUp);

    const audio = new Audio(clickSound);
    audio.play();
  };

  const changeViewTask = () => {
    setViewTask(!viewTask);
    const audio = new Audio(clickSound);
    audio.play();
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

      <main className='app-container'>

          
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
              <div className='test'>
                <nav className='nav-container'>
                  <button className='ImpBtn' onClick={changeViewPopUp}><FontAwesomeIcon icon={faPlus} /></button>
                  <button className='ImpBtn' onClick={changeViewTask}><FontAwesomeIcon icon={faCalendarDays} /></button>
                </nav>
                
                <section className='main-container main'>
                    {showPopUp ? (
                      viewTask ? (
                          <article>
                            <div>
                              <h2 className='titre'>Calendrier</h2>
                              <Calendar/>
                              <CalendarNow/>
                            </div>
                            
                          </article>
                      ) : (
                        <div>
                          <h2 className='titre'>Liste des tâches</h2>
                          <List/>
                        </div>
                        )
                    ):(
                      <div>
                        <h2 className='titre'>Nouvelle tache</h2>
                        <Newtask/> 
                      </div>
                    )}
                </section>

                <section className='main'>
                  <Profil/>
                </section>

                <footer>
                  <section>
                  <ExportLocalStorage />
                  </section>
                </footer>
              </div>
            )}

    </main>
  )
}

export default App
