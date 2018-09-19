import { Component } from '@stencil/core';

@Component({
    tag: 'datetime-input-page',
    styleUrl: 'datetime-input-page.scss'
})

export class DatetimeInputPage {
    render() {
        return (
          <div>
            <cwc-datetime-input
              locale="en-US"
              step={1}
              hour12-format={true}
              with-timezone={true}>
            </cwc-datetime-input>
          </div>
        );
    }
}
