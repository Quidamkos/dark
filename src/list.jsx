import React, { useState, useEffect } from 'react';
import { isToday, isThisWeek, isPast, startOfToday } from 'date-fns';


function List() {
  
    const [tasks, setTasks] = useState([]);
    const [tasksToday, setTasksToday] = useState([]);
    const [tasksThisWeek, setTasksThisWeek] = useState([]);
    const [tasksLater, setTasksLater] = useState([]);
    const [tasksOverdue, setTasksOverdue] = useState([]);
  
    useEffect(() => {
      const loadedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const today = startOfToday();
  
      const sortedTasks = {
        today: [],
        thisWeek: [],
        later: [],
        overdue: [],
      };
  
      loadedTasks.forEach(task => {
        const startDate = new Date(task.startDate);
        if (isToday(startDate)) {
          sortedTasks.today.push(task);
        } else if (isThisWeek(startDate)) {
          sortedTasks.thisWeek.push(task);
        } else if (isPast(startDate)) {
          sortedTasks.overdue.push(task);
        } else {
          sortedTasks.later.push(task);
        }
      });
  
      setTasksToday(sortedTasks.today);
      setTasksThisWeek(sortedTasks.thisWeek);
      setTasksLater(sortedTasks.later);
      setTasksOverdue(sortedTasks.overdue);
    }, []);
    
    const deleteTask = (indexToDelete) => {
      const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };
  
  
    return (
      <article>
        <h2>Liste des tâches</h2>
        <ul>
          <li>
              <h4>debut</h4>
              <h4>fin</h4>
              <h4>nom</h4>
              <h4>startTime</h4>
              <h4>experience</h4>
              <h4>argent</h4>
              <h4></h4>
              <h4></h4>
          </li>
        </ul>
        <div>
            <h5>En retard</h5>
            <ul>{tasksOverdue.map(renderTask)}</ul>

            <h5>Aujourd'hui</h5>
            <ul>{tasksToday.map(renderTask)}</ul>

            <h5>Cette semaine</h5>
            <ul>{tasksThisWeek.map(renderTask)}</ul>

            <h5>Plus tard</h5>
            <ul>{tasksLater.map(renderTask)}</ul>
        </div>
    </article>
  );

  function renderTask(task, index) {
    return (
      <li key={index}>
        <p>{task.startDate}</p>
        <p>{task.endDate}</p>
        <p>{task.taskName}</p>
        <p>{task.startTime}</p>
        <p>{task.experience}</p>
        <p>{task.money}</p>
        <button className='taskBtn'>valider</button>
        <button className='taskBtn' onClick={() => deleteTask(index)}>supprimer</button>
      </li>
    );
  }

}

export default List;