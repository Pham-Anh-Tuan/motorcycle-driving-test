import { useEffect, useState } from "react";
import { mcQuestionApi } from "../../api/api";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { Minus, Plus } from "lucide-react";

interface QuestionUpdationProps {
    updateId: string;
    toggleUpdation: () => void;
}

const QuestionUpdation: React.FC<QuestionUpdationProps> = ({ updateId, toggleUpdation }) => {
    interface mcQuestion {
        id: string;
        questionNumber: number;
        prompt: string;
        imageName?: string;
        imageFile?: File | null;
        choices: Choice[];
        answer: number;
        explanation: string;
        type: string;
    }

    interface Choice {
        id: string;
        orderNumber: number;
        content: string;
    }

    const [mcQuestion, setMcQuestion] = useState<mcQuestion>({
        id: updateId,
        questionNumber: 1,
        prompt: "",
        imageName: "",
        imageFile: null,
        choices: [{
            id: crypto.randomUUID(),
            orderNumber: 1,
            content: "",
        }],
        answer: 1,
        explanation: "",
        type: "Khái niệm và quy tắc",
    });

    const addChoice = () => {
        setMcQuestion((prev) => {
            const nextOrderNumber = prev.choices.length + 1;

            const newChoice: Choice = {
                id: crypto.randomUUID(),
                orderNumber: nextOrderNumber,
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

    const setQuestionNumber = (newQuestionNumber: number) => {
        setMcQuestion((prev) => ({ ...prev, questionNumber: newQuestionNumber, }));
    };

    const setPrompt = (newPrompt: string) => {
        setMcQuestion((prev) => ({ ...prev, prompt: newPrompt, }));
    };

    const setImageName = (newImageName: string) => {
        setMcQuestion(prev => ({ ...prev, imageName: newImageName }));
    };

    const setImageFile = (newImageFile: File | null) => {
        setMcQuestion(prev => ({ ...prev, imageFile: newImageFile }));
    };

    const setAnswer = (newAnswer: number) => {
        setMcQuestion((prev) => ({ ...prev, answer: newAnswer, }));
    };

    const setExplanation = (newExplanation: string) => {
        setMcQuestion((prev) => ({ ...prev, explanation: newExplanation, }));
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("id", updateId);
        formData.append("questionNumber", mcQuestion.questionNumber.toString());
        formData.append("prompt", mcQuestion.prompt);

        if (mcQuestion.imageName != null) {
            formData.append("imageName", mcQuestion.imageName);
        }

        if (mcQuestion.imageFile) {
            formData.append("imageFile", mcQuestion.imageFile);
        }

        mcQuestion.choices.forEach((choice, choiceIndex) => {
            formData.append(`choices[${choiceIndex}].orderNumber`, choice.orderNumber.toString());
            formData.append(`choices[${choiceIndex}].content`, choice.content);
        })

        formData.append("answer", mcQuestion.answer.toString());
        formData.append("explanation", mcQuestion.explanation);
        formData.append("type", mcQuestion.type);

        try {
            await mcQuestionApi.updateMcQuestion(formData);
        } catch (error: any) {
            console.error("Error saving question:", error);
        }
        window.location.reload();
    }

    useEffect(() => {
        if (!updateId) return;  // Chặn gọi API nếu id là undefined
        const fetchApi = async () => {
            try {
                const { data } = await mcQuestionApi.getMcQuestion(updateId);
                setMcQuestion(data);
            } catch (error) {
                console.error("Lỗi khi gọi API question:", error);
            }
        };
        fetchApi();
    }, [updateId]);

    return (
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 bg-white rounded-sm shadow sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cập nhật câu hỏi</h3>
                    <button onClick={toggleUpdation}
                        type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <div className="flex flex-row items-center mb-2 gap-2">
                                <label htmlFor="prompt" className="block text-md font-medium text-gray-900 dark:text-white">Câu</label>
                                <input onChange={(e) => setQuestionNumber(Number(e.target.value))}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e') {  // Ngăn "-" và "e" (tránh nhập số mũ)
                                            e.preventDefault();
                                        }
                                    }}
                                    value={mcQuestion.questionNumber}
                                    type="number" min="1" className="border border-gray-300 focus:outline-none focus:border-gray-300 w-14" required />
                            </div>
                            <textarea onChange={(e) => setPrompt(e.target.value)}
                                defaultValue={mcQuestion.prompt}
                                id="prompt" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:outline-none focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Nhập câu hỏi" required></textarea>
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
                                typeof mcQuestion.imageName === 'string'
                                    ? mcQuestion.imageName.startsWith('data:image') || mcQuestion.imageName.startsWith('blob:')
                                        ? mcQuestion.imageName // ảnh mới upload
                                        : import.meta.env.VITE_API_URL_QUESTION_IMG + mcQuestion.imageName // ảnh từ server
                                    : '/path/to/default-image.jpg'
                            }
                            />

                            <MdOutlineCancel className="absolute top-0 right-0 w-5 h-5 bg-white cursor-pointer text-gray-500 rounded-full -translate-y-1/2 translate-x-1/2"
                                onClick={() => {
                                    setImageName("");
                                    setImageFile(null);
                                }} />
                        </div>
                    </div>
        
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
                                            {choice.orderNumber} -
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
                                onChange={(e) => setAnswer(Number(e.target.value))}
                                id="answer" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                                {mcQuestion.choices.map((choice) => (
                                    <option value={choice.orderNumber}>{choice.orderNumber} - {choice.content}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="category" className="block mb-2 text-md font-medium text-gray-900">Loại câu</label>
                            <select onChange={(e) => setType(e.target.value)}
                                id="category" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                                <option value="Khái niệm và quy tắc">Khái niệm và quy tắc</option>
                                <option value="Văn hóa và đạo đức lái xe">Văn hóa và đạo đức lái xe</option>
                                <option value="Kỹ thuật lái xe">Kỹ thuật lái xe</option>
                                <option value="Biển báo đường bộ">Biển báo đường bộ</option>
                                <option value="Sa hình">Sa hình</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="explanation" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Giải thích</label>
                            <textarea onChange={(e) => setExplanation(e.target.value)}
                                defaultValue={mcQuestion.explanation}
                                id="explanation" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:outline-none focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Nhập phần giải thích cho đáp án đúng" required></textarea>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 justify-end mt-4">
                        <button type="submit" className=" text-white inline-flex items-center bg-gray-800 border border-gray-800 hover:hover:bg-sky-600 hover:border-sky-600 font-medium rounded-sm text-sm px-4 py-2.5 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                            </svg>
                            Cập nhật
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

export default QuestionUpdation