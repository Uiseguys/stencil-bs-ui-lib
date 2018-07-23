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
    @Prop() checked: boolean;

    @Event() postValue: EventEmitter;
    @Element()
    element: HTMLElement;

    /**
     * Before render default value assigned
     * @param event
     */
    componentWillLoad(){
        this.currentValue = this.value ? this.value : false;
    }

    /**
     * Changing value of 'checked' attribute
     * @param event
     */
    checkWatcher() {
        this.currentValue = !this.currentValue;
        this.postValue.emit(this.element);
    };

    render() {
        return (
            <div class="form-check">
                <input class="form-check-input" id={this.id} value={`${this.currentValue}`}
                       type="checkbox" checked={this.currentValue} onClick={() => {this.checkWatcher()}} />
                <label class="form-check-label" htmlFor={this.id}>
                    {this.checkboxTitle}
                </label>
            </div>
        );
    }
}
