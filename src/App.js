import { Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AddTask from './components/AddTask/AddTask';
import AllTasks from './components/AllTasks/AllTasks';

function App() {
  const { data: tasks, isLoading, refetch } = useQuery('todos', () =>
    fetch('http://localhost:5000/todos')
      .then(res => res.json())
  )
  return (
    <div className="App py-5">


      <Container>
        <AddTask refetch={refetch}></AddTask>
        <AllTasks tasks={tasks} refetch={refetch}></AllTasks>
      </Container>


      <ToastContainer />
    </div>
  );
}

export default App;
