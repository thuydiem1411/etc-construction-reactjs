import React, { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { AiOutlineRight,AiOutlineDown } from "react-icons/ai";
import { useParams } from "react-router-dom"; // Import useParams
import {
  DownOutlined,
  EditFilled,
  EditOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { IoSend } from "react-icons/io5";
import InforKhauTru from "../../components/Khautru/InforKhauTru";
import Khautru from "../../components/Khautru/Khautru";
const { Title } = Typography;

const ChiTietKT = ({ showDeductionDetail }) => {
  const style = {
    padding: "8px 0",
  };
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    setCollapsed(true);
  }, []);
  const params = useParams(); // Get params from URL
  const [totalAmout, setTotalAmount] = useState(null);

  return (
    <>
      <div className="flex justify-between pt-4 pb-4 border-b">
        <span className="text-lg font-semibold flex items-center">
          Chi tiết khấu trừ
        </span>
        <div className="flex flex-wrap gap-2 ">
          <div className="flex gap-2">
            <Button
              disabled
              block
              className="w-20 h-8 bg-[#F2F5F8] font-medium text-black"
            >
              Thu hồi
            </Button>
            <Button
              className="h-8 bg-[#F2F5F8] font-medium text-black"
              icon={<UploadOutlined />}
            >
              Xuất dữ liệu
            </Button>
            <Button
              className="h-8 bg-[#F2F5F8] font-medium text-black"
              icon={<IoSend />}
            >
              Gửi
            </Button>
            <Button
              className="h-8 bg-[#F2F5F8] font-medium text-black"
              icon={<SyncOutlined />}
            >
              Đồng bộ dữ liệu
            </Button>
            <Button
              type="primary"
              className="h-8 bg-[#16315E] text-white font-medium"
              icon={<EditOutlined />}
            >
              Chỉnh sửa
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="bg-[#F9FAFB] pt-2 pb-4 px-5 mt-2">
          <div className=" flex justify-between ">
            <Title level={5}>Thông tin</Title>
            <Button
              
              onClick={toggleCollapsed}
              type="text"
            >
              {collapsed ?<AiOutlineDown /> : <AiOutlineRight />}
            </Button>
            
          </div>
          <div style={{ display: collapsed ? "block" : "none" }}>
          <div>
            <InforKhauTru
              className="bg-[#F9FAFB]"
              params={params} // Pass params to InforKhauTru
              totalAmout={totalAmout}
            />
          </div>
          </div>
        </div>
        <div className="bot">
          <Khautru
            className="bg-[#F9FAFB]"
            showDeductionDetail={showDeductionDetail}
            params={params} // Pass params to TableKhauTru
            setTotalAmount={setTotalAmount}
          />
        </div>
      </div>
    </>
  );
};

export default ChiTietKT;
