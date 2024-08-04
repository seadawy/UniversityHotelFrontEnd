import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Rooms() {
    const [rooms, setRooms] = useState();
    useEffect(() => {
        fetch('/api/Rooms')
            .then(res => res.json())
            .then((data) => {
                setRooms(data);
            })
            .catch(err => console.log(err));
    }, []);

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    return (
        <div className="bg-white">
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
                            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
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
                                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                    <h3 className="-mx-2 -my-3 flow-root">
                                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                            <span className="ml-6 flex items-center">
                                                <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel className="pt-6">
                                        <div className="space-y-6">
                                            <div className="flex items-center">
                                                <input
                                                    id={`filter-mobile`}
                                                    name="numberOfBeds"
                                                    type="text"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label
                                                    htmlFor={`filter-mobile`}
                                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                                >
                                                </label>
                                            </div>
                                        </div>
                                    </DisclosurePanel>
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
                            <form className="hidden sm:block sm:sticky sm:top-20 h-fit">
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
                                                            <input type="checkbox" className='w-10' name="nowTime" id="nowTime" /> متاح حالا
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
                                                            <input type="checkbox" className='w-10' name="person1" id="person1" /> فرد واحد
                                                        </label>
                                                        <label htmlFor="person2" className='flex'>
                                                            <input type="checkbox" className='w-10' name="person2" id="person2" /> فردان
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

                                                        <label htmlFor="person2" className='flex'>
                                                            <input type="checkbox" className='w-10' name="person2" id="person2" /> يلزم وجودة
                                                        </label>
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
                                    {rooms && rooms.map((room) => (
                                        <Link key={room.id} to={`/rooms/${room.id}`} className="group relative flex flex-col rounded-md hover:bg-gray-200 pb-5">
                                            <div className="overflow-hidden rounded-md max-h-80 bg-gray-200 group-hover:opacity-75">
                                                <img src={`https://localhost:44356/Rooms/Images/${room.images[0].image}`} alt={room.Title} className="h-full w-full object-cover object-center" />
                                            </div>
                                            <div className='flex justify-between mt-5 items-center px-3'>
                                                <div>
                                                    <h1 className='text-2xl flex flex-col'>
                                                        {room.roomNumber}
                                                    </h1>
                                                    <h1>
                                                        {room.price} جنيه لليوم
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
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
