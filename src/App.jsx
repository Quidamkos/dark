import { useState, useEffect } from 'react';
import ExportLocalStorage from './export.jsx';
import ImportLocalStorage from './import.jsx';
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

import clickSound from './assets/autre/sound/clickSound.mp3'

function App() {
  
  const storedsettings = JSON.parse(localStorage.getItem('settings'));
  const [nickname, setNickname] = useState(storedsettings ? storedsettings.nickname : '');

  const [showPopUp, setShowPopUp] = useState(true);
  const [viewTask, setViewTask] = useState(false);
  const [isSettingsSpecificallyEmpty, setIsSettingsSpecificallyEmpty] = useState(false);

  useEffect(() => {
    // Charger les données de settings depuis localStorage
    const storedSettings = JSON.parse(localStorage.getItem('settings'));

    // Vérifier si les settings correspondent à la structure spécifique
    const isEmptySpecifically = storedSettings &&
                               storedSettings.birth === '' &&
                               storedSettings.nickname === '' &&
                               storedSettings.experience === 0 &&
                               storedSettings.money === 0 &&
                               Array.isArray(storedSettings.rank) &&
                               storedSettings.rank.length === 1 &&
                               storedSettings.rank[0] === '';

    setIsSettingsSpecificallyEmpty(isEmptySpecifically);
  }, []);

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

  const changeViewSettings = () => {
    setViewSettings(!viewSettings);
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (

      <main className='app-container'>
          {isSettingsSpecificallyEmpty   ? (
            <div>              
              <Starter/>
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
                  <ImportLocalStorage />
                  </section>
                </footer>
              </div>
            )}
    </main>
  )
}

export default App
