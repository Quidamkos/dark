import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Newtask() {
  const storedCategory = JSON.parse(localStorage.getItem('player'));

  const [viewTask, setViewTask] = useState(true);

  const [showRepeat, setShowRepeat] = useState(!false);
  const [showAllDay, setShowAllDay] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImportance, setSelectedImportance] = useState('firstTask');
  const [selectedOption, setSelectedOption] = useState('only');
  
  const changeViewTask = () => {
    setViewTask(!viewTask);

    const audio = new Audio(clickSound);
    audio.play();
  };

  const allDay = () => {
    setShowAllDay(!showAllDay);
  };

  const repeat = () => {
    setShowRepeat(!showRepeat);
  };

  const [taskDetails, setTaskDetails] = useState({

    importance: '',
    startDate: '',
    type: '',
    Category: '',
    
    repDay: '1',
    repSave: '',
    Period: '',
    
    startTime: '',
    duringTime: '30',
    
    experience: '',
    money: '',

    id: uuidv4(),

  });

    const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setTaskDetails(prevDetails => ({ ...prevDetails, [name]: checked }));
    } else {
      setTaskDetails(prevDetails => ({ ...prevDetails, [name]: value }));

      if (name === 'importance') {
        setSelectedImportance(value);
      } else if (name === 'Period') {
        setSelectedOption(value);
      } else if (name === 'Category') {
        setSelectedCategory(value);
      }
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (taskDetails.duringTime <= 0) {
      alert("La durée doit être un nombre positif.");
      return;
    }

    if (!taskDetails.type) {
      alert("Veuillez entrer le nom de la tâche.");
      return;
    }
    // Mettre à jour repSave et Period avant de sauvegarder
    const updatedTaskDetails = {
      ...taskDetails,
      importance: selectedImportance,
      repSave: taskDetails.repDay,
      Period: selectedOption, // Assurez-vous que cela reflète la sélection actuelle
      category: selectedCategory,
      id: uuidv4() // Générer un nouvel ID pour chaque nouvelle tâche
    };
  
    const updatedTasks = [...getTasksFromLocalStorage(), updatedTaskDetails];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    alert('Tâche sauvegardée !');
    // Réinitialiser taskDetails ou naviguer vers une autre page si nécessaire
  };


  const getTasksFromLocalStorage = () => {
    // Retrieve the tasks from localStorage and parse the JSON string to an object.
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  };

  const [categories, setCategories] = useState(() => {
    // Charger les catégories depuis localStorage ou utiliser un tableau vide
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  const [newCategory, setNewCategory] = useState(""); // Pour la nouvelle catégorie

  // Mettre à jour localStorage chaque fois que les catégories changent
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  // Gérer l'ajout d'une nouvelle catégorie
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() !== "") {
      setCategories(prevCategories => [...prevCategories, newCategory.trim()]);
      setNewCategory(""); // Réinitialiser après ajout
    }
  };

  // Gérer la saisie de la nouvelle catégorie
  const handleCategoryInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory); // Mettre à jour la catégorie sélectionnée
  
    // Mettre à jour taskDetails avec la nouvelle catégorie
    setTaskDetails(prevDetails => ({
      ...prevDetails,
      category: newCategory // Assurez-vous que la clé 'category' est correcte
    }));
  };
  

  return (
    <div className="newTask-article">
      <h2 className='titre'>Nouvelle tache</h2>

      <button type="button" onClick={changeViewTask}>Catégorie</button>
      {viewTask ? (
        
          <div>
            <form onSubmit={handleSubmit}>

              <div className='input-Name'>
              <select
                name="Category"
                value={selectedCategory} 
                onChange={handleInputChange} 
              >          
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>

              <select
                name="importance"
                value={selectedImportance} 
                onChange={handleInputChange}
              >
                <option value="firstTask">primaire</option>
                <option value="secondTask">secondaire</option>
              </select>

                <input 
                    type="text" 
                    name="type" 
                    value={taskDetails.type} 
                    onChange={handleInputChange} 
                    className="text-input" 
                    placeholder="nom de la tache"
                    maxLength={15}
                />
                <input 
                  type="number" 
                  name="repDay" 
                  value={taskDetails.repDay} 
                  onChange={handleInputChange}
                  min="1"
                  className="text-input" 
                  placeholder="nombre de fois"
                />
              </div>


              <div className='input-time'>
                <input 
                  type="date" 
                  name="startDate" 
                  value={taskDetails.startDate} 
                  onChange={handleInputChange} 
                  className="text-input" 
                />
                <input type="checkbox" onClick={allDay}/>
                <span>Toute la journée</span>

                {showAllDay ? (
                  <div>
                    <input 
                      type="time" 
                      name="startTime" 
                      value={taskDetails.startTime} 
                      onChange={handleInputChange} 
                      className="text-input" 
                    />   
                    <input 
                      type="text" 
                      name="duringTime" 
                      value={taskDetails.duringTime} 
                      onChange={handleInputChange} 
                      className="text-input" 
                      placeholder="durée"
                    />                         
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div>
              <input type="checkbox" onClick={repeat}/>
                  {showRepeat ? (
                      <div>
                      <input type="checkbox"/>
                      <span>Période type</span>
                      <div>
                          <span>Tous les :</span>
                          <select
                            name="Period"
                            value={selectedOption} 
                            onChange={handleInputChange} 
                          >
                            <option value="only">en 1 fois</option>
                            <option value="day">Jours</option>
                            <option value="week">Semaines</option>
                            <option value="month">Mois</option>
                            <option value="year">Années</option>
                          </select>
                      </div>
                      {/*<div>
                          <span>Semaine :</span>
                          <input type="checkbox"/>
                          <input type="checkbox"/>
                          <input type="checkbox"/>
                          <input type="checkbox"/>
                          <input type="checkbox"/>
                          <input type="checkbox"/>
                          <input type="checkbox"/>
                  </div>*/}
                      </div>
                  ) : (
                      ""
                  )}
              </div>

              <div className='input-Gain'>

                <div className='div-gain'>
                  <h3>experience</h3>
                <input 
                    type="number" 
                    name="experience" 
                    value={taskDetails.experience} 
                    onChange={handleInputChange} 
                    className="text-input" 
                  />          
                </div>

                <div className='div-gain'>
                  <h3>argent</h3>
                  <input 
                    type="number" 
                    name="money" 
                    value={taskDetails.money} 
                    onChange={handleInputChange} 
                    className="text-input" 
                  />
                </div>

              </div>
            </form>
            <div className='div-Btn'>
              <button type="button" onClick={handleSubmit}>Validé</button>
            </div>
          </div>
          ) : (
            <div className="newTask-container">
            <form onSubmit={handleAddCategory}>
              <input 
                type="text" 
                value={newCategory} 
                onChange={handleCategoryInputChange} 
                placeholder="Nom de la catégorie" 
              />
              <button type="submit">Ajouter</button>
            </form>
      
            <div className="categories-list">
              <h3>Catégories existantes</h3>
              <ul>
                {categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </div>
          </div>
          )}
          


    </div>
  );
}

export default Newtask;
