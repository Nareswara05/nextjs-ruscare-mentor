import instance from "../../instance/instance";

export default async function listStudent(search = "", year = "", grade_id = "") {
  try {
    let url;
    if (search) {
      url = `/student/search/${search}`;
    } else if (year) {
      url = `/student/show-by/entry-year/${year}`;
    } else if (grade_id) {
      url = `/student/show-by/grade/${grade_id}`;
    } else {
      url = "/student/list";
    }
    const response = await instance.get(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}
