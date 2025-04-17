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
        PersistentStorage.delete("current_user");
        window.location.href = "/login";
    }
    
    return Promise.reject(errorResponse);
});

export type UserRole = "student" | "faculty" | "admin";

export interface MongoObject {
    _id: string
}

export interface Announcement extends MongoObject {
    title: string,
    body: string
}

export interface Course extends MongoObject {
    title: string,
    code: string,
    codeLong: string,
    chapters: Chapter[]
}

export interface Chapter {
    number: number,
    name: string,
    learningObjectives: LearningObjective[]
}

export interface LearningObjective {
    id: number,
    title: string,
    description: string,
    dataBlocks: DataBlocks[]
}

export type DataBlocks = TextBlock | Exercises;
type Exercises = MathExercise;

export interface DataBlock extends MongoObject {
    block: DataBlocks["block"]
}

export interface TextBlock extends DataBlock {
    block: "text",
    type: "body" | "header" | "chem" | "math" | "chem-inline" | "math-inline" | "text",
    value: string
}

export interface Exercise extends DataBlock {
    block: "exercise",
    exercise: Exercises["exercise"]
    title: string,
    body: DataBlocks[]
}

export interface MathExercise extends Exercise {
    exercise: "math",
    prefix: string,
    answers: string[]
}

type Value = string | number;

export const Api = {
    getAnnouncements: () => api.get("announcements"),
    createAnnouncement: (data: Announcement) => api.put("announcements", data),
    updateAnnouncement: (id: string, data: Announcement) => api.patch(`announcements/${id}`, data),
    deleteAnnouncement: (id: string) => api.delete(`announcements/${id}`),
    getCourses: () => api.get("courses"),
    getCourse: (id: string) => api.get(`courses/${id}`),
    updateCourse: (id: string, data: Course) => api.patch(`courses/${id}`, data),
    login: (email: string, password: string) => api.post("login", { email, password }),
    signup: (email: string, password: string, firstName: string, lastName: string) => api.post("signup", {email, password, firstName, lastName}),
    getExerciseStates: (courseId: Value, objectiveId: Value) => api.get(`/courses/${courseId}/modules/${objectiveId}/exercises`),
    answerExercise: (courseId: Value, objectiveId: Value, exerciseId: Value, answer: string) => api.post(`/courses/${courseId}/modules/${objectiveId}/exercises/${exerciseId}/answer`, { answer }),
};