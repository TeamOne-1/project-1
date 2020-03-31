
// import React, { Component } from 'react';
// import style from './Table.module.css';
// import Cell from './Cell/Cell';
// import 
// class Table extends Component {


//     renderHeader = () => {
//         return (
//             <tr>
//                 {this.props.headers.map((title) => {
//                     return (
//                         <th key={title}>{title}</th>
//                     )
//                 })}
//             </tr>
//         )
//     }

//     renderRows = () => {
//         return (
//             this.props.rows.map((row) => {
//                 return (
//                     <tr key={row.resourceId}>

//                         {Object.keys(row).filter((property) => {
//                             if (property === 'resourceId') {
//                                 return false;
//                             }
//                             return true;
//                         }).map((element) => {
//                             return (
//                                 <td key={element}>{row[element]}</td>
//                             )
//                         })}

//                     </tr>
//                 )
//             })
//         )
//     }


//     calculateCellWidth = () => {

//         const totalWidth = this.props.totalWidth;
//         // console.log(totalWidth);
//         const number = this.props.headers.length;

//         let width = null;
//         if(number <= 4){
//             width = totalWidth / number;
//         }else{
//             width = totalWidth / 4;
//         }

//         return width;
//     }

//     render() {

//         if(!this.props.headers){
//             return null;
//         }

//         const width = this.calculateCellWidth();




//         return (

//             <div className={style.table}>

//             <renderHeader />1123
//                 <div className={style.row}>

//                     {this.props.headers.map((head) => {
//                         return (
//                             <Cell
//                                 key={head}
//                                 text={head}
//                                 type="header"
//                                 cellWidth={width}
//                             />
//                         )
//                     })}
//                 </div>



//                 {this.props.rows.map((row) => {
//                     const inputType = row.inputType;
//                     return (
//                         <div className={style.row} key={row.resourceId}>

//                             {Object.keys(row).filter((property) => {
//                                 if (property === 'resourceId') {
//                                     return false;
//                                 }

//                                 if(property === 'inputType'){
//                                     return false;
//                                 }
//                                 return true;
//                             }).map((element) => {

//                                 const keyValue = [row.resourceId, element];
//                                 return (

//                                     <Cell
//                                         key={keyValue}
//                                         text={row[element]}
//                                         type={inputType}
//                                         changed={(event) => this.props.changed(event, keyValue)}
//                                         goodClicked={(event) => this.props.goodClicked(event, keyValue)}
//                                         cancelClicked={(event) => this.props.cancelClicked(event, keyValue)}
//                                         cellWidth={width}
//                                         name={element}
//                                         checked={(event)=>this.props.clickedCheck(event, keyValue)}
//                                     />
//                                 )
//                             })}

//                         </div>
//                     )
//                 })}

//             </div>

//         );
//     }


// }

// export default Table;

import React, { Component } from "react";
import { csv } from "d3";
import data from "./data.csv";
import MaterialTable, { MTableToolbar } from "material-table";
import { Dropdown } from "react-bootstrap";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { Modal, Button } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";
import Papa from "papaparse";
import "./resources.css";
import CSVReader from "react-csv-reader";

import style from './Table.module.css';
import Cell from './Cell/Cell';


const createData = (cost_code, name, EDITABLE, ITEM_ID) => {
    return { cost_code, name, EDITABLE, ITEM_ID };
};

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            selectedRow: null,
            showAddModal: false,
            showFileModal: false,
            showconfiromMassege: false,
            newColumn: "",
            csv: null,
            csvData: null,
            importData: [],
            columnsData: [
                {
                    title: "Name",
                    field: "name",
                    
                },
                { title: "Cost Code", field: "cost_code" },
                { title: "EDITABLE", field: "EDITABLE" },
                { title: "ITEM_ID", field: "ITEM_ID" },

            ]
        };
    }

    handelShowOpne = () => {
        this.setState({ showconfiromMassege: true });
    };
    handelShowclose = () => {
        this.setState({ showconfiromMassege: false });
    };
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
                console.log("data", data);

                return tableData.push(createData(data.cost_code, data.name, data.EDITABLE, data.ITEM_ID));
                // console.log("tableData", tableData);
            });
            this.setState({ tableData });
        });
    };

    componentDidMount() {
        this.csvFileRead();
    }

    handleAddColumn = e => {
        e.preventDefault();
        console.log("new ol", this.state);
        let field = this.state.newColumn
            .toLowerCase()
            .split(" ")
            .join("_");
        this.state.columnsData.push({ title: this.state.newColumn, field: field });
        this.handleAddModalClose();
    };
    updateInputValue = e => {
        e.preventDefault();
        console.log(e);
        this.setState({
            newColumn: e.target.value
        });
    };
    renderColumns = column => {
        return (
            column &&
            column.map((col, i) => {
                return col;
            })
        );
    };

    readFile = event => {
        console.log(event.target);
        this.setState({
            csv: event.target.files[0]
        });
        console.log("handleFile", this.state.csv);
    };

    importCsv = (data, fileInfo) => {
        console.log("importCsv", data, fileInfo);
        this.setState({ importData: data });
    };

    handleInputForColumn = event => {
        event.preventDefault();
        this.setState({ newColumn: event.target.value });
    };

    render() {
        const { columnsData } = this.state;
        return (
            <div style={{ maxWidth: "100%", margin: "50px" }}>

                <div className={style.row}>

                    {this.props.headers.map((head) => {
                        return (
                            <Cell
                                key={head}
                                text={head}
                                type="header"

                            />
                        )
                    })}
                </div>

                <MaterialTable
                    columns={
                        columnsData &&
                        columnsData.map((col, i) => {
                            return col;
                        })
                    }
                    
                    // columnsData.push('EDITABLE')
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
                                    <h6 style={{display: "inline-block", float :"left", color: "white"}}>QUANTITY SERVEY</h6>


                                    </div>

                                </div>



                            </div>
                        )
                    }}
                />
            </div>
        );
    }
}

export default Table;

