import { Component, Listen, State, Element, HostElement } from '@stencil/core';

@Component({
    tag: 'number-input-page',
    styleUrl: 'number-input-page.scss'
})

export class NumberInputPage {
  @State() firstValue: number;
  @State() secondValue: number;
  @State() thirdValue: number;
  @State() fourthValue: number;

  @Element() el: HostElement;

  @Listen('numberInputChanged')
  numberInputChangedHandler() {
    this.updateValues();
  }

  componentDidLoad() {
    this.updateValues();
  }

  private updateValues() {
    this.firstValue = this.el.querySelector('#first')['value'];
    this.secondValue = this.el.querySelector('#second')['value'];
    this.thirdValue = this.el.querySelector('#third')['value'];
    this.fourthValue = this.el.querySelector('#fourth')['value'];
  }

    render() {
        return (
          <div>
            <div class="container pt-4" >
                <h2 class="mb-4">Number Input</h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3" >
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="row">
                                        <h3>Usage </h3>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <pre><code class="lang-tsx">
                                                <span>&lt;cwc-number-input</span><br />
                                                <span class="hljs-built_in ml-4">step="0.001"</span><br />
                                                <span class="hljs-built_in ml-4">min="-1"</span><br />
                                                <span class="hljs-built_in ml-4">max="1"</span><br />
                                                <span class="hljs-built_in ml-4">placeholder="0.000"</span><br />
                                                <span class="hljs-built_in ml-4">start-at="0"</span>
                                                <br />
                                                <span>&lt;/cwc-number-input&gt;</span>
                                            </code></pre>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-8">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>Param</th>
                                            <th>Type</th>
                                            <th>Default</th>
                                            <th>Description</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>alwaysSign</td>
                                            <td>Boolean</td>
                                            <td></td>
                                            <td>If true, it will always show the sign at the beginning</td>
                                        </tr>
                                        <tr>
                                            <td>autoPadding</td>
                                            <td>Boolean</td>
                                            <td></td>
                                            <td>enables auto padding</td>
                                        </tr>
                                        <tr>
                                            <td>autoResize</td>
                                            <td>Boolean</td>
                                            <td></td>
                                            <td>if true, the length of the value is not used for computing the size-attribute</td>
                                        </tr>
                                        <tr>
                                            <td>currency</td>
                                            <td>String</td>
                                            <td></td>
                                            <td>The currency to use in currency formatting.
                                            Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar,
                                            "EUR" for the euro, or "CNY" for the Chinese RMB —
                                            see <a href="http://www.currency-iso.org/en/home/tables/table-a1.html">
                                            http://www.currency-iso.org/en/home/tables/table-a1.html</a>.
                                            There is no default value; if the style is "currency",
                                            the currency property must be provided.</td>
                                        </tr>
                                        <tr>
                                            <td>currencyDisplay</td>
                                            <td>String</td>
                                            <td></td>
                                            <td>How to display the currency in currency formatting.
                                            Possible values are "symbol" to use a localized currency symbol such as €,
                                            "code" to use the ISO currency code, "name" to use a localized currency name such as "dollar";
                                            the default is "symbol".</td>
                                        </tr>
                                        <tr>
                                            <td>default</td>
                                            <td>Number</td>
                                            <td></td>
                                            <td>the default value of the input</td>
                                        </tr>
                                        <tr>
                                            <td>disabled</td>
                                            <td>Boolean</td>
                                            <td></td>
                                            <td>disables the input</td>
                                        </tr>
                                        <tr>
                                            <td>hidden</td>
                                            <td>Boolean</td>
                                            <td></td>
                                            <td>if true, the input is not displayed</td>
                                        </tr>
                                        <tr>
                                            <td>invalid</td>
                                            <td>Boolean</td>
                                            <td></td>
                                            <td>required attribute</td>
                                        </tr>
                                        <tr>
                                            <td>locale</td>
                                            <td>String</td>
                                            <td>the browser locale</td>
                                            <td>The current locale</td>
                                        </tr>
                                        <tr>
                                            <td>max</td>
                                            <td>Number</td>
                                            <td></td>
                                            <td>Maximum allowed input</td>
                                        </tr>
                                        <tr>
                                            <td>maximumSignificantDigits</td>
                                            <td>Number</td>
                                            <td></td>
                                            <td>The maximum number of significant digits to use.
                                            Possible values are from 1 to 21; the default is minimumSignificantDigits.</td>
                                        </tr>
                                        <tr>
                                            <td>min</td>
                                            <td>Number</td>
                                            <td></td>
                                            <td>Minimum allowed input</td>
                                        </tr>
                                        <tr>
                                            <td>minimumSignificantDigits</td>
                                            <td>Number</td>
                                            <td></td>
                                            <td>The minimum number of significant digits to use.
                                            Possible values are from 1 to 21; the default is 1.</td>
                                        </tr>
                                        <tr>
                                            <td>minlength</td>
                                            <td>Number</td>
                                            <td></td>
                                            <td>the minlength of the input</td>
                                        </tr>
                                        <tr>
                                            <td>name</td>
                                            <td>String</td>
                                            <td></td>
                                            <td>name of the input</td>
                                        </tr>
                                        <tr>
                                            <td>noAutoWidth</td>
                                            <td>Boolean</td>
                                            <td></td>
                                            <td>if true, the length of the value is not used for computing the size-attribute</td>
                                        </tr>
                                        <tr>
                                            <td>noClamp</td>
                                            <td>Boolean</td>
                                            <td></td>
                                            <td>if true, the value does not clamp according to the given step</td>
                                        </tr>
                                        <tr>
                                            <td>numberStyle</td>
                                            <td>String</td>
                                            <td>"decimal"</td>
                                            <td>The formatting style to use. Possible values are "decimal" for plain number formatting,
                                            "currency" for currency formatting, and "percent" for percent formatting;
                                            the default is "decimal". notice: min, max and step are not in percent
                                            (so e.g. if step is 0.01, it means that the step is 1%)</td>
                                        </tr>
                                        <tr>
                                            <td>padLength</td>
                                            <td>Number</td>
                                            <td></td>
                                            <td>length to pad the string (with 0) according to the total amount of numbers</td>
                                        </tr>
                                        <tr>
                                            <td>placeholder</td>
                                            <td>String</td>
                                            <td></td>
                                            <td>the placeholder string</td>
                                        </tr>
                                        <tr>
                                            <td>required</td>
                                            <td>Boolean</td>
                                            <td></td>
                                            <td>required attribute</td>
                                        </tr>
                                        <tr>
                                            <td>saturate</td>
                                            <td>Boolean</td>
                                            <td></td>
                                            <td>if true, the value does not revolve the range according to the maximum or the minimum</td>
                                        </tr>
                                        <tr>
                                            <td>startAt</td>
                                            <td>Number</td>
                                            <td></td>
                                            <td>start where to increment the value</td>
                                        </tr>
                                        <tr>
                                            <td>step</td>
                                            <td>Number</td>
                                            <td>1</td>
                                            <td>step for changing the input (referencing to min or 0)</td>
                                        </tr>
                                        <tr>
                                            <td>stepMod</td>
                                            <td>Number</td>
                                            <td>1</td>
                                            <td>
                                              <p>a step modifier. this is useful if you are having one step for multible elements
                                              that represent parts of numbers, like when you are having one input for the decimal part
                                              and one for the integer part. For example:</p>
                                              <ul>
                                                <li>if step is 0.002 and the step-mod is 1000, 2 will be used</li>
                                                <li>if step is 10 and the step-mod is 0.02, 0.2 will be used</li>
                                              </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>unit</td>
                                            <td>String</td>
                                            <td></td>
                                            <td>unit of the output (only used when number-style="decimal")</td>
                                        </tr>
                                        <tr>
                                            <td>unitSeparator</td>
                                            <td>String</td>
                                            <td>" "</td>
                                            <td>the separator to separate value and unit</td>
                                        </tr>
                                        <tr>
                                            <td>useGrouping</td>
                                            <td>Boolean</td>
                                            <td></td>
                                            <td>if true the number will be grouped according to the locale.</td>
                                        </tr>
                                        <tr>
                                            <td>value</td>
                                            <td>Number</td>
                                            <td></td>
                                            <td>value of the input</td>
                                        </tr>
                                        <tr>
                                            <td>valueAsNumber</td>
                                            <td>Number</td>
                                            <td></td>
                                            <td>value of the input</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <h3>Example:</h3>
            <div class="jumbotron">
              <div>
                <cwc-number-input id="first"
                step={0.001} min={-1} max={1} placeholder="0.000" startAt={0}
                ></cwc-number-input>
                <div class="vertical-section-container result">
                  <div>
                    <code>step</code>: <b>0.001</b> <code>min</code>: <b>-1</b> <code>max</code>: <b>1</b> <code>start at</code>: <b>0</b>
                  </div>
                  <div><code>value</code>: <b>{this.firstValue}</b></div>
                </div>
              </div>
              <br/><br/>
              <div>
                <cwc-number-input id="second"
                class="various" noClamp default={1}
                step={0.01} min={-1} max={20000}
                startAt={1} useGrouping numberStyle="currency"
                currency="EUR" autoPadding
                ></cwc-number-input>
                <div class="vertical-section-container result">
                  <div>
                    <code>step</code>: <b>0.01 </b>
                    <code>min</code>: <b>-1 </b>
                    <code>max</code>: <b>20000 </b>
                    <code>start at</code>: <b>1 </b>
                    <br/>
                    <code>useGrouping</code>: <b>true </b>
                    <code>numberStyle</code>: <b>"currency" </b>
                    <code>currency</code>: <b>"EUR" </b>
                    <code>autoPadding</code>: <b>true </b>
                  </div>
                  <div><code>value</code>: <b>{this.secondValue}</b></div>
                </div>
              </div>
              <br/><br/>
              <div>
                <cwc-number-input id="third"
                class="saturate" padLength={4}
                saturate placeholder="0000"
                min={-10} step={100} max={9999.11} default={100}
                ></cwc-number-input>
                <div class="vertical-section-container result">
                  <div>
                    <code>padLength</code>: <b>4 </b>
                    <code>saturate</code>: <b>true </b>
                    <code>placeholder</code>: <b>"0000" </b>
                    <code>min</code>: <b>-10 </b>
                    <br/>
                    <code>step</code>: <b>100 </b>
                    <code>max</code>: <b>9999.11 </b>
                    <code>default</code>: <b>100 </b>
                  </div>
                  <div><code>value</code>: <b>{this.thirdValue}</b></div>
                </div>
              </div>
              <br/><br/>
              <div>
                <cwc-number-input id="fourth"
                class="decimal" min={-23}
                step={1.15} max={45} padLength={4} placeholder="- -"
                ></cwc-number-input>
                <div class="vertical-section-container result">
                  <div>
                    <code>min</code>: <b>-23 </b>
                    <code>step</code>: <b>1.15 </b>
                    <code>max</code>: <b>45 </b>
                    <code>padLength</code>: <b>4 </b>
                    <code>placeholder</code>: <b>"- -" </b>
                  </div>
                  <div><code>value</code>: <b>{this.fourthValue}</b></div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
