import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Home = () => {
    const handleAddUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const message = event.target.message.value;

        const user = { name, message }


        fetch("https://morning-waters-97427.herokuapp.com/task", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })


            .then(response => response.json())
            .then(data => {

                console.log('Success:', data);
                toast('Task Add successfully');
                event.target.reset()
            })

    }



    const [tasks, setTasks] = useState([])
    useEffect(() => {
        fetch('https://morning-waters-97427.herokuapp.com/task')
            .then((response) => response.json())
            .then((data) => setTasks(data));
    }, [tasks]);


    const handleUserDelete = (id) => {
        const proceed = window.confirm('Are you sure you want to delete');
        if (proceed) {

            console.log('deleting  user id', id);
            const url = `https://morning-waters-97427.herokuapp.com/task/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        console.log('deleted');
                        const remaining = tasks.filter(task => task._id !== id);
                        setTasks(remaining)

                    }
                });
        }
    }

    return (
        <div className="mx-auto ml-1 justify-between mt-6 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 ">

            <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                <table className="lg:w-full sm:w-full text-sm text-left text-gray-300 dark:text-gray-300">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tasks.map((task) => {
                                return (<tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {task?.name}
                                    </th>

                                    <td className="px-6 py-4">
                                        {task?.message}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleUserDelete(task._id)} className="btn btn-primary rounded-md bg-green-600 p-1">Delete</button>
                                    </td>
                                </tr>)
                            })
                        }

                    </tbody>
                </table>
            </div>

            <div className="w-full ml-1">
                <form onSubmit={handleAddUser}>
                    <div>
                        <span class="uppercase text-sm text-gray-600 font-bold">Full Name</span>
                        <input class="w-full bg-gray-300 text-gray-900 mt-1 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            type="text" name="name" placeholder="Full Name" />
                    </div>

                    <div class="mt-8">
                        <span class="uppercase text-sm text-gray-600 font-bold">Description</span>
                        <textarea
                            class="w-full h-32 bg-gray-300 text-gray-900 mt-1 p-3 rounded-lg focus:outline-none focus:shadow-outline" name="message" type="text" placeholder="Message"></textarea>
                    </div>
                    <div class="mt-8">
                        <button type="submit"
                            class="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Home;