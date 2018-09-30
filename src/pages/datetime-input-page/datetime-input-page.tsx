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
    }

    render() {
        return (
          <div>
            <div>
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

            <cwc-datetime-input
              min={new Date("2025-02-01")}
              max={new Date("2035-05-28T22:11:00+04:00")}>
            </cwc-datetime-input>
          </div>
        );
    }
}
