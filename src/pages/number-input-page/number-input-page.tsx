import { Component } from '@stencil/core';

@Component({
    tag: 'number-input-page',
    styleUrl: 'number-input-page.scss'
})

export class DropdownPage {
    render() {
        return (
          <div>
            <cwc-number-input
            // required={true}
            step={0.001} min={-1} max={1} placeholder="0" startAt={0}
            ></cwc-number-input>
          </div>
        );
    }
}
