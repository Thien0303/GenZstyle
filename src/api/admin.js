import api from './api';
export const getListUser = async () => {
    const response = await api.get(`/api/Users/ActiveUsers/odata/Users/Active/User`);
    return response.data;
  };
  export const getPostAdmin = async () =>{
    const response = await api.get(`/Reports/GetAllReportByPost/odata/Reports/Active/GetAllReportByPost`);
    return response.data;
};
export const updatePost = async (id, status) => {
  const response = await api.put(`/Reports/BanReportByPostId/odata/Reports/${id}/${status}/BanReportByPostId`);
  return response.data;
};
export const getBanUserAdmin = async () =>{
  const response = await api.get(`/Reports/GetAllReportByUser/odata/Reports/Active/GetAllReportByUser`);
  return response.data;
};