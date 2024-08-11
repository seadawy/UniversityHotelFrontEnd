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

            <div className="flex flex-1 w-full">
                {user && (<SidebarComponent />)}
                <main className={`flex-1 bg-gray-100 ${user ? '' : 'mt-28'}`}>
                    <Outlet />
                </main>

            </div>
            <footer className="bg-prime text-white py-4 p-4">
                <div className="container mx-auto text-center">
                    <div className="flex flex-col md:flex-row justify-evenly items-center space-y-2 md:space-y-0 md:space-x-4">
                        <div className="bg-white rounded-lg p-2">
                            <img src="/logo.png" width="80" alt="logo" />
                        </div>
                        <div className="w-1/3">
                            <div>
                                تم تطوير موقع فندق الجامعه
                                <br />
                                من خلال فريق من كلية الحاسبات
                                <br />
                            </div>
                            <div>
                                <h1 className="mt-5">تحت اشراف</h1>
                                استاذ مساعد <strong className="inline-">دكتور احمد العشرى</strong> <br />
                                مدرس مساعد  <strong>مهندس محمد فتح الله </strong>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col">
                                الطلاب المذكورين مقيدين بالفرقه الرابعه<br />
                                كلية الحاسبات  و المعلومات جامعة كفرالشيخ
                            </div>
                            <div className="flex flex-col">
                                <h1>Back-end</h1>
                                <span>محمد عادل</span>
                                <span>محمد لطفى</span>
                            </div>
                            <div className="flex flex-col">
                                <h1>Front-end</h1>
                                <span>عبدالرحمن اسامة سعداوى</span>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        </div>

    );
}

export default UserLayout;