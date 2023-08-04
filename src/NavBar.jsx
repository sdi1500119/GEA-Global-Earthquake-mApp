import "./navbar.css"
import "./general.css"
import { useContext } from "react";
import Select from 'react-select'
import  DaysContext  from "./index.js"

export const NavBar = () => {
  
    const options = [
      { value: 1, label: '24 hours' },
      { value: 3, label: '3 days' },
      { value: 7, label: '7 days' },
      { value: 14, label: '14 days' }
    ]
    const { days, setDays } = useContext(DaysContext);
    return (
      <div className="navbar disable-select">
        <div className="navbarContainer">
            
            <div className="logoContainer" >
                <div className="logo">GEA</div>
                <div className="miniLogo">Global Earthquake mApp</div>
            </div>

            
            <div className="daysSelectContainer">
              <Select defaultValue = {1} 
                      onChange={ event => (setDays(event.value)) }//event  => (setDays (event.value) )  } 
                      placeholder={"24 hours"} 
                      options={options} 
              />
            </div>
        </div>
      </div>
              
    )
}
