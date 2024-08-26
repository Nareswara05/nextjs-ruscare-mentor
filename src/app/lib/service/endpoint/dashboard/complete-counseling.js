import instance from "../../instance/instance";

export default async function completeCounseling({counseling_id, note}) {
    try {
        const response = await instance.post(`/counseling/status/complete/${counseling_id}`,{
            note : note,
        });
        console.log("Respons API:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error API:", error.response); 
        return error.response.data;
    }

}