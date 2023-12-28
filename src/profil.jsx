import personna from './assets/autre/photo/personna.png'
import Timer from './timer.jsx';
import { useState, useEffect, useRef } from 'react';
import clickSound from './assets/autre/sound/clickSound.mp3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';



function calculateLevel(experience) {
    let level = 0;
    while (experience >= 15 * level ** 2 + 0 * level + 10) {
      level++;
    }
    return level;
  }

function experienceForLevel(level) {
    if (level === 0) return 0;
    return 15 * (level - 1) ** 2 + 10;
}  

function Profil() {
    
    const storedsettings = JSON.parse(localStorage.getItem('player'));
    
    const [birth, setBirth] = useState(storedsettings ? storedsettings.birth : '');
    const [nickname, setNickname] = useState(storedsettings ? storedsettings.nickname : '');
    const [experience, setExperience] = useState(storedsettings ? storedsettings.experience : 0);
    const [money, setMoney] = useState(storedsettings ? storedsettings.money : 0);
    const [rank, setRank] = useState(storedsettings ? storedsettings.rank : []);
    
    const [level, setLevel] = useState(0);
    const [futurLevel, setFuturLevel] = useState(50);
    
    useEffect(() => {
        const settings = JSON.stringify({ birth, nickname, experience, money, rank });
        localStorage.setItem('player', settings);
      }, [birth, nickname, experience, money, rank]);

    useEffect(() => {
        setLevel(calculateLevel(experience));
    }, [experience]);

    useEffect(() => {
        setRank(current => {
            const newLength = level + 1;
            const newValues = current.slice(0, newLength);
            while (newValues.length < newLength) {
              newValues.push('');
            }
          return newValues;
        });
      }, [level]);
      
      function experienceNeededForNextLevel(currentExperience, currentLevel) {
        const nextLevelExperience = experienceForLevel(currentLevel + 1);
        const currentLevelExperience = experienceForLevel(currentLevel);
        return nextLevelExperience - currentLevelExperience;
      }
      
      const expBarWidth = () => {
        const totalExpForNextLevel = experienceNeededForNextLevel(experience, level);
        const expIntoCurrentLevel = experience - experienceForLevel(level);
        const percentage = (expIntoCurrentLevel / totalExpForNextLevel) * 100;
      
        return `${Math.min(Math.max(percentage, 0), 100)}%`; // Limite entre 0% et 100%
      };
    
      const [barWidth, setBarWidth] = useState(expBarWidth);
    
      useEffect(() => {
        setBarWidth(expBarWidth);
      }, [experience, level]);


    const handleInputChange = (index, value) => {
    const updatedValues = [...rank];
    updatedValues[index] = value;
    setRank(updatedValues);
    };
    

    const reset = () => {
        localStorage.clear();
    };

    const nicknameInput = (e) => {
        setNickname(e.target.value)
    };   
    
    const birthInput = (e) => {
        setBirth(e.target.value)
    };

    const expInput = (e) => {
        setExperience(e.target.value)
    };

    const argentInput = (e) => {
        setMoney(e.target.value)
    };


    const [viewSettings, setViewSettings] = useState(true);

    const changeViewSettings = () => {
        setViewSettings(!viewSettings);
        const audio = new Audio(clickSound);
        audio.play();
    };

    const [viewRank, setViewRank] = useState(true);

    const changeViewRank = () => {
        setViewRank(!viewRank);
        const audio = new Audio(clickSound);
        audio.play();
    };

    const currentLevelExperience = experience - experienceForLevel(level);

    const [imageBase64, setImageBase64] = useState(localStorage.getItem('photoProfil') || personna);
    const fileInputRef = useRef();

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
        const base64String = reader.result;
        setImageBase64(base64String);
        localStorage.setItem('photoProfil', base64String);
        };
        reader.readAsDataURL(file);
    }
    };

    const triggerFileSelectPopup = () => fileInputRef.current.click();

  return (
    <aside>

        {viewRank ? (
            
            <article>

                <div className='stats-otherPlayer stats'>
                        <img className='img-OtherPlayers'  src={personna} alt=""/>
                        <p> Quidam </p>
                        <p>niveau : {futurLevel}</p>
                </div>

                <div className='stats-mainPlayer stats'>

                    {viewSettings ? (
                        <div>
                            <img className='img-Player' src={imageBase64} alt="Uploaded" />  
                        </div>
                    ):(
                        <div>
                            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
                            <button className='imgPlayer' onClick={triggerFileSelectPopup}>Changer l'image</button>
                        </div>        
                    )}

                    {viewSettings ? (
                        <Timer/>    
                    ):(
                        <div>
                            <input type="date" value={birth} onChange={birthInput}/>
                        </div>
                    )}

                    {viewSettings ? (
                        <div className='name'>
                            <p>{level}</p>
                            <p>{rank[level]}</p>
                            <p>{nickname}</p> 
                        </div>
                    ):(
                        <div className='name'>
                            <button onClick={changeViewRank}>rangs</button>
                            <input type="text" value={nickname} placeholder='pseudo' onChange={nicknameInput}/>
                        </div>
                    )}

                    {viewSettings ? (
                        <div className='name'>
                            <p>{experience} exp</p>
                            <div className='barLevel'>
                                <p className='actualBarLevel' style={{width:barWidth}} ></p>
                            </div>
                        </div>
                    ):(
                        <div className='name'>
                            <input type="text" value={experience} placeholder='experience' onChange={expInput}/>   
                        </div>
                    )}

                    {viewSettings ? (
                        <div className='name'>
                            <p>argent : {money}</p>
                        </div>
                    ):(
                        <div className='name'>
                            <input type="text" value={money} placeholder='argent' onChange={argentInput}/>
                        </div>
                    )}

                    {viewSettings ? (
                            <div className='name'>
                                <button className='ImpBtn' onClick={changeViewSettings}><FontAwesomeIcon icon={faGear} /></button>
                            </div>
                        ):(
                            <div className='name'>
                                <button className='deleteBtn' onClick={reset}>supprimer les données</button>
                                <button className='ImpBtn' onClick={changeViewSettings}><FontAwesomeIcon icon={faGear} /></button>
                            </div>
                    )}

                </div>
            </article>
        ):(
            <article>
                {rank.map((value, index) => (
                    
                    <div key={index}>
                        <p>niveau {index}</p>
                        <input 
                            type="text" 
                            value={value} 
                            onChange={(e) => handleInputChange(index, e.target.value)} 
                        />
                    </div>
                ))}
                <button onClick={changeViewRank}>rangs</button>
            </article>
        )}        
    </aside>
  );
}

export default Profil;