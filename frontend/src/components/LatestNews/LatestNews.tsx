import { useEffect, useState } from "react";
import { newsApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import formatDateDMYHM from "../../hooks/DateTimeFormat";

interface SumNews {
    id: string;
    title: string;
    thumbnailName: string;
    createdAt: string;
}
const LatestNews = () => {
    const [sumNews, setSumNews] = useState<SumNews[]>([]);

    const loadNews = async (pageParam: number) => {
        try {
            const { data } = await newsApi.getSumNews(pageParam, 12);
            // setSumNews((prev) => [...prev, ...data.content]);
            setSumNews(data.content);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    useEffect(() => {
        setSumNews([]);
        loadNews(0);
    }, []);

    const navigate = useNavigate();
    return (

        <div className="bg-gray-50 rounded-sm shadow p-4 border">
            <h2 className="text-lg font-bold mb-3 border-b pb-3 last:border-none">Bài viết mới nhất</h2>
            <div className="space-y-4">
                {sumNews.slice(0, 6).map((data) => (
                    <div
                        key={data.id} onClick={() => navigate(`/bai-viet/${data.id}`)}
                        className="flex items-start space-x-3 pb-3 cursor-pointer"
                    >
                        <img
                            src={import.meta.env.VITE_API_URL_THUMB_IMG + data.thumbnailName + ""}
                            alt={data.title}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                            <h3 className="text-sm font-semibold line-clamp-2 hover:text-orange-500">
                                {data.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">{formatDateDMYHM(data.createdAt)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestNews;