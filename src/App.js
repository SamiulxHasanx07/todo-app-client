import { Container } from 'react-bootstrap';
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
    </div>
  );
}

export default App;
