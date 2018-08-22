import { Prop, State, Method, Watch } from '@stencil/core';

export class FormElement {
  @Prop({ mutable: true, reflectToAttr: true }) required: boolean;
  @Prop({ mutable: true, reflectToAttr: true }) invalid: boolean;
  @Prop({ mutable: true, reflectToAttr: true }) disabled: boolean;
  @Prop({ mutable: true }) name: string;
  @Prop({ mutable: true }) value: Object;
  @Prop({ mutable: true }) propertyForValue: string;
  @Prop({ mutable: true }) default: Object;

  @State() _valueIsSet: boolean = false;

  @Method()
  connectedCallback() {
    super.connectedCallback();
    // TODO -vanessa: figure out what this is
    // this._ensureAttribute('tabindex', 0);
  }

  @Method()
  validate() {
    return !this.invalid;
  }

  @Watch('required')
  _computeInvalid(required: boolean) {
    this.invalid = Boolean(required && !this.value);
  }

  @Watch('value')
  _computeValueIsSetandInvalid(newValue: string) {
    this._valueIsSet = newValue !== undefined;
    this.invalid = Boolean(this.required && !newValue);
  }

  @Watch('default')
  _defaultChanged(def: string) {
    if (super._defaultChanged) {
      super._defaultChanged(def)
    }
    if (def && this.value === undefined) {
      const toSet = { value: def };
      if (this.propertyForValue) {
        toSet[this.propertyForValue] = def;
      }
      setTimeout( () => {
        const properties = Object.keys(toSet);
        properties.forEach((prop) => {
          this[prop] = toSet[prop];
        });
      }, 0);
    }
  }

  // TODO - vanessa: check if this is really used
  // _attachDom(dom) {
  //   if (!this.shadowRoot) {
  //     this.attachShadow({
  //         mode: 'open',
  //         delegatesFocus: true
  //     });
  //     this.shadowRoot.appendChild(dom);
  //   }
  //   return this.shadowRoot;
  // }

  @Watch('propertyForValue')
  _createReflectPropertyToValueObserver(newValue: string) {
    const prop = newValue;
    if (prop !== undefined) {
      @Watch(prop)
      _reflectPropertyToValue(newValue1: Object) {
        this.value = newValue1;
      }
      @Watch('value')
      _reflectValueToProperty(newValue2: Object) {
        this[prop] = newValue2;
      }
      setTimeout(() => {
        if (this.value !== undefined) {
          this[prop] = this.value;
        }
        if (this[prop] !== undefined) {
          this.value = this[prop];
        }
      }, 0)
    }
  }
}
