import React, { useEffect, useState } from 'react'
import { newsApi } from '../../api/api';
import formatDateDMYHM from '../../hooks/DateTimeFormat';
import Pagination from '../../hooks/Pagination';

const NewsManager = () => {
    const [showCreation, setShowCreation] = useState(false);
    const toggleCreation = () => {
        setShowCreation(!showCreation);
    };

    const [showUpdation, setShowUpdation] = useState(false);
    const toggleUpdation = () => {
        setShowUpdation(!showUpdation);
    };

    const [showDeletion, setShowDeletion] = useState(false);
    const toggleDeletion = () => {
        setShowDeletion(!showDeletion);
    };
    const [updateId, setUpdateId] = useState<string>("");
    const [deleteId, setDeleteId] = useState<string>("");

    interface News {
        id: string;
        title: string;
        thumbnailName: string;
        createdAt: string;
    }

    const [totalNews, setTotalNews] = useState(0);
    const [page, setPage] = useState(0); // Trang hiện tại (bắt đầu từ 0)
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [newsList, setNewsList] = useState<News[]>([]);

    const [keyword, setKeyword] = useState("");

    const loadSigns = async (pageParam: number) => {
        try {
            const { data } = await newsApi.getManagerNews(pageParam, 15);
            setNewsList(data.content);
            setTotalPages(data.totalPages);
            setTotalNews(data.totalElements);
            setPage(data.number); // hoặc pageParam
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    };

    const loadSearchResults = async (pageParam: number, e?: React.FormEvent, keywordParam?: string) => {
        if (e) e.preventDefault();

        const searchValue = keywordParam ?? keyword;
        try {
            const { data } = await newsApi.searchNews(searchValue.trim(), pageParam, 15);
            setNewsList(data.content);
            setTotalPages(data.totalPages);
            setTotalNews(data.totalElements);
            setPage(data.number);
        } catch (err) {
            console.error("Lỗi khi tìm tin tức:", err);
        }
    };

    useEffect(() => {
        setNewsList([]);
        setPage(0); // reset page
        loadSigns(0); // bắt đầu từ trang 0
    }, []);

    useEffect(() => {
        if (keyword.trim() === "") {
            loadSigns(0);
        }
    }, [keyword]);

    return (
        <div className='w-full bg-gray-100 dark:bg-gray-900 overflow-x-hidden'>
            <section className="antialiased">
                <div className="mx-auto w-full">
                    {/* ádasd */}
                    <div className="bg-white dark:bg-gray-800 relative shadow-md rounded-sm">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="flex-1 flex flex-col">
                                <h3 className="text-lg font-semibold">
                                    Danh sách tin tức
                                </h3>
                                <span className="dark:text-white text-sm">Tổng số: {totalNews}</span>
                            </div>

                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button onClick={toggleCreation}
                                    type="button" className="flex items-center justify-center text-white bg-gray-800 hover:bg-sky-600 font-medium rounded-sm text-sm px-4 py-2">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Thêm tin tức
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center" onSubmit={(e) => loadSearchResults(0, e)}>
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <button
                                            type="submit"
                                            className="cursor-pointer absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg aria-hidden="true" className="hover:text-blue-500 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <input
                                            onChange={(e) => setKeyword(e.target.value)}
                                            type="text" id="simple-search" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-10 p-2" placeholder="Tìm kiếm" required />
                                    </div>
                                </form>
                            </div>


                        </div>

                        {/* ádasd */}
                        <div className="w-full overflow-x-scroll">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-4 text-center">Tiêu đề</th>
                                        <th scope="col" className="px-4 py-4 text-center">Ảnh</th>
                                        <th scope="col" className="px-4 py-3 text-center">Ngày tạo</th>
                                        <th scope="col" className="px-4 py-3 text-center">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newsList.map((data) => (
                                        <tr key={data.id}
                                            className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 py-3 text-center whitespace-nowrap font-medium text-gray-900">
                                                <p className='w-24'>{data.title} </p>
                                            </th>

                                            <td className="py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <img
                                                    src={
                                                        data.thumbnailName
                                                            ? data.thumbnailName.startsWith('data:image') || data.thumbnailName.startsWith('blob:')
                                                                ? data.thumbnailName
                                                                : import.meta.env.VITE_API_URL_SIGN_IMG + data.thumbnailName
                                                            : '/path/to/default-image.jpg'
                                                    }
                                                    alt="Ảnh biển báo"
                                                    className="max-w-[180px] max-h-full w-auto object-cover rounded-md mx-auto"
                                                />
                                            </td>

                                            <td className="px-4 py-3 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                                                {data?.createdAt ? formatDateDMYHM(data.createdAt) : ''}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex items-center space-x-4">
                                                    <button onClick={() => {
                                                        setUpdateId(data.id);
                                                        toggleUpdation();
                                                    }}
                                                        type="button" className="w-28 py-2 px-3 flex items-center text-sm font-medium text-center text-white
                                                                 bg-primary hover:bg-sky-600 rounded-sm border border-primary hover:border-sky-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                        </svg>
                                                        Cập nhật
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setDeleteId(data.id);
                                                            toggleDeletion();
                                                        }}
                                                        type="button" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-sm text-sm px-3 py-2 text-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        Xóa
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                keyword.trim() ? loadSearchResults(page) : loadSigns(page);
                            }}
                        />

                    </div>
                </div>
            </section>

            {/* {showCreation && (
                <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50">
                    <SignCreation toggleCreation={toggleCreation} />
                </div>
            )}

            {showUpdation && (
                <div tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50">
                    <SignUpdation updateId={updateId} toggleUpdation={toggleUpdation} />
                </div>
            )} */}


            {showDeletion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative p-4 text-center bg-white rounded-sm shadow dark:bg-gray-800 sm:p-5">
                            <button onClick={() => {
                                toggleDeletion();
                            }}
                                type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <svg className="text-red-700 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="mb-4 text-gray-500 dark:text-gray-300">Bạn có chắc chắn muốn xóa biển báo này không?</p>
                            <div className="flex justify-center items-center space-x-4">
                                <button onClick={() => {
                                    toggleDeletion();
                                }}
                                    type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-sm border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 ">Không</button>
                                <button
                                    type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-sm hover:bg-red-800">Có</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewsManager