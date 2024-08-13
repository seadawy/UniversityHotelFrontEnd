import NavbarComponent from "./Component/NavbarComponent";
import { Outlet } from 'react-router-dom';
import { useAuthContext } from "../Auth/useAuthContext";
import SidebarComponent from "./Component/SidebarComponent";
const UserLayout = () => {
    const { user } = useAuthContext();
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <NavbarComponent />
            </header>

            <div className="w-full sm:flex sm:flex-1">
                {user && (<SidebarComponent />)}
                <main className={`w-full bg-gray-100 ${user ? '' : 'mt-28'}`}>
                    <Outlet />
                </main>
            </div>
            <footer className="bg-prime text-white py-4 p-4">
                <div className="container mx-auto text-center">
                    <div className="flex flex-col md:flex-row justify-around items-start space-y-2 md:space-y-0 md:space-x-4">
                        <div className="bg-white rounded-lg p-2">
                            <img src="/logo.png" width="80" alt="logo" />
                        </div>
                        <div className="text-xl pt-5">
                            تم تطوير موقع فندق الجامعه
                            <br />
                            من خلال فريق من كلية الحاسبات
                        </div>
                        <div className="flex flex-col items-start">
                            <h1 className="mt-1 text-2xl"> <strong>تحت اشراف</strong></h1>
                            <li>
                                استاذ مساعد دكتور احمد العشرى
                            </li>
                            <li>
                                مدرس مساعد مهندس محمد فتح الله
                            </li>
                        </div>
                        <div className="flex flex-col items-start">
                            <h1 className="text-2xl"> <strong>Back-end</strong></h1>
                            <li>محمد عادل</li>
                            <li>محمد لطفى</li>
                        </div>
                        <div className="flex flex-col items-start">
                            <h1 className="text-2xl"> <strong>Front-end</strong></h1>
                            <li>عبدالرحمن اسامة سعداوى</li>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    );
}

export default UserLayout;