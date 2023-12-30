import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import personna from './assets/autre/photo/personna.png';
import { calculateLevel } from './Functions/utilitaire.jsx';
import futurCharacter from './assets/autre/photo/futurCharacter.png';

function OtherPlayers() {
  const storedsettings = JSON.parse(localStorage.getItem('player')) || {};

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('slide-in');
  // Déclaration de level après récupération de experience
  const experience = storedsettings.experience || 0;
  const level = calculateLevel(experience);



  useEffect(() => {
    const intervalId = setInterval(goToNextPlayer, 10000); // Changement toutes les 10 secondes

    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage
  }, [currentPlayerIndex]);

  // Utilisation de level pour définir otherPlayer
  const otherPlayer = [
    { id: '1', pic: futurCharacter, name: 'inconnu', level: level + 20 },
    { id: '2', pic: personna, name: 'inconnu', level: level }
  ];


  const goToNextPlayer = () => {
    setAnimationClass('slide-out'); // Définir la classe pour l'animation de sortie
    setTimeout(() => {
      setCurrentPlayerIndex((currentPlayerIndex + 1) % otherPlayer.length);
      setAnimationClass('slide-in'); // Réinitialiser la classe pour l'animation d'entrée
    }, 500); // Ce délai doit correspondre à la durée de l'animation CSS
  };

  const goToPreviousPlayer = () => {
    setAnimationClass('slide-out');
    setTimeout(() => {
      setCurrentPlayerIndex((currentPlayerIndex - 1 + otherPlayer.length) % otherPlayer.length);
      setAnimationClass('slide-in');
    }, 500);
  };

  return (
    <>
      <div className="slider">
        <div className="slider-arrow" onClick={goToPreviousPlayer}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </div>
        <div className={`slider-content ${animationClass}`}>
          <img className='img-otherplayers' src={otherPlayer[currentPlayerIndex].pic} alt='' />
          <h3>{otherPlayer[currentPlayerIndex].name}</h3>
          <p>lvl : {otherPlayer[currentPlayerIndex].level}</p>
        </div>
        <div className="slider-arrow" onClick={goToNextPlayer}>
          <FontAwesomeIcon icon={faCaretRight} />
        </div>
      </div>
    </>
  );
}


export default OtherPlayers;
