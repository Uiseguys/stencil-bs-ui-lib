import {Component, Prop, Event, EventEmitter, Element, State} from '@stencil/core';

@Component({
    tag: 'my-checkbox',
    shadow: true,
    styleUrl: 'my-checkbox.scss'
})
export class MyCheckbox {

    @State() currentValue: boolean = false;

    @Prop() id: string;
    @Prop() for: string;
    @Prop() value: boolean;
    @Prop() checkboxTitle: string;

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
                <input class="form-check-input" id={this.id} value={`${this.currentValue}` || `${parsedValue}`}
                       type="checkbox" onClick={() => {this.checkWatcher()}} />
                <label class="form-check-label" htmlFor={this.id}>
                    {this.checkboxTitle}
                </label>
            </div>
        );
    }
}
