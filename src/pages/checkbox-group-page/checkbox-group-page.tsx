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

        return (
          <div>
            <cwc-checkbox-group displayProp='test' data={data}></cwc-checkbox-group>
          </div>
        );
    }
}
