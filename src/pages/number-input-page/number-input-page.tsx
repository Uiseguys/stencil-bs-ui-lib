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
            placeholder='type number'
            alwaysSign={true}
            disabled={false}
            hidden={false}
            padLength={5}
            // maximumFractionDigits={3}
            // minimumFractionDigits={3}
            // max={5}
            // min={2}
            ></cwc-number-input>
          </div>
        );
    }
}
