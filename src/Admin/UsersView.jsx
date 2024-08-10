import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Auth/useAuthContext";
import { Image } from 'primereact/image';
import { Message } from "primereact/message";

const UsersView = () => {
    const { token, user } = useAuthContext();
    const [person, setPerson] = useState({});
    const [errors, setErrors] = useState({});
    const [sucess, setSuccess] = useState();
    const [selectedRole, setSelectedRole] = useState('');
    const { id } = useParams();
    const [formState, setFormState] = useState(true);

    useEffect(() => {
        fetch(`/api/HotelAuth/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setPerson(data);
            })
            .catch(err => console.log(err));
    }, [id, token, sucess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedRole) {
            const data = {
                "userName": id,
                "role": selectedRole
            };
            fetch('/api/HotelAuth/addToRole', {
                method: "post",
                headers: {
                    "authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(data => {
                setSuccess(true);
            }).catch((err) => console.log(err));
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setSuccess(false);
        }, 5000)
    }, [sucess])
    if (!person) {
        return <div>جاري التحميل...</div>;
    }
    return (
        <>
            <div className="border-2 mt-20 bg-white border-gray-400 rounded p-3 flex flex-row items-center select-none shadow-md">
                <i className="pi pi-home text-3xl mx-2"></i>
                <span className="text-xl font-bold text-gray-800">لوحة التحكم</span>
                <i className="pi pi-angle-left text-3xl text-gray-400 mx-2"></i>
                <span className="text-xl font-bold text-gray-800">إدارة المستخدمين</span>
                <i className="pi pi-angle-left text-3xl text-gray-400 mx-2"></i>
                <span className="text-xl font-bold text-gray-800">عرض مستخدم</span>
            </div>
            <div className="bg-gray-100 flex flex-col mt-5 items-center justify-center min-h-screen">
                <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg">
                    <h1 className="text-4xl font-bold mb-8 text-center">تفاصيل المستخدم</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="pt-10">
                            <div className="mb-6 flex items-center">
                                <label className="font-semibold text-xl text-gray-700 w-36">الاسم الكامل</label>
                                <p className="text-2xl text-gray-900 p-3 border-2 w-full ms-3 rounded shadow-sm">{person.fullName}</p>
                            </div>
                            <div className="mb-6 flex items-center">
                                <label className="font-semibold text-xl text-gray-700 w-36">الرقم القومى</label>
                                <p className="text-2xl text-gray-900 p-3 border-2 w-full ms-3 rounded shadow-sm">{person.nationalId}</p>
                            </div>
                            <div className="mb-6 flex items-center">
                                <label className="font-semibold text-xl text-gray-700 w-36">حالة التوظيف</label>
                                <p className="text-2xl text-gray-900 p-3 border-2 w-full ms-3 rounded shadow-sm">{person.isEmployee ? "موظف بالجامعه" : "مستخدم"}</p>
                            </div>
                            <div className="mb-6 flex items-center">
                                <label className="font-semibold text-xl text-gray-700 w-36">رقم الهاتف</label>
                                <p className="text-2xl text-gray-900 p-3 border-2 w-full ms-3 rounded shadow-sm">{person.phoneNumber}</p>
                            </div>
                            <div className="mb-6 flex items-center">
                                <label className="font-semibold text-xl text-gray-700 w-36">البريد الإلكتروني</label>
                                <p className="text-2xl text-gray-900 p-3 border-2 w-full ms-3 rounded shadow-sm">{person.email}</p>
                            </div>
                            <div className="mb-6 flex items-center">
                                <label className="font-semibold text-xl text-gray-700 w-36">المحافظة</label>
                                <p className="text-2xl text-gray-900 p-3 border-2 w-full ms-3 rounded shadow-sm">{person.region}</p>
                            </div>
                            <div className="mb-6 flex items-center">
                                <label className="font-semibold text-xl text-gray-700 w-36">العنوان</label>
                                <p className="text-2xl text-gray-900 p-3 border-2 w-full ms-3 rounded shadow-sm">{person.address}</p>
                            </div>
                            <hr />
                            <hr />
                            <hr />
                            <hr />
                            <hr />
                            <hr />
                            <hr />
                            <hr />
                            {user.role == "SuperAdmin" && <>
                                <div className="my-5 flex items-center">
                                    <label className="font-semibold text-xl text-gray-700 w-36">الدور الحالى</label>
                                    <p className="text-2xl text-gray-900 p-3 border-2 w-full ms-3 rounded shadow-sm">{person.role}</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <h1 className="my-5 mb-2">تغير دور المستخدم على النظام</h1>
                                    <select className="border-2 shadow p-2 py-3 pe-5  rounded w-full" required disabled={formState}
                                        onChange={(e) => setSelectedRole(e.target.value)} value={selectedRole}>
                                        <option>اختار دور</option>
                                        <option value="Receptionist" className="text-lg">موظف استقبال</option>
                                        <option value="UniversityViceDean" className="text-lg">وكيل جامعة</option>
                                        <option value="Usual" className="text-lg">زائر عادى</option>
                                        <option value="SuperAdmin" className="text-lg">مشرف متميز</option>
                                    </select>
                                    <div>
                                        <button type={formState ? "submit" : "button"} onClick={(e) => {
                                            setFormState(!formState)
                                        }} className="bg-prime px-3 py-2 rounded shadow mt-5 float-end text-white hover:bg-prime-lh">
                                            {formState ? <><i className="pi pi-pen-to-square me-2"></i>  تعديل </> : <><i className="pi pi-save me-3"></i> حفظ التغير</>}
                                        </button>

                                        {!formState && <button type="reset" className="bg-red-800 me-3 px-3 py-2 rounded shadow mt-5 float-end text-white hover:bg-red-900"
                                            onClick={() => { setFormState(true); setSelectedRole('') }}>
                                            اللغاء
                                        </button>}
                                        {sucess && <Message className=" border-teal-800 text-teal-950 bg-teal-100 p-2 border-r-8 mt-4 w-fit shadow"
                                            severity="info"
                                            content={
                                                <div className="flex justify-start items-center">
                                                    <i className='pi pi-check-circle text-3xl mx-5'></i>
                                                    <div className="ml-2">تم تعديل الدور بنجاح</div>
                                                </div>
                                            }
                                        />}
                                    </div>
                                </form>
                            </>}
                        </div>

                        <div>
                            <div className="mb-6 flex flex-col object-fill">
                                <label className="font-semibold text-2xl mb-2 text-gray-700">صورة شخصيه</label>
                                <Image src={person.profilePic ? `http://localhost:5231/users/PI/${person.profilePic}` : `/img/defaultProfile.webp`} alt="الشخصيه" className="border border-gray-300 shadow-sm object-contain max-h-64" preview />
                            </div>
                            <div className="mb-6 flex flex-col object-fill">
                                <label className="font-semibold text-2xl mb-2 text-gray-700">صورة الهوية (الواجهة)</label>
                                <Image src={`http://localhost:5231/users/NI/${person.nationalPicFront}`} alt="الواجهة" className="border border-gray-300 shadow-sm object-contain max-h-64" preview />
                            </div>
                            <div className="mb-6 flex flex-col object-fill">
                                <label className="font-semibold text-2xl mb-2 text-gray-700">صورة الهوية (الخلفية)</label>
                                <Image src={`http://localhost:5231/users/NI/${person.nationalPicBack}`} alt="الخلفية" className="border border-gray-300 shadow-sm object-contain max-h-64" preview />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersView;
