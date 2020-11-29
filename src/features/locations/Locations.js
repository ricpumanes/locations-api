import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import { useTable, usePagination } from "react-table";

import { name, reducer, actions } from "./slice";
import saga from "./saga";
import Styles from "./styles";

const useLocations = () => {
  useInjectReducer({ key: name, reducer });
  useInjectSaga({ key: name, saga });

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.locationsReducer);

  const id = Math.random().toString(31).split(".")[1];

  React.useEffect(() => {
    dispatch(actions.fetch());
  }, []);

  const onAddClick = () => {
    dispatch(
      actions.create({
        location: `${id}-sample-location`,
        description: `${id}-sample-description`,
      })
    );
  };

  const onDelete = (id) => {
    dispatch(
      actions.delete({
        id,
      })
    );
  };

  return { ...selector, onAddClick, onDelete };
};

const Locations = () => {
  const { locations, onAddClick, onDelete } = useLocations();

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Location", accessor: "location" },
      { Header: "Description", accessor: "description" },
      {
        Header: "Actions",
        id: "actionButtons",
        Cell: ({ row }) => {
          return (
            <button type="button" onClick={() => onDelete(row?.original?.id)}>
              Delete
            </button>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: locations,
      autoResetPage: false,
    },
    usePagination
  );

  console.log(page);

  return (
    <Styles>
      <button type="button" onClick={onAddClick}>
        Add Item
      </button>
      <table {...getTableProps()}>
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
          {page.map((row, i) => {
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
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Styles>
  );
};

export default Locations;
