import { Link } from "react-router-dom";
import { useGetAllSemestersQuery } from "../../../../redux/features/adminFeatures/academicSemester/academicSemester";
import { TAcademicSemester } from "../../../../types/academicSemester.types";
import { Pagination, Table, TableColumnsType, TableProps } from "antd";
import {
  academicSemesterMonths,
  academicSemesterNames,
} from "../../../../consts/academicSemester.constants";
import { useState } from "react";
import { QueryParam } from "../../../../types/global.types";

const AcademicSemester = () => {
  const [params, setParams] = useState([{ name: "limit", value: "10" }]);
  const { data, isFetching } = useGetAllSemestersQuery(params);
  console.log(data);
  const semesterData = data?.data && data.data.map(
    ({
      name,
      year,
      code,
      startMonth,
      endMonth,
      _id,
    }: TAcademicSemester & { _id: string }) => ({
      key: _id,
      name,
      year,
      code,
      startMonth,
      endMonth,
    })
  );
  console.log(semesterData);

  const columns: TableColumnsType<TAcademicSemester> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: academicSemesterNames.map((name) => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Year",
      dataIndex: "year",
      defaultSortOrder: "descend",
      sorter: (a, b) => Number(a.year) - Number(b.year),
      filters: [0, 1, 2, 3, 4]
        .map((item) => item + new Date().getFullYear())
        .map((item) => ({ text: item.toString(), value: item.toString() })),
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      filters: academicSemesterMonths.map((month) => ({
        text: month,
        value: month,
      })),
      onFilter: (value, record) =>
        record.startMonth.indexOf(value as string) === 0,
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      filters: academicSemesterMonths.map((month) => ({
        text: month,
        value: month,
      })),
      onFilter: (value, record) =>
        record.endMonth.indexOf(value as string) === 0,
    },
  ];

  const onChange: TableProps<TAcademicSemester>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: QueryParam[] = [];

      filters.name &&
        filters.name.forEach((value) =>
          queryParams.push({ name: "name", value: value as string })
        );

      filters.year &&
        filters.year.forEach((value) =>
          queryParams.push({ name: "year", value: value as string })
        );

      filters.startMonth &&
        filters.startMonth.forEach((value) =>
          queryParams.push({ name: "startMonth", value: value as string })
        );

      filters.endMonth &&
        filters.endMonth.forEach((value) =>
          queryParams.push({ name: "endMonth", value: value as string })
        );

      setParams(queryParams);
    }
  };

  return (
    <div>
      <div className="flex mb-6 justify-between items-center">
        <h2 className="text-4xl font-bold">Academic Semester</h2>
        <Link
          to="/admin/create-academic-semester"
          className="bg-blue-950 p-4 rounded-md text-white font-semibold"
        >
          + Create Academic Semester
        </Link>
      </div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={semesterData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicSemester;
