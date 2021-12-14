import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route, Link, } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CustomerList from './components/customers/CustomerList';
import TrainingList from './components/trainings/TrainingList';
import TrainingsCalendar from './components/Calendar';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          Personal Trainer
        </Toolbar>
      </AppBar>        
      <BrowserRouter >
        <Link className="Buttons" to="/">Customers</Link>{' '}
        <Link className="Buttons" to="/trainings">Trainings</Link>{' '}
        <Link className="Buttons" to="/calendar">Calendar</Link>{' '}
          <Routes>
            <Route exact path="/" element={<CustomerList />} />
            <Route path="/trainings" element={<TrainingList />} />
            <Route path="/calendar" element={<TrainingsCalendar />} />
            <Route path="*" render={() => <h1>Page not found:(</h1>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
