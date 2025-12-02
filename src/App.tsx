import './App.css'
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Routes, Route, Link } from "react-router-dom";
import Calendar from './components/TrainingCalendar';
import ChartsPage from './components/ChartsPage';
import TrainingCalendar from './components/TrainingCalendar';

function App() {
  return (
    <div className='App'>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 0.5}}>
            Personal Trainer
          </Typography>
          <Button color='inherit' component={Link} to="/customers">
            Customers
          </Button>
          <Button color='inherit' component={Link} to="/trainings">
            Trainings
          </Button>
          <Button color='inherit' component={Link} to="/statistics">
            Statistics
          </Button>
          <Button color='inherit' component={Link} to="/calendar">
            Calendar
          </Button>
        </Toolbar>

      </AppBar>


      <Routes>
        <Route path='/calendar' element={<TrainingCalendar />} />
        <Route path='/' element={<CustomerList />} />
        <Route path='/customers' element={<CustomerList />} />
        <Route path='/trainings' element={<TrainingList />} />
        <Route path='/statistics' element={<ChartsPage />} />

      </Routes>
    </div>
  )
}

export default App
