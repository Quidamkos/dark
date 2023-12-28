import React, { useState } from 'react';

function Starter() {
    const [infoNumber, setInfoNumber] = useState(0);
    const [indexBtn, setIndexBtn] = useState(0);
    const [currentTarget, setCurrentTarget] = useState('nickname'); // État pour suivre la cible actuelle
    const [inputValue, setInputValue] = useState(''); // État pour le champ de texte

    // Tableau d'objets pour les phrases des inputs
    const inputPhrases = [
        { name: 'nickname', phrase: "oh, salut, comment tu vas ?" },
        { name: 'birth', phrase: "Phrase 2 pour la date de naissance" },
    ];

    const targets = ['nickname', 'birth']; // Tableau des cibles possibles

    const changeInfoDiv = () => {
        // Incrémente infoNumber
        setInfoNumber(prevInfoNumber => prevInfoNumber + 1);

        // Change les phrases dans les états en fonction de l'index
        const newIndexBtn = (indexBtn + 1) % inputPhrases.length;
        setIndexBtn(newIndexBtn); // Boucle à travers les phrases

        // Passe à la prochaine cible dans le tableau des cibles possibles
        const nextTargetIndex = (targets.indexOf(currentTarget) + 1) % targets.length;
        setCurrentTarget(targets[nextTargetIndex]);

        // Efface la valeur de l'input
        setInputValue('');
        const playerData = JSON.parse(localStorage.getItem('player')) || {};
        if (currentTarget === 'nickname') {
            playerData.nickname = inputValue;
        } else if (currentTarget === 'birth') {
            playerData.birth = inputValue;
        }
        localStorage.setItem('player', JSON.stringify(playerData));
    };



    return (
        <article className='starter-container'>
            <div className='div-starter'>
                <div className='task-Starter'>
                    <p>{inputPhrases[indexBtn].phrase}</p>
                </div>
                <input
                    type="text"
                    placeholder={currentTarget}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className='ImpBtn' onClick={changeInfoDiv}>
                    {inputPhrases[indexBtn].phrase}
                </button>
            </div>
        </article>
    );
}

export default Starter;
