import React from "react";
import ResHoc from "./IsAuthHoc";
import style from './Formula.module.css';

import Table from './Table/Table';



class Formula extends React.Component {

  state = {
    rows: [],
    headers: [],
    projectId: null,
    projectName: null,
    totalWidth: 0,
    gg:false
  }

  

  toTemplate = () => {
    // history.push('/template');
  }
  dataChanged = (event, key) => {

    const resourceId = key[0];
    const titleName = key[1];


    const updatedValue = event.target.value;

    const newRows = [...this.state.rows];
    for (let index in newRows) {
      let currentRow = newRows[index];

      if (currentRow.resourceId === resourceId) {
        currentRow[titleName] = updatedValue;
      }
    }


    this.setState({
      rows: newRows,
    })
  }

  componentDidMount() {
    this.props.handleAuth();
  }
  render() {
    return (
      <div className={style.formula}>
        <h1>Formla</h1>
        <div>
          <div className='tableHead'>

            <div>
              <h4>QUANTITY SERVEY</h4>
            </div>

          </div>
          <Table
            headers={this.state.headers}
            rows={this.state.rows}
            changed={(event, key) => { this.dataChanged(event, key) }}
            // cancelClicked={(event, key) => { this.cancelClicked(event, key) }}
            // goodClicked={(event, key) => this.goodClicked(event, key)}
            totalWidth={this.state.totalWidth}
          // clickedCheck={(event, key) => this.clickedCheckLeft(event, key)}
          />

        </div>
        <div className={style.footer}>
          <div className={style.footerbutton} id={style.edit} onClick={this.toTemplate}>Edit Quantity Servey Template</div>
          <div className={style.footerbutton} >
            <button id={style.submitButton} onClick={this.toFormula}>Submit</button>
          </div>
        </div>

      </div>
    );
  }
}
export default ResHoc(Formula);
