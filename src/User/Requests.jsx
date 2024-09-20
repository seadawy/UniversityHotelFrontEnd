import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../Auth/useAuthContext';
import { Tag } from 'primereact/tag';
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';

export default function Requests() {
    const { token } = useAuthContext();
    const [requests, setRequests] = useState([]);
    const fetchReq = () => {
        fetch('http://hotelkfs.runasp.net/api/BookRequests/GetUserBooks', {
            headers: {
                "authorization": `Bearer ${token}`
            },
        }).then(res => {
            if (res.status == 404) {
                setRequests([]);
            } else {
                return res.json()
            }
        }).then(data => {
            if (!data.messagge) {
                setRequests(data);
            }
        }).catch(err => console.log(err));
    }
    useEffect(() => {
        fetchReq();
    }, [token]);

    const statusTemplate = (rowData) => {
        if (rowData.isRejected) {
            return <Tag severity="danger" className='min-w-24 rounded-xl' value="مرفوض" />;
        } else if (rowData.isDeleted) {
            return <Tag severity="danger" className='min-w-24 rounded-xl' value="ملفى" />;
        } else if (rowData.checkin) {
            return <Tag severity="info" className='min-w-24 rounded-xl' value="تم الاستلام" />;
        } else if (rowData.isApproved) {
            return <Tag severity="success" className='min-w-24 rounded-xl' value="مقبول" />;
        } else if (rowData.checkout) {
            return <Tag severity="info" className='min-w-24 rounded-xl' value="تم المغادرة" />;
        } else {
            return <Tag severity="warning" className='min-w-24 rounded-xl' value="انتظار" />;
        }
    };

    const FirstCol = (row) => (
        <Link className='underline underline-offset-2 text-2xl hover:text-prime' to={`/rooms/${row.roomId}`} >
            {row.roomNmber}
        </Link>
    );

    const CancelReq = (id) => {
        fetch(`http://hotelkfs.runasp.net/api/BookRequests/CancelBookRequest/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            if (res.status === 204) {
                fetchReq();
            } else {
                return res.json();
            }
        }).then(data => {
            if (data) {
                fetchReq();
            }
        }).catch(err => console.log(err));
    }

    const rqTable = [
        { name: "رقم الغرفة", selector: FirstCol, sortable: true, width: "150px" },
        { name: "الحاله", selector: statusTemplate, sortable: true, width: "180px" },
        { name: "السعر", selector: row => (row.price).toLocaleString('ar-EG', { style: 'currency', currency: 'EGP' }), sortable: true, width: "200px" },
        { name: "وقت الارسال", selector: row => new Date(row.bookedAt).toLocaleDateString('ar-EG'), sortable: true, width: "170px" },
        { name: "من", selector: row => new Date(row.startDate).toLocaleDateString('ar-EG'), sortable: true, width: "130px" },
        { name: "الى", selector: row => new Date(row.endDate).toLocaleDateString('ar-EG'), sortable: true, width: "150px" },
        {
            name: "الادوات", selector: row => (
                <>
                    {!row.isApproved && !row.isRejected && !row.isDeleted && !row.checkin && !row.checkout ?
                        <button className='bg-red-700 p-1.5 px-3 rounded text-white' onClick={() => CancelReq(row.id)} > الغاء</button> :
                        <p className='text-lg text-slate-500'>لا يوجد اجراء</p>
                    }
                </>
            )
        },
    ];

    return (
        <>
            <div className='bg-white sm:mx-4 mt-32 rounded-md sm:pt-5 shadow-lg'>
                <h1 className='font-bold text-4xl sm:text-start sm:w-full sm:ps-10 font-Beiruti'>سِجل الطلبات</h1>
                <div className='p-5'>
                    <DataTable
                        className="shadow-md"
                        columns={rqTable}
                        data={requests}
                        pagination
                        noDataComponent={<p className='py-3 bg-slate-100 w-full text-center text-xl font-Alex font-bold'>لا يوجد اى طلبات قيد الانتظار حاليا</p>}
                    />
                </div>
            </div>
        </>
    );
}
