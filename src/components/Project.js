import React from "react";
import ResHoc from "./IsAuthHoc";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import SearchIcon from "@material-ui/icons/Search";
import { Dropdown } from "react-bootstrap";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import "./resource/resources.css";
import { csv } from "d3";
import data from "./resource/data.csv";

function createData(cost_code, name) {
  return { cost_code, name };
}

class Project extends React.Component {
  state = {
    columns: [
      { id: "cost_code", label: "Cost Code", minWidth: 170 },
      { id: "name", label: "Name", minWidth: 100 }
    ],
    rows: [],
    page: 0,
    rowsPerPage: 10,
    searchString: "",
    open: false,
    isInput: false
  };
  handleInput = () => {
    this.setState({
      isInput: true
    });
  };
  onClick = e => {
    if (e.key === "Enter") {
      this.setState({
        isInput: false
      });
    }
  };
  componentDidMount = () => {
    this.props.handleAuth();
    csv(data).then(data => {
      let rows = this.state.rows;

      data.map(data => {
        rows.push(createData(data.cost_code, data.name));
      });
      this.setState({ rows });
    });
  };
  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: +event.target.value,
      page: 0
    });
  };
  handleopenDropDown = () => {
    this.setState({
      open: !this.state.open
    });
  };
  handleChange = e => {
    this.setState({ searchString: e.target.value });
  };
  render() {
    let filterList = this.state.rows,
      searchString = this.state.searchString.trim().toLowerCase();
    if (searchString.length > 0) {
      filterList = filterList.filter(function(filter) {
        return filter.name.toLowerCase().match(searchString);
      });
    }
    return (
      <Paper style={{ margin: "50px auto", width: "90%" }}>
        <div
          style={{
            width: "100%",
            backgroundColor: "#999",
            padding: "5px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div
            className="input-group md-form form-sm form-2 pl-0"
            style={{ width: "20%" }}
          >
            <input
              className="form-control my-0 py-1 amber-border"
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={this.state.searchString}
              onChange={this.handleChange}
            />
            <div className="input-group-append">
              <button
                className="input-group-text amber search-bar-color"
                id="basic-text1"
                onClick={this.handleopenDropDown}
              >
                <SearchIcon />
              </button>
            </div>
          </div>
          <h6>Resource Catalog</h6>
          <Dropdown>
            <Dropdown.Toggle className="add-btn">+ </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={this.addRow}>
                <FormatAlignLeftIcon className="mr-4" /> Add Row
              </Dropdown.Item>
              <Dropdown.Item onClick={this.addCol}>
                <ImportContactsIcon className="mr-4" /> Add Column
              </Dropdown.Item>
              <Dropdown.Item>
                <InsertDriveFileIcon className="mr-4 text-dark" />
                Import CSV
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <TableContainer style={{ height: "70vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {this.state.columns.map(column => (
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
              {filterList
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {this.state.columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
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
          count={this.state.rows.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}
export default ResHoc(Project);
