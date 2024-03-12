import api from "./api";
export const getListUser = async () => {
  const response = await api.get(`odata/Users/Active/User`);
  return response.data;
};
export const getPostAdmin = async () => {
  const response = await api.get(`/odata/GetAllReportByPost/Reports`);
  return response.data;
};
export const updatePost = async (id, status) => {
  const response = await api.put(
    `/odata/Reports/${id}/${status}/BanReportByPostId`
  );
  return response.data;
};
export const getBanUserAdmin = async () => {
  const response = await api.get(`/odata/GetAllReportByUser/Reports`);
  return response.data;
};
