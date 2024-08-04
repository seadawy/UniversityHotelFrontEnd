import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuthContext } from '../Auth/useAuthContext';
import { Tag } from 'primereact/tag';

export default function Requests() {
    const { token } = useAuthContext();
    const [Request, setRequestes] = useState();
    useEffect(() => {
        fetch('/api/BookRequests/GetUserBooks', {
            headers: {
                "authorization": `Bearer ${token}`
            },
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setRequestes(data);
            }
            setRequestes(data);
        }).catch(err => console.log(err));
    }, []);

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
    return (
        <>
            <h1 className='mt-20 mb-2 font-bold mx-10 text-4xl'>سجل الطلبات</h1>
            <DataTable value={Request} showGridlines >
                <Column field="roomId" className='w-32 text-center  font-bold' header="رقم الغرفه" />
                <Column field="price" className='text-center font-medium' header="السعر" body={(rowData) => (rowData.price).toLocaleString('ar-EG', { style: 'currency', currency: 'EGP' })} />
                <Column header="الحالة" className='text-center font-medium px-0' body={statusTemplate} />
                <Column field="bookedAt" className='text-center font-medium px-0' header="استلم فى" body={(rowData) => new Date(rowData.bookedAt).toLocaleDateString('ar-EG')} />
                <Column field="startDate" className='text-center font-medium bg-green-50 px-0' header="من يوم" body={(rowData) => new Date(rowData.startDate).toLocaleDateString('ar-EG')} />
                <Column field="endDate" className='text-center font-medium bg-green-50 px-0' header="الى يوم" body={(rowData) => new Date(rowData.endDate).toLocaleDateString('ar-EG')} />
            </DataTable>
        </>
    );
}
