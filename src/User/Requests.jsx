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
    const [statusFilter, setStatusFilter] = useState([]);

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
        if (rowData.isRejected) {
            return <Tag severity="danger" value="مرفوض" />;
        } else if (rowData.checkin) {
            return <Tag severity="info" value="تم الاستلام" />;
        } else if (rowData.isApproved) {
            return <Tag severity="success" value="مقبول" />;
        } else if (rowData.checkout) {
            return <Tag severity="info" value="تم المغادرة" />;
        } else {
            return <Tag severity="warning" value="انتظار" />;
        }
    };

    const filteredRequests = statusFilter && requests.length
        ? requests.filter(request => {
            if (statusFilter === 'تم المغادرة') return request.checkout;
            if (statusFilter === 'تم التسجيل') return request.checkin;
            if (statusFilter === 'اكتمل') return request.isApproved;
            if (statusFilter === 'انتظار الموافقة') return !request.isApproved && !request.checkout && !request.checkin;
            return true;
        })
        : (requests.length ? requests : []);

    const FirstCol = (rowData) => (
        <Link className='underline underline-offset-2 hover:text-prime' to={`/rooms/${rowData.roomId}`} >
            {rowData.roomNmber}
        </Link>
    );

    return (
        <>
            <div className='flex flex-col items-center justify-center bg-white sm:mx-8 mt-32 rounded-md pt-5 shadow-lg'>
                <h1 className='font-bold sm:mx-10 text-4xl sm:text-start sm:w-full sm:ps-10 mb-6 font-Beiruti'>سِجل الطلبات</h1>
                <div className='w-full flex justify-end px-10 sm:pe-7'>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        placeholder="حدد الحالة"
                        className="w-full md:w-1/4 p-inputtext-sm border border-gray-300 rounded-md py-2.5 shadow-sm"
                    >
                        <option value="انتظار">انتظار</option>
                        <option value="مقبول">مقبول</option>
                        <option value="مرفوض">مرفوض</option>
                        <option value="غادر">غادر</option>
                    </select>
                </div>
                <div className='w-full'>
                    <DataTable
                        dataKey="id"
                        value={filteredRequests}
                        paginator rows={10}
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
