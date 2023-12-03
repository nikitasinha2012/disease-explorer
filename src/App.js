// src/App.js
import React, { useState, useEffect } from 'react';
import DiseaseTable from './components/DiseaseTable';

function App() {
  return (
    <div className="App">
      <h1>Disease Explorer</h1>
      <DiseaseTable />
    </div>
  );
}

export default App;
