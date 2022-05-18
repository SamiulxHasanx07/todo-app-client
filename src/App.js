import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AddTask from './components/AddTask/AddTask';
import AllTasks from './components/AllTasks/AllTasks';

function App() {
  return (
    <div className="App py-5">
      <Container>
        <AddTask />
        <AllTasks />
      </Container>


      <ToastContainer />
    </div>
  );
}

export default App;
