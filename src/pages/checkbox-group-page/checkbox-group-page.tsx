import { Component } from '@stencil/core';

@Component({
    tag: 'checkbox-group-page',
    styleUrl: 'checkbox-group-page.scss'
})

export class DropdownPage {
    render() {
        const data = [
          {name: 'myname', key: 'mykey'},
          {name: 'myname1', key: 'mykey1'},
          {name: 'myname2', key: 'mykey2'},
        ];

        return (
          <div>
            <cwc-checkbox-group data={data}></cwc-checkbox-group>
          </div>
        );
    }
}
