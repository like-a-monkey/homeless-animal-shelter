import React from 'react';
import {BrowserRouter} from 'react-router-dom'

import Main from './pages/main/main'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  )
}

export default App;
