import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllAcademicFacultiesQuery } from "../../../../redux/features/adminFeatures/academicManagement/academicFaculty";
import { QueryParam } from "../../../../types/global.types";
import { TAcademicFaculty } from "../../../../types/academicFaculty.types";
import CreateAcademicFaculty from "./createAcademicFaculty";

const AcademicFaculty = () => {
  const [params, setParams] = useState([{ name: "limit", value: "10" }]);
  const { data, isLoading, isFetching } =
    useGetAllAcademicFacultiesQuery(params);
  const academicFacultyData = (!isLoading && data?.data) || [];

  const columns: TableColumnsType<TAcademicFaculty> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: academicFacultyData.map((name: string) => ({
        text: name,
        value: name,
      })),
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Action",
      render: (item) => {
        console.log(item);
        const facultyId = item._id;
        return <Button>Delete</Button>;
      },
    },
  ];

  const onChange: TableProps<TAcademicFaculty>["onChange"] = (
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
        <h1 className="mb-8 font-bold text-4xl">Academic Faculties</h1>
        <CreateAcademicFaculty></CreateAcademicFaculty>
      </div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={academicFacultyData}
        pagination={{ pageSize: 5 }}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicFaculty;
