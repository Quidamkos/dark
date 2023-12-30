import React, { useState, useEffect } from 'react';
import { isToday, isThisWeek, isPast, startOfToday } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

function List() {
    const [tasks, setTasks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Aujourd\'hui');

    const storedsettings = JSON.parse(localStorage.getItem('player'));
    const [experience, setExperience] = useState(storedsettings ? storedsettings.experience : 0);
    const [money, setMoney] = useState(storedsettings ? storedsettings.money : 0);
  
    useEffect(() => {
        const loadedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(loadedTasks);
    }, []);

    useEffect(() => {
      const settings = { ...storedsettings, experience, money };
      localStorage.setItem('player', JSON.stringify(settings));
    }, [experience, money]);
    

    const getTasksForCategory = (category) => {
        // Vérifier si des tâches "firsttask" existent pour aujourd'hui
        const firstTaskTodayExists = tasks.some(task => 
            task.importance === 'firsttask' && isToday(new Date(task.startDate))
        );
    
        return tasks.filter(task => {
            const taskDate = new Date(task.startDate);
            switch (category) {
                case 'En retard':
                    return isPast(taskDate) && !isToday(taskDate) && (!firstTaskTodayExists || task.importance === 'secondtask');
                case 'tout':
                    return (!firstTaskTodayExists || task.importance === 'secondtask');
                case 'Aujourd\'hui':
                    if (firstTaskTodayExists) {
                        return isToday(taskDate) && task.importance === 'firsttask';
                    }
                    return isToday(taskDate);
                case 'Cette semaine':
                    return isThisWeek(taskDate, { weekStartsOn: 1 }) && (!firstTaskTodayExists || task.importance === 'secondtask');
                case 'Plus tard':
                    return !isPast(taskDate) && !isToday(taskDate) && !isThisWeek(taskDate, { weekStartsOn: 1 }) && (!firstTaskTodayExists || task.importance === 'secondtask');
                default:
                    return [];
            }
        });
    };
    

    const validateTask = (taskIdToValidate) => {
        const taskIndex = tasks.findIndex(task => task.id === taskIdToValidate);
        if (taskIndex !== -1) {
            const updatedTasks = [...tasks];
            const task = updatedTasks[taskIndex];
            
            // Réduire le nombre de répétitions de 1
            task.repDay -= 1;
          
            // Convertir en nombres et augmenter l'expérience et l'argent
            setExperience(currentExperience => currentExperience + Number(task.experience));
            setMoney(currentMoney => currentMoney + Number(task.money));
          
            if (task.repDay === 0) {
                if (task.Period === 'only') {
                    console.log('hello')
                    // Si la période est "en 1 fois", supprimer la tâche
                    updatedTasks.splice(taskIndex, 1);
                } else {
                    // Sinon, augmenter la startDate selon la période
                    const startDate = new Date(task.startDate);
                    if (task.Period === 'day') {
                        startDate.setDate(startDate.getDate() + 1);
                    } else if (task.Period === 'week') {
                        startDate.setDate(startDate.getDate() + 7);
                    } else if (task.Period === 'year') {
                        startDate.setFullYear(startDate.getFullYear() + 1);
                    }
                    task.startDate = startDate.toISOString().split('T')[0];
                    task.repDay = task.repSave;
                }
            }
    
            // Mettre à jour le localStorage
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          
            // Mettre à jour l'état des tâches
            setTasks(updatedTasks);
        }
    };
    
    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    }
      
  
    
    const deleteTaskById = (taskIdToDelete) => {
        const updatedTasks = tasks.filter(task => task.id !== taskIdToDelete);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const renderTask = (task) => {
        return (
            <li key={task.id}>
                <p>{task.repDay}</p>
                <p>{formatDate(task.startDate)}</p>
                <p>{task.category}</p>
                <p>{task.type}</p>
                <p>{task.startTime}</p>
                <p>{task.experience || '0'} exp</p>
                <p>{task.money || '0'} <FontAwesomeIcon icon={faCoins} /></p>
                <div>
                  <button className='taskBtn' onClick={() => validateTask(task.id)}>
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button className='taskBtn' onClick={() => deleteTaskById(task.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
            </li>
        );
    };

    return (
        <div>
            <h2 className='titre'>Liste des tâches</h2>
            <select onChange={handleCategoryChange} value={selectedCategory}>
                <option value="En retard">En retard</option>
                <option value="tout">toutes les taches</option>
                <option value="Aujourd'hui">Aujourd'hui</option>
                <option value="Cette semaine">Cette semaine</option>
                <option value="Plus tard">Plus tard</option>
            </select>
            <ul>
                {getTasksForCategory(selectedCategory).map(renderTask)}
            </ul>
        </div>
    );
}

export default List;
