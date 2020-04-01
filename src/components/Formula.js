import React from "react";
import ResHoc from "./IsAuthHoc";
import style from "./Template.module.css";
import Field from "./Field";

class Formula extends React.Component {
  state = {
    headers: [],
    rows: [],
    fields: [],
    columnsData: [
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
    ]
  };
  componentDidMount = () => {
    this.props.handleAuth();
  };
  onAddField = () => {
    const fields = [...this.state.fields];
    const field = {
      Field: "",
      Type: "Number",
      Formula: "",
      showFormula: false
    };
    fields.push(field);
    this.setState({
      fields: fields
    });
  };

  onClickDelete = (event, index) => {
    const fields = [...this.state.fields];

    fields.splice(index, 1);

    this.setState({
      fields: fields
    });
  };

  onChangeField = (event, index) => {
    const fields = [...this.state.fields];

    fields.forEach((field, i) => {
      if (i === index) {
        field.Field = event.target.value;
      }
    });

    this.setState({
      fields: fields
    });
  };

  onChangeType = (event, index) => {
    const fields = [...this.state.fields];
    fields.forEach((field, i) => {
      if (i === index) {
        field.Type = event.target.value;
        if (event.target.value === "Formula") {
          field.showFormula = true;
        } else {
          field.showFormula = false;
        }
      }
    });
    this.setState({
      fields: fields
    });
  };

  onChangeFormula = (event, index) => {
    const fields = [...this.state.fields];

    fields.forEach((field, i) => {
      if (i === index) {
        field.Formula = event.target.value;
      }
    });

    this.setState({
      fields: fields
    });
  };

  onClickCheckbox = (event, index) => {
    const headers = [...this.state.headers];

    headers.forEach((headerInfo, i) => {
      if (i === index) {
        headerInfo.checked = event.target.checked;
      }
    });
    this.setState({
      headers: headers
    });
  };

  onHandleSave = () => {
    // aggregate headers and fields to formula page

    const headers = [...this.state.headers];
    const fields = [...this.state.fields];

    const rows = [...this.props.project.choosenRows];

    // delete unchoose rows value from original headers
    rows.forEach(row => {
      headers.forEach(headerInfo => {
        if (!headerInfo.checked) {
          delete row[headerInfo.value];
        }
      });
    });

    const newHeaders = [];

    // need add header type in
    // handle headers
    headers.forEach(headerInfo => {
      if (headerInfo.checked) {
        newHeaders.push(headerInfo.value);
      }
    });

    // handle rows
    // add fields into rows with initial value

    rows.forEach(row => {
      fields.forEach(field => {
        switch (field.Type) {
          case "Number":
            row[field.Field] = 0;
            break;
          case "Formula":
            row[field.Field] = 0;
            break;
          default:
            row[field.Field] = "";
        }
      });
    });
  };

  render() {
    return (
      <div className={style.template} style={{ marginTop: "50px" }}>
        <div className={style.table}>
          <div className={style.table}>
            <div className={style.title}>
              Project Scope Fields
              <div style={{ padding: "20px 0 0 0" }}>
                <div>
                  <label>name</label>
                  <input
                    type="checkbox"
                    disabled="disabled"
                    onClick={event => this.onClickCheckbox(event)}
                    checked
                  />
                </div>
                <div>
                  <label>cost_code</label>
                  <input
                    type="checkbox"
                    onClick={event => this.onClickCheckbox(event)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={style.survey}>
            <div className={style.title}>Quantity Survey Fields</div>

            {!this.state.fields
              ? null
              : this.state.fields.map((field, index) => {
                  return (
                    <Field
                      key={index}
                      showFormula={field.showFormula}
                      clickDelete={event => this.onClickDelete(event, index)}
                      changeField={event => this.onChangeField(event, index)}
                      changeType={event => this.onChangeType(event, index)}
                      changeFormula={event =>
                        this.onChangeFormula(event, index)
                      }
                      fieldValue={field.Field}
                      formulaValue={field.Formula}
                    />
                  );
                })}

            <div className={style.addField}>
              <label>Add Field</label>
              <button onClick={this.onAddField}>
                {" "}
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <div className={style.footer}>
          <div></div>
          <button onClick={this.onHandleSave}>Save</button>
        </div>
      </div>
    );
  }
}
export default ResHoc(Formula);
