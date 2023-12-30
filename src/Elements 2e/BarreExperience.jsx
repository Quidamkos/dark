import React from 'react';
import { experienceForLevel } from '../Functions/utilitaire';

function BarreExperience({ experience, level }) {
  const calculateExpBarWidth = () => {
    const nextLevelExp = experienceForLevel(level + 1);
    const currentLevelExp = experienceForLevel(level);
    const progress = (experience - currentLevelExp) / (nextLevelExp - currentLevelExp);
    return `${Math.min(Math.max(progress * 100, 0), 100)}%`;
  };

  return (
    <div className='div-container'>
      <p>{experience}</p>
      <div className='barreExperience'>
        <div className='currentExperience' style={{ width: calculateExpBarWidth() }}></div>
      </div>
    </div>
  );
}

export default BarreExperience;
