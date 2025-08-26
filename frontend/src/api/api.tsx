import { axiosJson, axiosMultipart } from "./axios";

export const mcQuestionApi = {
    getMaxQuestionNumber() {
        return axiosJson.get(`/admin/max-question-number`);
    },

    getManagerMcQuestions(page: number, size: number) {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosJson.get(`/admin/managerMcQuestions`, { params });
    },

    getManagerCriticalQuestions(page: number, size: number) {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosJson.get(`/admin/managerCriticalMcQuestions`, { params });
    },

    getCriticalMcQuestions() {
        return axiosJson.get(`public/critical-questions`);
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

    getRandomA1Exam() {
        return axiosJson.get(`/public/build-random-A1-exam`);
    },

    getMcQuestionsByType(type: string) {
        return axiosJson.get(`/public/mcQuestion-type/` + type);
    },

    createMcQuestion(formData: FormData) {
        return axiosMultipart.post(`/admin/createMcQuestion`, formData);
    },

    updateMcQuestion(formData: FormData) {
        return axiosMultipart.post(`/admin/updateMcQuestion`, formData);
    },

    deleteMcQuestion(id: string) {
        return axiosJson.delete(`/admin/deleteMcQuestion/` + id);
    }
}

export const examApi = {
    getExamNumberList() {
        return axiosJson.get(`/public/exam-number-list`);
    },

    getQuestionsByExamNumber(examNumber: string) {
        return axiosJson.get(`/public/questions/` + examNumber);
    }
}

export const signApi = {
    getManagerSigns(page: number, size: number) {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosJson.get(`/admin/manager-signs`, { params });
    },

    createSign(formData: FormData) {
        return axiosMultipart.post(`/admin/create-sign`, formData);
    },
}