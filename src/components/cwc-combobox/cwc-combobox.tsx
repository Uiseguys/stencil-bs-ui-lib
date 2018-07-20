import { Component, Prop, State, Listen, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'cwc-combobox'
})
export class ComboboxComponent {
    @Prop() id: string;
    @Prop() value: any;
    @Prop() label: string;
    @Prop() placeholder: string;

    @State() dropdownValue: string

    @Listen('change')
    dropdownHandler(value: CustomEvent): void {
        this.dropdownValue = value.detail
        this.postValue.emit({
            id: this.id,
            value: this.dropdownValue,
            type: 'dropdown'
        });
    }

    @Event() postValue: EventEmitter;

    componentWillLoad() {
        this.dropdownValue = this.value;
    }

    render() {
        return (
            <div class="form-group">
                <label>{this.label}</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <cwc-dropdown id="comboboxDropdown">
                            <slot name="dropdown-trigger" slot="dropdown-trigger"></slot>
                            <slot name="dropdown-menu" slot="dropdown-menu"></slot>
                        </cwc-dropdown>
                    </div>
                    <input
                        id={this.id}
                        type="text"
                        class="form-control"
                        value={this.dropdownValue}
                        placeholder={this.placeholder}
                        readonly
                    />
                </div>
            </div>
        );
    }
}
