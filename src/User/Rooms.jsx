import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../Auth/useAuthContext'

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [nowTime, setNowTime] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState([]);
    const [airConditioned, setAirConditioned] = useState(false);
    const [area, setArea] = useState();
    const [areaList, setAreaList] = useState();
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        fetch('http://hotelkfs.runasp.net/api/Rooms')
            .then(res => res.json())
            .then((data) => {
                setRooms(data);
                setFilteredRooms(data);
            })
            .catch(err => console.log(err));

        fetch('http://hotelkfs.runasp.net/api/HotelRegions')
            .then(res => res.json())
            .then((data) => {
                setAreaList(data);
                if (user && user.region) {
                    setArea(user.region);
                }
            })
            .catch(err => console.log(err));
    }, [user]);

    useEffect(() => {
        let filtered = rooms;

        if (area && area != "all") {
            filtered = filtered.filter(room => room.regionName === area);
        }

        if (nowTime) {
            filtered = filtered.filter(room => room.isCheckedIn);
        }

        if (numberOfPeople.length > 0) {
            filtered = filtered.filter(room => numberOfPeople.includes(room.numberOfBeds));
        }

        if (airConditioned) {
            filtered = filtered.filter(room => room.airConditioned);
        }
        setFilteredRooms(filtered);

    }, [nowTime, numberOfPeople, airConditioned, area, rooms]);

    const handleNumberOfPeopleChange = (num) => {
        setNumberOfPeople((prev) =>
            prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
        );
    };

    const resetfilter = (e) => {
        e.preventDefault();
        setNumberOfPeople([]);
        setAirConditioned(null);
        setNowTime(false);
        setArea("all");
    }

    return (
        <div className="bg-white mt-10">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />
                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto ps-5 flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">التفضيلات</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>
                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                {/* Rooms Time Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-lg text-gray-900">الغرف</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    <div className="flex flex-col gap-2">
                                                        <label htmlFor="nowTime" className='flex'>
                                                            <input
                                                                type="checkbox"
                                                                className='w-10'
                                                                name="nowTime"
                                                                id="nowTime"
                                                                checked={nowTime}
                                                                onChange={() => setNowTime(!nowTime)}
                                                            /> متاح حالا
                                                        </label>
                                                    </div>
                                                </div>
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                                {/* Number of Ppl Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-lg text-gray-900">عدد الافراد</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    <div className="flex flex-col gap-2">
                                                        <label htmlFor="person1" className='flex'>
                                                            <input
                                                                type="checkbox"
                                                                className='w-10'
                                                                name="person1"
                                                                id="person1"
                                                                onChange={() => handleNumberOfPeopleChange(1)}
                                                            /> فرد واحد
                                                        </label>
                                                        <label htmlFor="person2" className='flex'>
                                                            <input
                                                                type="checkbox"
                                                                className='w-10'
                                                                name="person2"
                                                                id="person2"
                                                                onChange={() => handleNumberOfPeopleChange(2)}
                                                            /> فردان
                                                        </label>
                                                    </div>
                                                </div>
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                                {/* AC Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-lg text-gray-900">التكيف</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    <div className="flex flex-col gap-2">
                                                        <label htmlFor="airConditioned" className='flex'>
                                                            <input
                                                                type="checkbox"
                                                                className='w-10'
                                                                name="airConditioned"
                                                                id="airConditioned"
                                                                checked={airConditioned}
                                                                onChange={() => setAirConditioned(!airConditioned)}
                                                            /> يلزم وجودة
                                                        </label>
                                                    </div>
                                                </div>
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                                {/* Area Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6" defaultOpen={true}>
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-lg text-gray-900">المحافظه</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    <div className="flex flex-col gap-2">
                                                        <select
                                                            className="w-full shadow focus:outline-none focus:ring-0 focus-within:outline-none rounded hover:ring-0 border-0 bg-gray-100 p-2 border-x-8 border-l-transparent"
                                                            onChange={e => setArea(e.target.value)}
                                                            value={area}
                                                        >
                                                            <option value="all">الكل</option>
                                                            {areaList && areaList.map((value, inx) => (
                                                                <option className='bg-white' value={value.name} key={inx}>
                                                                    {value.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">الغرف المتاحه</h1>
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            الغرف
                        </h2>

                        <div className="grid grid-cols-12 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <form className="hidden sm:block sm:sticky sm:top-28 h-fit">
                                {/* Rooms Time Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-lg text-gray-900">الغرف</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    <div className="flex flex-col gap-2">
                                                        <label htmlFor="nowTime" className='flex'>
                                                            <input
                                                                type="checkbox"
                                                                className='w-10'
                                                                name="nowTime"
                                                                id="nowTime"
                                                                checked={nowTime}
                                                                onChange={() => setNowTime(!nowTime)}
                                                            /> متاح حالا
                                                        </label>
                                                    </div>
                                                </div>
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                                {/* Number of Ppl Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-lg text-gray-900">عدد الافراد</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    <div className="flex flex-col gap-2">
                                                        <label htmlFor="person1" className='flex'>
                                                            <input
                                                                type="checkbox"
                                                                className='w-10'
                                                                name="person1"
                                                                id="person1"
                                                                onChange={() => handleNumberOfPeopleChange(1)}
                                                            /> فرد واحد
                                                        </label>
                                                        <label htmlFor="person2" className='flex'>
                                                            <input
                                                                type="checkbox"
                                                                className='w-10'
                                                                name="person2"
                                                                id="person2"
                                                                onChange={() => handleNumberOfPeopleChange(2)}
                                                            /> فردان
                                                        </label>
                                                    </div>
                                                </div>
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                                {/* AC Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-lg text-gray-900">التكيف</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    <div className="flex flex-col gap-2">
                                                        <label htmlFor="airConditioned" className='flex'>
                                                            <input
                                                                type="checkbox"
                                                                className='w-10'
                                                                name="airConditioned"
                                                                id="airConditioned"
                                                                checked={airConditioned}
                                                                onChange={() => setAirConditioned(!airConditioned)}
                                                            /> يلزم وجودة
                                                        </label>
                                                    </div>
                                                </div>
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                                {/* Area Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6" defaultOpen={true}>
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-lg text-gray-900">المحافظه</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    <div className="flex flex-col gap-2">
                                                        <select
                                                            className="w-full shadow focus:outline-none focus:ring-0 focus-within:outline-none rounded hover:ring-0 border-0 bg-gray-100 p-2 border-x-8 border-l-transparent"
                                                            onChange={e => setArea(e.target.value)}
                                                            value={area}
                                                        >
                                                            <option value="all">الكل</option>
                                                            {areaList && areaList.map((value, inx) => (
                                                                <option className='bg-white' value={value.name} key={inx}>
                                                                    {value.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                            </form>
                            {/* Room grid */}
                            <div className="lg:col-span-3 col-span-full">
                                <div className="border-gray-200 border-b pb-10 grid gap-y-10 xl:gap-x-4">
                                    {filteredRooms.length ? filteredRooms.map((room) => (
                                        <Link key={room.id} to={`/rooms/${room.id}`} className="group relative flex flex-col rounded-md bg-indigo-50 hover:bg-gray-200 pb-5">
                                            <div className="overflow-hidden rounded-md max-h-80 bg-gray-200 group-hover:opacity-75">
                                                <img src={`http://hotelkfs.runasp.net/Rooms/Images/${room.images[0].image}`} alt={room.Title} className="h-full w-full object-cover object-center" />
                                            </div>
                                            <div className='flex justify-between mt-5 items-center px-3'>
                                                <div>
                                                    <h1 className='text-2xl flex flex-col'>
                                                        غرفه : {room.roomNumber}
                                                    </h1>
                                                    <h1>
                                                        {user.isEmployee ? room.stuffPrice : room.guestPrice} جنيه لليوم
                                                    </h1>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='bg-prime-lh text-white px-5 py-2 rounded text-center'>إحجز الأن</span>
                                                    {
                                                        room.airConditioned ?
                                                            <span className=' text-green-600 px-5 py-2 text-sm rounded'>التكيف متوفر</span> :
                                                            <span className=' text-red-600 px-5 py-2 text-sm rounded'>لا يوجد تكيف</span>
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    )) : (
                                        <div className='text-center bg-gray-100 py-20 rounded shadow flex justify-center items-center flex-col'>
                                            <span className='text-xl my-5'>
                                                لا يوجد غرفه بهذه المواصفات حاليا
                                            </span>
                                            <button className='block bg-red-900 p-2.5 text-white hover:bg-red-700 rounded-md shadow border-0'
                                                onClick={resetfilter}
                                            >اعادة ضبط الاعداد</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
