import { useEffect, useState } from 'react'
import { Message } from 'primereact/message';
const Reports = () => {
    const inputStyle = `block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;
    const labelStyle = `block tracking-wide text-black text-lg font-bold mb-2`;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sucess, setSuccess] = useState(false);

    useEffect(() => {
        setDescription('');
        setTitle('');
        setTimeout(() => {
            setSuccess(false);
        }, 5000)
    }, [sucess]);

    const handelSubmit = (e) => {
        e.preventDefault();
        const data = {
            "title": title,
            "description": description,
        }
        fetch('/api/Complaints', {
            method: "post",
            headers: {
                "content-type": "application/json"
            }, body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            setSuccess(true)
        });
    }
    return (
        <div className="sm:flex mt-28 sm:mt-32 sm:mx-10 justify-evenly gap-5">
            <div className="bg-white rounded shadow-md px-10 sm:py-5 pt-2 pb-20 w-full items-center sm:order-1">
                <form onSubmit={handelSubmit}>
                    <h2 className='font-bold text-3xl my-5 sm:my-10'>سجّل شكوتك الآن</h2>
                    <div className="mb-4 sm:mb-6">
                        <label htmlFor="title" className={labelStyle}>
                            عنوان الشكوي
                        </label>
                        <input
                            required
                            type="text"
                            id="title"
                            className={inputStyle}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 sm:mb-6">
                        <label htmlFor="desc" className={labelStyle}>
                            محتوى الشكوي
                        </label>
                        <textarea
                            required
                            id="desc"
                            className={inputStyle}
                            rows={'5'}
                            cols={'5'}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        > kkk </textarea>
                    </div>

                    <div className='flex justify-between flex-row-reverse items-center'>
                        <button type='submit'
                            className='text-white bg-prime-lh hover:bg-prime-h focus:ring-4 focus:outline-none float-end
                                focus:ring-blue-700-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center flex items-center gap-2 '>
                            <i className='pi pi-send'></i>  إرسال
                        </button>
                        {sucess && <Message className=" border-teal-800 text-teal-950 bg-teal-100 p-2 border-r-8 bottom-0 right-0 w-fit shadow"
                            severity="info"
                            content={
                                <div className="flex justify-start items-center">
                                    <i className='pi pi-check-circle text-3xl mx-5'></i>
                                    <div className="ml-2">تم ارسال شكوتك بنجاح</div>
                                </div>
                            }
                        />}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Reports;