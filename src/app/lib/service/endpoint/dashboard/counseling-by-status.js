import instance from "@/app/lib/service/instance/instance";

export async function getConsultationByStatus(statusId) {
    try {
        const response = await instance.get(`counseling/mentor/show-by/status/${statusId}`);
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch consultation data by status:", error.response);
        return [];
    }
}
