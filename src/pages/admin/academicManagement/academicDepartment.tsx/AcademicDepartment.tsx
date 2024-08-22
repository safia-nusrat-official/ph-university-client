import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { QueryParam } from "../../../../types/global.types";
import { TAcademicDepartment } from "../../../../types/academicDepartment.types";
import CreateAcademicDepartment from "./createAcademicDepartment";
import { useGetAllDepartmentsQuery } from "../../../../redux/features/adminFeatures/academicDepartment/academicDepartment";

const AcademicDepartment = () => {
  const [params, setParams] = useState([{ name: "limit", value: "10" }]);
  const { data, isLoading, isFetching } = useGetAllDepartmentsQuery(params);
  console.log(data)
  const academicDepartmentData = data?.data && data?.data.map(department=>({
    
  }));
  console.log(academicDepartmentData)

  const columns: TableColumnsType<TAcademicDepartment> = [
    {
      title: "Academic Department Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Academic Faculty Name",
      dataIndex: "academicFaculty.name",
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
        loading={isFetching}
        columns={columns}
        dataSource={academicDepartmentData}
        pagination={{ pageSize: 5 }}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicDepartment;
