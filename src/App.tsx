import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customers from './Customers';
import Trainings from './Trainings';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" elements={<Customers/>} />
        <Route path="/trainings" elements={<Trainings/>}/>
      </Routes>
    </Router>
  )
}

export default App
