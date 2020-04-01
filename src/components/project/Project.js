import React from "react";
import ResHoc from "../IsAuthHoc";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Dropdown, Button } from "react-bootstrap";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ReplyIcon from "@material-ui/icons/Reply";

import "../resource/resources.css";

import Checkbox from "@material-ui/core/Checkbox";
import RightTable from "./RightTable";
import axios from "axios";
function createData(checkbox, cost_code, name) {
  return { checkbox, cost_code, name };
}
class ResourceTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { id: "checkbox", label: "Check", minWidth: 170 },
        { id: "cost_code", label: "Cost Code", minWidth: 170 },
        { id: "name", label: "Name", minWidth: 100 }
      ],
      rows: [],
      page: 0,
      rowsPerPage: 10,
      searchString: "",
      open: false,
      isInput: false,
      row1: true,
      checked: true,
      newrow: [],
      trueRows: []
      // options: "project1"
    };
    this.filterTrueRows = this.filterTrueRows.bind(this);
    this.onChecked = this.onChecked.bind(this);
  }
  handleInput = () => {
    this.setState({
      isInput: true
    });
  };
  onChecked(id) {
    let newrows = [];
    this.state.rows.map(row => {
      if (row.cost_code === id) {
        row.checkbox === false ? (row.checkbox = true) : (row.checkbox = false);
        newrows.push(row);
      } else {
        newrows.push(row);
      }
      return newrows;
    });
    this.setState({ rows: newrows });
  }

  filterTrueRows() {
    let trueRows = [];
    this.state.rows.map(function(row) {
      return row.checkbox === true && trueRows.push(row);
    });
    this.setState({ trueRows: trueRows });
  }

  selectAll = () => {
    let newrows = [];
    this.state.rows.map(row => {
      row.checkbox = true;
      return newrows.push(row);
    });
    this.setState({ rows: newrows });
  };
  unSelect = () => {
    let newrows = [];
    this.state.rows.map(row => {
      row.checkbox = false;
      return newrows.push(row);
    });
    this.setState({ rows: newrows });
  };

  componentDidMount = () => {
    this.props.handleAuth();
    this.tableOne();
  };

  tableOne = async val => {
    let renderData = val === undefined ? (val = "project1") : val;
    if (renderData === "project1") {
      console.log(this.state.options, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      const res = await axios.get("http://localhost:3000/DataBase/table.json");
      let mydata = res.data.tabledata;
      mydata.map(data => {
        return this.state.rows.push(
          createData(false, data.cost_code, data.name)
        );
      });
      this.setState({ rows: [...this.state.rows, mydata] });
    } else if (renderData === "project2") {
      console.log(this.state.options, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      const res = await axios.get("http://localhost:3000/DataBase/table2.json");
      let mydata = res.data.tabledata2;
      mydata.map(data => {
        return this.state.rows.push(
          createData(false, data.cost_code, data.name)
        );
      });

      this.setState({ rows: [...this.state.rows, mydata] });
    } else if (renderData === "project3") {
      console.log(this.state.options, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      const res = await axios.get("http://localhost:3000/DataBase/table3.json");
      let mydata = res.data.tabledata3;
      mydata.map(data => {
        return this.state.rows.push(
          createData(false, data.cost_code, data.name)
        );
      });

      this.setState({ rows: [...this.state.rows, mydata] });
    }

    // console.log(rows, ">???>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
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
  handleChangeValue = e => {
    e.preventDefault();
    this.setState({ options: e.target.value, rows: [] });
    this.tableOne(e.target.value);
  };
  render() {
    let filterList = this.state.rows,
      trueFilterList = this.state.trueRows,
      searchString = this.state.searchString.trim().toLowerCase();
    if (searchString.length > 0) {
      filterList = filterList.filter(function(filter) {
        return filter.name.toLowerCase().match(searchString);
      });
    }
    const options = [
      { value: "project1", name: "Project 1" },
      { value: "project2", name: "Project 2" },
      { value: "project3", name: "Project 3" },
      { value: "project4", name: "Project 4" }
    ];
    return (
      // seperate
      <React.Fragment>
        <div align="right" style={{ marginTop: "5px", marginRight: "80px" }}>
          <form>
            <select
              value={this.state.options}
              onChange={this.handleChangeValue}
              style={{
                width: "300px",
                height: "50px",
                outline: "none",
                marginRight: "10px"
              }}
            >
              {options.map(val => (
                <option key={val.value} value={val.value}>
                  {val.name}
                </option>
              ))}
            </select>
          </form>{" "}
        </div>
        <Paper style={{ margin: "10px auto", width: "90%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
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
                  padding: "3px"
                }}
              >
                <h6 style={{ paddingLeft: "5px" }}>Resource Catalog</h6>
                <div
                  style={{
                    float: "right",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Dropdown style={{ align: "right" }}>
                    <Dropdown.Toggle className="add-btn">
                      <FormatListBulletedIcon className="mr-4" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.selectAll}>
                        Select All
                      </Dropdown.Item>
                      <Dropdown.Item onClick={this.unSelect}>
                        Clear selection
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <ReplyIcon
                    className="add-btn"
                    onClick={this.filterTrueRows}
                    style={{
                      marginLeft: "10px",
                      transform: "rotate(180deg)"
                    }}
                  />
                </div>
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
                            key={row.cost_code}
                          >
                            {this.state.columns.map(column => {
                              const value = row[column.id];
                              return (
                                <>
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {typeof value === "boolean" ? (
                                      <Checkbox
                                        checked={value}
                                        onClick={() =>
                                          this.onChecked(row.cost_code)
                                        }
                                      />
                                    ) : column.format &&
                                      typeof value === "number" ? (
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
                count={this.state.rows.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </div>
            <RightTable
              filterTrueRows={this.filterTrueRows}
              columns={this.state.columns}
              page={this.state.page}
              rowsPerPage={this.state.rowsPerPage}
              trueFilterList={trueFilterList}
              handleChangePage={this.handleChangePage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              count={this.state.rows.length}
              onChecked={this.onChecked}
              trueRows={this.state.trueRows}
              rows={this.state.rows}
            />
          </div>
        </Paper>
        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
            margin: "-20px auto"
          }}
        >
          <a
            href="/resource
          "
          >
            Edit format
          </a>
        </div>
      </React.Fragment>
    );
  }
}
export default ResHoc(ResourceTable);
