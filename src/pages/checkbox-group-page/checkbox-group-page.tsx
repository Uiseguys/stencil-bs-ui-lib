import { Component } from '@stencil/core';

@Component({
    tag: 'checkbox-group-page',
    styleUrl: 'checkbox-group-page.scss'
})

export class DropdownPage {
    render() {
        const data = [
          {test: 'myname', key: 'mykey'},
          {test: 'myname1', key: 'mykey1'},
          {test: 'myname2', key: 'mykey2'},
        ];

        const value = [
          {test: 'myname', key: 'mykey'},
        ];

        const testFn = (newValue) => {
          console.log('this external fn: ', newValue)
        };

        return (
          <div>
            <cwc-checkbox-group
            displayProp='test' value={value} data={data} selectionChanged={testFn}
            ></cwc-checkbox-group>
          </div>
        );
    }
}
