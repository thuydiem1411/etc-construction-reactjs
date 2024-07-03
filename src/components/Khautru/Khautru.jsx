import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Select, Space, Spin, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Title from "antd/es/typography/Title";

const InforKhauTru = ({ setTotalAmount }) => {
  const translateStatus = (status) => {
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
  const params = useParams();
  const showDetailedTableofDeductions = useQuery("repo Data", () =>
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
  const [placement, setPlacement] = useState("topLeft");
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize, setPageSize] = useState(10); // Số lượng hàng trên mỗi trang
  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1); // Reset trang về trang đầu tiên khi thay đổi pageSize
  };
  if (showDetailedTableofDeductions) {
    let total = 0;
    showDetailedTableofDeductions.data?.data?.items?.forEach((res) => {
      if (res.amount && res.status === "DRAFT" || res.status=== "SAVED_TO_SAP"||res.status=== "WAITING_TO_CONFIRM") {
        total += +res.amount;
      }
    });
    const formattedTotal = total.toLocaleString();
    console.log("total", formattedTotal);
    setTotalAmount(formattedTotal);
  }
  
  
  const renderWorkload = (workload) => {
    const workloadInCurrency = parseFloat(workload) * 1000;
    const formattedWorkload = new Intl.NumberFormat("vi-VN").format(
      workloadInCurrency
    );

    return formattedWorkload.replace("₫", "");
  };
  const renderUnitCost = (unitCost) => {
    const unitCostInCurrency = parseFloat(unitCost);
    return unitCostInCurrency.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
};


  console.log("showDetailedTableofDeductions", showDetailedTableofDeductions);
  const Sumdata = showDetailedTableofDeductions?.data?.data?.meta?.totalItems;
  console.log("tổng số", Sumdata);
  const totalPages =
    showDetailedTableofDeductions?.data?.data?.meta?.totalPages; // Tổng số trang

  // Tính toán số lượng dòng dữ liệu trên trang cuối cùng
  const lastPageItemCount = Sumdata % pageSize;

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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
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
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
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
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
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
  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>STT</div>,
      dataIndex: "stt",
      key: "stt",
      width: 110,
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: <div style={{ textAlign: "center" }}>Mã</div>,
      dataIndex: "material",
      key: "material",
      width: 110,
      align: "center",
    },
    {
      title: <div style={{ textAlign: "center" }}>Diễn giải</div>,
      dataIndex: "description",
      key: "description",
      width: 469,
    },
    {
      title: <div style={{ textAlign: "center" }}>Đơn vị</div>,
      dataIndex: "uom",
      key: "uom",
      width: 110,
      align: "center",
    },
    {
      title: <div style={{ textAlign: "center" }}>WBS</div>,
      dataIndex: "wbs",
      key: "wbs",
      width: 180,
      align: "center",
    },
    {
      title: <div style={{ textAlign: "center" }}>Khối lượng</div>,
      dataIndex: "workload",
      key: "workload",
      width: 141,
      render: (workload) => renderWorkload(workload),
      align: "right",
    },
    {
      title: <div style={{ textAlign: "center" }}>Đơn giá</div>,
      dataIndex: "unitCost",
      key: "unitCost",
      width: 183,
      align: "right",
      render: (unitCost) => renderUnitCost(unitCost),
    },
    {
      title: <div style={{ textAlign: "center" }}>Thành tiền</div>,
      dataIndex: "amount",
      key: "amount",
      width: 221,
      align: "right",
      render: (amount) => renderUnitCost(amount),
    },
    {
      title: <div style={{ textAlign: "center" }}>Trạng thái</div>,
      dataIndex: "status",
      key: "status",
      width: 202,

      render: (status) => translateStatus(status),
    },
  ];
  if (showDetailedTableofDeductions.isLoading)
    return <Spin className="flex justify-center items-center h-full" />;

  // Xử lý trường hợp lỗi
  if (showDetailedTableofDeductions.error)
    return "An error has occurred: " + showDeductuseQuery.error.message;
  return (
    <>
      <Table
        columns={columns}
        dataSource={showDetailedTableofDeductions?.data?.data?.items}
        bordered
        size="small"
        pagination={false}
        scroll={{
          x: 1300,
        }}
      />
      <div className="flex justify-between pt-4">
        <div className="flex gap-1 ">
          <Select
            size="small"
            style={{ width: 100, height: 34 }}
            defaultValue="10"
            dropdownMatchSelectWidth={false}
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

          <Title level={5} style={{ fontWeight: "normal" }} className="p-2">
            Tổng số {Sumdata}
          </Title>
        </div>

        <Pagination
          size="large"
          showSizeChanger={false}
          showQuickJumper
          total={showDetailedTableofDeductions?.data?.data?.meta?.totalItems}
          current={showDetailedTableofDeductions?.data?.data?.meta?.currentPage}
          pageSize={
            showDetailedTableofDeductions?.data?.data?.meta?.itemsPerPage
          }
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default InforKhauTru;
