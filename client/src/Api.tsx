import axios from "axios";
import { PersistentStorage } from "./PersistentStorage";

const api = axios.create({ baseURL: "http://localhost:5000/api" });

api.interceptors.request.use(config => {
    if (!PersistentStorage.has("current_user")) {
        return config;
    }

    const { token } = PersistentStorage.get("current_user");

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => response, errorResponse => {
    if (errorResponse.status === 403) {
        window.location.href = "/login";
    }
    
    return Promise.reject(errorResponse);
});

export interface MongoObject {
    _id: string
}

export interface Announcement extends MongoObject {
    title: string,
    body: string
}

export interface Course extends MongoObject {
    title: string,
    courseId: string,
    learningObjectives: LearningObjective[]
}

export interface LearningObjective extends MongoObject {
    chapter: { number: number, name: string },
    id: number,
    title: string,
    description: string,
    dataBlocks: DataBlock[]
}

export interface DataBlock extends MongoObject {
    block: string
}

export interface TextBlock extends DataBlock {
    block: "text",
    type: "body" | "header" | "chem" | "math" | "chem-inline" | "math-inline",
    value: string
}

export interface Exercise extends DataBlock {
    block: "exercise",
    title: string,
    body: DataBlock[]
}

export interface MathExercise extends Exercise {
    exercise: "math",
    prefix: string,
    answers: string[]
}

export const Api = {
    getAnnouncements: () => api.get("announcements"),
    createAnnouncement: (data: Announcement) => api.put("announcements", data),
    updateAnnouncement: (id: string) => api.patch(`announcements/${id}`),
    deleteAnnouncement: (id: string) => api.delete(`announcements/${id}`),
    getCourses: () => api.get("courses"),
    getCourse: (id: string) => api.get(`courses/${id}`),
    login: (email: string, password: string) => api.post("login", { email, password }),
    signup: (email: string, password: string, firstName: string, lastName: string) => api.post("signup", {email, password, firstName, lastName}),
};