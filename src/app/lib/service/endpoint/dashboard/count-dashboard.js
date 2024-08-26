import instance from "../../instance/instance";

export default async function getCountDashboard() {
    try {
        const response = await instance.get("/counseling/status/count-mentor");
        console.log("Respons API:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error during API call:", error);
        return [];
    }
}