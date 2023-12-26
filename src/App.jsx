import { useState } from 'react';
import ExportLocalStorage from './export.jsx';
import ImportLocalStorage from './import.jsx';
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
    <div className='ta'>
        <main className='mainThing'>
          <section className='navBar'>
            <button className='ImpBtn' onClick={changeViewPopUp}><FontAwesomeIcon icon={faPlus} /></button>
            <button className='ImpBtn' onClick={changeViewTask}><FontAwesomeIcon icon={faCalendarDays} /></button>
          </section>

          <section className='mainSection'>
              {showPopUp ? (
                viewTask ? (
                    <article>
                      <div className='couvCalendar'>
                        <Calendar/>
                        <CalendarNow/>
                      </div>
                      
                    </article>
                ) : (
                  <List/>
                  )
              ):(
                <div>
                  <Newtask/> 
                </div>
              )}
          </section>
          <Profil/>
        </main>

        <footer>
          <ExportLocalStorage />
          <ImportLocalStorage />
        </footer>
    </div>
  )
}

export default App
