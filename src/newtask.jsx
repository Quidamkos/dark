import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Newtask() {
  const [showRepeat, setShowRepeat] = useState(false);
  const [showAllDay, setShowAllDay] = useState(true);

  const allDay = () => {
    setShowAllDay(!showAllDay);
  };

  const repeat = () => {
    setShowRepeat(!showRepeat);
  };

  const [taskDetails, setTaskDetails] = useState({
    id: uuidv4(),
    startDate: '',
    taskName: '',
    taskCategory: '',
    
    startTime: '',
    duringTime: '',

    repeatCount: 1,
    repeatPeriod: '',

    experience: '',
    money: '',
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche la soumission par défaut
    const updatedTasks = [...getTasksFromLocalStorage(), taskDetails];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    alert('Tâche sauvegardée !');
    // Réinitialisez taskDetails ou naviguez vers une autre page si nécessaire
  };

  const getTasksFromLocalStorage = () => {
    // Retrieve the tasks from localStorage and parse the JSON string to an object.
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  };


  return (
    <div className="newTask-Container">
      <h2>Nouvelle tâche</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="date" 
            name="startDate" 
            value={taskDetails.startDate} 
            onChange={handleInputChange} 
            className="startDate date"
          />
          <input 
            type="text" 
            name="taskName" 
            value={taskDetails.taskName} 
            onChange={handleInputChange} 
            className="taskName" 
            placeholder="Nom de la tâche"
          />
        </div>

        <div>
          <input type="checkbox" onClick={allDay}/>
          <span>Toute la journée</span>
          {showAllDay ? (
            <div>
              <input 
                type="time" 
                name="startTime" 
                value={taskDetails.startTime} 
                onChange={handleInputChange} 
                className="startTime"
              />   
              <input 
                type="text" 
                name="duringTime" 
                value={taskDetails.duringTime} 
                onChange={handleInputChange} 
                className="duringTime" 
                placeholder="durée"
              />                         
            </div>
          ) : (
            ""
          )}
        </div>

        
        <div>
          <input type="checkbox" onClick={repeat}/>
          <span>Répétition</span>
          {showRepeat ? (
            <div>
              <input type="checkbox"/>
              <span>Période type</span>
              <div>
                <span>Tous les :</span>
                <input type="number" className='smallInput' placeholder="Number" defaultValue={1}/>
                <select>
                  <option value="day">Jour</option>
                  <option value="week">Semaine</option>
                  <option value="month">Mois</option>
                  <option value="year">Année</option>
                </select>
              </div>
              <div>
                <span>Semaine :</span>
                <input type="checkbox"/>
                <input type="checkbox"/>
                <input type="checkbox"/>
                <input type="checkbox"/>
                <input type="checkbox"/>
                <input type="checkbox"/>
                <input type="checkbox"/>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          <input 
              type="number" 
              name="experience" 
              value={taskDetails.experience} 
              onChange={handleInputChange} 
              className="experience smallInput"
            />          
          <input 
            type="number" 
            name="money" 
            value={taskDetails.money} 
            onChange={handleInputChange} 
            className="money smallInput"
          />
        </div>
        <button type="button" onClick={handleSubmit}>Validé</button>
      </form>
    </div>
  );
}

export default Newtask;
