import { Component, Element, HostElement, State, Listen } from '@stencil/core';

@Component({
    tag: 'datetime-input-page',
    styleUrl: 'datetime-input-page.scss'
})

export class DatetimeInputPage {
    @Element() el: HostElement;
    @State() firstdate: Object = {
      datetime: undefined,
      date: undefined,
      time: undefined,
      value: undefined
    };
    @State() seconddate: Object = {
      datetime: undefined,
      value: undefined
    };
    @State() withTimezone: boolean;
    @State() hour12Format: boolean;
    @State() step: number;

    @Listen('datetimeInputChanged')
    datetimeInputChangedHandler() {
      this._updateComponent();
    }

    @Listen('numberInputChanged')
    numberInputChangedHandler(e) {
      if (e.target.attributes
        && e.target.attributes.class
        && e.target.attributes.class.value
        && e.target.attributes.class.value.includes('stepinput')
        && e.target['value'] !== this.step) {
        this.step = e.target['value'];
      }
    }

    @Listen('selectionChanged')
    selectionHandler(e) {
      const hour12Format = this.el.querySelector('#firstdate')['hour12Format'];
      const withTimezone = this.el.querySelector('#firstdate')['withTimezone'];
      const variables = e.detail.map(elem => elem.variable);
      const hour12FormatCondition = variables.indexOf('hour12Format') !== -1;
      const withTimezoneCondition = variables.indexOf('withTimezone') !== -1;
      if (hour12Format !== hour12FormatCondition) {
        this.hour12Format = hour12FormatCondition;
      }
      if (withTimezone !== withTimezoneCondition) {
        this.withTimezone = withTimezoneCondition;
      }
    }

    private _updateComponent() {
      if (this.el.querySelector('#firstdate')['datetime'] !== this.firstdate['datetime']
      || this.el.querySelector('#firstdate')['date'] !== this.firstdate['date']
      || this.el.querySelector('#firstdate')['time'] !== this.firstdate['time']
      || this.el.querySelector('#firstdate')['value'] !== this.firstdate['value']) {
        this.firstdate = {
          datetime: this.el.querySelector('#firstdate')['datetime'],
          date: this.el.querySelector('#firstdate')['date'],
          time: this.el.querySelector('#firstdate')['time'],
          value: this.el.querySelector('#firstdate')['value']
        }
      }
      if (this.el.querySelector('#seconddate')['datetime'] !== this.seconddate['datetime']
      || this.el.querySelector('#seconddate')['value'] !== this.seconddate['value']) {
        this.seconddate = {
          datetime: this.el.querySelector('#seconddate')['datetime'],
          value: this.el.querySelector('#seconddate')['value']
        }
      }
    }

    render() {
        return (
          <div>
            <div class="container pt-4" >
              <h2 class="mb-4">Datetime Input</h2>
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
                                              <span>&lt;cwc-datetime-input</span><br />
                                              <span class="hljs-built_in ml-4">step="1"</span><br />
                                              <span class="hljs-built_in ml-4">with-timezone="true"</span><br />
                                              <span class="hljs-built_in ml-4">hour12-format="true"</span><br />
                                              <span>&lt;/cwc-datetime-input&gt;</span>
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
                                          <td>clamp</td>
                                          <td>String</td>
                                          <td>"millisecond"</td>
                                          <td>Clamp datetime to a property possible values: 'month', 'day',<br/>
                                          'hour', 'minute', 'second', 'millisecond' or ''</td>
                                      </tr>
                                      <tr>
                                          <td>date</td>
                                          <td>String</td>
                                          <td></td>
                                          <td>the selected date (format: iso8601)</td>
                                      </tr>
                                      <tr>
                                          <td>dateOrder</td>
                                          <td>Object</td>
                                          <td></td>
                                          <td>order of date-parts</td>
                                      </tr>
                                      <tr>
                                          <td>datetime</td>
                                          <td>String</td>
                                          <td></td>
                                          <td>the selected date and time (format: iso8601)</td>
                                      </tr>
                                      <tr>
                                          <td>dateValues</td>
                                          <td>Object</td>
                                          <td>&#123;"year": undefined, "month": undefined, "day": undefined, "hour": undefined,<br/>
                                          "minute": undefined, "second": undefined, "millisecond": undefined&#125;</td>
                                          <td>
                                          year - The year of the selected date<br/>
                                          month - The month of the selected date<br/>
                                          day - The day of the selected date<br/>
                                          hour - The hour of the selected time<br/>
                                          minute - The minute of the selected time<br/>
                                          second - The second of the selected time<br/>
                                          millisecond - The millisecond of the selected time
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>default</td>
                                          <td>Object</td>
                                          <td></td>
                                          <td>default value of the input</td>
                                      </tr>
                                      <tr>
                                          <td>disabled</td>
                                          <td>Boolean</td>
                                          <td></td>
                                          <td>disables the input</td>
                                      </tr>
                                      <tr>
                                          <td>hour12</td>
                                          <td>Number</td>
                                          <td></td>
                                          <td>hour in 12-hour-format</td>
                                      </tr>
                                      <tr>
                                          <td>hour12Format</td>
                                          <td>Boolean</td>
                                          <td></td>
                                          <td>when true, 12-hour time format, else 24-hour</td>
                                      </tr>
                                      <tr>
                                          <td>maximumSignificantDigits</td>
                                          <td>Number</td>
                                          <td></td>
                                          <td>The maximum number of significant digits to use.
                                          Possible values are from 1 to 21; the default is minimumSignificantDigits.</td>
                                      </tr>
                                      <tr>
                                          <td>invalid</td>
                                          <td>Boolean</td>
                                          <td></td>
                                          <td>invalid attribute</td>
                                      </tr>
                                      <tr>
                                          <td>isAm</td>
                                          <td>Boolean</td>
                                          <td></td>
                                          <td>true, when A.M. (when hour &#60; 12)</td>
                                      </tr>
                                      <tr>
                                          <td>locale</td>
                                          <td>String</td>
                                          <td></td>
                                          <td>The current locale</td>
                                      </tr>
                                      <tr>
                                          <td>max</td>
                                          <td>Object</td>
                                          <td></td>
                                          <td>The maximal date, could be a number, a date-object or an iso-string in time,
                                          date or datetime-notation</td>
                                      </tr>
                                      <tr>
                                          <td>min</td>
                                          <td>Object</td>
                                          <td></td>
                                          <td>The minimal date, could be a number, a date-object or an iso-string in time,
                                          date or datetime-notation</td>
                                      </tr>
                                      <tr>
                                          <td>name</td>
                                          <td>String</td>
                                          <td></td>
                                          <td>name of the input</td>
                                      </tr>
                                      <tr>
                                          <td>partsDisabled</td>
                                          <td>Object</td>
                                          <td>&#123;&#125;</td>
                                          <td>date-parts that are disabled</td>
                                      </tr>
                                      <tr>
                                          <td>partsHidden</td>
                                          <td>Object</td>
                                          <td>&#123;&#125;</td>
                                          <td>date-parts that are hidden e.g. '&#123; "year": true &#125;'
                                          would hide the input for the year</td>
                                      </tr>
                                      <tr>
                                          <td>propertyForValue</td>
                                          <td>String</td>
                                          <td>valueAsNumber</td>
                                          <td>defines the property that should be used for the value</td>
                                      </tr>
                                      <tr>
                                          <td>required</td>
                                          <td>Boolean</td>
                                          <td></td>
                                          <td>required attribute</td>
                                      </tr>
                                      <tr>
                                          <td>step</td>
                                          <td>Number</td>
                                          <td></td>
                                          <td>
                                          If set the step defines the step a date should be incremented (in seconds).
                                          The input for the most inferior standing that would create an integer step<br/>
                                          is used to increment the value. For example, if the step is:
                                          <ul>
                                            <li>
                                              <strong>0.05</strong>: the millisecond-input will increment
                                              the value by 50 (50 milliseconds), the other inputs behave as expected
                                            </li>
                                            <li>
                                              <strong>1.05</strong>: the millisecond-input will increment the value by 1050
                                              (1 second and 50 millisecond), the other inputs behave as expected
                                            </li>
                                            <li>
                                              <strong>2</strong>: the millisecond-input will be disabled,
                                              the second-input will increment the value by 2000 (2 seconds),
                                              the other inputs behave as expected
                                            </li>
                                            <li>
                                              <strong>180</strong>: the millisecond-input and the second-input will be disabled,
                                              the minute-input will increment the value by 180000 (3 minutes),
                                              the other inputs behaive as expected If step="0" all inputs will be disabled,
                                              else if the step is below 0.001 the step will be set to 0.001.
                                              The most supirior input that will become the given step is the day-input.
                                            </li>
                                          </ul>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>time</td>
                                          <td>string</td>
                                          <td></td>
                                          <td>the selected time (format: iso8601)</td>
                                      </tr>
                                      <tr>
                                          <td>timezone</td>
                                          <td>String</td>
                                          <td></td>
                                          <td>The timezone offset in '±hh:mm' format</td>
                                      </tr>
                                      <tr>
                                          <td>value</td>
                                          <td>Number</td>
                                          <td></td>
                                          <td>value of the input</td>
                                      </tr>
                                      <tr>
                                          <td>valueAs</td>
                                          <td>Object</td>
                                          <td>&#123;"number": undefined, "date": undefined&#125;</td>
                                          <td>
                                            date - The date-object of the selected date<br/>
                                            number - The value of the selected date
                                          </td>
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
            <div class="">
              <div class="jumbotron">
                <div class="row">
                  <div class="col-md-6">
                    <cwc-checkbox-group
                    data={[{name: 'with timezone', variable: 'withTimezone'}, {name: 'hour12 format', variable: 'hour12Format'}]}
                    displayProp="name"
                    allowSelectAll={false}
                    ></cwc-checkbox-group>
                  </div>
                </div>
                <br/>
                <cwc-number-input
                  class="stepinput" no-clamp default={1} minlength={2}
                ></cwc-number-input>
                <br/>
                <cwc-datetime-input id="firstdate"
                  locale="en-US"
                  step={this.step}
                  hour12Format={this.hour12Format}
                  with-timezone={this.withTimezone}>
                </cwc-datetime-input>
                <p>
                  <code>datetime:</code> <b>{this.firstdate['datetime']}</b><br/>
                  <code>date:</code> <b>{this.firstdate['date']}</b><br/>
                  <code>time:</code> <b>{this.firstdate['time']}</b><br/>
                  <code>value:</code> <b>{this.firstdate['value']}</b>
                </p>
              </div>

              <br/><br/>

              <div class="jumbotron">
                <cwc-datetime-input
                  id="seconddate"
                  min={new Date("2025-02-01")}
                  max={new Date("2035-05-28T22:11:00+04:00")}>
                </cwc-datetime-input>
                <p>
                  <code>datetime:</code> <b>{this.seconddate['datetime']}</b><br/>
                  <code>value:</code> <b>{this.seconddate['value']}</b>
                </p>
              </div>
            </div>
          </div>
        );
    }
}
