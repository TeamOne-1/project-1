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
import { Dropdown, Button } from "react-bootstrap";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ReplyIcon from '@material-ui/icons/Reply';
import "./project.css";
import { csv } from "d3";
import data from "./data.csv";





import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
function createData(cost_code, name) {
  return { cost_code, name };
}

class ResourceTable extends React.Component {
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

  componentDidMount() {
    this.props.handleAuth();
  }
  render() {
    return (
      <div style={{ color: "#000" }}>
        <h1>Project</h1>
      </div>
    );
  }

  addCol = () => {
    this.setState({
      columns: [
        ...this.state.columns,
        { id: Date.now(), label: <input type="text" />, minWidth: 170 }
      ]
    });
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
  addRow = () => {
    this.setState({
      row: this.state.rows.push(
        createData(
          <div>
            <input type="text" className="hoverme" onKeyPress={this.onClick} />

            {/* <button className="hoverbtn">+</button>
            <TableCell>
              <input type="text" className="hoverme" />
            </TableCell> */}
          </div>,
          <input type="text" />
        )
      )
    });
  };
  componentDidMount = () => {
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
      filterList = filterList.filter(function (filter) {
        return filter.name.toLowerCase().match(searchString);
      });
    }
    return (


      // seperate

      <Paper style={{ margin: "50px auto", width: "90%" }}>
        <div align="right">
          <Dropdown className="project">
            <Dropdown.Toggle className="dropdown">Project 1 </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.project2}>Project 2
            {/* <FormatAlignLeftIcon className="mr-4" /> Project 2 */}
              </Dropdown.Item>
              <Dropdown.Item onClick={this.project3}>Project 3
            {/* <ImportContactsIcon className="mr-4" /> Project 3 */}
              </Dropdown.Item>
              <Dropdown.Item onClick={this.project4}>Project 4
          </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div style={{ display: "inline-block", width: "49%", border: "solid 1px" }}>



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




            <h6>Resource Catalog</h6>
            <div style={{ float: "right" }}>
              <Dropdown style={{ align: "right" }}>
                <Dropdown.Toggle className="add-btn">
                  <FormatListBulletedIcon className="mr-4" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.addRow}> Select All
              </Dropdown.Item>
                  <Dropdown.Item onClick={this.addCol}>Clear selection
              </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <ReplyIcon className="add-btn" />

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
        </div>


        <div style={{ display: "inline-block", width: "2%" }}></div>

        <div style={{ display: "inline-block", width: "49%", border: "solid 1px" }}>
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


            <h6 style={{}}>project</h6>

            <DeleteIcon />






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
          /></div>
        <a href="/template">Edit format</a><Button
          style={{
            width: "80px",
            backgroundColor: "hsl(14, 90%, 61%)",
            border: "1px solid hsl(14, 90%, 61%)",
            float: "right"
          }}
          className="btn btn-block text-white btn-color"
          type="submit"
        >
          Submit
          </Button>
      </Paper>
    );
  }
}
export default ResHoc(ResourceTable);
