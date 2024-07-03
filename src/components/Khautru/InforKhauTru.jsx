import { useQueries, useQuery } from "react-query";
import { Col, Row, Spin } from 'antd'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const style = {
  padding: '8px 0',
};
const InforKhauTru = ({ dataSource, totalAmout }) => {
  const translateDeductionStatus = (status) => {
    switch (status) {
      case "DRAFT":
        return "Đang thực hiện";
      case "WAITING_TO_CONFIRM":
        return"Chờ xác nhận";
      case "SAVED_TO_SAP":
        return"Đã xác nhận"
      default:
        return status;
    }
  };
  const [formLayout, setFormLayout] = useState("inline");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const params = useParams();
  console.log(params);
  const showDeductionDetail = useQuery("repoData", () =>
    fetch(
      `https://`,
      {
        method: "GET",
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json())
  );
  console.log(showDeductionDetail);
  const dateTimeString = showDeductionDetail?.data?.data?.docDate;
  let formattedDate = "";
  if (dateTimeString) {
    // Tạo một đối tượng ngày từ chuỗi ngày giờ
    const dateTime = new Date(dateTimeString);

    // Lấy ngày, tháng và năm từ đối tượng ngày
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0 nên cần cộng thêm 1
    const year = dateTime.getFullYear();
    formattedDate = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
  }
  if (showDeductionDetail.isLoading)
    return <Spin className="flex justify-center items-center h-full" />;

  // Xử lý trường hợp lỗi
  if (showDeductionDetail.error)
    return "An error has occurred: " + showDeductuseQuery.error.message;
  return (
    <>
    <div className='div_col'>
      
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }} 
      className='font-medium text-sm  '
      
    >
      <Col className="gutter-row  " span={4}>
        <div style={style}>Nhà thầu phụ</div>
      </Col>
      <Col className="gutter-row font-normal " span={8}>
        <div style={style}> {`${showDeductionDetail?.data?.data?.vendorCode} ${showDeductionDetail?.data?.data?.vendorName}`}</div>
      </Col>
      <Col className="gutter-row  " span={4}>
        <div style={style}>Số hợp đồng</div>
      </Col>
      <Col className="gutter-row font-normal " span={8}>
        <div style={style}>{`${showDeductionDetail?.data?.data?.contractNumber}`}</div>
      </Col>
      
    </Row>
    <Row 
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
      className='font-medium text-sm  '
    >
      <Col className="gutter-row  " span={4}>
        <div style={style}>Dự án</div>
      </Col>
      <Col className="gutter-row font-normal " span={8}>
        <div style={style}>{`${showDeductionDetail?.data?.data?.projectCode} ${showDeductionDetail?.data?.data?.project}`}</div>
      </Col>
      <Col className="gutter-row  " span={4}>
        <div style={style}>Số đơn hàng</div>
      </Col>
      <Col className="gutter-row font-normal " span={8}>
        <div style={style}>{`${showDeductionDetail?.data?.data?.poNumber}`}</div>
      </Col>
      
    </Row>
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
      className='font-medium text-sm  '
    >
      <Col className="gutter-row  " span={4}>
        <div style={style}>Gói thầu</div>
      </Col>
      <Col className="gutter-row font-normal " span={8}>
        <div style={style}>{`${showDeductionDetail?.data?.data.productCode} ${showDeductionDetail?.data?.data?.tenderPackage}`}</div>
      </Col>
      <Col className="gutter-row  " span={4}>
        <div style={style}>Ngày lập đơn hàng</div>
      </Col>
      <Col className="gutter-row font-normal " span={8}>
        <div style={style}>{formattedDate}</div>
      </Col>
      
    </Row>
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
      className='font-medium text-sm  '
    >
      <Col className="gutter-row  " span={4}>
        <div style={style}>Trạng thái</div>
      </Col>
      <Col className="gutter-row font-normal " span={8}>
        <div style={style}>{translateDeductionStatus(
                  showDeductionDetail?.data?.data?.deductionStatus
                )}</div>
      </Col>
      <Col className="gutter-row  " span={4}>
        <div style={style}>Giá trị khấu trừ kì này</div>
      </Col>
      <Col className="gutter-row font-normal " span={8}>
        <div style={style}>{totalAmout}</div>
      </Col>
      
    </Row>
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
      className='font-medium text-sm  '
    >
      <Col className="gutter-row  " span={4}>
        <div style={style}>Đợt</div>
      </Col>
      <Col className="gutter-row  " span={8}>
        <div style={style}>{`${showDeductionDetail?.data?.data?.currentPeriod}`}</div>
      </Col>
      <Col className="gutter-row  " span={4}>
        <div style={style}>Nội dung</div>
      </Col>
      <Col className="gutter-row  font-normal" span={8}>
        <div style={style}>{`${showDeductionDetail?.data?.data?.note}`}</div>
      </Col>
      
    </Row>
    </div>
    </>
  )
}

export default InforKhauTru
