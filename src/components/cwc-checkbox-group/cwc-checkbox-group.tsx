import { Component, Prop } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';

@Component({
    tag: 'cwc-checkbox-group',
    styleUrl: 'cwc-checkbox-group.scss'
})
export class ChecboxGroupComponent {
  @Prop() data: Array<Object> = [];
  @Prop() displayProp: string;
  @Prop() value: Array<Object> = [];
  @Prop() allowSelectAll: boolean = true;
  @Prop() selectAllLabel: string = 'Select all my items:';

    render() {
        return (
          <div>
            <input type="checkbox">Hello</input>
          </div>
        )
    }
}
