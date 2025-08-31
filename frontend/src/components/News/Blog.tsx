import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { newsApi } from '../../api/api';
import formatDateDMYHM from '../../hooks/DateTimeFormat';
import LatestNews from '../LatestNews/LatestNews';

interface DetailNews {
    title: string;
    content: string;
    createdAt: string;
}

const Blog = () => {
    const { id } = useParams<{ id: string }>();

    const [blog, setBlog] = useState<DetailNews | null>(null);

    useEffect(() => {
        if (!id) return;  // Chặn gọi API nếu id là undefined
        const fetchApi = async () => {
            try {
                const { data } = await newsApi.getDetailNews(id);
                console.log(data);
                setBlog(data);
            } catch (error) {
                console.error("Lỗi khi gọi API bài viết:", error);
            }
        };
        fetchApi();
    }, [id]);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-5 container">
            <div className="lg:col-span-3 order-1 lg:order-2">
                <h1 className='text-center font-bold text-3xl mb-3'>{blog?.title}</h1>
                <p className='text-end text-sm mb-4'>{blog?.createdAt ? formatDateDMYHM(blog.createdAt) : ''}</p>

                {blog?.content && (
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                )}
            </div>
            <div className="lg:col-span-1 order-2 lg:order-1">
                <LatestNews />
            </div>
        </div>
    )
}

export default Blog