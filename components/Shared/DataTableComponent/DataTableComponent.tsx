"use client";
import React from "react";
import DataTable from "react-data-table-component";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "@mantine/core";
//
type Props = {
  columns: any;
  data: any;
  title?: string;
};
//
type FilterProps = {
  filterText: string;
  onFilter: (value: any) => void;
  title?: string;
};
//
const FilterComponent = ({ filterText, onFilter, title }: FilterProps) => (
  <>
    <Input
      icon={<AiOutlineSearch />}
      type="text"
      placeholder={`Search ${title ? title : ""}`}
      value={filterText}
      onChange={onFilter}
    />
  </>
);
//

const DataTableComponent = ({ columns, data, title }: Props) => {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [filteredItems, setFilteredItems] = React.useState([]);
  //
  React.useEffect(() => {
    setFilteredItems(
      data
        .filter((item: any) => {
          var filterFlag = false;
          Object.keys(item).every((each_key) => {
            if (
              item[each_key] &&
              item[each_key]
                ?.toString()
                .toLowerCase()
                .includes(filterText.toLowerCase())
            ) {
              filterFlag = true;
              return false;
            }
            return true;
          });
          return filterFlag;
        })
        .reverse()
    );
  }, [data, filterText]);
  //
  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <FilterComponent
        title={title}
        onFilter={(e: any) => {
          setFilterText(e.target.value);
        }}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  //
  return (
    <DataTable
      title={title}
      columns={columns}
      data={filteredItems}
      dense
      highlightOnHover
      pointerOnHover
      //@ts-ignore
      direction="auto"
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      responsive
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      //@ts-ignore
      subHeaderAlign="right"
      subHeaderWrap
    />
  );
};

export default DataTableComponent;
