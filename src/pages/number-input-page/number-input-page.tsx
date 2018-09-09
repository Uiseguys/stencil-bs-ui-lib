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
            <br/>
            <cwc-number-input
            class="various" noClamp default={1}
            step={0.01} min={-1} max={20000}
            unit="cm" startAt={1}
            useGrouping={true} alwaysSign={true}
            locale="en" numberStyle="currency"
            currency="EUR" autoPadding={true}
            ></cwc-number-input>
            <br/>
            <cwc-number-input
            class="saturate" padLength={4}
            saturate placeholder="0000"
            min={-10} step={100} max={9999.11} default={100}
            ></cwc-number-input>
          </div>
        );
    }
}
