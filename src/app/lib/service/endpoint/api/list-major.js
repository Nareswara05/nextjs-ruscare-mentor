import instance from "../../instance/instance";

export default async function listMajor() {
    try {
        const response = await instance.get("/data/grade-list");
        return response.data.data;
    } catch (error) {
        return error;
    }
}