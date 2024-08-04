import instance from "../../instance/instance";

export default async function listCategory() {
    try {
        const response = await instance.get("/data/category");
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}