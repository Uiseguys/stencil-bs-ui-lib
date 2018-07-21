import { Component } from '@stencil/core';

@Component({
    tag: 'combobox-page'
})

export class ComboboxPage {
    render() {
        const data = ["Automatic", "Manual"];

        return (
            <div class="col-lg-12">
                <cwc-combobox
                    data={data}
                    label="Dropdown"
                    btnText="Select"
                    placeholder="Select a value"
                />
            </div>
        )
    }
}
