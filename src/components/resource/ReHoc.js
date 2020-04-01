// import React from "react";
// import Papa from "papaparse";
// import { csv } from "d3";
// import data from "./data.csv";

// function ReHoc(OrinalData) {
//   const createData = (cost_code, name) => {
//     return { cost_code, name };
//   };
//   class NewData extends React.Component {
//     state = {
//       tableData: [],
//       csv: null
//     };
//     csvFileRead = evt => {
//       csv(data).then(data => {
//         let tableData = this.state.tableData;
//         data.map(data => {
//           console.log("data", data);

//           return tableData.push(createData(data.cost_code, data.name));
//           // console.log("tableData", tableData);
//         });
//         this.setState({ tableData });
//       });
//     };
//     handleFileChange = evt => {
//       let file = evt.target.files[0];
//       Papa.parse(file, {
//         header: true,
//         dynamicTyping: true,
//         complete: results => this.setState({ tableData: results.data })
//       });
//       this.handleFileModalClose();
//     };
//     render() {
//       return (
//         <OrinalData
//           handleFileChange={this.handleFileChange}
//           csvFileRead={this.csvFileRead}
//           tableData={this.state.tableData}
//           createData={createData}
//         />
//       );
//     }
//   }
//   return NewData;
// }
// export default ReHoc;
