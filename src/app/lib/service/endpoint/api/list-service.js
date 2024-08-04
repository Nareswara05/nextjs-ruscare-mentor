import instance from "../../instance/instance";

export default async function listService() {
    try {
        const response = await instance.get("/data/service");
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}