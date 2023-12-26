import React from 'react';

function ExportLocalStorage() {
  const exportData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'DonnéesJoueur.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <button onClick={exportData}>Exporter les données du localStorage</button>;
}

export default ExportLocalStorage;
