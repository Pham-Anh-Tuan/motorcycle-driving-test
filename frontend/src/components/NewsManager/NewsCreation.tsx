import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import { CustomResizableImage } from "./CustomResizableImage";
import { useRef, useState } from "react";
import { newsApi } from "../../api/api";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import Toolbar from "./Toolbar";

interface News {
    title: string;
    thumbnailName: string;
    thumbnailFile: File | null;
    content: string;
}

interface NewsCreationProps {
    toggleCreation: () => void;
}

const NewsCreation: React.FC<NewsCreationProps> = ({ toggleCreation }) => {
    const editor = useEditor({
        extensions: [
            // StarterKit,
            StarterKit.configure({
                heading: false,  // Tắt heading mặc định trong StarterKit
            }),
            Underline,
            Heading.configure({ levels: [1, 2, 3] }),
            TextAlign.configure({ types: ["heading", "paragraph", "resizableImage"] }),
            CustomResizableImage,
        ],
        content: "",
    });

    const [news, setNews] = useState<News>({
        title: "",
        thumbnailName: "",
        thumbnailFile: null,
        content: "",
    });

    const setTitle = (title: string) => {
        setNews(prev => ({ ...prev, title }));
    };

    const setThumbnailName = (thumbnailName: string) => {
        setNews(prev => ({ ...prev, thumbnailName }));
    };

    const setThumbnailFile = (thumbnailFile: File | null) => {
        setNews(prev => ({ ...prev, thumbnailFile }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setThumbnailName(reader.result as string);
            reader.readAsDataURL(file);
            setThumbnailFile(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editor) return;

        const contentHTML = editor.getHTML();
        const cleanedHTML = contentHTML.replace(/<p[^>]*>\s*<\/p>/g, '<p>&nbsp;</p>');

        const formData = new FormData();
        formData.append("title", news.title);

        if (news.thumbnailFile) {
            formData.append("thumbnailFile", news.thumbnailFile);
        }

        formData.append("content", cleanedHTML);

        try {
            const response = await newsApi.createNews(formData);
            console.log("News saved:", response.data);
        } catch (error) {
            console.error("Error saving news:", error);
        }

        window.location.reload();
    }

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleRemoveImage = () => {
        setThumbnailName("");
        setThumbnailFile(null);

        // Reset input file
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="relative p-4 w-3/4 max-h-full">
            <div className="relative p-4 bg-white rounded-sm shadow dark:bg-gray-800 sm:p-5">

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thêm bài viết mới</h3>
                        <button onClick={toggleCreation}
                            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div>
                        <label htmlFor="title" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Tiêu đề</label>
                        <input onChange={(e) => setTitle(e.target.value)}
                            type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40 mb-6" placeholder="Tiêu đề bài viết" required />
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-1">
                        <label htmlFor="title" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Ảnh đại điện bài viết</label>
                        <div className="mb-1">
                            <label className="">
                                <IoCloudUploadOutline className='text-gray-500 text-2xl cursor-pointer' />
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e)} required />
                            </label>
                        </div>

                        <div className="mt-1 w-fit inline-block relative">
                            <img src={
                                typeof news.thumbnailName === 'string'
                                    ? news.thumbnailName.startsWith('data:image') || news.thumbnailName.startsWith('blob:')
                                        ? news.thumbnailName // ảnh mới upload
                                        : import.meta.env.VITE_API_URL_THUMB_IMG + news.thumbnailName // ảnh từ server
                                    : '/path/to/default-image.jpg'
                            }

                                className="w-48 h-48 object-cover shadow border" />

                            <MdOutlineCancel className="absolute top-0 right-0 w-5 h-5 bg-white cursor-pointer text-gray-500 rounded-full -translate-y-1/2 translate-x-1/2"
                                onClick={handleRemoveImage}
                            />
                        </div>
                    </div>

                    <label htmlFor="content" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Nội dung bài viết</label>

                    <Toolbar editor={editor} />
                    <div className="border rounded-md p-2 min-h-[300px]">
                        <EditorContent
                            editor={editor}
                            className="space-y-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-6 [&_*:focus]:outline [&_*:focus]:outline-2 [&_*:focus]:outline-white [&_*:focus]:rounded-md
          prose max-w-none
             [&_img]:shadow
             [&_div[data-align='center']]:text-center
             [&_div[data-align='right']]:text-right
             [&_div[data-align='left']]:text-left
             [&_div[data-align='center']>img]:mx-auto
             [&_div[data-align='right']>img]:ml-auto
             [&_div[data-align='left']>img]:mr-auto"
                        />
                    </div>

                    <div className="flex items-center space-x-4 justify-end mt-6">
                        <button type="submit" className=" text-white inline-flex items-center bg-gray-800 border border-gray-800 hover:hover:bg-sky-600 hover:border-sky-600 font-medium rounded-sm text-sm px-4 py-2.5 text-center">
                            <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Thêm
                        </button>

                        <button onClick={toggleCreation}
                            type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 font-medium rounded-sm text-sm px-5 py-2.5 text-center">
                            <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default NewsCreation