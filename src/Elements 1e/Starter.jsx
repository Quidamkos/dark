import React, { useState, useEffect } from 'react';

function Starter() {
    const [infoNumber, setInfoNumber] = useState(0);
    const [indexBtn, setIndexBtn] = useState(0);
    const [inputNeed, setInputNeed] = useState(false);
    const [currentTarget, setCurrentTarget] = useState('nickname');
    const [inputValue, setInputValue] = useState('');

    const inputPhrases = [
        {
            name: 'who',
            phrase: "une minute... qui est la ?",
            Btn: 'continue',
        },
        {
            name: 'Nickname',
            phrase: "d'accord quel est ton nom ?",
            Btn: 'continue',
        },
        {
            name: 'birth',
            phrase: "Quel est ton âge ?",
            Btn: 'continue',
        },
        {
            name: 'birth',
            phrase: "Quel est ton âge ?",
            Btn: 'continue',
        },
    ];

    const targets = [
        'nickname',
        'birth',
    ];

    const [text, setText] = useState(''); // Texte à afficher
    const [textIndex, setTextIndex] = useState(0); // Index de la lettre actuelle
    const minTypingSpeed = 50; // Vitesse minimale de frappe en millisecondes
    const maxTypingSpeed = 150; // Vitesse maximale de frappe en millisecondes

    useEffect(() => {
        // Réinitialise l'index du texte lorsque indexBtn change
        setTextIndex(0);
    }, [indexBtn]);

    useEffect(() => {
        // Si l'index du texte est inférieur à la longueur du texte à afficher, continuez à ajouter des lettres
        if (textIndex < inputPhrases[indexBtn].phrase.length) {
            const typingSpeed = Math.floor(Math.random() * (maxTypingSpeed - minTypingSpeed + 1)) + minTypingSpeed;
            const timer = setTimeout(() => {
                setText(inputPhrases[indexBtn].phrase.substring(0, textIndex + 1)); // Ajoute une lettre à chaque itération
                setTextIndex(textIndex + 1); // Incrémente l'index du texte
            }, typingSpeed);

            return () => {
                clearTimeout(timer); // Nettoie le timer lorsque le composant est démonté
            };
        }
    }, [textIndex, inputPhrases, indexBtn]);

    const changeInfoDiv = () => {
        setInfoNumber(prevInfoNumber => prevInfoNumber + 1);

        const newIndexBtn = (indexBtn + 1) % inputPhrases.length;
        setIndexBtn(newIndexBtn);

        const nextTargetIndex = (targets.indexOf(currentTarget) + 1) % targets.length;
        setCurrentTarget(targets[nextTargetIndex]);

        if ([0, 1].includes(newIndexBtn)) {
            setInputNeed(true);
        } else {
            setInputNeed(false);
        }

        setInputValue('');
        if (inputValue !== '') {
            const playerData = JSON.parse(localStorage.getItem('player')) || {};
            if (currentTarget === 'nickname') {
                playerData.nickname = inputValue;
            } else if (currentTarget === 'birth') {
                playerData.birth = inputValue;
            }
            localStorage.setItem('player', JSON.stringify(playerData));
        }
    };

    return (
        <article className='starter-container'>
            <div className='div-starter'>
                <div className='task-Starter'>
                    <p>{text}</p>
                </div>

                {inputNeed && (
                    <input
                        type="text"
                        placeholder={currentTarget}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                )}

                <button className='ImpBtn' onClick={changeInfoDiv}>
                    {inputPhrases[indexBtn].Btn}
                </button>
            </div>
        </article>
    );
}

export default Starter;
