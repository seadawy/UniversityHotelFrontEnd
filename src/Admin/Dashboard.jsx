import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [nUser, setNUser] = useState();
    const [nComp, setNComp] = useState();
    const [nReq, setNReq] = useState();
    return (
        <div className='grid grid-cols-12 gap-4 mt-16'>
            <div className='grid col-start-1 col-end-13 grid-flow-col gap-3'>
                <Link className='bg-blue-200 hover:bg-gray-400 hover:text-white py-8 relative rounded-md shadow flex gap-4 flex-col items-center'>
                    <i className='pi pi-users font-light text-6xl'></i>
                    <h2 className='text-blue-950 font-bold'>المستخدمين</h2>
                    <span className='absolute top-2 left-3 bg-red-500 px-1.5 py-1 rounded-full text-white'>44</span>
                </Link>
                <Link className='bg-teal-200 hover:bg-gray-400 hover:text-white py-8 relative rounded-md shadow flex gap-4 flex-col items-center'>
                    <i className='pi pi-calendar font-light text-6xl'></i>
                    <h2 className='text-teal-950 font-bold'>الطلبات</h2>
                    <span className='absolute top-2 left-3 bg-red-500 px-1.5 py-1 rounded-full text-white'>44</span>

                </Link>
                <Link className='bg-red-200  hover:bg-gray-400 hover:text-white py-8 relative rounded-md shadow flex gap-4 flex-col items-center'>
                    <i className='pi pi-flag font-light text-6xl'></i>
                    <h2 className='text-red-950 font-bold'>الشكاوى</h2>
                    <span className='absolute top-2 left-3 bg-red-500 px-1.5 py-1 rounded-full text-white'>44</span>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard;