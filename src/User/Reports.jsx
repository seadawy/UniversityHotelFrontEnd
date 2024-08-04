import { useState } from 'react'

const Reports = () => {
    const inputStyle = `block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;
    const labelStyle = `block tracking-wide text-grey-darker text-base font-bold mb-2`;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    return (
        <div className="sm:flex mt-[75px] sm:mx-10 justify-evenly gap-5">
            <div className="bg-white rounded shadow-md px-10 sm:py-5 pt-2 pb-20 w-full items-center text-prime sm:order-1">
                <form>
                    <h2 className='font-bold my-5 sm:my-10'>سجّل شكوتك الآن</h2>
                    <div className="mb-4 sm:mb-6">
                        <label htmlFor="title" className={labelStyle}>
                            عنوان الشكوي
                        </label>
                        <input
                            type="text"
                            id="title"
                            className={inputStyle}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 sm:mb-6">
                        <label htmlFor="desc" className={labelStyle}>
                            وصف الشكوي
                        </label>
                        <textarea
                            id="desc"
                            className={inputStyle}
                            rows={'5'}
                            cols={'5'}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        > kkk </textarea>
                    </div>

                    <div className='my-4 sm:my-5'>
                        <button type='submit'
                         className='text-white bg-prime-lh hover:bg-prime-h focus:ring-4 focus:outline-none float-end
                                focus:ring-blue-700-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-5'>
                                إرسال <i className='pi pi-send'></i>
                        </button>
                    </div>
                </form>
            </div>  
        </div>
    );
}

export default Reports;