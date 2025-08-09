import { axiosMultipart } from "./axios";

export const mcQuestionApi = {
    createMcQuestion(formData: FormData) {
        return axiosMultipart.post('/admin/createMcQuestion', formData);
    },
}