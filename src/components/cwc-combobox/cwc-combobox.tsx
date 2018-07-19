import { Component, Listen, State } from '@stencil/core';

@Component({
    tag: 'cwc-combobox'
})
export class ComboboxComponent {
    @State() dropdownValue: string

    @Listen('change')
    dropdownHandler(value: CustomEvent): void {
        this.dropdownValue = value.detail
    }

    render() {
        return (
            <div class="form-group">
                <label>Dropdown</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <cwc-dropdown id="comboboxDropdown">
                            <slot name="dropdown-trigger" slot="dropdown-trigger"></slot>
                            <slot name="dropdown-menu" slot="dropdown-menu"></slot>
                        </cwc-dropdown>
                    </div>
                    <input type="text" class="form-control" value={this.dropdownValue} readonly />
                </div>
            </div>
        );
    }
}
