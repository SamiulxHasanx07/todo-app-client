import React from 'react';
import { Table } from 'react-bootstrap';
import SingleTask from './SingleTask/SingleTask';

const AllTasks = ({tasks, refetch}) => {


    // const { data: tasks, isLoading, refetch } = useQuery('todos', () =>
    //     fetch('http://localhost:5000/todos')
    //         .then(res => res.json())
    // )
    return (
        <div className=' todo-table px-2 py-5'>
            <h2 className='text-center title-color-main'>All Added Tasks</h2>

            <Table hover responsive className=''>
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Task Name</th>
                        <th>Task Description</th>
                        <th>Complete</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks?.map((task, index) => <SingleTask key={task?._id} task={task} index={index} refetch={refetch}></SingleTask>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default AllTasks;