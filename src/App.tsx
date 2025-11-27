import './App.css'
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className='App'>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">
            Personal Trainer
          </Typography>
        </Toolbar>

      </AppBar>
      <Button color='inherit' component={Link} to="/customers">
        Customers
      </Button>
      <Button color='inherit' component={Link} to="/trainings">
        Trainings
      </Button>

      <Routes>
        <Route path='/' element={<CustomerList />} />
        <Route path='/customers' element={<CustomerList />} />
        <Route path='/trainings' element={<TrainingList />} />
      </Routes>
    </div>
  )
}

export default App
