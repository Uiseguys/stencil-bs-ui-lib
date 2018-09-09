import { Component } from '@stencil/core';

@Component({
    tag: 'number-input-page',
    styleUrl: 'number-input-page.scss'
})

export class NumberInputPage {
    render() {
        return (
          <div>
            <cwc-number-input
            step={0.001} min={-1} max={1} placeholder="0.000" startAt={0}
            ></cwc-number-input>

            <cwc-number-input
            class="various" noClamp default={1}
            step={0.01} min={-1} max={20000}
            unit="cm" startAt={1}
            useGrouping={true} alwaysSign={true}
            locale="it" numberStyle="currency"
            currency="EUR" autoPadding={true}
            ></cwc-number-input>
          </div>
        );
    }
}
