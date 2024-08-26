import instance from "../../instance/instance";

export default async function acceptCounseling({counseling_id, place}) {
    try {
        const response = await instance.post(`/counseling/status/mentor/accept/${counseling_id}`,{
            place : place,
        });
        console.log("Respons API:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error API:", error.response); 
        return error.response.data;
    }
}