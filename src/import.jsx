import React from 'react';

function ImportLocalStorage() {
  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
      const data = JSON.parse(event.target.result);

      // Afficher une boîte de dialogue de confirmation
      const isConfirmed = window.confirm("Êtes-vous sûr de vouloir remplacer les données actuelles du localStorage ?");
      if (!isConfirmed) {
        return; // Arrêter l'exécution si l'utilisateur annule
      }

      // Remplacer les données du localStorage
      Object.keys(data).forEach(key => {
        localStorage.setItem(key, data[key]);
      });

      alert('Toutes les données ont été importées et remplacées dans le localStorage');
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={importData} />
    </div>
  );
}

export default ImportLocalStorage;
