import React, { useState } from 'react';

const SingleTask = ({ task, index, refetch }) => {
    const { _id, name, des, status } = task;
    
    
    


    const handleComplete = () => {
        console.log('Task Complete');
    }

    // delete tasks 
    const url = `http://localhost:5000/todos/${_id}`
    const handleDelete = () => {
        fetch(url, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(result => {
                refetch()
                console.log(result)
            })

    }
    const state = status === 'completed';
    // console.log(state);
    
    return (
        <tr>
            <td>{state ? <strike>{index + 1}</strike> : `${index + 1}`}</td>
            <td>{state?<strike>{name}</strike>:`${name}`}</td>
            <td>{state?<strike>{des}</strike>:`${des}`}</td>
            <td>
                <button disabled={state} onClick={handleComplete} className="btn todo-bg-color text-white">Complete</button>
                <button onClick={handleDelete} className="btn btn-danger ms-3">Delete</button>
            </td>
        </tr>
    );
};

export default SingleTask;