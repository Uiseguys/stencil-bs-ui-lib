import { Component, Prop, State } from '@stencil/core';

@Component({
    tag: 'checkbox-group-page',
    styleUrl: 'checkbox-group-page.scss'
})

export class DropdownPage {
    @Prop() value: Array<Object> = [
      {name: 'my name', age: '21', address: 'ph'},
    ];
    @State() selectedValues: Array<Object> = this.value;

    render() {
        const data = [
          {name: 'my name', age: '21', address: 'ph'},
          {name: 'my name1', age: '22', address: 'uk'},
          {name: 'my name2', age: '23' , address: 'us'},
        ];

        const testFn = (newValue) => {
          this.selectedValues = newValue;
          console.log('test', this.selectedValues);
        };

        return (
          <div>
            <cwc-checkbox-group
            displayProp='name' value={this.selectedValues} data={data} selectionChanged={testFn}
            ></cwc-checkbox-group>
            {this.selectedValues
              ? <div>
                {
                  this.selectedValues.map((obj) =>
                    <div>{obj['name']} - {obj['age']} - {obj['address']}</div>
                  )
                }
              </div>
              : null
            }
          </div>
        );
    }
}
