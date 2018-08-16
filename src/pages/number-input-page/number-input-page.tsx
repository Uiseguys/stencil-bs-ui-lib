import { Component } from '@stencil/core';

@Component({
    tag: 'number-input-page',
    styleUrl: 'number-input-page.scss'
})

export class DropdownPage {
    render() {
        return (
          <div>
            <cwc-number-input></cwc-number-input>
          </div>
        );
    }
}
