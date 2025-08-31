import { useEffect, useState } from "react";
import { newsApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Pagination from "../../hooks/Pagination";
import formatDateDMYHM from "../../hooks/DateTimeFormat";
import LatestNews from "../LatestNews/LatestNews";

interface SumNews {
    id: string;
    title: string;
    thumbnailName: string;
    createdAt: string;
}

const News = () => {
    const [sumNews, setSumNews] = useState<SumNews[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const loadNews = async (pageParam: number) => {
        try {
            const { data } = await newsApi.getSumNews(pageParam, 12);
            // setSumNews((prev) => [...prev, ...data.content]);
            setSumNews(data.content);
            setTotalPages(data.totalPages);
            setPage(data.number + 1); // cập nhật trang tiếp theo
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    useEffect(() => {
        setSumNews([]);
        setPage(0); // reset page
        loadNews(0);
    }, []);

    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 container">
            <div className="lg:col-span-3 order-1 lg:order-2">
                <div className="">
                    {/* Header section */}
                    <div className="mb-3 max-w-[600px]">
                        <h1 data-aos="fade-up" className="text-2xl font-bold">
                            Tất cả bài viết
                        </h1>
                    </div>
                    {/* Body section */}
                    <div>
                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5"> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sumNews.map((data) => (
                                <div key={data.id} onClick={() => navigate(`/bai-viet/${data.id}`)}>
                                    <div
                                        data-aos="fade-up"
                                        className="group space-y-3"
                                    >
                                        <div
                                            className="relative cursor-pointer">
                                            <img
                                                src={import.meta.env.VITE_API_URL_THUMB_IMG + data.thumbnailName + ""}
                                                alt=""
                                                className="w-full h-[240px] sm:w-[380px] sm:h-[200px] object-cover rounded-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-[350px] sm:w-[270px] md:w-[217px] lg:w-[217px] xl:w-[281px]">
                                        <h3 className="uppercase font-semibold hover:text-orange-500 cursor-pointer"
                                            style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}>{data.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="py-4">
                            <Pagination
                                currentPage={page - 1}
                                totalPages={totalPages}
                                onPageChange={(newPage) => {
                                    loadNews(newPage);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1 order-2 lg:order-1" >
                <LatestNews />
            </div>
        </div>
    )
}

export default News