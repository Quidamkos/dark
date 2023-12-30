import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth, isToday, isSameDay, parseISO } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import './timer'; // Ensure this import is correct, and that the timer CSS/JS is necessary for the calendar component

function CalendarNow() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(loadedTasks);
  }, []);

  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const dateFormat = 'd';

  const weeks = [];
  let startDate = startOfWeek(startMonth, { weekStartsOn: 1, locale: frLocale });

  while (startDate <= endMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(startDate);
      startDate = addDays(startDate, 1);
    }
    weeks.push(week);
  }

  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const tasksForSelectedDate = tasks.filter((task) =>
    isSameDay(parseISO(task.startDate), selectedDate)
  );

  const renderTasks = () => {
    if (!selectedDate) return <p>Please select a date to see tasks.</p>;

    return tasksForSelectedDate.map((task, index) => (
      <div key={index} className="task">
        <p>{task.startTime ? task.startTime : 'toute la journée'}</p>
        <p>{task.taskName}</p>
        <p>{task.experience}</p>
        <p>{task.money}</p>
        <button className='taskBtn'>valider</button>
        <button className='taskBtn' onClick={() => deleteTask(index)}>supprimer</button>
      </div>
    ));
  };

  return (
        <>
            {renderTasks()}
        </>
  );
}

export default CalendarNow;