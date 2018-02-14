import { Element, Component, Prop, State, Listen } from '@stencil/core';

@Component({
  tag: 'my-dynamic-form',
  shadow: true,
  styleUrl: '../../../node_modules/bootstrap/dist/css/bootstrap.css'
})
export class MyDynamicForm {

  // @Event() validateData: EventEmitter;

  @State() allTitles: any = {};
  @State() allIds: any = [];
  @State() data: any;
  @State() changedData: any;
  @State() filledData: any;
  @State() invalidMessage: string = null;
  @State() changeValueChecked: boolean = false;

  @Element() el: HTMLElement;

  /**
   * @desc Field data change callback
   * @Prop {any} schema - JSON-schema
   * @Prop {any} form - form for JSON-schema
   */
  @Prop() schema: any;
  @Prop() form: any;
  @Prop() ajv: any;

  @Listen('postValue')
  postValueHandler(CustomEvent) {
    this.changeValueChecked = true;

    let fieldId: any = CustomEvent.detail._values.id.match(/\w+$/)[0];
    let fieldValue: any = CustomEvent.detail._values.currentValue === false ? null : CustomEvent.detail._values.currentValue;
    let currentFormData: any = this.data;

    currentFormData = this.fillData(fieldId, fieldValue, currentFormData);
    let clearedFormData = Object.assign({}, currentFormData);
    this.changedData = this.deletePropsWithoutData(clearedFormData);
  };

  mapping: Object = {}; // properties of the JSON schema

  /**
   * Functions for filling data object
   */

  fillData(fieldId, fieldValue, currentFormData) {
    Object.keys(currentFormData).map((key) => {
      if(key === fieldId) {
        if(Array.isArray(currentFormData[key])) {
          currentFormData[key] = [];
          currentFormData[key][0] = fieldValue;
        } else {
          if(this.schema.properties[key] && this.schema.properties[key].format && this.schema.properties[key].format === "date") {
            currentFormData[key].dateValue = fieldValue;
          } else {
            currentFormData[key] = fieldValue;
          }
        }
        return currentFormData;
      }
      if ((typeof(currentFormData[key]) === "object") && (!Array.isArray(currentFormData[key])) && (currentFormData[key]) !== null) {
        currentFormData[key] = this.fillData(fieldId, fieldValue, currentFormData[key]);
      }
    });
    return currentFormData;
  };

  /**
   * Functions for deleting properties which have value "null"
   */

  deletePropsWithoutData(clearedFormData) {
    let formData = Object.assign({}, clearedFormData);
    Object.keys(formData).map((key) => {
      if(formData[key] === null || formData[key] === false) {
        delete formData[key];
        return formData;
      }
      if((typeof(formData[key]) === "object") && (!Array.isArray(formData[key]))) {
        formData[key] = this.deletePropsWithoutData(formData[key]);
      }
    });

    return formData;
  };

  /**
   * Call functions for validate of all form fields
   */

  validateForm() {
    let validate = this.ajv.compile(this.schema);
    let dataValidate;
    if(!this.changeValueChecked) {
      // ajv.validate is not working with nested objects, so we have to make a flat clean clone to validate it,
      // otherwise we should not use nested objects as it is working correctly without them
      let flattedForm: any = this.deletePropsWithoutData(this.form);
      dataValidate = validate(this.flatDataObject(flattedForm));
    } else {
      dataValidate = validate(this.flatDataObject(this.changedData));
    }
    dataValidate ? this.invalidMessage = null : this.invalidMessage = this.updateValidationMessage(validate);
  };

  /**
   * Function for flatting data object for validation
   */

  flatDataObject(data) {
    function flat(res, key, val, pre = '') {
        let prefix: any = [pre, key].filter(v => v).join('.').match(/\w+$/);
        return (typeof val === 'object' && (!Array.isArray(val)))
          ? Object.keys(val).reduce((prev, curr) => flat(prev, curr, val[curr], prefix), res)
          : Object.assign(res, { [prefix]: val});
    }
    return Object.keys(data).reduce((prev, curr) => flat(prev, curr, data[curr]), {});
  }

  updateValidationMessage(validate) {
    let unchangedMessage: any = this.ajv.errorsText(validate.errors).replace(/\,?\w*\.?\w*\./g, "").split(" ");
    Object.keys(this.allTitles).map((title: string) => {
      for (let el in unchangedMessage) {
        if (unchangedMessage[el] === title) {
          unchangedMessage[el] = this.allTitles[title];
        }
      }
    });
    return unchangedMessage.toString().replace(/\,(?!\,)/g, " ");
  };

  /**
   * Getting fields based on properties in JSON-schema
   */

  createField(schemaProps: any, prop: any, schemaPropKey: any) {
    let {type} = schemaProps[prop];
    let Tag = this.mapping[type];
    let title: string = schemaProps[prop].title;
    let id: string = schemaProps[prop].$id;
    let elementType: string = schemaProps[prop].type;
    let elementFormat: any = schemaProps[prop].format || null;
    this.allTitles[prop] = title;

    if (!title) {
      schemaProps[prop].items ? title = schemaProps[prop].items.title : title = 'Unnamed field';
      this.allTitles[prop] = title;
    }

    if(schemaProps[prop].format === "date") {
      return <Tag id={id} format={elementFormat} for={elementType} value={this.form[prop].dateValue || ""} title={title}/>;
    }

    // if (prop === "button") {
    //   return <Tag id={id} for={elementType} value={JSON.stringify(this.form[prop])} title={title} allTitles={this.allTitles}/> || null;
    // }
    return <Tag id={id} format={elementFormat} for={elementType} value={(this.form[prop] || this.form[prop] === false) ? JSON.stringify(this.form[prop]) : this.form[schemaPropKey][prop]} title={title}/> || null;

  };

  createForm(schemaProps, schemaPropKey) {
    return Object.keys(schemaProps).map((prop: any) => {
      if (schemaProps[prop].hasOwnProperty("properties")) {
        schemaPropKey = prop;
        return this.createForm(schemaProps[prop].properties, schemaPropKey);
      } else {
        return this.createField(schemaProps, prop, schemaPropKey);
      }
    })
  };

  render() {

    /**
     * Creating form fields and saving it to the let form
     */

    let message: any = null;
    let schemaProps: any = this.schema.properties;

    let form: any = this.createForm(schemaProps, null);

    if (this.invalidMessage) {
      message =
        <div>
          <span>{this.invalidMessage}</span>
        </div>;
    }

    return (
      <div>
        <div>
          {form}
          {message} <br/>
        </div><br/>
        <input class="btn" type="submit" value="Validate" onClick={() => this.validateForm()} />
      </div>
    );
  }

  componentWillLoad() {

    this.data = Object.assign({}, this.form);

    for (let i = 0; i < this.el.children.length; i++) {
      let child = this.el.children[i];
      let mapKey = child['for'];
      this.mapping[mapKey] = child['localName'];
    }
  }
}
