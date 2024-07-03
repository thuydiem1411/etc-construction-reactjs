import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Pagination,
  Select,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
const { Text } = Typography;
const TableKhauTru = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pageSize, setPageSize] = useState(10); // Số lượng hàng trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [placement, setPlacement] = useState("topLeft");

  const showDeductuseQuery = useQuery("repoData", () =>
    fetch(
      "https://",
      {
        method: "POST",
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: currentPage || 1,
          limit: pageSize || 10,
          search: "",
          variant: "workload",
        }),
      }
    ).then((res) => res.json())
  );

  useEffect(() => {
    showDeductuseQuery.refetch();
  }, [currentPage, pageSize]);
  console.log("showDeductuseQuery", showDeductuseQuery);
  const totalData = showDeductuseQuery?.data?.data?.meta?.totalItems; // Tổng số lượng dòng dữ liệu
  const totalPages = showDeductuseQuery?.data?.data?.meta?.totalPages; // Tổng số trang

  // Tính toán số lượng dòng dữ liệu trên trang cuối cùng
  const lastPageItemCount = totalData % pageSize;

  // Thêm một trang nếu trang hiện tại là trang cuối cùng và tổng số lượng dòng dữ liệu không chia hết cho số lượng dòng trên mỗi trang
  const additionalPage = currentPage === totalPages && lastPageItemCount > 0;

  // Tổng số trang sẽ hiển thị
  const totalDisplayPages = totalPages + (additionalPage ? 1 : 0);
  const handlePageChange = (page, pageSize) => {
    if (additionalPage && page === totalDisplayPages - 1) {
      setCurrentPage(totalPages); // Sửa đổi ở đây để đảm bảo rằng currentPage được cập nhật đúng cách
    } else {
      setCurrentPage(page);
    }
  };
  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1); // Reset trang về trang đầu tiên khi thay đổi pageSize
  };
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
        className="flex flex-col gap-3"
      >
        <Input
          ref={searchInput}
          placeholder={`Nhập ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            className="border-none text-[#1877F2]"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            
            size="small"
            style={{
              width: 90,
            }}
          >
           Đóng
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Đặt lại
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
            className="bg-[#315DA3] text-white"
          >
            OK
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleChange = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>STT</div>,
      dataIndex: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: <div style={{ textAlign: "center" }}>Số hợp đồng</div>,
      dataIndex: "contractNumber",
      width: 270,
      key: "contractNumber",
      ...getColumnSearchProps("số hợp đồng"),
      sorter: (a, b) => a.contractNumber.length - b.contractNumber.length,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <div className=" text-[#5F7EB4]"><Link to={`/khautru/${record.id}`}>{text}</Link></div>
        
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Số đơn hàng</div>,
      dataIndex: "poNumber",
      key: "poNumber",
      width:217,
      ...getColumnSearchProps("Số đơn hàng"),
      sorter: (a, b) => a.poNumber.length - b.poNumber.length,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => `${record.poNumber}`,
    },
    {
      title: <div style={{ textAlign: "center" }}>Nhà thầu phụ</div>,
      dataIndex: "vendorName",
      key: "vendorName",
      ...getColumnSearchProps("nhà thầu phụ"),
      sorter: (a, b) => a.vendorName.length - b.vendorName.length,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => `${record.vendorCode} - ${record.vendorName}`,
    },
    {
      title: <div style={{ textAlign: "center" }}>Dự án</div>,
      dataIndex: "project",
      key: "project",
      ...getColumnSearchProps("dự án"),
      sorter: (a, b) => a.project.length - b.project.length,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => `${record.projectCode} - ${record.project}`,
    },
    {
      title: <div style={{ textAlign: "center" }}>Gói thầu</div>,
      dataIndex: "tenderPackage",
      key: "tenderPackage",
      ...getColumnSearchProps("gói thầu"),
      sorter: (a, b) => a.tenderPackage.length - b.tenderPackage.length,
      sortDirections: ["descend", "ascend"],
      render: (text, record) =>
        `${record.productCode} - ${record.tenderPackage}`,
    },
  ];
  if (showDeductuseQuery.isLoading)
    return <Spin  size="large"className="flex justify-center items-center h-full" />;

  // Xử lý trường hợp lỗi
  if (showDeductuseQuery.error)
    return "An error has occurred: " + showDeductuseQuery.error.message;
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center border-b py-3">
          <Text className=" font-semibold text-lg">Danh sách khấu trừ</Text>
          <Button className="bg-[#16315E] text-white" icon={<PlusOutlined />}>
            Tạo mới
          </Button>
        </div>
        <div className="flex mb-2">
          <SearchOutlined />
          <Input placeholder="Nhập số HĐ, NTP,.. " variant="borderless" />
        </div>
        <Table
        
          columns={columns}
          dataSource={showDeductuseQuery?.data?.data?.items}
          bordered
          pagination={false} 
        />
        <div className="flex justify-between mt-1">
          <div className="flex gap-2 items-center">
            <Select
              defaultValue="10"
              style={{
                width: 100,
                height: 34,
              }}
              placement={placement}
              onChange={handlePageSizeChange}
            >
              {[
                { value: "10", label: "10" },
                { value: "20", label: "20" },
                { value: "50", label: "50" },
                { value: "100", label: "100" },
                { value: "200", label: "200" },
                { value: "500", label: "500" },
              ].map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>

            <Text>Trên tổng {totalData}</Text>
          </div>
          <Pagination
            showQuickJumper
            showSizeChanger={false}
            defaultCurrent={2}
            total={showDeductuseQuery?.data?.data?.meta?.totalItems}
            current={showDeductuseQuery?.data?.data?.meta?.currentPage}
            pageSize={showDeductuseQuery?.data?.data?.meta?.itemsPerPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default TableKhauTru;
