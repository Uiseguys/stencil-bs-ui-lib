import { Component, Prop, State, Listen, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'cwc-combobox'
})
export class ComboboxComponent {
    @Prop() id: string;
    @Prop() value: any;
    @Prop() data: any[] = [];
    @Prop() label: string;
    @Prop() btnText: string = "Select";
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
                            <button slot="dropdown-trigger" class="btn btn-primary"
                                type="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="true">
                                {this.btnText}
                            </button>

                            <div slot="dropdown-menu" class="dropdown-menu">
                                {this.data.map((value) =>  (
                                    <div class="dropdown-item" data-value={value}>{value}</div>
                                ))}
                            </div>
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
