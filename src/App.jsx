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
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';
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

  const [viewCalendar, setViewCalendar] = useState(true);
  const [viewList, setViewList] = useState(false);
  const [viewNewTask, setNewtask] = useState(false);

  const changeViewCalendar = () => {
    setViewCalendar(true);
    setViewList(false);
    setNewtask(false);
    soundBtn();
  };

  const changeViewList = () => {
    setViewCalendar(false);
    setViewList(true);
    setNewtask(false);

    soundBtn();
  };

  const changeViewNewTask = () => {
    setViewCalendar(false);
    setViewList(false);
    setNewtask(true);
    soundBtn();
  };

  return (

      <>
        <main className='main'>

          <section className='board'>
            <article>
              <nav>
                <button className='ImpBtn' onClick={changeViewNewTask}><FontAwesomeIcon icon={faPlus} /></button>
                <button className='ImpBtn' onClick={changeViewList}><FontAwesomeIcon icon={faListCheck} /></button>
                <button className='ImpBtn' onClick={changeViewCalendar}><FontAwesomeIcon icon={faCalendarDays} /></button>
                <button className='ImpBtn' onClick={changeViewCalendar}><FontAwesomeIcon icon={faShop} /></button>
              </nav>
              {viewCalendar && (<div><Calendar /><CalendarNow/></div>)}
              {viewList && (<List />)}
              {viewNewTask && (<Newtask />)}
            </article>
          </section>

            <section className='profil'>
              <Profil/>
            </section>




        </main>
    </>
  )
}

export default App

/*
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
          */