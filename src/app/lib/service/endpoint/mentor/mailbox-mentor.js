import instance from "../../instance/instance";

export default async function getMailboxMentor() {
    try {
        const response = await instance.get("/inbox/user");
        console.log("Respons API:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error API:", error.response); 
        return error.response.data;
    }
}