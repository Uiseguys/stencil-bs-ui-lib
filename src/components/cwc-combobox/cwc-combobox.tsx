import { Component, Prop, State, Listen, Event, EventEmitter } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';

@Component({
    tag: 'cwc-combobox',
    styleUrl: 'cwc-combobox.scss'
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
                <label class="control-label">{this.label}</label>
                <div class="input-group mb-3">
                    <input
                        id={this.id}
                        type="text"
                        class="form-control"
                        value={this.dropdownValue}
                        placeholder={this.placeholder}
                        readonly
                    />
                    <div class="input-group-prepend">
                        <cwc-dropdown>
                            <div slot="dropdown-trigger">
                                <div class="btn-group w-100">
                                    <button
                                        class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                        type="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="true">
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
                </div>
            </div>
        );
    }
}
