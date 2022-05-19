import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Login from './components/Auth/Login/Login';
import RequireAuth from './components/Auth/RequireAuth/RequireAuth';
import Signup from './components/Auth/Signup/Signup';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import TodoApp from './components/TodoApp/TodoApp';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='' element={<TodoApp></TodoApp>}></Route>
        <Route path='home' element={<TodoApp></TodoApp>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='signup' element={<Signup></Signup>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
