import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuthContext } from '../Auth/useAuthContext';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { Link } from 'react-router-dom';

export default function Requests() {
    const { token } = useAuthContext();
    const [requests, setRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState(null);

    useEffect(() => {
        fetch('/api/BookRequests/GetUserBooks', {
            headers: {
                "authorization": `Bearer ${token}`
            },
        }).then(res => res.json()).then(data => {
            if (!data.messagge) {
                setRequests(data);
            }
        }).catch(err => console.log(err));
    }, [token]);

    const statusTemplate = (rowData) => {
        if (rowData.checkout) {
            return <Tag severity="info" value="تم المغادرة" />;
        } else if (rowData.checkin) {
            return <Tag severity="info" value="تم التسجيل" />;
        } else if (rowData.isApproved) {
            return <Tag severity="success" value="اكتمل" />;
        } else {
            return <Tag severity="warning" value="انتظار الموافقة" />;
        }
    };

    const filteredRequests = statusFilter
        ? requests.filter(request => {
            if (statusFilter === 'تم المغادرة') return request.checkout;
            if (statusFilter === 'تم التسجيل') return request.checkin;
            if (statusFilter === 'اكتمل') return request.isApproved;
            if (statusFilter === 'انتظار الموافقة') return !request.isApproved && !request.checkout && !request.checkin;
            return true;
        })
        : requests;

    const statusOptions = [
        { label: 'تم المغادرة', value: 'تم المغادرة' },
        { label: 'تم التسجيل', value: 'تم التسجيل' },
        { label: 'اكتمل', value: 'اكتمل' },
        { label: 'انتظار الموافقة', value: 'انتظار الموافقة' }
    ];

    const FirstCol = (rowData) => (
        <Link className='underline underline-offset-2 hover:text-prime' to={`/rooms/${rowData.roomId}`} >
            {rowData.roomNmber}
        </Link>
    );

    return (
        <>
            <h1 className='mt-32 mb-5 font-bold mx-10 text-4xl'>سجل الطلبات</h1>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-full flex justify-end px-10 sm:pe-7'>
                    <Dropdown
                        value={statusFilter}
                        options={statusOptions}
                        onChange={(e) => setStatusFilter(e.value)}
                        placeholder="حدد الحالة"
                        className="w-full md:w-1/4 p-inputtext-sm border border-gray-300 rounded-md shadow-sm"
                        aria-label="Filter by status"
                    />
                </div>
                <div className='w-full'>
                    <DataTable
                        dataKey="id"
                        value={filteredRequests}
                        paginator rows={6}
                        showGridlines
                        emptyMessage="لم يتم تسجيل أي طلبات حتى الآن"
                        className='min-w-full '
                    >
                        <Column field="roomNmber" className='w-32 text-center text-xl font-extrabold' header="رقم الغرفه" body={FirstCol} />
                        <Column field="price" className='text-center font-medium' header="السعر" body={(rowData) => rowData.price.toLocaleString('ar-EG', { style: 'currency', currency: 'EGP' })} />
                        <Column header="الحالة" className='text-center font-medium px-0' body={statusTemplate} />
                        <Column field="bookedAt" className='text-center font-medium px-0' header="استلم فى" body={(rowData) => new Date(rowData.bookedAt).toLocaleDateString('ar-EG')} />
                        <Column field="startDate" className='text-center font-medium bg-green-50 px-0' header="من يوم" body={(rowData) => new Date(rowData.startDate).toLocaleDateString('ar-EG')} />
                        <Column field="endDate" className='text-center font-medium bg-green-50 px-0' header="الى يوم" body={(rowData) => new Date(rowData.endDate).toLocaleDateString('ar-EG')} />
                    </DataTable>
                </div>
            </div>


        </>
    );
}
