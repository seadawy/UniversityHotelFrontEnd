import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Auth/useAuthContext';

const Dashboard = () => {
    const { token } = useAuthContext();
    const [nUser, setNUser] = useState(0);
    const [nComp, setNComp] = useState(0);
    const [nReq, setNReq] = useState(0);
    const [statistics, setStatistics] = useState({});
    const [roomStatus, setRoomStatus] = useState({
        availableRooms: 0,
        availableRoomsPercentage: 0,
        unAvailableRooms: 0,
        unAvailableRoomsPercentage: 0,
    });
    const [monthBooks, setMonthBooks] = useState({
        labels: [],
        booksData: []
    });
    const [revenueData, setRevenueData] = useState({
        labels: [],
        revenueValues: []
    });
    const [quarterlyData, setQuarterlyData] = useState({
        labels: [],
        salesData: []
    });
    const [quarterlyYEARData, setQuarterlyYEARData] = useState({
        labels: [],
        salesData: []
    });

    useEffect(() => {
        fetch('/api/HotelAuth/CountOfUsers', {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then(data => setNUser(data));

        fetch('/api/BookRequests/GetWaitingRequests', {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then(data => setNReq(data));

        fetch('/api/Complaints/NumberOfComplaints', {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then(data => setNComp(data));

        fetch('/api/Statistics/roomsStatus').then(res => res.json()).then(data => {
            setRoomStatus(data);
        }).catch(err => console.log(err));

        fetch('/api/Statistics/lastMonthBooksStatistics').then(res => res.json()).then(data => {
            const labels = data.map(item => item.bookDate);
            const booksData = data.map(item => item.books);
            setMonthBooks({
                labels: labels,
                booksData: booksData
            });
        }).catch(err => console.log(err));

        fetch('/api/Statistics/lastMonthStatistics').then(res => res.json()).then(data => {
            setStatistics(data);
        }).catch(err => console.log(err));

        fetch('/api/Statistics/lastMonthRevenueStatistics', {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then(data => {
            const labels = data.map(item => item.revDate);
            const revenueValues = data.map(item => item.revValue);
            setRevenueData({
                labels: labels,
                revenueValues: revenueValues
            });
        }).catch(err => console.log(err));

        fetch('/api/Statistics/lastMonthRevenueQuarterStatistics', {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then(data => {
            const labels = data.map(item => item.quarter);
            const salesData = data.map(item => item.total);
            setQuarterlyData({
                labels: labels,
                salesData: salesData
            });
        }).catch(err => console.log(err));

        fetch('/api/Statistics/lastYearRevenueQuarterStatistics', {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then(data => {
            const labels = data.map(item => item.quarter);
            const salesData = data.map(item => item.total);
            setQuarterlyYEARData({
                labels: labels,
                salesData: salesData
            });
        }).catch(err => console.log(err));

    }, []);

    const textColorSecondary = '#666666';
    const surfaceBorder = '#CCCCCC';
    /* DATA */
    const dataPie = {
        labels: ['الغرف المتاحه', 'الغرف المحجوزه'],
        datasets: [
            {
                data: [roomStatus.availableRooms, roomStatus.unAvailableRooms],
            }
        ]
    };
    const chartData = {
        labels: monthBooks.labels,
        datasets: [
            {
                label: 'الطلبات',
                data: monthBooks.booksData,
                fill: true,
                borderColor: surfaceBorder,
                tension: 0.4
            }
        ]
    };
    const revenueChartData = {
        labels: revenueData.labels,
        datasets: [
            {
                label: 'الإيرادات',
                data: revenueData.revenueValues,
                backgroundColor: "#0069D2",
                fill: false,
                borderColor: '#FF5733',
                tension: 0.4
            }
        ]
    };
    const QuartChartData = {
        labels: ["الاسبوع الاول", "الاسبوع الثانى", "الاسبوع الثالث", "الاسبوع الرابع"],
        datasets: [
            {
                label: ["data"],
                data: quarterlyData.salesData,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 1
            }
        ]
    };
    const QuartYChartData = {
        labels: ["الربع الاول", "الربع الثانى", "الربع الثالث", "الربع الرابع"],
        datasets: [
            {
                data: quarterlyYEARData.salesData,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgb(54, 162, 235)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                ],
                borderWidth: 1
            }
        ]
    };
    /* OPTIONS */
    const QuartChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                ticks: {
                    font: {
                        family: 'Alexandria',
                    }
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.raw.toLocaleString('ar-EG')} ج.م`;
                    }
                }
            }
        }
    };
    const chartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
    const toArabicNumerals = (number) => {
        return number.toLocaleString('ar-EG');
    };
    return (
        <div className='grid grid-cols-12 gap-4 mt-20'>
            {/* Basic Links  */}
            <div className='grid col-start-1 col-end-13 grid-flow-col gap-3'>
                <Link to="/users" className='bg-blue-200 hover:bg-gray-400 hover:text-white py-8 relative rounded-md shadow flex gap-4 flex-col items-center'>
                    <i className='pi pi-users font-light text-6xl'></i>
                    <h2 className='text-blue-950 font-bold'>المستخدمين</h2>
                    <span className='absolute top-2 left-3 bg-red-500 px-1.5 py-1 rounded-full text-white'>{toArabicNumerals(nUser)}</span>
                </Link>
                <Link to="/requestes" className='bg-teal-200 hover:bg-gray-400 hover:text-white py-8 relative rounded-md shadow flex gap-4 flex-col items-center'>
                    <i className='pi pi-calendar font-light text-6xl'></i>
                    <h2 className='text-teal-950 font-bold'>الطلبات</h2>
                    <span className='absolute top-2 left-3 bg-red-500 px-1.5 py-1 rounded-full text-white'>{toArabicNumerals(nReq)}</span>
                </Link>
                <Link to="/reports/manage" className='bg-red-200 hover:bg-gray-400 hover:text-white py-8 relative rounded-md shadow flex gap-4 flex-col items-center'>
                    <i className='pi pi-flag font-light text-6xl'></i>
                    <h2 className='text-red-950 font-bold'>الشكاوى</h2>
                    <span className='absolute top-2 left-3 bg-red-500 px-1.5 py-1 rounded-full text-white'>{toArabicNumerals(nComp)}</span>
                </Link>
            </div>

            {/* Quick statics and Pie*/}
            <div className='grid col-start-1 col-end-13 grid-flow-col gap-3'>
                <div className='grid col-start-1 col-end-2 bg-white rounded-md shadow-md '>
                    <div className='text-center bg-prime h-fit text-white py-4 rounded-b-3xl rounded-t-md'>
                        حالة الغرف حاليا
                    </div>
                    <div className='flex flex-col justify-center w-full items-center'>
                        <div className='flex gap-10'>
                            <div className='text-center'>
                                <p>الغرف المحجوزه: {toArabicNumerals(roomStatus.unAvailableRooms)}</p>
                                <strong>{toArabicNumerals(roomStatus.unAvailableRoomsPercentage)} %</strong>
                            </div>
                            <div className='text-center'>
                                <p>الغرف المتوفره: {toArabicNumerals(roomStatus.availableRooms || "")} </p>
                                <strong>{toArabicNumerals(roomStatus.availableRoomsPercentage)} %</strong>
                            </div>
                        </div>
                        <Chart type="pie" data={dataPie} className="w-80" />
                    </div>
                </div>
                <div className='w-full col-start-2 col-end-13 bg-white rounded-md shadow-md'>
                    <div className='text-center bg-prime text-white py-4 rounded-b-3xl rounded-t-md'>
                        احصائيات سريعه من اخر 30 يوم
                    </div>
                    <div className='p-5 flex flex-col gap-3'>
                        <div className='bg-yellow-200 flex py-3 px-5 rounded justify-between items-center text-yellow-950'>
                            <h1 className='font-extrabold text-xl'> اجمالي الايرادات</h1>
                            <p className='font-semibold text-4xl'>{toArabicNumerals(statistics.totalRevenue || 0)} ج.م</p>
                        </div>
                        <div className='bg-green-300 flex py-3 px-5 rounded justify-between items-center text-green-950'>
                            <h1 className='font-extrabold text-xl'>عدد الطلبات</h1>
                            <p className='font-semibold text-4xl'>{toArabicNumerals(statistics.noOfRequests || 0)}</p>
                        </div>
                        <div className='bg-pink-300 flex py-3 px-5 rounded justify-between items-center text-pink-950'>
                            <h1 className='font-extrabold text-xl'>عدد الغرف المحجوزه</h1>
                            <p className='font-semibold text-4xl'>{toArabicNumerals(statistics.noOfBookedRooms || 0)}</p>
                        </div>
                        <div className='bg-indigo-300 flex py-3 px-5 rounded justify-between items-center text-indigo-950'>
                            <h1 className='font-extrabold text-xl'>عدد المستخدمين</h1>
                            <p className='font-semibold text-4xl'>{toArabicNumerals(statistics.noOfUsers || 0)}</p>
                        </div>
                        <div className='bg-gray-300 flex py-3 px-5 rounded justify-between items-center text-gray-950'>
                            <h1 className='font-extrabold text-xl'>عدد الشكاوى</h1>
                            <p className='font-semibold text-4xl'>{toArabicNumerals(statistics.noOfComplaints || 0)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Requests  */}
            <div className='grid col-start-1 col-end-13 grid-flow-col gap-3'>
                <div className='bg-white rounded-md shadow-md p-0'>
                    <div className='text-center bg-prime text-white py-4 rounded-b-3xl rounded-t-md'>
                        حالة الطلبات اخر 30 يوم
                    </div>
                    <div className='px-5 py-2'>
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>

            {/* Reveune */}
            <div className='grid col-start-1 col-end-13 grid-flow-col gap-3'>
                <div className='bg-white rounded-md shadow-md p-0'>
                    <div className='text-center bg-prime text-white py-4 rounded-b-3xl rounded-t-md'>
                        إحصائيات الإيرادات اخر 30 يوم
                    </div>
                    <div className='px-5 py-2'>
                        <Chart type="bar" data={revenueChartData} options={chartOptions} />
                    </div>
                </div>
            </div>

            {/* weekly and yearly */}
            <div className='grid col-start-1 col-end-13 grid-flow-col '>
                <div className='flex gap-3'>
                    <div className='bg-white rounded-md shadow-md p-0 w-full'>
                        <div className='text-center bg-prime text-white py-4 rounded-b-3xl rounded-t-md'>
                            إحصائيات الاسبوعى
                        </div>
                        <div className='px-5 py-2'>
                            <center>
                                <Chart type="bar" data={QuartChartData} options={QuartChartOptions} />
                            </center>
                        </div>
                    </div>
                    <div className='bg-white rounded-md shadow-md p-0 w-full'>
                        <div className='text-center bg-prime text-white py-4 rounded-b-3xl rounded-t-md'>
                            إحصائيات الربع سنوى
                        </div>
                        <div className='px-5 py-2'>
                            <center>
                                <Chart type="bar" data={QuartYChartData} options={QuartChartOptions} />
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
