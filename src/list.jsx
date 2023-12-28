import React, { useState, useEffect } from 'react';
import { isToday, isThisWeek, isPast, startOfToday } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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
        switch (category) {
            case 'En retard':
                return tasks.filter(task => isPast(new Date(task.startDate)) && !isToday(new Date(task.startDate)));
            case 'Aujourd\'hui':
                return tasks.filter(task => isToday(new Date(task.startDate)));
            case 'Cette semaine':
                return tasks.filter(task => isThisWeek(new Date(task.startDate)));
            case 'Plus tard':
                return tasks.filter(task => !isPast(new Date(task.startDate)) && !isToday(new Date(task.startDate)) && !isThisWeek(new Date(task.startDate)));
            default:
                return [];
        }
    };

    const validateTask = (taskIdToValidate) => {
        const taskIndex = tasks.findIndex(task => task.id === taskIdToValidate);
        if (taskIndex !== -1) {
          const updatedTasks = [...tasks];
          const task = updatedTasks[taskIndex];
          
          if (task.repDay > 0) {
            // Réduire le nombre de répétitions de 1
            task.repDay -= 1;
      
            // Convertir en nombres et augmenter l'expérience et l'argent
            setExperience(currentExperience => currentExperience + Number(task.experience));
            setMoney(currentMoney => currentMoney + Number(task.money));
      
            // Si le nombre de répétitions atteint 0, supprimer la tâche
            if (task.repDay === 0) {
              updatedTasks.splice(taskIndex, 1); // Supprimer la tâche du tableau
              localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Mettre à jour le local storage
            } else {
              // Si le nombre de répétitions n'est pas encore à zéro, mettre à jour le localStorage
              localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            }
      
            // Mettre à jour l'état des tâches
            setTasks(updatedTasks);
          }
        }
      };
      
  
    
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
                <p>{task.startDate}</p>
                <p>{task.category}</p>
                <p>{task.type}</p>
                <p>{task.startTime}</p>
                <p>{task.experience}</p>
                <p>{task.money}</p>
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
        <article>
                <select onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="En retard">En retard</option>
                    <option value="Aujourd'hui">Aujourd'hui</option>
                    <option value="Cette semaine">Cette semaine</option>
                    <option value="Plus tard">Plus tard</option>
                </select>
                <ul>
                    {getTasksForCategory(selectedCategory).map(renderTask)}
                </ul>
        </article>
    );
}

export default List;
