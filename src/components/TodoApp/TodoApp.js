import React from 'react';
import { Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import AddTask from '../AddTask/AddTask';
import AllTasks from '../AllTasks/AllTasks';
import Loading from '../Loading/Loading';

const TodoApp = () => {
    
    const { data:tasks, isLoading, refetch } = useQuery('todos', () =>
        fetch('https://todo-app-sam-2022.herokuapp.com/todos')
            .then(res => res.json())
    )

    if (isLoading) {
        return <Loading />
    }
    return (
        <Container className='py-5'>
            <AddTask refetch={refetch}></AddTask>
            <AllTasks tasks={tasks} refetch={refetch}></AllTasks>
        </Container>
    );
};

export default TodoApp;