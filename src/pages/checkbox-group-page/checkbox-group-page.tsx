import { Component } from '@stencil/core';

@Component({
    tag: 'checkbox-group-page',
    styleUrl: 'checkbox-group-page.scss'
})

export class DropdownPage {
    render() {
        return (
          <div>
            <cwc-checkbox-group></cwc-checkbox-group>
          </div>
        );
    }
}
