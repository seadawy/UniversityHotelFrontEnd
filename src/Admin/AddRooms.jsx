import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useAuthContext } from "../Auth/useAuthContext";

const AddRooms = () => {
    const { token } = useAuthContext();

    const inputStyle = `block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;
    const labelStyle = `block tracking-wide text-grey-darker text-xl font-bold mb-2 ms-1`;
    const [ragions, setRagions] = useState();
    useEffect(() => {
        fetch('/api/HotelRegions').then(res => res.json()).then((data) => {
            setRagions(data);
        }).catch((err) => console.log(err));
    }, []);

    const [RoomNumber, setRoomNumber] = useState("");
    const [NumberOfBeds, setNumberOfBeds] = useState("");
    const [AirConditioned, setAirConditioned] = useState(false);
    const [Price, setPrice] = useState("");
    const [RegionId, setRegionId] = useState("");

    // Images
    const [images, setImages] = useState([]);
    const onDrop = useCallback(acceptedFiles => {
        setImages(acceptedFiles);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const submithandeling = (e) => {
        e.preventDefault();
    };

    return (
        <div className="mt-20 mx-3">
            <div className="border-2 bg-white border-gray-400 rounded py-1.5 px-3 flex flex-row items-center select-none shadow-md">
                <i className="pi pi-home text-2xl mx-2"></i>
                <span> لوحة التحكم </span>
                <i className="pi pi-angle-left text-2xl text-gray-400 mx-2"></i>
                <span> إدارة الغرف </span>
                <i className="pi pi-angle-left text-2xl text-gray-400 mx-2"></i>
                <span> إضافة غرفة جديده </span>
            </div>
            <div className="mt-5">
                <form onSubmit={submithandeling} className="bg-white px-12 py-5 shadow">
                    <h2 className="text-center text-3xl mb-10 font-bold">إضافة غرفة جديدة</h2>
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
                                    className="mr-4 w-8 h-8 "
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
                                type="number"
                                value={Price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="RegionId" className={labelStyle}>معرف المنطقة</label>
                        <select
                            className={`${inputStyle} py-3.5`}
                            id="RegionId"
                            type="number"
                            value={RegionId}
                            onChange={(e) => setRegionId(e.target.value)}
                        >
                            <option className='text-xl' selected>اختار منطقه</option>
                            {ragions && ragions.map((ele) => (
                                <option className='text-xl' key={ele.id} value={ele.id}>{ele.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fileinput" className={labelStyle}>صور الغرفه</label>
                        <div {...getRootProps()} className='bg-blue-50 p-5 rounded shadow mb-8 border-4 border-dashed border-prime'>
                            <input {...getInputProps()} />
                            <dir className="flex flex-col items-center gap-5">

                                <div className='flex gap-5'>
                                    {
                                        isDragActive ? <>
                                            <i className='pi pi-image text-8xl text-gray-500'></i>
                                            <p className='text-center text-2xl font-alex tracking-wide font-Alex text-gray-500'>اضف هذه الملفات</p>
                                        </> : (images ? images.map((ele) => (<img className=' h-28 max-w-40 shadow rounded-md border-2 border-prime' src={URL.createObjectURL(ele)} alt='room image' />))
                                            : <p className='text-center text-2xl font-alex tracking-wide font-Alex text-gray-500'>اسحب الصور او اضغط لأختيار الصور</p>)
                                    }
                                </div>
                            </dir>
                        </div>
                    </div>
                    <div className='flex justify-end w-full'>
                        <button type="submit" className="mt-2 px-5 py-2 bg-prime text-white rounded-md hover:bg-prime-h">إضافة الغرفة</button>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default AddRooms;
