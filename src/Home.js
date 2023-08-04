import React, { useContext } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useFetch from "./useFetch";
import "./map.css"
import red_marker from "./red-marker.png"
import {Icon} from 'leaflet'
import  DaysContext from "./index.js";
import Loader from "./Loader.jsx"
import './Home.css';

function readableTime(tm) {
  var t = new Date(tm).toISOString();
  return t
}

function App() {
  const { days, setDays } = useContext(DaysContext);
  const { data, loading, error } = useFetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=NOW-${days}days`);
  console.log("data.features = ", data.features)

  return (
    <div className="App">
      
      {!loading ? 
      <MapContainer center={[30, -10]} zoom={3} minZoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.features.map(ev => (
            
            <Marker 
                icon={new Icon({iconUrl: red_marker, iconSize: [1.8*(ev.properties.mag+4)^4, 1.8*(ev.properties.mag+4)^4]})}
                key={ev.id}
                position={[ev.geometry.coordinates[1],ev.geometry.coordinates[0]]}>
              <Popup>
                <b>{ev.properties.title}</b><br />
                <hr />
                <table>
                  <tbody>
                    <tr>
                      <td>Magnitude:</td>
                      <td><b> {ev.properties.mag}</b> Richter</td>
                    </tr>
                    <tr>
                      <td>Location: </td>
                      <td>{ev.properties.place}</td>
                    </tr>
                    <tr>
                      <td>Focal Depth: </td>
                      <td>{ev.geometry.coordinates[2]} km</td>
                    </tr>
                    <tr>
                      <td>Time: </td>
                      <td>{readableTime(ev.properties.time)}</td>
                    </tr>
                  </tbody>
                </table>
                 
                
              </Popup>
            </Marker>
          ))}
          
        )
      </MapContainer>
      :
      <Loader />}
    </div>
  );
}

export default App;
