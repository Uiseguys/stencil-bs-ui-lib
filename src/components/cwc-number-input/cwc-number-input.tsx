import { Component, State, Prop, Method } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';

@Component({
    tag: 'cwc-number-input',
    styleUrl: 'cwc-number-input.scss'
})
export class NumberInputComponent {
  @Prop() alwaysSign: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() hidden: boolean = false;
  @Prop() placeholder: string;
  @Prop() default: string;
  @Prop() max: number;
  @Prop() min: number;
  @Prop() maximumFractionDigits: number;
  @Prop() minimumFractionDigits: number;
  @Prop() padLength: number;

  @State() value: string;

  componentDidLoad() {
    this.value = this.default || '';
    this.handlePad();
    this.handleAlwaysSign();
  }

  handleChange(event) {
    const oldvalue = this.value;
    this.value = event.target.value;
    let invalidValue = isNaN(event.target.value);
    if (this.max) {
      invalidValue = invalidValue || parseFloat(this.value) > this.max;
    }
    if (this.min) {
      invalidValue = invalidValue || parseFloat(this.value) < this.min;
    }
    if (this.maximumFractionDigits && this.value && Math.floor(parseFloat(this.value)) !== parseFloat(this.value)) {
      invalidValue = invalidValue
        || this.value && this.value.split('.')[1].length > this.maximumFractionDigits;
    }
    if (this.minimumFractionDigits && this.value && Math.floor(parseFloat(this.value)) !== parseFloat(this.value)) {
      invalidValue = invalidValue
        || this.value && this.value.split('.')[1].length < this.minimumFractionDigits;
    }
    if (invalidValue && this.value) {
      this.value = oldvalue;
    }
    this.handlePad();
    this.handleAlwaysSign();
  }

  @Method()
  handlePad() {
    const decimalIndex = this.value.indexOf('.') !== -1 ? this.value.indexOf('.') : undefined;
    const actualValue = this.value.slice(0, decimalIndex).replace('+', '').replace('-', '');
    const actualLength = actualValue.length;
    if (this.padLength && actualLength < this.padLength) {
      const sign  =  this.value.startsWith('+') || this.value.startsWith('-') ? this.value.split('')[0] : '';
      this.value = `${sign}${'0'.repeat(this.padLength - actualLength)}${this.value.replace('+', '').replace('-', '')}`;
    }
  }

  @Method()
  handleAlwaysSign() {
    if (this.alwaysSign && parseFloat(this.value) > 0 && !this.value.startsWith('+')) {
      this.value = `+${this.value}`;
    }
  }

  render() {
    return (
        <div>
          <input
          disabled={this.disabled}
          hidden={this.hidden}
          type="text"
          placeholder={this.placeholder}
          value={this.value}
          onInput={(e) => this.handleChange(e)}
          />
        </div>
      )
  }
}
