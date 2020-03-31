import React from 'react';
import style from './Field.module.css';

// props param
/*

1. showFormula: 
    true -> show formula part
    false -> doesn't show formula part

2. clickDelete: delete such field

3. changeField
4. changeType
5. changeFormula

6. fieldValue
7. formulaValue
*/
const Field = (props) => {

    let classes = null;

    const showFormula = props.showFormula;

    if (showFormula) {
        classes = {
            visibility: 'visible',
        }
    } 
    else {
        classes = {
            visibility: 'hidden',
        }
    }

    return (
        <div className={style.field}>
            <div className={style.part}>
                <label>Field</label>
                <input type="text" placeholder="Field"
                    value={props.fieldValue}
                    onChange={props.changeField}
                ></input>
            </div>
            <div className={style.part}>
                <label>Type</label>
                <select onChange={props.changeType} id="Field_Type_Selector">
                    <option value="Number">Number</option>
                    <option value="Text">Text</option>
                    <option value="Formula">Formula</option>
                </select>
            </div>
            <div className={style.part}>
                <label style={classes}>Formula</label>
                <input type="text" placeholder="Formula" style={classes}
                    value={props.formulaValue}
                    onChange={props.changeFormula}
                ></input>
            </div>
            <div className={style.part2}>
                <button><i className="fas fa-trash-alt"  onClick={props.clickDelete}></i></button>
            </div>
        </div>
    )
}

export default Field