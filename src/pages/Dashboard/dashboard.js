import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Header from "../../../src/components/Header";
import StatBox from "../../../src/components/StatBox";
import { tokens } from "../../../src/theme";
import { useDispatch, useSelector } from "react-redux";
import ApexCharts from "apexcharts";
function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}
const Dashboard = () => {
  const dispatch = useDispatch();
  const [totalOrder, setTotalOrder] = useState(null);
  const [totalPost, setTotalPost] = useState(null);
  const [totalScales, setTotalScales] = useState(null);
  const [totalGarden, setTotalGarden] = useState(null);
  const [totalOrderStatus, setTotalOrderStatus] = useState(null);
  // const dataPost = useSelector((state) => state?.getUser?.getTopPost);
  // console.log("data1: ", dataPost);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const chartRef = useRef(null);
  const translateStatus = (status) => {
    switch (status) {
      case "Accepted":
        return "Đã chấp nhận";
      case "Rejected":
        return "Đã từ chối";
      case "Pending":
        return "Đang chờ xử lý";
      case "UserRefused":
        return "Từ chối nhận hàng";
      case "Shipping":
        return "Đang vận chuyển";
      default:
        return status;
    }
  };
  useEffect(() => {
    if (totalOrderStatus && chartRef.current) {
      const labels = ["Đã chấp nhận", "Đã từ chối", "Đang chờ xử lý", "Từ chối nhận hàng", "Đang vận chuyển"];
      const series = [25, 15, 10, 20, 30];
      
      const options = {
        series: series,
        chart: {
          width: 400,
          type: "pie",
        },
        labels: labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      };
  
      const chart = new ApexCharts(chartRef.current, options);
  
      // Render the chart
      chart.render();
  
      // Destroy the chart when the component is unmounted
      return () => {
        chart.destroy();
      };
    }
  }, [totalOrderStatus, chartRef]);
  
  return (
    <Box m="20px" sx={{ height: "95vh" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Bảng điều khiển" subtitle="Thống kê dữ liệu hệ thống" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalOrder}
            subtitle="Đơn đặt hàng trong 7 ngày qua"
            progress="0.3"
            increase="+25%"
            icon={
              <ShoppingCartOutlinedIcon
                sx={{ color: "#339900", fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalPost}
            subtitle="Bài viết đã đăng trong 7 ngày qua"
            progress="0.50"
            increase="+21%"
            icon={
              <DescriptionOutlinedIcon
                sx={{ color: "#3366CC", fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalScales}
            subtitle="Tổng số lượt thích"
            progress="0.30"
            increase="+5%"
            icon={
              <ForestOutlinedIcon sx={{ color: "#009900", fontSize: "26px" }} />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalGarden}
            subtitle="Tổng số bình luận"
            progress="0.80"
            increase="+43%"
            icon={
              <YardOutlinedIcon sx={{ color: "#009900", fontSize: "26px" }} />
            }
          />
        </Box>

        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          sx={{ height: "65vh" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top 10 người có bài đăng nhiều nhất trong 7 ngày qua
            </Typography>
          </Box>
          {dataPost?.map((data) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography color={"#009900"} variant="h5" fontWeight="600">
                  {data?.fullName}
                </Typography>
                <Typography color={"#6699FF"} fontWeight="400">
                  Email: {data?.email}
                </Typography>

                <Typography color={"#FF3300"}>
                  Số điện thoại: {data?.phoneNumber}
                </Typography>
              </Box>

              <Box backgroundColor={"#33CCFF"} p="5px 10px" borderRadius="4px">
                {data?.postCount} bài viết
              </Box>
            </Box>
          ))}
        </Box> */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            height: "65vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box ref={chartRef} height="60%" />
          <Typography
            variant="h5"
            color="red"
            sx={{ marginBottom: "10px", fontWeight: "bold" }}
          >
            {totalOrder} đã mua vip trong 7 ngày vừa qua
          </Typography>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          sx={{ height: "65vh" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top 10 sản phẩm bán chạy nhất trong 7 ngày qua
            </Typography>
          </Box>
          {/* {dashboardData?.FiveNewOrders && dashboardData?.FiveNewOrders.map((transaction, i) => ( */}
          <Box
            // key={`${transaction.ID}-${i}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography color={"#00CC00"} variant="h5" fontWeight="600">
                Name
              </Typography>
              <Typography color={colors.grey[100]} fontWeight="400">
                Số lượng
              </Typography>

              <Typography color={"#FF3300"}>Số lượng đã bán</Typography>
            </Box>

            <Box backgroundColor={"#33CCFF"} p="5px 10px" borderRadius="4px">
              Giá
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
