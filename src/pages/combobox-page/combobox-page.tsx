import { Component } from '@stencil/core';

@Component({
    tag: 'combobox-page'
})

export class ComboboxPage {
    render() {
        return (
            <div class="col-lg-12">
                <cwc-combobox label="Dropdown" placeholder="Select a value">
                    <button slot="dropdown-trigger" class="btn btn-primary"
                        type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="true">
                        Select
                    </button>

                    <div slot="dropdown-menu" class="dropdown-menu">
                        <div class="dropdown-item" data-value="Automatic">Automatic</div>
                        <div class="dropdown-item" data-value="Manual">Manual</div>
                    </div>
                </cwc-combobox>
            </div>
        )
    }
}
