import {Component, Prop, Event, EventEmitter, Element, State} from '@stencil/core';

@Component({
    tag: 'cwc-switch',
    shadow: true,
    styleUrl: 'cwc-switch.scss'
})
export class CwcSwitchbox {

    @State() currentValue: boolean = false;

    @Prop() id: string;
    @Prop() for: string;
    @Prop() value: boolean;
    @Prop() checkboxTitle: string;
    @Prop() labelON: string;
    @Prop() labelOFF: string;


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
        console.log('this.labelON-',this.labelON);
        console.log('this.labelOFF-',this.labelOFF);
        const parsedValue = this.value ? this.value : false;
        return (
            <div class="form-check">
                <label class="switch">
                    <input class="form-check-input" id={this.id} value={`${this.currentValue}` || `${parsedValue}`} type="checkbox" onClick={() => {this.checkWatcher()}} />
                    <span class="slider round"></span>
                    <span class="labelON">{this.labelON}</span>
                    <span class="labelOFF">{this.labelOFF}</span>
                </label>
            </div>
        );
    }
}
