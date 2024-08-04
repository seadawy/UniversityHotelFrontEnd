import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../Auth/useAuthContext';

export default function Profile() {
    const inputStyle = `block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;
    const labelStyle = `block tracking-wide text-grey-darker text-base font-bold mb-2`;

    const { user, refresh, setRefresh, token } = useAuthContext();

    // Forms States
    const [activeForm, setActiveForm] = useState('personalInfo');
    const [personalState, setPersonalState] = useState(true);
    const [nationalState, setNationalState] = useState(true);

    // Personal information
    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Address, setAddress] = useState('');

    // National information
    const [NationalId, setNationalId] = useState('');
    const [profile, setProfile] = useState('');
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    useEffect(() => {
        // Personal information
        setFullName(user.fullName);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setAddress(user.address);

        // National information
        setNationalId(user.nationalId);
        setProfile(`http://localhost:5231/Users/PI/${user.profilePic}`);
        setFront(`http://localhost:5231/Users/NI/${user.nationalPicFront}`);
        setBack(`http://localhost:5231/Users/NI/${user.nationalPicBack}`);
    }, [personalState, nationalState, user]);

    const [errors, setErrors] = useState({});

    const handleSubmitPersonalInfo = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("FullName", FullName);
        data.append("Email", Email);
        data.append("PhoneNumber", PhoneNumber);
        data.append("Address", Address);

        fetch('/api/HotelAuth/updateUserData', {
            method: 'PUT',
            headers: {
                "authorization": `Bearer ${token}`
            },
            body: data
        }).then(res => res.json()).then((data) => {
            setRefresh(!refresh)
        }).catch(err => console.log(err));
    };

    // Change Files
    const handleSubmitNationalInfo = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('NationalId', NationalId);
        data.append('ProfilePic', profile);
        data.append('NationalIdPicFront', front);
        data.append('NationalIdPicBack', back);

        fetch('/api/HotelAuth/updateNationalData', {
            method: 'PUT',
            headers: {
                "authorization": `Bearer ${token}`
            },
            body: data
        }).then(res => res.json()).then((data) => {
            setRefresh(!refresh)
        }).catch(err => console.log(err));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile(file);
        }
    };
    const handleFrontFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFront(file);
        }
    };
    const handleBackFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBack(file);
        }
    };


    // Change Password
    const [oldpassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [passwordChangeError, setPasswordChangeError] = useState();
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState();
    const confPasswordHadel = (e) => {
        if (e.target.value !== password) {
            setErrors({ ...errors, ConfPass: "كلمة المرور غير مطابقه" })
        } else {
            setErrors({ ...errors, ConfPass: null })
        }
        setConfPassword(e.target.value);
    }
    const handleSubmitChangePassword = (e) => {
        e.preventDefault();
        const data = {
            "OldPwd": oldpassword,
            "NewPwd": password
        };
        fetch('api/HotelAuth/updatePwd', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }, body: JSON.stringify(data)
        }).then(res => res.json()).then((data) => {
            if (data.message) {
                setPasswordChangeError(true);
                setPasswordChangeSuccess(false);
            } else {
                setPasswordChangeError(false);
                setPasswordChangeSuccess(true);
            }
        })
    };

    return (
        <div className="sm:flex mt-[75px] sm:mx-10 justify-evenly gap-5">
            <div className="bg-white rounded shadow-md sm:px-16 h-fit py-10 sm:sticky sm:top-20 flex flex-col items-center justify-center sm:order-2 select-none">
                <img
                    className="object-cover w-52 h-52 p-1 rounded-full ring-2 ring-prime-lh select-none"
                    src={user.profilePic ? profile : "img/defaultProfile.webp"}
                    alt="Bordered avatar"
                />
                <div className="flex sm:flex-col gap-2 mt-5">
                    <button
                        type="button"
                        className="py-3.5 px-2 sm:w-48 text-base font-medium text-indigo-100 focus:outline-none
                         bg-prime rounded-lg border border-indigo-200 hover:bg-indigo-900 
                         focus:z-10 focus:ring-4 focus:ring-indigo-200"
                        onClick={() => setActiveForm('personalInfo')}
                    >
                        المعلومات الشخصية
                    </button>
                    <button
                        type="button"
                        className="py-3.5 px-2 sm:w-48 text-base font-medium text-indigo-100 focus:outline-none
                         bg-prime rounded-lg border border-indigo-200 hover:bg-indigo-900 
                         focus:z-10 focus:ring-4 focus:ring-indigo-200"
                        onClick={() => setActiveForm('nationalInfo')}
                    >
                        المعلومات القومية
                    </button>
                    <button
                        type="button"
                        className="py-3.5 px-2 sm:w-48 text-base font-medium text-indigo-100 focus:outline-none
                         bg-prime rounded-lg border border-indigo-200 hover:bg-indigo-900 
                         focus:z-10 focus:ring-4 focus:ring-indigo-200"
                        onClick={() => setActiveForm('changePassword')}
                    >
                        تغير كلمة المرور
                    </button>
                </div>
            </div>
            <div className="bg-white rounded shadow-md px-10 sm:py-5 pt-2 pb-20 w-full items-center text-prime sm:order-1">
                {activeForm === 'personalInfo' && (
                    <form onSubmit={handleSubmitPersonalInfo}>
                        <h2 className='font-bold my-5 sm:my-10'>المعلومات الشخصيه للمستخدم</h2>
                        <div className="mb-4 sm:mb-6">
                            <label htmlFor="fullName" className={labelStyle}>
                                الاسم كامل
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                className={inputStyle}
                                value={FullName}
                                onChange={(e) => setFullName(e.target.value)}
                                disabled={personalState}
                            />
                        </div>
                        <div className="mb-4 sm:mb-6">
                            <label htmlFor="address" className={labelStyle}>
                                العنوان
                            </label>
                            <input
                                type="text"
                                id="address"
                                className={inputStyle}
                                value={Address}
                                onChange={(e) => setAddress(e.target.value)}
                                disabled={personalState}
                            />
                        </div>
                        <div className="mb-4 sm:mb-6">
                            <label htmlFor="email" className={labelStyle}>
                                البريد الالكترونى
                            </label>
                            <input
                                type="email"
                                id="email"
                                className={inputStyle}
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={personalState}
                            />
                        </div>
                        <div className="mb-4 sm:mb-6">
                            <label htmlFor="phoneNmber" className={labelStyle}>
                                رقم الهاتف
                            </label>
                            <input
                                type="text"
                                id="phoneNmber"
                                className={inputStyle}
                                value={PhoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                disabled={personalState}
                            />
                        </div>
                        <div className='flex flex-row-reverse gap-3'>
                            <button
                                type={(personalState ? 'submit' : 'button')}
                                className="text-white bg-prime-h hover:bg-prime-lh focus:ring-4 focus:outline-none float-end
                            focus:ring-blue-700-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-5"
                                onClick={() => setPersonalState(!personalState)}
                            >
                                {personalState ? (<><i className='pi pi-pen-to-square'></i> تعديل</>) : (<><i className='pi pi-save'></i> حفظ</>)}
                            </button>
                            {!personalState && <button
                                type={(personalState ? 'submit' : 'button')}
                                className="text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:outline-none float-end
                                focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-5"
                                onClick={() => setPersonalState(!personalState)}
                            >
                                الغاء
                            </button>}
                        </div>
                    </form>
                )}
                {activeForm === 'nationalInfo' && (
                    <form onSubmit={handleSubmitNationalInfo}>
                        <h2 className='font-bold my-5 sm:my-10'>المعلومات القومية</h2>
                        <div className="mb-4 sm:mb-6">
                            <label htmlFor="nationalID" className={labelStyle}>
                                الرقم القومى
                            </label>
                            <input
                                type="text"
                                id="nationalID"
                                className={inputStyle}
                                value={NationalId}
                                onChange={(e) => setNationalId(e.target.value)}
                                disabled={nationalState}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className={labelStyle}
                                htmlFor="file_input"
                            >
                                الصورة الشخصية
                            </label>
                            <label htmlFor="file_input"
                                className="block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-hidden" >
                                <span className='bg-gray-300 p-4 -ms-3 mx-4'>اختار صوره</span>
                                {front && front.name}
                            </label>
                            <input
                                className="hidden"
                                id="file_input"
                                name="file_input"
                                type="file"
                                onChange={handleFileChange}
                                disabled={nationalState}
                            />
                            {errors.NationalIdPicFront && <p className="text-red-500 text-sm m-1 tracking-wider">تأكد من اضافة صوره البطاقة</p>}
                        </div>

                        <div className="-mx-3 md:flex mb-3">
                            {/* Front Card */}
                            <div className="md:w-1/2 px-3 mt-1">
                                <label
                                    className={labelStyle}
                                    htmlFor="file_input_front"
                                >
                                    صورة البطاقة الشخصيه من الامام
                                </label>
                                <label htmlFor="file_input_front"
                                    className="block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-hidden" >
                                    <span className='bg-gray-300 p-4 -ms-3 mx-4'>اختار صوره</span>
                                    {front && front.name}
                                </label>
                                <input
                                    className="hidden"
                                    id="file_input_front"
                                    name="file_input_front"
                                    type="file"
                                    onChange={handleFrontFileChange}
                                    disabled={nationalState}
                                />
                                <img src={front} alt="front ID" className='mt-3 rounded shadow border-4 border-prime' />
                                {errors.NationalIdPicFront && <p className="text-red-500 text-sm m-1 tracking-wider">تأكد من اضافة صوره البطاقة</p>}
                            </div>
                            <div className="md:w-1/2 px-3 mt-1">
                                <label
                                    className={labelStyle}
                                    htmlFor="file_input_back"
                                >
                                    صورة البطاقة الشخصيه من الخلف
                                </label>
                                <label htmlFor="file_input_back"
                                    className={`${inputStyle} overflow-hidden`} >
                                    <span className='bg-gray-300 p-4 -ms-3 mx-4'>اختار صوره</span>
                                    {back && back.name}
                                </label>
                                <input
                                    className="hidden"
                                    id="file_input_back"
                                    name='file_input_back'
                                    type="file"
                                    onChange={handleBackFileChange}
                                    disabled={nationalState}
                                />
                                <img src={back} alt="back ID" className='mt-3 rounded shadow border-4 border-prime' />
                                {errors.NationalIdPicBack && <p className="text-red-500 text-sm m-1 tracking-wider">تأكد من اضافة صوره لظهر البطاقة</p>}
                            </div>
                        </div>
                        <div className='flex flex-row-reverse gap-3'>
                            <button
                                type={(nationalState ? 'submit' : 'button')}
                                className="text-white bg-prime-h hover:bg-prime-lh focus:ring-4 focus:outline-none float-end
                                focus:ring-blue-700-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-5"
                                onClick={() => setNationalState(!nationalState)}
                            >
                                {nationalState ? (<><i className='pi pi-pen-to-square'></i> تعديل</>) : (<><i className='pi pi-save'></i> حفظ</>)}
                            </button>
                            {!nationalState && <button
                                type={(personalState ? 'submit' : 'button')}
                                className="text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:outline-none float-end
                                focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-5"
                                onClick={() => setNationalState(!nationalState)}
                            >
                                الغاء
                            </button>}
                        </div>
                    </form>
                )}
                {activeForm === 'changePassword' && (
                    <form onSubmit={handleSubmitChangePassword}>
                        {passwordChangeSuccess && (<div
                            className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                            role="alert"
                        >
                            <div className="flex items-center">
                                <div className="py-1 pe-4">
                                    <i className='pi pi-check-circle text-2xl'></i>
                                </div>
                                <p className="font-bold tracking-wider text-lg">تم تغير كلمة  المرور  بنجاح</p>
                            </div>
                        </div>
                        )}
                        {passwordChangeError && (<div
                            className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
                            role="alert"
                        >
                            <div className="flex items-center">
                                <div className="py-1 pe-4">
                                    <i className='pi pi-thumbs-down-fill text-2xl'></i>
                                </div>
                                <p className="font-bold tracking-wider text-lg">حدث خطأ اثناء تغير كلمة المرور تأكد من كلمة المرور السابقه</p>
                            </div>
                        </div>
                        )}
                        <h2 className='font-bold my-5 sm:my-10'>تغير كلمة المرور</h2>
                        <div className="mb-4 sm:mb-6">
                            <label htmlFor="oldpassword" className={labelStyle}>
                                كلمة المرور السابقه
                            </label>
                            <input
                                type="password"
                                id="oldpassword"
                                className={inputStyle}
                                value={oldpassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 sm:mb-6">
                            <label htmlFor="password" className={labelStyle}>
                                كلمة المرور الجديدة
                            </label>
                            <input
                                type="password"
                                id="password"
                                className={inputStyle}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 sm:mb-6">
                            <label htmlFor="confPassword" className={labelStyle}>
                                تأكيد كلمة المرور
                            </label>
                            <input
                                type="password"
                                id="confPassword"
                                className={inputStyle}
                                value={confPassword}
                                onChange={confPasswordHadel}
                            />
                            {errors.ConfPass && <p className="text-red-500 text-base mt-2">{errors.ConfPass}</p>}
                        </div>
                        <button
                            type="submit"
                            className="float-end text-white bg-prime-h hover:bg-prime-lh focus:ring-4 focus:outline-none 
                            focus:ring-blue-700-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-5"
                        >
                            <i className='pi pi-save'></i> حفظ
                        </button>
                    </form>
                )}
            </div>
        </div >
    );
}
