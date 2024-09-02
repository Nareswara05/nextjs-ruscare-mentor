import instance from "../../instance/instance";

export default async function getMentor() {
  try {
    const response = await instance.get('/mentor/detail');
    return response.data.data;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
    throw error;
  }
}
