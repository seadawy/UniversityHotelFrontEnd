import React, { useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import DataTable from "react-data-table-component";
import { useAuthContext } from '../Auth/useAuthContext';

export default function RequestManage() {
    const { user, token } = useAuthContext();
    const [waiting, setWaiting] = useState([]);
    const [accepted, setAccepted] = useState([]);
    const [checkIn, setCheckIn] = useState([]);
    const [checkOut, setCheckOut] = useState([]);
    const [rejected, setRejected] = useState([]);

    // Search and filter states
    const [waitingFilter, setWaitingFilter] = useState('');
    const [acceptedFilter, setAcceptedFilter] = useState('');
    const [checkInFilter, setCheckInFilter] = useState('');
    const [checkOutFilter, setCheckOutFilter] = useState('');
    const [rejectedFilter, setRejectedFilter] = useState('');

    useEffect(() => {
        fetchWaiting();
        fetchAccepted();
        fetchCheckIn();
        fetchCheckOut();
        fetchRejected();
    }, []);

    const fetchWaiting = () => {
        fetch('/api/BookRequests/RequestsWaitingToApproved', {
            headers: { "authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(data => setWaiting(data)).catch(err => console.log(err));
    };

    const fetchAccepted = () => {
        fetch('/api/BookRequests/ApprovedRequests', {
            headers: { "authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(data => setAccepted(data)).catch(err => console.log(err));
    };

    const fetchCheckIn = () => {
        fetch('/api/BookRequests/CheckinRequests', {
            headers: { "authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(data => setCheckIn(data)).catch(err => console.log(err));
    };

    const fetchCheckOut = () => {
        fetch('/api/BookRequests/CheckoutRequests', {
            headers: { "authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(data => setCheckOut(data)).catch(err => console.log(err));
    };

    const fetchRejected = () => {
        fetch('/api/BookRequests/RejectedRequests', {
            headers: { "authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(data => setRejected(data)).catch(err => console.log(err));
    };

    /* Actions */
    const RejectRequest = (Reqid) => {
        fetch(`/api/BookRequests/RejectBookRequest/${Reqid}`, {
            method: "put",
            headers: { "Authorization": `bearer ${token}` }
        }).then(() => {
            fetchWaiting();
            fetchRejected();
        }).catch(err => console.log(err));
    };

    const AcceptRequest = (Reqid) => {
        fetch(`/api/BookRequests/ApproveRequest/${Reqid}`, {
            method: "put",
            headers: { "Authorization": `bearer ${token}` }
        }).then(() => {
            fetchWaiting();
            fetchAccepted();
        }).catch(err => console.log(err));
    };

    const CheckInRequest = (Reqid) => {
        fetch(`/api/BookRequests/CheckinBookRequest/${Reqid}`, {
            method: "put",
            headers: { "Authorization": `bearer ${token}` }
        }).then(() => {
            fetchAccepted();
            fetchCheckIn();
        }).catch(err => console.log(err));
    };

    const CheckOutRequest = (Reqid) => {
        fetch(`/api/BookRequests/CheckoutBookRequest/${Reqid}`, {
            method: "put",
            headers: { "Authorization": `bearer ${token}` }
        }).then(() => {
            fetchCheckIn();
            fetchCheckOut();
        }).catch(err => console.log(err));
    };

    // Filtering logic
    const filterData = (data, filter) => {
        return data.filter(row =>
            row.roomNmber.toString().includes(filter) ||
            row.fullName.toString().includes(filter)
        );
    };

    const renderSearchBox = (filter, setFilter, placeholder) => (
        <div className="flex mb-2 gap-2">
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <button
                onClick={() => setFilter('')}
                className="ml-2 px-4 py-2 flex items-center justify-center bg-gray-300 rounded hover:bg-gray-400"
            >
                <i className='font-bold text-2xl pi pi-times'></i>
            </button>
        </div>
    );
    
    const witingTable = [
        { name: "رقم الغرفة", selector: row => row.roomNmber, sortable: true, width: "150px" },
        {
            name: "الضيف", selector: row => (
                <a href={`/Users/View/${row.userName}`} target='_blank' className='text-xl font-bold font-Alex underline underline-offset-2 text-ellipsis'>
                    {row.fullName}
                </a>
            ), sortable: true, width: "270px",
        },
        { name: "السعر", selector: row => row.price, sortable: true, width: "120px" },
        { name: "تم استلام يوم", selector: row => new Date(row.bookedAt).toLocaleDateString('ar-EG'), sortable: true },
        {
            name: "الادوات", selector: row => (
                <div className='flex gap-2'>
                    <button type='button' onClick={() => AcceptRequest(row.id)} className='bg-prime hover:bg-prime-lh px-3 py-2 rounded text-white'>قبول</button>
                    <button type='button' onClick={() => RejectRequest(row.id)} className='bg-red-800 px-3 py-2 rounded text-white'>رفض</button>
                </div>
            )
            , sortable: true
        },
    ];
    const acceptedTable = [
        { name: "رقم الغرفة", selector: row => row.roomNmber, sortable: true, width: "150px" },
        {
            name: "الضيف", selector: row => (
                <a href={`/Users/View/${row.userName}`} target='_blank' className='text-xl font-bold font-Alex underline underline-offset-2 text-ellipsis'>
                    {row.fullName}
                </a>
            ), sortable: true, width: "270px",
        },
        { name: "السعر", selector: row => row.price, sortable: true, width: "120px" },
        { name: "تم استلام يوم", selector: row => new Date(row.bookedAt).toLocaleDateString('ar-EG'), sortable: true },
        {
            name: "الادوات", selector: row => (
                <div className='flex gap-2'>
                    <button type='button' onClick={() => CheckInRequest(row.id)} className='bg-prime hover:bg-prime-lh px-3 py-2 rounded text-white'>تم تسليمه الغرفة</button>
                </div>
            )
            , sortable: true
        },
    ];
    const checkInTable = [
        { name: "رقم الغرفة", selector: row => row.roomNmber, sortable: true, width: "150px" },
        {
            name: "الضيف", selector: row => (
                <a href={`/Users/View/${row.userName}`} target='_blank' className='text-xl font-bold font-Alex underline underline-offset-2 text-ellipsis'>
                    {row.fullName}
                </a>
            ), sortable: true, width: "270px",
        },
        { name: "السعر", selector: row => row.price, sortable: true, width: "120px" },
        { name: "من", selector: row => new Date(row.startDate).toLocaleDateString('ar-EG'), sortable: true },
        { name: "الى", selector: row => new Date(row.endDate).toLocaleDateString('ar-EG'), sortable: true },
        {
            name: "الادوات", selector: row => (
                <div className='flex gap-2'>
                    <button type='button' onClick={() => CheckOutRequest(row.id)} className='bg-prime hover:bg-prime-lh px-3 py-2 rounded text-white'>غادر الغرفه</button>
                </div>
            ), sortable: true
        },
    ];
    const checkOutTable = [
        { name: "رقم الغرفة", selector: row => row.roomNmber, sortable: true, width: "150px" },
        {
            name: "الضيف", selector: row => (
                <a href={`/Users/View/${row.userName}`} target='_blank' className='text-xl font-bold font-Alex underline underline-offset-2 text-ellipsis'>
                    {row.fullName}
                </a>
            ), sortable: true, width: "270px",
        },
        { name: "السعر", selector: row => row.price, sortable: true, width: "120px" },
        { name: "من", selector: row => new Date(row.startDate).toLocaleDateString('ar-EG'), sortable: true },
        { name: "الى", selector: row => new Date(row.endDate).toLocaleDateString('ar-EG'), sortable: true },
    ];
    const rejectedTable = [
        { name: "رقم الغرفة", selector: row => row.roomNmber, sortable: true },
        {
            name: "الضيف", selector: row => (
                <a href={`/Users/View/${row.userName}`} target='_blank' className='text-xl font-bold font-Alex underline underline-offset-2 text-ellipsis'>
                    {row.fullName}
                </a>
            ), sortable: true,
        },
        { name: "السعر", selector: row => row.price, sortable: true, width: "120px" },
    ];
    return (
        <div className="card mt-20">
            <div className="border-2 bg-white border-gray-400 rounded mb-5 p-3 flex flex-row items-center select-none shadow-md">
                <i className="pi pi-home text-2xl mx-2"></i>
                <span className="text-xl font-bold text-gray-800">لوحة التحكم</span>
                <i className="pi pi-angle-left text-2xl text-gray-400 mx-2"></i>
                <span className="text-xl font-bold text-gray-800">إدارة الطلبات</span>
            </div>
            <Accordion activeIndex={1}>
                {(user.role === 'SuperAdmin' || user.role === 'UniversityViceDean') &&
                    <AccordionTab header="طلب قيد الانتظار">
                        {renderSearchBox(waitingFilter, setWaitingFilter, 'ابحث عن غرفة أو ضيف')}
                        <DataTable
                            className="shadow-md rounded-lg"
                            columns={witingTable}
                            data={filterData(waiting, waitingFilter)}
                            pagination
                            noDataComponent={<p className='py-3 bg-slate-100 w-full text-center text-xl font-Alex font-bold'>لا يوجد اى طلبات قيد الانتظار حاليا</p>}
                        />
                    </AccordionTab>
                }
                <AccordionTab header="طلب مقبول">
                    {renderSearchBox(acceptedFilter, setAcceptedFilter, 'ابحث عن غرفة أو ضيف')}
                    <DataTable
                        className="shadow-md rounded-lg"
                        columns={acceptedTable}
                        data={filterData(accepted, acceptedFilter)}
                        pagination
                        noDataComponent={<p className='py-3 bg-slate-100 w-full text-center text-xl font-Alex font-bold'>لا يوجد اى طلبات مقبوله حاليا</p>}
                    />
                </AccordionTab>
                <AccordionTab header="استلم الغرفه">
                    {renderSearchBox(checkInFilter, setCheckInFilter, 'ابحث عن غرفة أو ضيف')}
                    <DataTable
                        className="shadow-md rounded-lg"
                        columns={checkInTable}
                        data={filterData(checkIn, checkInFilter)}
                        pagination
                        noDataComponent={<p className='py-3 bg-slate-100 w-full text-center text-xl font-Alex font-bold'>لا يوجد اى طلبات قيد الانتظار حاليا</p>}
                    />
                </AccordionTab>
                <AccordionTab header="غادر الغرفه">
                    {renderSearchBox(checkOutFilter, setCheckOutFilter, 'ابحث عن غرفة أو ضيف')}
                    <DataTable
                        className="shadow-md rounded-lg"
                        columns={checkOutTable}
                        data={filterData(checkOut, checkOutFilter)}
                        pagination
                        noDataComponent={<p className='py-3 bg-slate-100 w-full text-center text-xl font-Alex font-bold'>لا يوجد اى طلبات قيد الانتظار حاليا</p>}
                    />
                </AccordionTab>
                <AccordionTab header="طلب مرفوض">
                    {renderSearchBox(rejectedFilter, setRejectedFilter, 'ابحث عن غرفة أو ضيف')}
                    <DataTable
                        className="shadow-md rounded-lg"
                        columns={rejectedTable}
                        data={filterData(rejected, rejectedFilter)}
                        pagination
                        noDataComponent={<p className='py-3 bg-slate-100 w-full text-center text-xl font-Alex font-bold'>لا يوجد اى طلبات مرفوضه حاليا</p>}
                    />
                </AccordionTab>
            </Accordion>
        </div>
    );
}
