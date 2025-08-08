import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

interface QuestionCreationProps {
    toggleCreation: () => void;
}

const QuestionCreation: React.FC<QuestionCreationProps> = ({ toggleCreation }) => {
    interface mcQuestion {
        prompt: string;
        imageName?: string;
        imageFile?: File | null;
        choices: Choice[];
        answer: string;
        explanation: string;
        type: string;
    }

    interface Choice {
        order: number;
        content: string;
    }

    const [mcQuestion, setMcQuestion] = useState<mcQuestion>({
        prompt: "",
        imageName: "",
        imageFile: null,
        choices: [{
            order: 1,
            content: "",
        }],
        answer: "",
        explanation: "",
        type: "",
    });

    const addChoice = () => {
        setMcQuestion((prev) => {
            const nextOrder = prev.choices.length + 1;

            const newChoice: Choice = {
                order: nextOrder,
                content: ""
            };

            return {
                ...prev,
                choices: [...prev.choices, newChoice],
            };
        });
    };

    const handleChoiceChange = (index: number, newValue: string) => {
        const updatedChoices = [...mcQuestion.choices];
        updatedChoices[index].content = newValue;
        setMcQuestion({
            ...mcQuestion,
            choices: updatedChoices,
        });
    };

    const removeChoice = (index: number) => {
        setMcQuestion((prev) => {
            const updatedChoices = prev.choices.filter((_, i) => i !== index);

            // Cập nhật lại order sau khi xoá để đảm bảo thứ tự liên tục (1,2,3,...)
            const reOrderedChoices = updatedChoices.map((choice, i) => ({
                ...choice,
                order: i + 1,
            }));

            return {
                ...prev,
                choices: reOrderedChoices,
            };
        });
    };

    const setImageName = (newImageName: string) => {
        setMcQuestion(prev => ({ ...prev, imageName: newImageName }));
    };

    const setImageFile = (newImageFile: File | null) => {
        setMcQuestion(prev => ({ ...prev, imageFile: newImageFile }));
    };

    const setType = (newType: string) => {
        setMcQuestion((prev) => ({ ...prev, type: newType, }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageName(reader.result as string);
            reader.readAsDataURL(file);
            setImageFile(file);
        }
    };

    return (
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 bg-white rounded-sm shadow sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thêm câu hỏi</h3>
                    <button onClick={toggleCreation}
                        type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <form>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <div className="flex flex-row items-center mb-2 gap-2">
                                <label htmlFor="question" className="block text-md font-medium text-gray-900 dark:text-white">Câu</label>
                                <input type="number" min="1" className="border border-gray-300 focus:outline-none focus:border-gray-300 w-14"/>
                            </div>
                            <textarea
                                id="question" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:outline-none focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Nhập câu hỏi"></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-1 mb-4">
                        <label htmlFor="title" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Tải ảnh lên</label>
                        <div className="mb-1">
                            <label className="">
                                <IoCloudUploadOutline className='text-gray-500 text-2xl cursor-pointer' />
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e)} required />
                            </label>
                        </div>

                        <div className="mt-1 w-full inline-block relative">
                            <img src={
                                typeof mcQuestion.imageName === 'string'
                                    ? mcQuestion.imageName.startsWith('data:image') || mcQuestion.imageName.startsWith('blob:')
                                        ? mcQuestion.imageName // ảnh mới upload
                                        : import.meta.env.VITE_API_URL_BANNER_IMG + mcQuestion.imageName // ảnh từ server
                                    : '/path/to/default-image.jpg'
                            }

                            />

                            <MdOutlineCancel className="absolute top-0 right-0 w-5 h-5 bg-white cursor-pointer text-gray-500 rounded-full -translate-y-1/2 translate-x-1/2"
                                onClick={() => {
                                    setImageName("");
                                    setImageFile(null)
                                }} />
                        </div>
                    </div>
                    {/* className="w-full h-48 object-cover shadow border" */}
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <div className="flex flex-row items-center py-2">
                                <label htmlFor="option" className="block text-md font-medium text-gray-900 dark:text-white">Các đáp án</label>
                                <button onClick={addChoice}
                                    type="button"
                                    className="ml-2 w-6 aspect-square flex items-center justify-center bg-black text-white text-2xl rounded-full">
                                    <Plus size={20} />
                                </button>
                            </div>
                            {mcQuestion.choices.map((choice, index) => (
                                <div className="flex flex-row items-center mb-2">
                                    <div className="relative w-full">
                                        <span
                                            className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            {choice.order} -
                                        </span>
                                        <input
                                            type="text"
                                            value={choice.content}
                                            onChange={(e) => handleChoiceChange(index, e.target.value)}
                                            id="simple-search" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-10 p-2" placeholder="Nhập đáp án" required />
                                    </div>
                                    <button
                                        onClick={() => removeChoice(index)}
                                        type="button"
                                        className="ml-2 w-6 aspect-square flex items-center justify-center bg-black text-white text-2xl rounded-full">
                                        <Minus size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 mb-4">
                        <div>
                            <label htmlFor="answer" className="block mb-2 text-md font-medium text-gray-900">Đáp án đúng</label>
                            <select
                                value={mcQuestion.answer}
                                onChange={(e) => setMcQuestion({ ...mcQuestion, answer: e.target.value })}
                                id="answer" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                                {mcQuestion.choices.map((choice) => (
                                    <option value={choice.order}>{choice.order} - {choice.content}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="category" className="block mb-2 text-md font-medium text-gray-900">Loại câu</label>
                            <select onChange={(e) => setType(e.target.value)}
                                id="category" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                                <option value={1}>Khái niệm và quy tắc</option>
                                <option value={2}>Văn hóa và đạo đức lái xe</option>
                                <option value={3}>Kỹ thuật lái xe</option>
                                <option value={4}>Biển báo đường bộ</option>
                                <option value={5}>Sa hình</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="explanation" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Giải thích</label>
                            <textarea
                                id="explanation" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:outline-none focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Nhập phần giải thích cho đáp án đúng"></textarea>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 justify-end mt-4">
                        <button type="submit" className=" text-white inline-flex items-center bg-gray-800 hover:bg-gray-900 font-medium rounded-sm text-sm px-4 py-2.5 text-center">
                            <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                            Thêm
                        </button>

                        <button
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

export default QuestionCreation