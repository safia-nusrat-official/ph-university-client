import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { QueryParam } from "../../../../types/global.types";
import { TAcademicDepartment } from "../../../../types/academicDepartment.types";
import CreateAcademicDepartment from "./createAcademicDepartment";
import { useGetAllDepartmentsQuery } from "../../../../redux/features/adminFeatures/academicManagement/academicDepartment";

const AcademicDepartment = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState([]);
  const { data, isLoading, isFetching } = useGetAllDepartmentsQuery([
    { name: "limit", value: "5" },
    { name: "page", value: `${page}` },
    ...params,
  ]);
  console.log(data);
  const academicDepartmentData =
    data?.data &&
    data?.data.map((department: TAcademicDepartment) => ({
      key: department._id,
      name: department.name,
      academicFaculty: department.academicFaculty.name,
    }));

  console.log(academicDepartmentData);

  const columns: TableColumnsType<TAcademicDepartment> = [
    {
      title: "Academic Department Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Academic Faculty Name",
      dataIndex: "academicFaculty",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Action",
      render: (item) => {
        console.log(item);
        return <Button>Delete</Button>;
      },
    },
  ];

  const onChange: TableProps<TAcademicDepartment>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "paginate") {
      console.log(pagination);
      const queryParams: QueryParam[] = [];
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="mb-8 font-bold text-4xl">Academic Departments</h1>
        <CreateAcademicDepartment></CreateAcademicDepartment>
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={academicDepartmentData}
        pagination={false}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Pagination
        className="mt-6"
        current={page}
        onChange={(value) => setPage(value)}
        total={data?.meta?.totalData}
        pageSize={data?.meta?.limit}
      ></Pagination>
    </div>
  );
};

export default AcademicDepartment;
