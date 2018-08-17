import { Component, State } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';

@Component({
    tag: 'cwc-number-input',
    styleUrl: 'cwc-number-input.scss'
})
export class NumberInputComponent {
  @State() value: string;

  handleChange(event) {
    const oldvalue = this.value;
    this.value = event.target.value;
    if (isNaN(event.target.value) && this.value) {
      this.value = oldvalue;
    }
  }

  render() {
    return (
        <div>
          <input type="text" value={this.value} onInput={(e) => this.handleChange(e)} />
        </div>
      )
  }
}
