import './App.css'
import Navbar from './component/Navbar'
import Home from './component/Home'
import MapComponent from './component/MapComponent.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapComponent onAreaSelected={(bounds) => console.log(bounds)} />} />
      </Routes>
    </>
  )
}

export default App
