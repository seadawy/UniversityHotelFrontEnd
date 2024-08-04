import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { Galleria } from 'primereact/galleria';
import { useParams } from 'react-router-dom';
import { FaRegSnowflake } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { IoMdBed } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useAuthContext } from '../Auth/useAuthContext';

export default function RoomDetails() {
    const { token } = useAuthContext();
    const [room, setRoom] = useState(null);
    const [price, setPrice] = useState(0);
    const today = new Date();

    const [invalidDates, setInvalidDates] = useState([
        new Date("2024/8/20"),
    ])
    const { id } = useParams();
    useEffect(() => {
        fetch(`/api/Rooms/${id}`).then(res => res.json()).then(data => {
            setRoom(data)
            setPrice(data.price);
        }).catch(err => console.error(err));
    }, [id]);

    const itemTemplate = (item) => {
        return (
            <div className='h-full w-full overflow-hidden flex justify-center items-center'>
                <img
                    src={`http://localhost:5231/Rooms/Images/${item.image}`}
                    className='h-full w-full object-cover rounded-md'
                    alt={item.id}
                    style={{ display: 'block' }}
                />
            </div>
        );
    }

    //Request Handeling
    const [ndays, setNdays] = useState(0);
    const [bill, setBill] = useState(0);
    const [dateRange, setDateRange] = useState(null);

    // Format the selected date for display
    const formatDate = (date) => {
        if (!date) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ar', options);
    };

    // Calculate the number of days between two dates
    const calculateDays = (from, to) => {
        if (!from || !to) return 0;
        const diffTime = Math.abs(to - from);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    // Update the bill whenever the date range or price changes
    useEffect(() => {
        if (dateRange) {
            const days = calculateDays(dateRange[0], dateRange[1]);
            setNdays(days)
            setBill(price * days);
        }
    }, [price, dateRange])

    // Format the date to YYYY-MM-DD
    const formatDateForRequest = (date) => {
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
        return adjustedDate.toISOString().split('T')[0];
    }

    //Send Request
    const handelRequestForm = (e) => {
        e.preventDefault();
        const data = {
            "roomId": id,
            "startDate": formatDateForRequest(dateRange[0]),
            "endDate": formatDateForRequest(dateRange[1])
        }
        fetch('/api/BookRequests/AddBookRequest', {
            method: 'post', headers: {
                "authorization": `Bearer ${token}`,
                "content-type": 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <>
            {room &&
                <div className='flex flex-row-reverse w-full justify-between mt-20 px-8 gap-3'>
                    <div>
                        <Galleria
                            className='flex flex-1  '
                            value={room.images}
                            numVisible={3}
                            circular
                            style={{ maxWidth: '740px', width: '100%' }}
                            showItemNavigators
                            showThumbnails={false}
                            item={itemTemplate}
                        />
                    </div>
                    <div className='flex flex-col items-start w-1/3 gap-5'>
                        <h2 className='bg-gray-200 rounded-md py-5 font-bold px-5 shadow h-fit w-full flex items-center'>
                            <MdMeetingRoom className='text-3xl me-2' />
                            رقم الغرفه
                            &ensp;
                            <i className='pi pi-angle-left text-xl'></i>
                            &ensp;
                            <span>{room.roomNumber}</span>
                        </h2>
                        <h2 className='bg-gray-200 rounded-md font-bold py-5 px-5 shadow h-fit w-full flex items-center'>
                            <FaRegSnowflake className='text-2xl me-2' />
                            التكيف
                            &ensp;
                            <i className='pi pi-angle-left text-xl'></i>
                            &ensp;
                            {room.airConditioned ? (
                                <span className='text-green-600 py-2 text-sm rounded'>التكيف متوفر</span>
                            ) : (
                                <span className='text-red-600 py-2 text-sm rounded'>لا يوجد تكيف</span>
                            )}
                        </h2>
                        <h2 className='bg-gray-200 rounded-md font-bold py-5 px-5 shadow h-fit w-full flex items-center'>
                            <IoMdBed className='text-3xl me-2' />
                            عدد الأسرة
                            &ensp;
                            <i className='pi pi-angle-left text-xl'></i>
                            &ensp;
                            {room.numberOfBeds}
                        </h2>
                        <h2 className='bg-gray-200 rounded-md font-bold py-5 px-5 shadow h-fit w-full flex items-center'>
                            <i className='text-2xl me-2 pi-money-bill pi' />
                            السعر
                            &ensp;
                            <i className='pi pi-angle-left text-xl'></i>
                            &ensp;
                            {room.price}
                            &ensp;
                            لليوم
                        </h2>
                    </div>
                </div>
            }
            <div className='flex justify-between px-8 my-5 gap-2'>
                <div className='bg-blue-200 flex flex-col items-center rounded-md shadow p-5 w-2/6'>
                    <h2 className='text-center text-2xl font-bold mb-5'>تفاصيل الحجز</h2>
                    <form action="" onSubmit={(e) => handelRequestForm(e)}>
                        <div className='flex items-center mb-3'>
                            <label htmlFor="ndays" className='text-2xl me-5'> عدد الايام المحجوزه </label>
                            <input type="text" id='ndays' className='bg-gray-100 border-prime shadow border-2 p-2 rounded-xl w-28 text-center text-2xl' disabled value={ndays} />
                        </div>

                        <div className='flex items-center mb-3'>
                            <label htmlFor="bill" className='text-2xl me-5'>الدفع</label>
                            <input type="text" id='bill' className='bg-gray-100 border-prime shadow border-2 p-2 rounded-xl w-24 text-center text-xl' disabled value={bill} />
                            <span className='text-xl ms-3'>جنيه مصرى</span>
                        </div>
                        <div className='flex items-center mb-3'>
                            <label htmlFor="fromDate" className='text-2xl me-5'>من </label>
                            {dateRange && <input
                                type="text"
                                id='toDate'
                                className='bg-gray-100 border-prime border-2 shadow p-2 rounded-xl w-60 text-center text-2xl'
                                disabled
                                value={formatDate(dateRange[0])}
                            />}
                        </div>

                        <div className='flex items-center mb-6'>
                            <label htmlFor="toDate" className='text-2xl me-5'>إلى</label>
                            {dateRange && <input
                                type="text"
                                id='toDate'
                                className='bg-gray-100 border-prime border-2 shadow p-2 rounded-xl w-60 text-center text-2xl'
                                disabled
                                value={formatDate(dateRange[1])}
                            />}
                        </div>
                        <button type='submit' className='bg-prime w-full py-3 rounded text-2xl text-white'>إرسال طلب حجز</button>
                    </form>
                </div>
                <div className='w-4/6 ps-5'>
                    <Calendar className='w-full' minDate={today} value={dateRange} onChange={(e) => setDateRange(e.value)} selectionMode="range" disabledDates={invalidDates} inline />
                </div>
            </div>
        </>
    );
}
