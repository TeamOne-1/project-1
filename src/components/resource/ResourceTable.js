import React, { Component } from "react";
import { csv } from "d3";
import data from "./data.csv";
import MaterialTable, { MTableToolbar } from "material-table";
import { Dropdown } from "react-bootstrap";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { Modal, Button } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import Papa from "papaparse";
import "./resources.css";

const createData = (cost_code, name) => {
  return { cost_code, name };
};

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      selectedRow: null,
      showAddModal: false,
      showFileModal: false
    };
  }
  handleAddModalClose = () => {
    this.setState({ showAddModal: false });
  };
  handleAddModalShow = () => {
    this.setState({ showAddModal: !this.state.showAddModal });
  };
  //   this for display or hide the file upload modal
  handleFileModalClose = () => {
    this.setState({ showFileModal: false });
  };
  handleFileModalShow = () => {
    this.setState({ showFileModal: !this.state.showFileModal });
  };

  handleFileChange = evt => {
    let file = evt.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: results => this.setState({ tableData: results.data })
    });
    this.handleFileModalClose();
  };

  csvFileRead = evt => {
    csv(data).then(data => {
      let tableData = this.state.tableData;
      data.map(data => {
        tableData.push(createData(data.cost_code, data.name));
      });
      this.setState({ tableData });
    });
  };

  componentDidMount() {
    this.csvFileRead();
  }

  render() {
    return (
      <div style={{ maxWidth: "100%", margin: "50px" }}>
        <MaterialTable
          columns={[
            {
              title: "Name",
              field: "name",
              editComponent: props => (
                <input
                  type="text"
                  value={props.value}
                  required
                  onChange={e => props.onChange(e.target.value)}
                />
              )
            },
            { title: "Cost Code", field: "cost_code" }
          ]}
          data={this.state.tableData}
          onRowClick={(evt, selectedRow) => this.setState({ selectedRow })}
          options={{
            rowStyle: rowData => ({
              backgroundColor:
                this.state.selectedRow &&
                this.state.selectedRow.tableData.id === rowData.tableData.id
                  ? "#EEE"
                  : "#FFF"
            }),
            sorting: true
          }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.tableData;
                    data.push(newData);
                    this.setState({ tableData: data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.tableData;
                    const index = data.indexOf(oldData);
                    data[index] = newData;
                    this.setState({ tableData: data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    let data = this.state.tableData;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
                    this.setState({ tableData: data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              })
          }}
          components={{
            Toolbar: props => (
              <div>
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
                      <Dropdown.Item onClick={this.addRow}></Dropdown.Item>
                      <Dropdown.Item onClick={this.handleAddModalShow}>
                        <ImportContactsIcon className="mr-4" /> Add Column
                      </Dropdown.Item>
                      <Dropdown.Item onClick={this.handleFileModalShow}>
                        <InsertDriveFileIcon className="mr-4 text-dark" />
                        Import CSV
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <MTableToolbar {...props} />

                <Modal
                  show={this.state.showAddModal}
                  onHide={this.handleAddModalClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Adding New Column</Modal.Title>
                  </Modal.Header>
                  <form onSubmit={this.addCol}>
                    <Modal.Body>
                      <h6>Column Name</h6>
                      <input
                        value={this.state.newCol}
                        type="text"
                        required
                        onChange={this.handleAddColumn}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={this.handleAddModalClose}
                      >
                        Close
                      </Button>
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal>
                <Modal
                  show={this.state.showFileModal}
                  onHide={this.handleFileModalClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Upload CSV File</Modal.Title>
                  </Modal.Header>
                  <form>
                    <Modal.Body>
                      <input
                        type="file"
                        multiple
                        onChange={e => this.handleFileChange(e)}
                        required
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={this.handleFileModalClose}
                      >
                        Close
                      </Button>
                      <Button variant="primary" type="submit">
                        Upload
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal>
              </div>
            )
          }}
        />
      </div>
    );
  }
}

export default Table;
