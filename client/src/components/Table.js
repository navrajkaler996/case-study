import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"


const ReusableTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }
    },
    usePagination
  );

  const { pageIndex, pageSize} = state;

  return (
 
    <>
   {data.length > 0 && <>  <Table striped bordered hover style={{width: "100%", height: "50px", minHeight: "20px"}} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div style={{textAlign: "center"}}>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </Button>{" "}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>{" "}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>{" "}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </Button>{" "}
        <h3>
          Page{" "}
          <span>
            {pageIndex + 1} of {pageOptions.length}
          </span>{" "}
        </h3>
     
      </div>
      </>}
    </>
  );
};

export default React.memo(ReusableTable)
