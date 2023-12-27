import React, { useState, useEffect } from 'react';


function starter() {

    const [isSauved, setIsSaved] = useState(true);
    const [whatName, setWhatname] = useState(false);

    const newStory = () => {
        setIsSaved(!isSauved);
        setWhatname(!whatName);
        const audio = new Audio(clickSound);
        audio.play();
      };

  return (
    <article>

        <div>
            <button className='ImpBtn' onClick={newStory}>commencer une nouvelle histoire</button>
        </div>
        <section>
            
        </section>
    </article>
  );
}

export default starter;
