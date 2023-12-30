import React, { useState, useEffect } from 'react';

function Timer() {

  const [birth, setBirth] = useState(localStorage.getItem('player') ? JSON.parse(localStorage.getItem('player')).birth : '');

  const birthDate = new Date(birth);
  const futureDate = new Date(birthDate.setFullYear(birthDate.getFullYear() + 80));

  const [remainingSeconds, setRemainingSeconds] = useState(calculateRemainingSeconds());

  function calculateRemainingSeconds() {
    const currentDate = new Date();
    const remainingMilliseconds = futureDate - currentDate;
    return Math.floor(remainingMilliseconds / 1000);
  }

  function formatNumberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds(calculateRemainingSeconds());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedRemainingSeconds = formatNumberWithSpaces(remainingSeconds);

  return <div className='timer'>{formattedRemainingSeconds}</div>
}

export default Timer;
