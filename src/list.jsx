import React, { useState, useEffect } from 'react';
import { isToday, isThisWeek, isPast, startOfToday } from 'date-fns';

function List() {
    const [tasks, setTasks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Aujourd\'hui');

    const storedsettings = JSON.parse(localStorage.getItem('settings'));
    const [experience, setExperience] = useState(storedsettings ? storedsettings.experience : 0);
    const [money, setMoney] = useState(storedsettings ? storedsettings.money : 0);
  
    useEffect(() => {
        const loadedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(loadedTasks);
    }, []);

    useEffect(() => {
      const settings = { ...storedsettings, experience, money };
      localStorage.setItem('settings', JSON.stringify(settings));
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
          const task = tasks[taskIndex];
          
          // Convertir en nombres et augmenter l'expérience et l'argent
          setExperience(currentExperience => currentExperience + Number(task.experience));
          setMoney(currentMoney => currentMoney + Number(task.money));
      
          // Supprimer la tâche validée de la liste
          const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
          setTasks(updatedTasks);
      
          // Mettre à jour le localStorage
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
                <p>{task.startDate}</p>
                <p>{task.taskName}</p>
                <p>{task.startTime}</p>
                <p>{task.experience}</p>
                <p>{task.money}</p>
                <button className='taskBtn' onClick={() => validateTask(task.id)}>valider</button>
                <button className='taskBtn' onClick={() => deleteTaskById(task.id)}>supprimer</button>
            </li>
        );
    };

    return (
        <article>
            <h2 className='titre'>Liste des tâches</h2>
            <div className='listOfFist'>
                <select onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="En retard">En retard</option>
                    <option value="Aujourd'hui">Aujourd'hui</option>
                    <option value="Cette semaine">Cette semaine</option>
                    <option value="Plus tard">Plus tard</option>
                </select>
                <ul>
                    {getTasksForCategory(selectedCategory).map(renderTask)}
                </ul>
            </div>
        </article>
    );
}

export default List;
