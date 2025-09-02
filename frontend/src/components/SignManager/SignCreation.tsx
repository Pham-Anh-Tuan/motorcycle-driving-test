import { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { signApi } from "../../api/api";

interface SignCreationProps {
    toggleCreation: () => void;
}

const SignCreation: React.FC<SignCreationProps> = ({ toggleCreation }) => {
    interface Sign {
        code: string;
        title: string;
        imageName?: string;
        imageFile?: File | null;
        description: string;
    }

    const [sign, setSign] = useState<Sign>({
        code: "",
        title: "",
        imageName: "",
        imageFile: null,
        description: ""
    });

    const setCode = (code: string) => {
        setSign(prev => ({ ...prev, code }));
    };

    const setTitle = (title: string) => {
        setSign(prev => ({ ...prev, title }));
    };

    const setImageName = (imageName: string) => {
        setSign(prev => ({ ...prev, imageName }));
    };

    const setImageFile = (imageFile: File | null) => {
        setSign(prev => ({ ...prev, imageFile }));
    };

    const setDescription = (description: string) => {
        setSign(prev => ({ ...prev, description }));
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageName(reader.result as string);
            reader.readAsDataURL(file);
            setImageFile(file);
        }
        event.target.value = ""; // reset để lần sau chọn cùng file vẫn trigger onChange
    };

    const handleRemoveImage = () => {
        setImageName("");
        setImageFile(null);

        // Reset input file
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("code", sign.code);
        formData.append("title", sign.title);

        if (sign.imageFile) {
            formData.append("imageFile", sign.imageFile);
        }

        formData.append("description", sign.description);

        try {
            await signApi.createSign(formData);
        } catch (error: any) {
            console.error("Error saving question:", error);
        }
        window.location.reload();
    }

    return (
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 bg-white rounded-sm shadow sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thêm biển báo</h3>
                    <button onClick={toggleCreation}
                        type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center mb-2 gap-2">
                                    <label htmlFor="code" className="block text-md font-medium text-gray-900 dark:text-white">Mã biển báo</label>
                                </div>
                            </div>
                            <input onChange={(e) => setCode(e.target.value)}
                                type="text" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:outline-none focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Nhập mã biển báo" required />
                        </div>

                        <div>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center mb-2 gap-2">
                                    <label htmlFor="name" className="block text-md font-medium text-gray-900 dark:text-white">Tên biển báo</label>
                                </div>
                            </div>
                            <input onChange={(e) => setTitle(e.target.value)}
                                type="text" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:outline-none focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Nhập tên biển báo" required />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-1 mb-4">
                        <label htmlFor="title" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Tải ảnh lên</label>
                        <div className="mb-1">
                            <label className="">
                                <IoCloudUploadOutline className='text-gray-500 text-2xl cursor-pointer' />
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e)} />
                            </label>
                        </div>

                        <div className="mt-1 w-full relative text-center flex items-center justify-center">
                            <img className="max-w-full max-h-[300px]"
                                src={
                                    sign.imageName
                                        ? sign.imageName.startsWith('data:image') || sign.imageName.startsWith('blob:')
                                            ? sign.imageName
                                            : import.meta.env.VITE_API_URL_SIGN_IMG + sign.imageName
                                        : '/path/to/default-image.jpg'
                                }
                            />

                            <MdOutlineCancel className="absolute top-0 right-0 w-5 h-5 bg-white cursor-pointer text-gray-500 rounded-full -translate-y-1/2 translate-x-1/2"
                                onClick={handleRemoveImage} />
                        </div>
                    </div>

                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Chi tiết</label>
                            <textarea onChange={(e) => setDescription(e.target.value)}
                                id="description" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:outline-none focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Nhập nội dung chi tiết cho biển báo" required></textarea>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 justify-end mt-4">
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
        </div>
    )
}

export default SignCreation;