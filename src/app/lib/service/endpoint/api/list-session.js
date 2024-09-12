import instance from "../../instance/instance";

export default async function fetchSessions() {
    try {
        const response = await instance.get("/data/session-list");
        return response.data.data;
    } catch (error) {
        return [];
    }
}