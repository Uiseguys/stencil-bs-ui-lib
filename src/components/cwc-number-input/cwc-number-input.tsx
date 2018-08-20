import { Component, State, Prop, Method, Element, HostElement } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';

@Component({
    tag: 'cwc-number-input',
    styleUrl: 'cwc-number-input.scss'
})
export class NumberInputComponent {
  @Prop() alwaysSign: boolean;
  @Prop() disabled: boolean;
  @Prop() hidden: boolean;
  @Prop() required: boolean;
  @Prop() autoResize: boolean;
  @Prop() autoPadding: boolean;
  @Prop() placeholder: string;
  @Prop() default: string;
  @Prop() type: string = 'number';
  @Prop() name: string;
  @Prop() max: number;
  @Prop() min: number;
  @Prop() minlength: number;
  @Prop() maximumFractionDigits: number;
  @Prop() minimumFractionDigits: number;
  @Prop({ mutable: true }) padLength: number;
  @Prop() step: number;

  @State() value: string;

  @Element() el: HostElement;

  componentDidLoad() {
    this.value = this.default || '';
    if (this.autoPadding && this.max) {
      this.padLength = this.max.toString().length;
    }
    if (this.minlength && this.value.length < this.minlength) {
      this.el.querySelector('input').setAttribute('invalid', '');
    }
    if (this.padLength) {
      this.handlePad();
    }
    this.handleAlwaysSign();
  }

  handleChange(event) {
    const oldvalue = this.value;
    this.value = event.target.value;
    let invalidValue = isNaN(event.target.value);
    if (this.minlength && this.value.length < this.minlength) {
      this.el.querySelector('input').setAttribute('invalid', '');
    } else {
      this.el.querySelector('input').removeAttribute('invalid');
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
    if (this.padLength) {
      this.handlePad();
    }
    this.handleAlwaysSign();
  }

  @Method()
  handlePad() {
    this.handleLackingPad();
    this.handleOverPad();
  }

  @Method()
  handleLackingPad() {
    const decimalIndex = this.value.indexOf('.') !== -1 ? this.value.indexOf('.') : undefined;
    const actualValue = this.value.slice(0, decimalIndex).replace('+', '').replace('-', '');
    const actualLength = actualValue.length;
    if (actualLength < this.padLength) {
      const sign  =  this.value.startsWith('+') || this.value.startsWith('-') ? this.value.split('')[0] : '';
      this.value = `${sign}${'0'.repeat(this.padLength - actualLength)}${this.value.replace('+', '').replace('-', '')}`;
    }
  }

  @Method()
  handleOverPad() {
    const decimalIndex = this.value.indexOf('.') !== -1 ? this.value.indexOf('.') : undefined;
    let actualValue = this.value.slice(0, decimalIndex).replace('+', '').replace('-', '');
    const actualLength = actualValue.length;
    if (actualLength > this.padLength) {
      const fractionalIndex = this.value.indexOf('.') !== -1 ? this.value.indexOf('.') : this.value.length;
      const fractionalDigits = this.value.slice(fractionalIndex);
      const sign  =  this.value.startsWith('+') || this.value.startsWith('-') ? this.value.split('')[0] : '';
      actualValue = actualValue.replace(/^0+|0+$/, '');
      if (this.padLength - actualValue.length > 0) {
        actualValue = `${'0'.repeat(this.padLength - actualValue.length)}${actualValue}`;
      }
      this.value = `${sign}${actualValue}${fractionalDigits}`;
    }
  }

  @Method()
  handleAlwaysSign() {
    if (this.alwaysSign && parseFloat(this.value) > 0 && !this.value.startsWith('+')) {
      this.value = `+${this.value}`;
    }
  }

  render() {
    const size = this.autoResize && this.value && this.value.length
      ? this.value.length : undefined;

    return (
        <div>
          <input
          disabled={this.disabled}
          hidden={this.hidden}
          required={this.required}
          type={this.type}
          max={this.max}
          min={this.min}
          step={this.step}
          name={this.name}
          placeholder={this.placeholder}
          value={this.value}
          style={{width: `${size}em`}}
          onInput={(e) => this.handleChange(e)}
          />
        </div>
      )
  }
}
