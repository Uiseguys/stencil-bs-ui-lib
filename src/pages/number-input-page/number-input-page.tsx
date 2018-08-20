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
            hidden={false}
            name='testinput'
            step={0.1}
            // autoResize
            // minlength={3}
            // required
            // disabled
            // default='1234'
            // alwaysSign={true}
            // padLength={5}
            // maximumFractionDigits={3}
            // minimumFractionDigits={3}
            autoPadding
            max={1000}
            min={1}
            ></cwc-number-input>
          </div>
        );
    }
}
