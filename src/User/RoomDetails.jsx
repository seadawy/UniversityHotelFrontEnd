import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { Galleria } from 'primereact/galleria';
import { Link, useParams } from 'react-router-dom';
import { FaRegSnowflake } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { IoMdBed } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useAuthContext } from '../Auth/useAuthContext';

export default function RoomDetails() {
    const { token, user } = useAuthContext();
    const [room, setRoom] = useState(null);
    const [price, setPrice] = useState(0);
    const today = new Date();
    const [success, setSucess] = useState(false);
    const [err, setErr] = useState(false);
    const [invalidDates, setInvalidDates] = useState([])
    const { id } = useParams();
    useEffect(() => {
        fetch(`/api/Rooms/${id}`).then(res => res.json()).then(data => {
            setRoom(data)
            setPrice(user.isEmployee ? data.stuffPrice : data.guestPrice);
            const dateObjects = data.roomTimes.map(dateString => new Date(dateString));
            setInvalidDates(dateObjects)
        }).catch(err => console.error(err));
    }, [id, success]);

    const itemTemplate = (item) => {
        return (
            <div className='h-full w-full overflow-hidden flex justify-center items-center'>
                <img
                    src={`https://localhost:44356/Rooms/Images/${item.image}`}
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
    useEffect(() => {
        setTimeout(() => {
            setErr(false);
        }, 5000)
    }, [success, err]);
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
            setSucess(true);
            setDateRange(null);
            setBill(0);
            setNdays(0);
        }).catch(err => {
            console.error(err);
            setErr(true);
        }).finally(() => {
            setPrice('');
            setBill('');
            setDateRange(null);
            setNdays('');
        })
    }

    return (
        <>
            {room && (
                <div className="overflow-hidden mt-20 mx-5">
                    <h2 className='justify-center items-center my-10 mb-4 flex'>
                        <MdMeetingRoom className='text-8xl' />
                        <span className='text-7xl'>{room.roomNumber}</span>
                    </h2>

                    <div className="flex flex-col gap-3 sm:flex-row-reverse">
                        <div className="relative flex-1">
                            <Galleria
                                value={room.images}
                                numVisible={3}
                                circular
                                showItemNavigators
                                showThumbnails={false}
                                item={itemTemplate}
                            />
                        </div>
                        <div className="flex flex-col items-start w-full sm:w-1/3 gap-5">
                            <h2 className="bg-gray-200 rounded-md font-bold py-5 px-5 shadow h-fit w-full flex items-center">
                                <FaRegSnowflake className="text-2xl me-2" />
                                التكيف
                                &ensp;
                                <i className="pi pi-angle-left text-xl"></i>
                                &ensp;
                                {room.airConditioned ? (
                                    <span className="text-green-600 py-2 text-sm rounded">التكيف متوفر</span>
                                ) : (
                                    <span className="text-red-600 py-2 text-sm rounded">لا يوجد تكيف</span>
                                )}
                            </h2>
                            <h2 className="bg-gray-200 rounded-md font-bold py-5 px-5 shadow h-fit w-full flex items-center">
                                <IoMdBed className="text-3xl me-2" />
                                عدد الأسرة
                                &ensp;
                                <i className="pi pi-angle-left text-xl"></i>
                                &ensp;
                                {room.numberOfBeds}
                            </h2>
                            <h2 className="bg-gray-200 rounded-md font-bold py-5 px-5 shadow h-fit w-full flex items-center">
                                <FaLocationDot className="text-3xl me-2" />
                                المنطقه
                                &ensp;
                                <i className="pi pi-angle-left text-xl"></i>
                                &ensp;
                                {room.regionName}
                            </h2>
                            <h2 className="bg-gray-200 rounded-md font-bold py-5 px-5 shadow h-fit w-full flex items-center">
                                <i className="text-2xl me-2 pi-money-bill pi" />
                                السعر
                                &ensp;
                                <i className="pi pi-angle-left text-xl"></i>
                                &ensp;
                                {price}
                                &ensp;
                                لليوم
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse lg:flex-row justify-between my-5 gap-5">
                        <div className="bg-blue-200 relative flex flex-col items-center rounded-md shadow p-5 w-full gap-5 sm:w-2/6">
                            <h2 className="text-center text-3xl font-bold mt-2 mb-5">إرسال طلب حجز</h2>
                            {success && (
                                <div className="absolute bg-green-400 top-0 rounded-md shadow flex flex-col justify-center items-center w-full h-full gap-5">
                                    <i className="pi pi-verified text-8xl text-white"></i>
                                    <span className="text-2xl font-semibold text-white">تم ارسال طلبك</span>
                                    <span className="text-xl font-semibold text-center text-white">
                                        تابع طلبك من خلال
                                        <br />
                                        <Link to="/requests" className='underline-offset-8 underline font-Alex text-2xl hover:text-gray-500'>
                                            صفحة الطلبات
                                        </Link>
                                    </span>
                                </div>
                            )}
                            {err && (
                                <div className="absolute bg-red-400 top-0 rounded-md shadow flex flex-col justify-center items-center w-full h-full gap-5">
                                    <i className="pi pi-times text-8xl text-white"></i>
                                    <span className="text-2xl font-semibold text-white">فشل فى الارسال</span>
                                    <span className="text-lg font-semibold text-center text-white">
                                        يجب اختار فتره لا تحتوى
                                        <br />
                                        على ايام محجوزه
                                    </span>
                                </div>
                            )}
                            <form action="" className="" onSubmit={(e) => handelRequestForm(e)}>
                                <div className="flex items-center mb-3">
                                    <label htmlFor="ndays" className="text-2xl me-2">
                                        عدد الايام المحجوزه
                                    </label>
                                    <input
                                        type="text"
                                        id="ndays"
                                        className="bg-blue-50 shadow py-1 rounded w-20 text-center text-2xl"
                                        disabled
                                        value={ndays}
                                    />
                                    <span className='text-xl ms-2'>
                                        يوم
                                    </span>
                                </div>
                                <div className="flex items-center mb-3">
                                    <label htmlFor="bill" className="text-2xl me-10">
                                        المبلغ الاجمالى
                                    </label>
                                    <input
                                        type="text"
                                        id="bill"
                                        className="bg-blue-50 shadow py-1 rounded w-20 text-center text-2xl"
                                        disabled
                                        value={bill}
                                    />
                                    <span className="text-xl ms-3">جنيه </span>
                                </div>
                                <div className="flex items-center mb-3">
                                    <label htmlFor="fromDate" className="text-2xl me-5">
                                        من
                                    </label>
                                    {dateRange ? (
                                        <input
                                            type="text"
                                            id="toDate"
                                            className="bg-blue-50 shadow py-1 rounded w-full text-center text-2xl"
                                            disabled
                                            value={formatDate(dateRange[0])}
                                        />
                                    ) : (<input
                                        type="text"
                                        id="toDate"
                                        className="bg-blue-50 shadow py-1 rounded w-full text-center text-2xl"
                                        disabled
                                    />)}
                                </div>
                                <div className="flex items-center mb-6">
                                    <label htmlFor="toDate" className="text-2xl me-5">
                                        إلى
                                    </label>
                                    {dateRange ? (
                                        <input
                                            type="text"
                                            id="toDate"
                                            className="bg-blue-50 shadow py-1 rounded w-full text-center text-2xl"
                                            disabled
                                            value={formatDate(dateRange[1])}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            id="toDate"
                                            className="bg-blue-50 shadow py-1 rounded w-full text-center text-2xl"
                                            disabled
                                        />
                                    )}
                                </div>
                                <button type="submit" className="bg-prime w-full py-3 rounded text-2xl text-white">
                                    إرسال طلب حجز
                                </button>
                            </form>
                        </div>
                        <div className="w-full lg:w-4/6">
                            <Calendar
                                className="w-full"
                                minDate={today}
                                value={dateRange}
                                onChange={(e) => setDateRange(e.value)}
                                selectionMode="range"
                                disabledDates={invalidDates}
                                inline
                            />
                        </div>
                    </div>
                </div>

            )}
        </>
    );
}
