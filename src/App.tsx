import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardBlock from './components/card_component/CardBlock';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from './Page/MainPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
