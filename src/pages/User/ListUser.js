import React, { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../src/components/Header";
import { tokens } from "../../../src/theme";
import { useState } from "react";
import { getAllUser } from "../../redux/apiThunk/system";
const GetUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.getUser?.getUser?.data);
  console.log("data: ", getUser);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(getAllUser());
      setIsDataLoaded(true);
    }
  }, [dispatch, isDataLoaded]);
  const columns = [
    // {
    //   field: "avatarUrl",
    //   headerName: "Ảnh",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <img
    //       src={params.value}
    //       alt="Avatar"
    //       style={{ width: "60px", height: "60px" }}
    //     />
    //   ),
    // },
    { field: "username", headerName: "Tên người dùng", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Số điện thoại", flex: 1 },
    { field: "address", headerName: "Địa chỉ", flex: 1 },
    { field: "city", headerName: "Thành phố", flex: 1 },
    { field: "isVip", headerName: "Tài khoản Vip", flex: 1 },
  ];
  const rows =
    getUser?.map((item) => {
      const account = item?.accounts || [];
      let email = "";
      let username = "";
      let isVip = "";
      if (account.length > 0) {
        const firstAccount = account[0];
        email = firstAccount.email;
        username = firstAccount.username;
        if (firstAccount.isVip === true) {
          isVip = "Đã sử dụng dịch vụ";
        } else if (firstAccount.isVip === false) {
          isVip = "Chưa mua";
        }
      }
      return {
        id: item.userID,
        email: email,
        username: username,
        isVip: isVip,
        address: item.address,
        city: item.city,
        phone: item.phone,
        avatarUrl: item.avatarUrl,
      };
    }) || [];
  return (
    <Box m="20px">
      <Header title="Dữ liệu" subtitle="Thông tin người dùng hệ thống" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={20}
          pagination
        />
      </Box>
    </Box>
  );
};

export default GetUser;
