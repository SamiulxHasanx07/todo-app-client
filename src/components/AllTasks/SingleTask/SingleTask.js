import React from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const SingleTask = ({ task, index, refetch }) => {
    const { _id, name, des, status } = task;



    // url
    const url = `https://todo-app-sam-2022.herokuapp.com/todos/${_id}`

    // Complete Task
    const handleComplete = () => {
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount) {
                    toast.success(`${name} Task is Complete`)
                }
                refetch()
            })
    }

    // delete tasks 
    const handleDelete = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: `Are you want to delte ${name} Ttask !`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d41729',
            cancelButtonColor: '#6f20d4',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(url, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result?.deletedCount) {
                            refetch()
                        }
                    })

                Swal.fire(
                    'Deleted!',
                    `Your ${name} task has been deleted.`,
                    'success'
                )
            }
        })
        // fetch(url, {
        //     method: 'DELETE',
        // })
        //     .then(res => res.json())
        //     .then(result => {
        //         if (result?.deletedCount) {
        //             refetch()
        //         }
        //     })

    }
    const state = status === 'completed';
    // console.log(state);

    return (
        <tr>
            <td>{state ? <strike>{index + 1}</strike> : `${index + 1}`}</td>
            <td>{state ? <strike>{name}</strike> : `${name}`}</td>
            <td>{state ? <strike>{des}</strike> : `${des}`}</td>
            <td>
                <button disabled={state} onClick={handleComplete} className="btn btn-sm todo-bg-color text-white">Complete</button>
            </td>
            <td>
                <button onClick={handleDelete} className="btn btn-sm btn-danger">Delete</button>
            </td>
        </tr>
    );
};

export default SingleTask;