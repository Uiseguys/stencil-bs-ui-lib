import { Component, Prop, Event, EventEmitter, Element, State } from '@stencil/core';

@Component({
	tag: 'my-checkbox',
	shadow: true
})
export class MyCheckbox {

  @State() currentValue: boolean = false;

  @Prop() id: string;
	@Prop() for: string;
  @Prop() value: boolean;
  @Prop() title: string;

  @Event() postValue: EventEmitter;
  @Element()
  element: HTMLElement;

  /**
   * Changing value of 'checked' attribute
   * @param event
   */
  checkWatcher() {
    this.currentValue ? this.currentValue = false : this.currentValue = true;
    this.postValue.emit(this.element);
  };

	render() {
	  const parsedValue = this.value ? this.value : false;

		return (
			<div class="form-check">
				<label class="form-check-label">
          {this.title}<br/>
					<input class="form-check-input" id={this.id} value={`${this.currentValue}` || `${parsedValue}`} type="checkbox" onClick={() => {this.checkWatcher()}} /><br/><br/>
				</label>
			</div>
		);
	}
}
