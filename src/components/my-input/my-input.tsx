// /*
// import {Component, Prop, State, Event, EventEmitter, Element} from '@stencil/core';
// import Pikaday from 'pikaday/pikaday.js';   // disable the listener to support shadow DOM
// // import * as moment from 'moment';
//
// @Component({
//     tag: 'my-input',
//     shadow: true,
//     styleUrl: 'my-input.scss'
// })
// export class MyInput {
//
//     @State() currentValue: string;
//     @State() currentDate: any;
//
//     @Prop() id: string;
//     @Prop() for: string;
//     @Prop() value: any;
//     @Prop() inputTitle: string;
//     @Prop() format: any;
//
//     @Event() postValue: EventEmitter;
//     @Element()
//     element: HTMLElement;
//
//     getAndPostTextValue(event) {
//         if (event.currentTarget.value) {
//             this.for === "integer" ?
//                 this.currentValue = JSON.parse(event.currentTarget.value) : this.currentValue = event.currentTarget.value;
//         } else {
//             this.currentValue = null;
//         }
//         this.postValue.emit(this.element);
//     };
//
//     getContent() {
//         let content =
//             <input class="form-control" id={this.id} type={this.for === "integer" ? "number" : "text"}
//                    value={this.currentValue} onInput={(event) => this.getAndPostTextValue(event)}/>;
//         if (this.format === "date") {
//             content =
//                 <input class="form-control" id={this.id} type={this.for === "integer" ? "number" : "text"}
//                        value={this.currentValue} onChange={(event) => this.getAndPostTextValue(event)}
//                        onInput={(event) => this.getAndPostTextValue(event)}/>;
//         }
//         return content;
//     };
//
//     componentWillLoad() {
//
//         if (this.for === "object") {
//             this.currentValue = this.value ? this.value : "";
//         }
//         if (this.for === "integer") {
//             this.currentValue = this.value || null;
//         }
//         if (this.for === "string") {
//             this.currentValue = this.value ? JSON.parse(this.value) : "";
//         }
//     };
//
//     componentDidLoad() {
//
//         if (this.for === "object" && this.format === "date") {
//             const picker = new Pikaday({
//                 field: this.element && this.element.shadowRoot && this.element.shadowRoot.querySelector("input"),
//                 onSelect: function (date) {
//                     console.log('disabled date formatting via moment because build broke');
//                     console.log(date);
//                     // self.currentDate = moment(date).format('Do MMMM YYYY');
//                 }
//             });
//             picker._onClick = null;   // disable the listener to support shadow DOM
//         }
//     };
//
//     render() {
//
//         const content = this.getContent();
//
//         return (
//             <div class="form-group">
//                 <label>
//                     {this.inputTitle}<br/>
//                     {content}<br/>
//                 </label>
//             </div>
//         );
//     }
// }
// */
