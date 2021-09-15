import React from 'react';

const App = () => {
  return (
  <div className="container">
    <div className="valid-keys">
      <span className="matched">tes</span>
      <span className="remainder">te</span>
    </div>
    <div className="typed-keys"></div>
    <div className="completed-words">
      <ol>
        <li>teste</li>
        <li>teste</li>
      </ol>
    </div>
  </div>
  )
}

export default App;
