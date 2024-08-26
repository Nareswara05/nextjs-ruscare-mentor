import instance from "../../instance/instance";

export default async function rescheduleCounseling({date, time, place, counseling_id}) {
    try {
        const response = await instance.post(`/counseling/status/reschedule/${counseling_id}`,{
            counseling_date : date,
            time : time,
            place : place,
        });
        console.log("Respons API:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error API:", error.response); 
        return error.response.data;
    }
}