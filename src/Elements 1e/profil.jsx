// ----------------------------------------------- importer des uses

import React, { useState, useEffect, useRef } from 'react';

// ----------------------------------------------- importer les pages JSX

import { calculateLevel, experienceForLevel } from '../Functions/utilitaire.jsx';
import ExportLocalStorage from '../Elements 2e/export.jsx';

// ----------------------------------------------- importer outils

import Timer from '../Elements 2e/timer.jsx';
import BarreExperience from '../Elements 2e/BarreExperience.jsx';

// ----------------------------------------------- importer les fichiers secondaires

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

import personna from '../assets/autre/photo/personna.png';

// -----------------------------------------------

function Profil() {
  const storedsettings = JSON.parse(localStorage.getItem('player')) || {};
  const storedranks = JSON.parse(localStorage.getItem('ranks')) || { rank: [] };

  const [userData, setUserData] = useState({
    birth: storedsettings.birth || '',
    nickname: storedsettings.nickname || '',
    experience: storedsettings.experience || 0,
    money: storedsettings.money || 0,
    rank: storedranks.rank,
    imageBase64: localStorage.getItem('photoProfil') || personna,
  });

  const { birth, nickname, experience, money, rank, imageBase64 } = userData;
  const level = calculateLevel(experience);

  useEffect(() => {
    localStorage.setItem('player', JSON.stringify({ birth, nickname, experience, money }));
    localStorage.setItem('ranks', JSON.stringify({ rank }));
  }, [userData]);

  const handleInputChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('imageBase64', reader.result);
        localStorage.setItem('photoProfil', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef();
  const triggerFileSelectPopup = () => fileInputRef.current.click();
  const [viewSettings, setViewSettings] = useState(true);
  const [viewRank, setViewRank] = useState(true);

  const changeViewSettings = () => {
    setViewSettings(!viewSettings);
  };

  const changeViewRank = () => {
    setViewRank(!viewRank);
  };

  return (
    <>
      {viewRank ? (
        <div className='profil'>
          <article className='otherplayers'>
            <div><FontAwesomeIcon icon={faCaretLeft} /></div>
            <div>
                <img className='img-otherplayers' src={personna} alt='' />
                <p> Inconnu </p>
                <p>niveau : {level + 1}</p> {/* Remplacer par la logique appropriée */}
            </div>
            <div><FontAwesomeIcon icon={faCaretRight} /></div>
          </article>

          <article className='player'>
            {viewSettings ? (
              <div className='container-player'>
                <img className='img-player' src={imageBase64} alt='Uploaded' />
                <Timer />
                <div className='div-container'>
                <p>{level}</p>
                <p>{rank[level] || 'grade'}</p>
                <p>{nickname || 'pseudo'}</p>
                </div>
                <BarreExperience experience={experience} level={level} />
                <p>Argent: {money}€</p>
                <button className='ImpBtn' onClick={changeViewSettings}>
                  <FontAwesomeIcon icon={faGear} />
                </button>

              </div>
            ) : (
              <div className='container-player'>
                <input
                  type='file'
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <button className='img-player' onClick={triggerFileSelectPopup}>
                  Changer l'image
                </button>
                <input type='date' value={birth} onChange={(e) => handleInputChange('birth', e.target.value)} />
                <input
                  type='text'
                  value={nickname}
                  placeholder='Pseudo'
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                />
                <input
                  type='text'
                  value={experience}
                  placeholder='Expérience'
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                />
                <input
                  type='text'
                  value={money}
                  placeholder='Argent'
                  onChange={(e) => handleInputChange('money', e.target.value)}
                />
                <ExportLocalStorage />
                <button className='deleteBtn' onClick={() => localStorage.clear()}>
                  Supprimer les données
                </button>
                <button className='ImpBtn' onClick={changeViewSettings}>
                  <FontAwesomeIcon icon={faGear} />
                </button>
              </div>
            )}
          </article>
        </div>
      ) : (
        <article>
          {rank.map((value, index) => (
            <div key={index}>
              <p>Niveau {index}</p>
              <input
                type='text'
                value={value}
                onChange={(e) => handleInputChange(`rank[${index}]`, e.target.value)}
              />
            </div>
          ))}
          <button onClick={changeViewRank}>Rangs</button>
        </article>
      )}
    </>
  );
}

function calculateExpBarWidth(experience, level) {
  const nextLevelExp = experienceForLevel(level + 1);
  const currentLevelExp = experienceForLevel(level);
  const progress = (experience - currentLevelExp) / (nextLevelExp - currentLevelExp);
  return `${Math.min(Math.max(progress * 100, 0), 100)}%`;
}

export default Profil;
