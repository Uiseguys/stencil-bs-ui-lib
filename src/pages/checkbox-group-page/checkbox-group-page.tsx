import { Component } from '@stencil/core';

@Component({
    tag: 'checkbox-group-page',
    styleUrl: 'checkbox-group-page.scss'
})

export class DropdownPage {
    render() {
        const data = [
          {name: 'my name', age: '21'},
          {name: 'my name1', age: '22'},
          {name: 'my name2', age: '23'},
        ];

        const value = [
          {name: 'my name', age: '21'},
        ];

        const testFn = (newValue) => {
          console.log('this external fn: ', newValue)
        };

        return (
          <div>
            <cwc-checkbox-group
            displayProp='name' value={value} data={data} selectionChanged={testFn}
            ></cwc-checkbox-group>
          </div>
        );
    }
}
