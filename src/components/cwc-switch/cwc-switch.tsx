import {Component, Prop, Event, EventEmitter, Element, State} from '@stencil/core';

@Component({
    tag: 'cwc-switch',
    styleUrl: 'cwc-switch.scss'
})
export class CwcSwitchbox {

    @State() currentValue: boolean = false;

    @Prop() id: string;
    @Prop() for: string;
    @Prop() value: boolean;
    @Prop() checkboxTitle: string;
    @Prop() checked: boolean;
    @Prop() labelON: string;
    @Prop() labelOFF: string;


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
                <label class="switch">
                    <input class="form-check-input" id={this.id} value={`${this.currentValue}`}
                           type="checkbox" checked={this.currentValue} onClick={() => {this.checkWatcher()}} />
                    <span class="slider round"></span>
                    <span class={{'labelON': true, 'switch-status': this.currentValue}}>{this.labelON}</span>
                    <span class={{'labelOFF': true, 'switch-status': !this.currentValue}}>{this.labelOFF}</span>
                </label>
            </div>
        );
    }
}
