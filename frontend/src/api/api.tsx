import { axiosJson, axiosMultipart } from "./axios";

export const mcQuestionApi = {
    getManagerMcQuestions(page: number, size: number) {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosJson.get(`/admin/managerMcQuestions`, { params });
    },

    searchManagerMcQuestions(keyword: string, page: number, size: number) {
        const params = new URLSearchParams();
        params.append("keyword", keyword);
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosJson.get(`/admin/searchManagerMcQuestions`, { params });
    },

    getMcQuestion(id: string) {
        return axiosJson.get(`/public/mcQuestion/` + id);
    },

    createMcQuestion(formData: FormData) {
        return axiosMultipart.post(`/admin/createMcQuestion`, formData);
    },

    updateMcQuestion(formData: FormData) {
        return axiosMultipart.post(`/admin/updateMcQuestion`, formData);
    },
}