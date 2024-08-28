import instance from "../../instance/instance";

export default async function editPassword({ password }) {
    try {
        const response = await instance.post('/mentor/edit-password', { 
            password : password 
        });

        if (response.status !== 200) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        if (error.response) {
            return { status: error.response.status, message: error.response.data.message };
        }
        throw error;
    }
}