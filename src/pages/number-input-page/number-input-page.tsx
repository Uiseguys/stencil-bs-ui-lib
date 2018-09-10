import { Component, Listen, State, Element, HostElement } from '@stencil/core';

@Component({
    tag: 'number-input-page',
    styleUrl: 'number-input-page.scss'
})

export class NumberInputPage {
  @State() firstValue: number;

  @Element() el: HostElement;

  @Listen('theComponentChanged')
  theComponentChangedHandler() {
    this.updateValues();
  }

  componentDidLoad() {
    this.updateValues();
  }

  private updateValues() {
    this.firstValue = this.el.querySelector('#first')['value'];
  }

    render() {
        return (
          <div>
            <div>
              <cwc-number-input
              id="first"
              step={0.001} min={-1} max={1} placeholder="0.000" startAt={0}
              ></cwc-number-input>
              <div class="vertical-section-container result">
                <div>
                  <code>step</code>: <b>0.001</b><code>min</code>: <b>-1</b><code>max</code>: <b>1</b><code>start at</code>: <b>0</b>
                </div>
                <div><code>value</code>: <b>{this.firstValue}</b></div>
              </div>
            </div>
            <br/><br/>
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
            <br/>
            <cwc-number-input class="decimal" min={-23}
            step={1.15} max={45} padLength={4} placeholder="- -"
            ></cwc-number-input>
          </div>
        );
    }
}
