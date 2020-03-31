import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import "./resource/resources.css";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
export default function RightTable(props) {
  return (
    <>
      <div
        style={{
          display: "inline-block",
          width: "48%",
          border: "solid 1px"
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#999",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px"
          }}
        >
          <h6>project</h6>

          <DeleteIcon />
        </div>

        <TableContainer style={{ height: "70vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {props.columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.trueFilterList
                .slice(
                  props.page * props.rowsPerPage,
                  props.page * props.rowsPerPage + props.rowsPerPage
                )
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.cost_code}
                    >
                      {props.columns.map(column => {
                        const value = row[column.id];
                        return (
                          <>
                            <TableCell key={column.id} align={column.align}>
                              {typeof value === "boolean" ? (
                                <Checkbox />
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                value
                              )}
                            </TableCell>
                          </>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.count}
          rowsPerPage={props.rowsPerPage}
          page={props.page}
          onChangePage={props.handleChangePage}
          onChangeRowsPerPage={props.handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
