import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import "../resource/resources.css";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";

export class RightTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: false,
      value: "",
      filter: [],
      trueFilterList: [],
      againFilter: [],
      newList: [],
      checkedItemsArray: [],
      message: "",
      alert: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { trueFilterList } = this.state;
    if (this.props.trueFilterList !== nextProps.trueFilterList)
      this.setState({
        trueFilterList: nextProps.trueFilterList.map(value => {
          let isExit = trueFilterList.find(
            val => val.cost_code == value.cost_code
          );
          if (isExit) {
            return {
              ...value,
              checked: isExit.checked
            };
          } else {
            return {
              ...value,
              checked: false
            };
          }
        })
      });
  }
  onClick = () => {
    this.setState({
      message: "Data Submited",
      alert: true
    });

    // this.props.history.push("/template");
  };
  handleChecked = (e, index) => {
    let { trueFilterList } = this.state;
    trueFilterList[index].checked = e.target.checked;
    let checkedItemsArray = [];
    checkedItemsArray.push(trueFilterList.filter(i => i.checked === true));
    console.log(checkedItemsArray[0]);
    this.setState({ checkedItemsArray: checkedItemsArray[0] });
  };

  handleClick = e => {
    e.preventDefault();

    this.setState({
      trueFilterList: this.state.trueFilterList.filter(value => {
        return !value?.checked;
      })
    });
  };

  render() {
    const { trueFilterList } = this.state;

    return (
      <>
        <div
          style={{
            display: "inline-block",
            width: "48%",
            border: "solid 1px"
          }}
        >
          {this.state.alert ? (
            <div className="alert alert-success">
              <strong>Success!</strong>
              {this.state.message}
            </div>
          ) : null}
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

            <button
              onClick={this.handleClick}
              style={{
                border: "none",
                background: "transparent",
                outline: "none"
              }}
            >
              <DeleteIcon style={{ color: "hsl(14, 90%, 50%)" }} />
            </button>
          </div>

          <TableContainer style={{ height: "70vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {this.props.columns.map(column => (
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
                {trueFilterList
                  .slice(
                    this.props.page * this.props.rowsPerPage,
                    this.props.page * this.props.rowsPerPage +
                      this.props.rowsPerPage
                  )
                  .map((row, rowIndex) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row[Object.keys(row)[0]]}
                      >
                        {this.props.columns.map(column => {
                          const value = row[column.id];
                          return (
                            <>
                              <TableCell key={column.id} align={column.align}>
                                {typeof value === "boolean" ? (
                                  <Checkbox
                                    name={row.cost_code}
                                    onChange={e =>
                                      this.handleChecked(e, rowIndex)
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
            count={this.props.count}
            rowsPerPage={this.props.rowsPerPage}
            page={this.props.page}
            onChangePage={this.props.handleChangePage}
            onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
          />

          <Link
            style={{
              width: "80px",
              backgroundColor: "hsl(14, 90%, 61%)",
              border: "1px solid hsl(14, 90%, 61%)",
              float: "right"
            }}
            to={{
              pathname: "/formula",
              state: { data: this.state.checkedItemsArray }
            }}
            onClick={this.onClick}
            className="btn btn-block text-white btn-color"
          >
            Submit
          </Link>
        </div>
      </>
    );
  }
}

export default RightTable;
