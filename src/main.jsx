import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

{  // ORG STRICT MODE

  // createRoot(document.getElementById('root')).render(
  //   <StrictMode>
  //     <App />
  //   </StrictMode>,
  // )
  
}

{  // WITH STRICT MODE


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

}


{  // WITHOUT STRICT MODE

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <App />, // No React.StrictMode wrapper
//   document.getElementById('root')
// );

}
