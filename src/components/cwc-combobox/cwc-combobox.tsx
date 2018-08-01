import { Component, Prop, State, Listen, Event, EventEmitter } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';

@Component({
    tag: 'cwc-combobox',
    styleUrl: 'cwc-combobox.scss'
})
export class ComboboxComponent {
    /* Used for form-generator component */
    @Prop() id: string;
    @Prop() value: any;
    /* Used for form-generator component */
    @Prop() data: Array<string|number> = [];
    @Prop() label: string;
    @Prop() btnText: string;
    @Prop() btnLeftPosition: boolean = false;
    @Prop() placeholder: string;
    @Prop() readonly: boolean = false;

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

    renderInput() {
        return (
            <input
                id={this.id}
                type="text"
                class="form-control"
                value={this.dropdownValue}
                placeholder={this.placeholder}
                readonly={this.readonly}
            />
        )
    }

    renderDropDown() {
        return (
            <div class="input-group-prepend">
                <cwc-dropdown>
                    <div slot="dropdown-trigger">
                        <div class="btn-group w-100">
                            <button
                                class="btn btn-outline-secondary dropdown-toggle"
                                type="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="true">
                                {this.btnText}
                            </button>
                        </div>
                    </div>
                    <div slot="dropdown-menu" class="dropdown-menu">
                        {this.data.map((value) =>  (
                            <div class="dropdown-item" data-value={value}>{value}</div>
                        ))}
                    </div>
                </cwc-dropdown>
            </div>
        )
    }

    render() {
        return (
            <div class="form-group">
                <label class="control-label">{this.label}</label>
                <div class="input-group mb-3">
                    {this.btnLeftPosition && this.renderDropDown()}
                    {this.renderInput()}
                    {!this.btnLeftPosition && this.renderDropDown()}
                </div>
            </div>
        );
    }
}
