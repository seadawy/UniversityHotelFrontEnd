import { Link, NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-prime-h border-gray-200 shadow">
                <div className="px-3 py-4 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <Link to="/">
                                <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                                    المشرف المتميز
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <aside
                id="logo-sidebar"
                className="fixed top-0 right-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full
                bg-slider border-r border-gray-200 sm:translate-x-0"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-slider">
                    <ul className="space-y-2 font-medium">
                        <NavLink
                            to='/admin/dashboard'
                            className="flex items-center p-2 text-gray-900 rounded-lg group"
                        >
                            <i className="pi pi-chart-pie font-bold text-2xl ms-1"></i>
                            <span className="ms-3">لوحة التحكم</span>
                        </NavLink>

                        <NavLink
                            to='/admin/rooms'
                            className="flex items-center p-2 text-gray-900 rounded-lg group"
                        >
                            <i className="pi pi-plus-circle font-bold text-2xl ms-1"></i>
                            <span className="ms-3">إضافة الغرف</span>
                        </NavLink>
                    </ul>
                </div>
            </aside>
            <div className="p-4 sm:mr-64">
                <Outlet></Outlet>
            </div>
        </>

    );
}

export default AdminLayout;