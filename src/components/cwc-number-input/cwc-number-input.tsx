import { Component, State, Prop } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';

@Component({
    tag: 'cwc-number-input',
    styleUrl: 'cwc-number-input.scss'
})
export class NumberInputComponent {
  @Prop() alwaysSign: boolean = false;
  @State() value: string;

  handleChange(event) {
    const oldvalue = this.value;
    this.value = event.target.value;
    if (isNaN(event.target.value) && this.value) {
      this.value = oldvalue;
    }
    if (this.alwaysSign && parseFloat(this.value) > 0 && !this.value.startsWith('+')) {
      this.value = `+${this.value}`;
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
