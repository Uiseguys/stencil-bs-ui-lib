import { Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';

@Component({
	tag: 'my-dropdown',
	shadow: true,
    styleUrl: '../../../node_modules/bootstrap/dist/css/bootstrap.css'
})
export class MyDropdown {

  @State() currentValue: string;

  @Event() postValue: EventEmitter;
  @Element()
  element: HTMLElement;

  @Prop() id: string;
  @Prop() for: string;
  @Prop() value: string;
  @Prop() title: string;

  getSelectValues(event) {
    this.currentValue = event.currentTarget.value;
    this.postValue.emit(this.element);
  };

	render() {
    const parsedValue = this.value ? JSON.parse(this.value): null;

    return (
      <div class="input-group col-3">
           <select class="custom-select" id={this.id} value={this.currentValue} onClick={(event) => this.getSelectValues(event)}>
             {parsedValue && parsedValue.map((value) =>
               <option>{value}</option>
             )}
           </select>
      </div>
		);
	}
}
