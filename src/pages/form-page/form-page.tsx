// import {Component, State} from '@stencil/core';
// import Ajv from 'ajv/dist/ajv.min.js';
// import moment from 'moment';
//
// @Component({
//     tag: 'form-page',
//     shadow: true,
// })
// export class FormPage {
//
//     @State() schema: any;
//     @State() form: any;
//     @State() ajv: any;
//
//     componentWillLoad() {
//
//         this.ajv = new Ajv({allErrors: true});
//
//         this.schema = {
//             "type": "object",
//             "required": ["startDate", "endDate", "min", "max", "checked", "sources", "dateValue"],
//             "properties": {
//                 "checked": {
//                     "$id": "data/properties/checked",
//                     "type": "boolean",
//                     "title": "The Checked Schema",
//                     "description": "An explanation about the purpose of this instance.",
//                     "default": false,
//                     "examples": [
//                         false
//                     ]
//                 },
//                 "date": {
//                     "$id": "data/properties/date",
//                     "title": "Date",
//                     "type": "object",
//                     "format": "date",
//                     "dateValue": {
//                         "$id": "data/properties/date/dateValue",
//                         "type": "string",
//                         "title": "Date"
//                     }
//                 },
//                 "duration": {
//                     "$id": "data/properties/duration",
//                     "type": "object",
//                     "properties": {
//                         "min": {
//                             "$id": "data/properties/duration/properties/min",
//                             "type": "integer",
//                             "title": "The Min Schema",
//                             "description": "An explanation about the purpose of this instance.",
//                             "default": 0,
//                             "examples": [
//                                 5
//                             ]
//                         },
//                         "max": {
//                             "$id": "data/properties/duration/properties/max",
//                             "type": "integer",
//                             "title": "The Max Schema",
//                             "description": "An explanation about the purpose of this instance.",
//                             "default": 0,
//                             "examples": [
//                                 10
//                             ]
//                         }
//                     }
//                 },
//                 "startDate": {
//                     "$id": "data/properties/startDate",
//                     "type": "string",
//                     "title": "The Startdate Schema",
//                     "description": "An explanation about the purpose of this instance.",
//                     "default": "",
//                     "examples": [
//                         "2007-08-31T16:47+00:00"
//                     ]
//                 },
//                 "endDate": {
//                     "$id": "data/properties/endDate",
//                     "type": "string",
//                     "title": "The Enddate Schema",
//                     "description": "An explanation about the purpose of this instance.",
//                     "default": "",
//                     "examples": [
//                         "2007-08-31T16:47+00:00"
//                     ]
//                 },
//                 "sources": {
//                     "$id": "data/properties/sources",
//                     "type": "array",
//                     "items": {
//                         "$id": "/properties/sources/items",
//                         "type": "string",
//                         "title": "The 0 Schema",
//                         "description": "An explanation about the purpose of this instance.",
//                         "default": "",
//                         "examples": [
//                             "source1"
//                         ]
//                     }
//                 }
//             }
//         };
//
//         this.form = {
//             "checked": false,
//             "date": {
//                 "dateValue": moment(new Date()).format('Do MMMM YYYY')
//             },
//             "duration": {
//                 "min": 5,
//                 "max": 10
//             },
//             "startDate": "2007-08-31T16:47+00:00",
//             "endDate": "2007-08-31T16:47+00:00",
//             "sources": [
//                 "source1",
//                 "source2"
//             ]
//         };
//     };
//
//     render() {
//
//
//         return (
//             <my-dynamic-form schema={this.schema} form={this.form} ajv={this.ajv}>
//                 <my-input for="integer"></my-input>
//                 <my-input for="string"></my-input>
//                 <my-input for="object"></my-input>
//                 <my-dropdown for="array"></my-dropdown>
//                 <my-checkbox for="boolean"></my-checkbox>
//             </my-dynamic-form>
//         );
//     }
// }
//
