import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuthContext } from "../Auth/useAuthContext";
import { Message } from 'primereact/message';
import { useParams } from 'react-router-dom';

const RoomsEdit = () => {
    const { token } = useAuthContext();
    const { id } = useParams();
    const inputStyle = `block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;
    const labelStyle = `block tracking-wide text-grey-darker text-xl font-bold mb-2 ms-1`;
    const [ragions, setRagions] = useState([]);

    const [RoomNumber, setRoomNumber] = useState("");
    const [NumberOfBeds, setNumberOfBeds] = useState("");
    const [AirConditioned, setAirConditioned] = useState(false);
    const [Price, setPrice] = useState("");
    const [PriceStuff, setPriceStuff] = useState("");
    const [RegionId, setRegionId] = useState("");
    const [RoomImage, setRoomImage] = useState([]);

    useEffect(() => {
        fetch('/api/HotelRegions')
            .then(res => res.json())
            .then(data => setRagions(data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`/api/Rooms/${id}`)
            .then(res => res.json())
            .then(data => {
                setRoomNumber(data.roomNumber || "");
                setRoomImage(data.images || []);
                setNumberOfBeds(data.numberOfBeds || "");
                setAirConditioned(data.airConditioned || false);
                setPrice(data.guestPrice || "");
                setPriceStuff(data.stuffPrice || "");
                setRegionId(data.regionId || "");
            })
            .catch(err => console.log(err));
    }, [id]);

    // Images
    const [images, setImages] = useState([]);
    const onDrop = useCallback(acceptedFiles => {
        setImages(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess(false);
                setError(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    const validateForm = () => {
        if (!RoomNumber || !NumberOfBeds || !Price || !PriceStuff || !RegionId) {
            setError(true);
            return false;
        }
        return true;
    }

    const submithandeling = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const data = new FormData();
        data.append("RoomNumber", RoomNumber);
        data.append("NumberOfBeds", NumberOfBeds);
        data.append("AirConditioned", AirConditioned);
        data.append("GuestPrice", Price);
        data.append("StuffPrice", PriceStuff);
        data.append("RegionId", RegionId);
        images.forEach(file => {
            data.append("Images", file);
        });

        fetch(`/api/Rooms/UpdateRoom/${id}`, {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${token}`
            },
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if (data.errors || data.message) {
                    setError(true);
                } else {
                    setSuccess(true);
                }
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
            });
    };

    const DelImg = (imgId) => {
        fetch(`/api/RoomImages`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ "id": imgId })
        })
            .then(res => {
                if (res.ok) {
                    setRoomImage(RoomImage.filter(img => img.id !== imgId));
                } else {
                    setError(true);
                }
            })
            .catch(err => setError(true));
    };

    return (
        <div className="mt-20 mx-3">
            <div className="border-2 bg-white border-gray-400 rounded p-3 flex flex-row items-center select-none shadow-md">
                <i className="pi pi-home text-2xl mx-2"></i>
                <span className="text-xl font-bold text-gray-800">لوحةالتحكم</span>
                <i className="pi pi-angle-left text-2xl text-gray-400 mx-2"></i>
                <span className="text-xl font-bold text-gray-800"> إدارة الغرف </span>
                <i className="pi pi-angle-left text-2xl text-gray-400 mx-2"></i>
                <span className="text-xl font-bold text-gray-800"> تعديل غرفة </span>
            </div>
            <div className="mt-5">
                <form onSubmit={submithandeling} className="relative bg-white px-12 py-5 shadow">
                    <h2 className="text-center text-3xl mb-10 font-bold">تعديل غرفة</h2>
                    <div className="flex gap-5 mb-6">
                        <div className="w-1/2">
                            <label htmlFor="RoomNumber" className={labelStyle}>رقم الغرفه</label>
                            <input
                                required
                                className={inputStyle}
                                id="RoomNumber"
                                type="text"
                                value={RoomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="NumberOfBeds" className={labelStyle}>عدد الأسرة</label>
                            <input
                                className={inputStyle}
                                id="NumberOfBeds"
                                type="number"
                                min={1}
                                value={NumberOfBeds}
                                onChange={(e) => setNumberOfBeds(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex gap-5 mb-6">
                        <div>
                            <label className={labelStyle}>مكيف</label>
                            <div className="flex items-center">
                                <input
                                    className="ml-2 w-8 h-8"
                                    id="AirConditionedYes"
                                    type="radio"
                                    name="AirConditioned"
                                    value={true}
                                    checked={AirConditioned === true}
                                    onChange={() => setAirConditioned(true)}
                                />
                                <label htmlFor="AirConditionedYes" className="ml-4 text-xl font-bold">نعم</label>
                                <input
                                    className="mr-4 w-8 h-8"
                                    id="AirConditionedNo"
                                    type="radio"
                                    name="AirConditioned"
                                    value={false}
                                    checked={AirConditioned === false}
                                    onChange={() => setAirConditioned(false)}
                                />
                                <label htmlFor="AirConditionedNo" className='mr-4 text-xl font-bold'>لا</label>
                            </div>
                        </div>
                        <div className='w-full mr-10'>
                            <label htmlFor="Price" className={labelStyle}>السعر</label>
                            <input
                                className={inputStyle}
                                id="Price"
                                min={1}
                                type="number"
                                value={Price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className='w-full mr-10'>
                            <label htmlFor="PriceStfu" className={labelStyle}>السعر للموظفين بالجامعه</label>
                            <input
                                className={inputStyle}
                                id="PriceStfu"
                                min={1}
                                type="number"
                                value={PriceStuff}
                                onChange={(e) => setPriceStuff(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="RegionId" className={labelStyle}>معرف المنطقة</label>
                        <select
                            className={`${inputStyle} py-3.5`}
                            id="RegionId"
                            value={RegionId}
                            onChange={(e) => setRegionId(e.target.value)}
                        >
                            {ragions.map((ele) => (
                                <option className='text-xl' key={ele.id} value={ele.id}>{ele.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="fileinput" className={labelStyle}>صور الغرفه</label>
                        <div {...getRootProps()} className='bg-blue-50 p-5 rounded shadow mb-3 border-4 border-dashed border-prime'>
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center gap-5">
                                <div className='flex flex-wrap gap-5'>
                                    {
                                        isDragActive ? <>
                                            <i className='pi pi-image text-8xl text-gray-500'></i>
                                            <p className='text-center text-2xl font-alex tracking-wide font-Alex text-gray-500'>اضف هذه الملفات</p>
                                        </> : (images.length ? images.map((ele, index) => (
                                            <img className='h-28 max-w-40 shadow rounded-md border-2 border-prime' key={index} src={URL.createObjectURL(ele)} alt='room image' />
                                        )) : <p className='text-center text-2xl font-alex tracking-wide font-Alex text-gray-500'>اسحب الصور او اضغط لأختيار الصور</p>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-100 flex gap-2 p-2 rounded shadow mb-2'>
                            {RoomImage && RoomImage.map((img, si) => (
                                <div key={si} className='relative group cursor-pointer' onClick={() => DelImg(img.id)}>
                                    <img
                                        className='w-32 rounded-md shadow'
                                        src={`http://localhost:5231/Rooms/Images/${img.image}`}
                                        alt='Room'
                                    />
                                    <div className='bg-red-700 bg-opacity-75 rounded-md absolute top-0 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        <i className='pi pi-trash text-3xl text-white'></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='relative flex w-full justify-end'>
                        {success && <Message className="absolute border-teal-800 text-teal-950 bg-teal-100 p-2 border-r-8 bottom-0 right-0 w-fit"
                            severity="info"
                            content={
                                <div className="flex justify-start items-center">
                                    <i className='pi pi-check-circle text-3xl mx-5'></i>
                                    <div className="ml-2">تم تعديل الغرفة {RoomNumber} بنجاح</div>
                                </div>
                            }
                        />}
                        {error && <Message className="absolute border-red-800 bg-red-100 p-2 border-r-8 bottom-0 right-0 w-fit"
                            severity="error"
                            content={
                                <div className="flex justify-start items-center">
                                    <i className='pi pi-times text-3xl mx-5'></i>
                                    <div className="ml-2">
                                        <li>لم يتم تعديل الغرفة بسبب حدوث خطأ</li>
                                        <li>تأكد من ملئ كل الحقول المطلوبة</li>
                                    </div>
                                </div>
                            }
                        />}
                        <button type="submit" className="mt-2 px-5 py-3 bg-prime text-white rounded-md hover:bg-prime-h flex" disabled={loading}>
                            {!loading ? "تعديل الغرفة" : <i className='pi pi-spin pi-spinner text-xl'></i>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RoomsEdit;
