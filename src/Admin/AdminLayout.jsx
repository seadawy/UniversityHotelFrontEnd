import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../Auth/useAuthContext";

const AdminLayout = () => {
    const { logout, user } = useAuthContext();
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-prime-h border-gray-200 shadow">
                <div className="px-3 py-4 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <Link to="/">
                                <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                                    إدارة الفندق الأليكترونية
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="bg-gray-100 flex">
                <aside
                    id="logo-sidebar"
                    className="z-40 w-80 h-scr mt-16 pt-5 bg-slider border-r border-gray-200 shadow-xl"
                >
                    <div className="h-full px-3 pb-4 overflow-y-auto bg-slider">
                        <ul className="space-y-2 font-medium sticky">
                            <center>
                                <img src={user.profilePic ? `http://localhost:5231/users/PI/${user.profilePic}` : `/img/defaultProfile.webp`} alt="الشخصيه" className="rounded-full border-4 shadow-lg border-prime-h object-cover w-32 h-32 mb-2" preview />
                                <h1 className="text-center">{user.fullName}</h1>
                                <h1 className="text-center text-sm bg-yellow-400 shadow-sm text-gray-500 w-fit mt-1 p-1 px-2 rounded-full">{user.role}</h1>
                            </center>
                            <NavLink
                                to='/dashboard'
                                className="flex items-center p-4 text-gray-900 rounded-lg group bg-gray-100"
                            >
                                <i className="pi pi-chart-pie font-bold text-2xl ms-1"></i>
                                <span className="ms-3">لوحة التحكم</span>
                            </NavLink>
                            <NavLink
                                to='/requestes'
                                className="flex items-center p-4 text-gray-900 rounded-lg group bg-gray-100"
                            >
                                <i className="pi pi-calendar font-bold text-2xl ms-1"></i>
                                <span className="ms-3">الطلبات</span>
                            </NavLink>
                            <NavLink
                                to='/rooms'
                                className="flex items-center p-4 text-gray-900 rounded-lg group bg-gray-100"
                            >
                                <i className="pi pi-plus-circle font-bold text-2xl ms-1"></i>
                                <span className="ms-3">إضافة الغرف</span>
                            </NavLink>
                            <NavLink
                                to='/RoomsManage' end="true"
                                className="flex items-center p-4 text-gray-900 rounded-lg group bg-gray-100"
                            >
                                <i className="pi pi-building font-bold text-2xl ms-1"></i>
                                <span className="ms-3">عرض الغرف</span>
                            </NavLink>
                            <NavLink
                                to='/users'
                                className="flex items-center p-4 text-gray-900 rounded-lg group bg-gray-100"
                            >
                                <i className="pi pi-users font-bold text-2xl ms-1"></i>
                                <span className="ms-3">عرض المستخدمين</span>
                            </NavLink>

                            <NavLink
                                to='/reports/manage'
                                className="flex items-center p-4 text-gray-900 rounded-lg group bg-gray-100"
                            >
                                <i className="pi pi-flag font-bold text-2xl ms-1"></i>
                                <span className="ms-3">الشكاوى</span>
                            </NavLink>
                            <button onClick={logout} className="flex items-center w-full p-4 text-gray-900 rounded-lg group bg-gray-100">
                                <i className="pi pi-sign-out text-2xl"></i>
                                <span className="ms-4 font-semibold">تسجيل الخروج</span>
                            </button>
                        </ul>
                    </div>
                </aside>
                <div className="w-full">
                    <div className="p-4">
                        <Outlet></Outlet>
                    </div>
                    <footer className="bg-prime text-white py-4 p-4">
                        <div className="container mx-auto text-center">
                            <div className="flex flex-col md:flex-row justify-evenly items-center space-y-2 md:space-y-0 md:space-x-4">
                                <div className="bg-white rounded-lg p-2">
                                    <img src="/logo.png" width="80" alt="logo" />
                                </div>
                                <div className="flex flex-col">
                                    <h1>اشراف</h1>
                                    <span>دكتور احمد العشرى</span>
                                    <span>مهندس محمد فتح الله</span>
                                </div>
                                <div className="flex flex-col">
                                    <h1>Back-end</h1>
                                    <span>محمد عادل</span>
                                    <span>محمد لطفى</span>
                                </div>
                                <div className="flex flex-col">
                                    <h1>Front-end</h1>
                                    <span>عبدالرحمن سعداوى</span>
                                </div>
                                <div className="flex flex-col">
                                    جميع الطلاب المذكورين مقيدين بالفرقه الرابعه<br />
                                    كلية الحاسبات  و المعلومات جامعة كفرالشيخ
                                </div>

                            </div>
                        </div>
                    </footer>
                </div>
            </div>


        </>

    );
}

export default AdminLayout;