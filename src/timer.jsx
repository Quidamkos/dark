import React, { useState, useEffect } from 'react';

function Timer() {

  const [birth, setBirth] = useState(localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')).birth : '');

  const birthDate = new Date(birth);
  // Ajoutez 80 ans à birthDate pour obtenir futureDate
  const futureDate = new Date(birthDate.setFullYear(birthDate.getFullYear() + 80));

  // useState pour gérer l'état de remainingSeconds
  const [remainingSeconds, setRemainingSeconds] = useState(calculateRemainingSeconds());

  // Fonction pour calculer les secondes restantes
  function calculateRemainingSeconds() {
    const currentDate = new Date();
    const remainingMilliseconds = futureDate - currentDate;
    return Math.floor(remainingMilliseconds / 1000);
  }

  // Fonction pour formater le nombre avec des espaces
  function formatNumberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  useEffect(() => {
    // Mettre à jour remainingSeconds chaque seconde
    const interval = setInterval(() => {
      setRemainingSeconds(calculateRemainingSeconds());
    }, 1000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  // Formater remainingSeconds pour l'affichage
  const formattedRemainingSeconds = formatNumberWithSpaces(remainingSeconds);

  return <div>{formattedRemainingSeconds}</div>;
}

export default Timer;
