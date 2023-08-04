import {React, useState, createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import { NavBar } from './NavBar';

const DaysContext = createContext({
  days: 1,
  setDays: () => {}
});

export default DaysContext;

function Main(){
  const [days, setDays] = useState(1);
  const value = {days, setDays}
  return( 
    
      <DaysContext.Provider value = {value}>
        <NavBar />
        <Home />
      </DaysContext.Provider>);
  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <Main /> );



