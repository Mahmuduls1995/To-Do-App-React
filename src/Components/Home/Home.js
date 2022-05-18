import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Home = () => {
    const handleAddUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const message = event.target.message.value;

        const user = { name, message }


        // const url=https://morning-waters-97427.herokuapp.com/task;

        fetch("http://localhost:5000/task", {
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
        fetch('http://localhost:5000/task')
            .then((response) => response.json())
            .then((data) => setTasks(data));
    }, [tasks]);


    const handleUserDelete = (id) => {
        const proceed = window.confirm('Are you sure you want to delete');
        if (proceed) {

            console.log('deleting  user id', id);
            const url = `http://localhost:5000/task/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        console.log('deleted');
                        const remaining = tasks.filter(product => product._id !== id);
                        setTasks(remaining)

                    }
                });
        

        }
    }




    return (
        <div className="flex mx-auto justify-between ">


            <div className="mx-2 w-full">
                <form onSubmit={handleAddUser}>
                    <div>
                        <span class="uppercase text-sm text-gray-600 font-bold">Full Name</span>
                        <input class="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            type="text" name="name" placeholder="Full Name" />
                    </div>

                    <div class="mt-8">
                        <span class="uppercase text-sm text-gray-600 font-bold">Description</span>
                        <textarea
                            class="w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" name="message" type="text" placeholder="Message"></textarea>
                    </div>
                    <div class="mt-8">
                        <button type="submit"
                            class="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>

            <div className="relative mx-2 w-full overflow-x-auto shadow-md sm:rounded-lg">
                <table className="lg:w-full sm:w-full text-sm text-left text-gray-300 dark:text-gray-300">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                 Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tasks.map((product) => {
                                return (<tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {product?.name}
                                    </th>

                                    <td className="px-6 py-4">
                                        {product?.message}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleUserDelete(product._id)} className="btn btn-primary">Delete</button>
                                    </td>
                                </tr>)
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;