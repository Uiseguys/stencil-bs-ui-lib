import { Component, Prop, State, Watch, Element, HostElement, Method } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';

// TODO: test first before proceeding

// TODO: observers, computed values, should also fire on load
// TODO: complex observers and computed values should only fire if all args are !==undefined

@Component({
    tag: 'cwc-number-input',
    styleUrl: 'cwc-number-input.scss'
})
export class NumberInputComponent {
  // -- intl number format
  @Prop({ mutable: true }) locale: string = window.navigator.language;
  // @Prop({ mutable: true }) minimumFractionDigits: number;
  // @Prop({ mutable: true }) maximumFractionDigits: number;
  // @Prop({ mutable: true }) minimumIntegerDigits: number;
  @Prop({ mutable: true }) minimumSignificantDigits: number;
  @Prop({ mutable: true }) maximumSignificantDigits: number;
  @Prop({ mutable: true }) unit: string;
  @Prop({ mutable: true }) unitSeparator: string = '\u202F';
  @Prop({ mutable: true }) alwaysSign: boolean;
  @Prop({ mutable: true }) numberStyle: string = 'decimal';
  @Prop({ mutable: true }) useGrouping: boolean;
  @Prop({ mutable: true }) currency: string;
  @Prop({ mutable: true }) currencyDisplay: string;
  @Prop({ mutable: true }) formatNumber: Function;
  @Prop({ mutable: true }) parseNumber: Function;

  @State() separators: Object = { decimal: null, grouping: null };

  @State() _numberOptions: Object;
  _regExpNotInNumber: RegExp = /[^\d\-+.e]/g;

  // -- form element
  @Prop({ mutable: true, reflectToAttr: true }) required: boolean;
  @Prop({ mutable: true, reflectToAttr: true }) invalid: boolean;
  @Prop({ mutable: true, reflectToAttr: true }) disabled: boolean;
  @Prop({ mutable: true }) name: string;
  // @Prop({ mutable: true }) value: Object;
  // @Prop({ mutable: true }) default: Object;

  @State() _valueIsSet: boolean = false;

  @Element() el: HostElement;

  // -- input pattern
  @Prop({ mutable: true }) type: string = 'text';
  @Prop({ mutable: true }) input: string;
  @Prop({ mutable: true }) placeholder: string;
  // @Prop({ mutable: true }) default: string;
  @Prop({ mutable: true }) minlength: number;
  @Prop({ mutable: true }) noAutoWidth: boolean;
  @Prop({ mutable: true }) autoResize: boolean;
  @Prop({ mutable: true }) hidden: boolean;
  // @Prop({ mutable: true }) propertyForValue: string = 'input';

  @State() _minWidthString: string;
  _minWidthComputionJob: any;
  _minSizeJob: any;
  _activeResizeJob: any;

  // -- range
  @Prop({ mutable: true }) min: number;
  @Prop({ mutable: true }) max: number;
  @Prop({ mutable: true }) step: number = 1;
  @Prop({ mutable: true }) stepMod: number = 1;
  @Prop({ mutable: true }) valueAsNumber: number;
  @Prop({ mutable: true }) default: number;
  @Prop({ mutable: true }) saturate: boolean;
  @Prop({ mutable: true }) noClamp: boolean;

  @State() _step: number = 1;

  // -- number input
  @Prop({ mutable: true }) padLength: number;
  @Prop({ mutable: true }) autoPadding: boolean;
  @Prop({ mutable: true }) minimumFractionDigits: number;
  @Prop({ mutable: true }) maximumFractionDigits: number;
  @Prop({ mutable: true }) minimumIntegerDigits: number;
  @Prop({ mutable: true }) value: number;
  @Prop({ mutable: true }) startAt: number;
  @Prop({ mutable: true }) propertyForValue: string = 'valueAsNumber';

  @State() _type: string;


  // ** number utilities
  _numberUtilities = {
    _safeMult: function(a, b) {
      a = '' + (a || 0);
      b = '' + (b || 0);

      const decimal = a.slice(a.indexOf('.')).length + b.slice(b.indexOf('.')).length - 2;

      if (decimal === 0) {
        return a * b;
      }
      const sign = (a[0] === '-' ? b[0] !== '-' : b[0] === '-') ? '-' : '';

      a = +a.replace(/\D/g, '');
      b = b.replace(/\D/g, '');

      let whole = 0;
      for (let i = 0; i < b.length; i++) {
        whole += Math.pow(10, b.length - 1 - i) * a * (+b[i]);
      }
      let wholeStr = '' + whole;
      for (let i = wholeStr.length; i < decimal; i++) {
        wholeStr = '0' + wholeStr;
      }
      return +(sign + wholeStr.slice(0, wholeStr.length - decimal) + '.' + wholeStr.slice(wholeStr.length - decimal));
    },
    _safeAdd: function(a, b) {
      const _a = '' + (a || 0),
        _b = '' + (b || 0),
        decimal = Math.max(_a.slice(_a.indexOf('.')).length, _b.slice(_b.indexOf('.')).length) - 1;

      if (decimal === 0) {
        return a + b;
      }

      const whole = Math.round(Math.pow(10, decimal) * a + Math.pow(10, decimal) * b);

      const sign = whole < 0 ? '-' : '';
      let wholeStr = '' + Math.abs(whole);
      for (let i = wholeStr.length; i < decimal; i++) {
        wholeStr = '0' + wholeStr;
      }
      return +(sign + wholeStr.slice(0, wholeStr.length - decimal) + '.' + wholeStr.slice(wholeStr.length - decimal));
    }
  };

  componentDidLoad() {
  // componentWillLoad() {
    // intl num format
    this._handleLocale(this.locale);

    if (this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined && this.maximumFractionDigits !== undefined &&
    this.minimumSignificantDigits !== undefined && this.maximumSignificantDigits !== undefined && this.useGrouping !== undefined
    && this.numberStyle !== undefined && this.currency !== undefined && this.currencyDisplay !== undefined) {
      this._numberOptions = this._computeNumberOptions(
        this.minimumIntegerDigits, this.minimumFractionDigits, this.maximumFractionDigits,
        this.minimumSignificantDigits, this.maximumSignificantDigits, this.useGrouping, this.numberStyle,
        this.currency, this.currencyDisplay
      );
    }
    if (this.locale !== undefined && this._numberOptions !== undefined && this.unit !== undefined) {
      this.formatNumber = this._computeFormatNumber(this.locale, this._numberOptions, this.unit);
    }
    if (this.separators['decimal'] !== undefined && this.numberStyle !== undefined && this.useGrouping !== undefined) {
      this.parseNumber = this._computeParseNumber(this.separators['decimal'], this.numberStyle, this.useGrouping);
    }

    // form element
    this.el['tabindex'] = 0;
    if (this.required !== undefined && this.value !== undefined) {
      this._computeInvalid(this.required, this.value);
    }
    this._computeValueIsSet(this.value);
    this._defaultChanged(this.default);

    // input pattern
    this.focusMethod = this.focusMethod.bind(this);
    this._updateValue = this._updateValue.bind(this);
    this._checkInput = this._checkInput.bind(this);
    this._checkKeycode = this._checkKeycode.bind(this);
    this._addEventListeners();
    setTimeout(this.resize.bind(this), 0);
    // if (this.noAutoWidth !== undefined && this.minlength !== undefined
    //   && this.default !== undefined && this.placeholder !== undefined) {
    //   this._computeMinWidth();
    // }
    if (this._minWidthString !== undefined && this.hidden !== undefined) {
      this.resize();
    }
    this._inputChanged();

    // range
    if (this.valueAsNumber === undefined && !isNaN(this.default)) {
      this.valueAsNumber = this.default;
    }
    if (this.min !== undefined && this.max !== undefined) {
      this._minMaxChanged(this.min, this.max);
    }
    if (this.step !== undefined && this.stepMod !== undefined) {
      this._stepChanged(this.step, this.stepMod);
    }

    // number input
    if (this.formatNumber !== undefined && this.parseNumber !== undefined && this.alwaysSign !== undefined) {
      this._type = this._computeType();
    }
    if (this._step !== undefined && this.min !== undefined && this.max !== undefined && this.numberStyle !== undefined) {
      this.minimumFractionDigits = this._computeMinimumFractionDigits(this.step, this.min, this.max, this.numberStyle);
    }
    if (this.minimumFractionDigits !== undefined && this.noClamp !== undefined) {
      this.maximumFractionDigits = this._computeMaximumFractionDigits(this.minimumFractionDigits, this.noClamp);
    }
    if (
      this.autoPadding !== undefined && this.padLength !== undefined
      && this.default !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this._step !== undefined && this.numberStyle !== undefined
    ) {
      this.minimumIntegerDigits = this._computeMinimumIntegerDigits(
        this.autoPadding, this.padLength, this.default, this.startAt, this.min, this.max, this._step, this.numberStyle
      );
    }
    if (this.noAutoWidth !== undefined && this.minlength !== undefined
      && this.default !== undefined && this.placeholder !== undefined
      && this.formatNumber !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined
      && this.alwaysSign !== undefined
    ) {
      this._computeMinWidth();
    }
  }

  componentDidUnload() {
    this._removeEventListeners();
  }

  // intl number format

  @Watch('separators')
  separatorsChanged() {
    if (this.separators['decimal'] !== undefined && this.numberStyle !== undefined && this.useGrouping !== undefined) {
      this.parseNumber = this._computeParseNumber(this.separators['decimal'], this.numberStyle, this.useGrouping);
    }
  }

  @Watch('alwaysSign')
  alwaysSignChanged() {
    if (this.locale !== undefined && this._numberOptions !== undefined && this.unit !== undefined) {
      this.formatNumber = this._computeFormatNumber(this.locale, this._numberOptions, this.unit);
    }
    if (this.formatNumber !== undefined && this.parseNumber !== undefined && this.alwaysSign !== undefined) {
      this._type = this._computeType();
    }
    this._updateValue();

    if (this.noAutoWidth !== undefined && this.minlength !== undefined
      && this.default !== undefined && this.placeholder !== undefined
      && this.formatNumber !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined
      && this.alwaysSign !== undefined
    ) {
      this._computeMinWidth();
    }
  }

  @Watch('unitSeparator')
  unitSeparatorChanged() {
    if (this.locale !== undefined && this._numberOptions !== undefined && this.unit !== undefined) {
      this.formatNumber = this._computeFormatNumber(this.locale, this._numberOptions, this.unit);
    }
  }

  @Watch('_numberOptions')
  _numberOptionsChanged() {
    if (this.locale !== undefined && this._numberOptions !== undefined && this.unit !== undefined) {
      this.formatNumber = this._computeFormatNumber(this.locale, this._numberOptions, this.unit);
    }
  }

  @Watch('unit')
  unitChanged() {
    if (this.locale !== undefined && this._numberOptions !== undefined && this.unit !== undefined) {
      this.formatNumber = this._computeFormatNumber(this.locale, this._numberOptions, this.unit);
    }
  }

  @Watch('minimumIntegerDigits')
  minimumIntegerDigitsChanged() {
    if (this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined && this.maximumFractionDigits !== undefined &&
    this.minimumSignificantDigits !== undefined && this.maximumSignificantDigits !== undefined && this.useGrouping !== undefined
    && this.numberStyle !== undefined && this.currency !== undefined && this.currencyDisplay !== undefined) {
      this._numberOptions = this._computeNumberOptions(
        this.minimumIntegerDigits, this.minimumFractionDigits, this.maximumFractionDigits,
        this.minimumSignificantDigits, this.maximumSignificantDigits, this.useGrouping, this.numberStyle,
        this.currency, this.currencyDisplay
      );
    }

    if (this.noAutoWidth !== undefined && this.minlength !== undefined
      && this.default !== undefined && this.placeholder !== undefined
      && this.formatNumber !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined
      && this.alwaysSign !== undefined
    ) {
      this._computeMinWidth();
    }
  }
  @Watch('minimumFractionDigits')
  minimumFractionDigitsChanged() {
    if (this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined && this.maximumFractionDigits !== undefined &&
    this.minimumSignificantDigits !== undefined && this.maximumSignificantDigits !== undefined && this.useGrouping !== undefined
    && this.numberStyle !== undefined && this.currency !== undefined && this.currencyDisplay !== undefined) {
      this._numberOptions = this._computeNumberOptions(
        this.minimumIntegerDigits, this.minimumFractionDigits, this.maximumFractionDigits,
        this.minimumSignificantDigits, this.maximumSignificantDigits, this.useGrouping, this.numberStyle,
        this.currency, this.currencyDisplay
      );
    }

    if (this.noAutoWidth !== undefined && this.minlength !== undefined
      && this.default !== undefined && this.placeholder !== undefined
      && this.formatNumber !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined
      && this.alwaysSign !== undefined
    ) {
      this._computeMinWidth();
    }
  }
  @Watch('maximumFractionDigits')
  maximumFractionDigitsChanged() {
    if (this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined && this.maximumFractionDigits !== undefined &&
    this.minimumSignificantDigits !== undefined && this.maximumSignificantDigits !== undefined && this.useGrouping !== undefined
    && this.numberStyle !== undefined && this.currency !== undefined && this.currencyDisplay !== undefined) {
      this._numberOptions = this._computeNumberOptions(
        this.minimumIntegerDigits, this.minimumFractionDigits, this.maximumFractionDigits,
        this.minimumSignificantDigits, this.maximumSignificantDigits, this.useGrouping, this.numberStyle,
        this.currency, this.currencyDisplay
      );
    }
    if (this.minimumFractionDigits !== undefined && this.noClamp !== undefined) {
      this.maximumFractionDigits = this._computeMaximumFractionDigits(this.minimumFractionDigits, this.noClamp);
    }
  }
  @Watch('minimumSignificantDigits')
  minimumSignificantDigitsChanged() {
    if (this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined && this.maximumFractionDigits !== undefined &&
    this.minimumSignificantDigits !== undefined && this.maximumSignificantDigits !== undefined && this.useGrouping !== undefined
    && this.numberStyle !== undefined && this.currency !== undefined && this.currencyDisplay !== undefined) {
      this._numberOptions = this._computeNumberOptions(
        this.minimumIntegerDigits, this.minimumFractionDigits, this.maximumFractionDigits,
        this.minimumSignificantDigits, this.maximumSignificantDigits, this.useGrouping, this.numberStyle,
        this.currency, this.currencyDisplay
      );
    }
  }
  @Watch('maximumSignificantDigits')
  maximumSignificantDigitsChanged() {
    if (this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined && this.maximumFractionDigits !== undefined &&
    this.minimumSignificantDigits !== undefined && this.maximumSignificantDigits !== undefined && this.useGrouping !== undefined
    && this.numberStyle !== undefined && this.currency !== undefined && this.currencyDisplay !== undefined) {
      this._numberOptions = this._computeNumberOptions(
        this.minimumIntegerDigits, this.minimumFractionDigits, this.maximumFractionDigits,
        this.minimumSignificantDigits, this.maximumSignificantDigits, this.useGrouping, this.numberStyle,
        this.currency, this.currencyDisplay
      );
    }
  }
  @Watch('useGrouping')
  useGroupingChanged() {
    if (this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined && this.maximumFractionDigits !== undefined &&
    this.minimumSignificantDigits !== undefined && this.maximumSignificantDigits !== undefined && this.useGrouping !== undefined
    && this.numberStyle !== undefined && this.currency !== undefined && this.currencyDisplay !== undefined) {
      this._numberOptions = this._computeNumberOptions(
        this.minimumIntegerDigits, this.minimumFractionDigits, this.maximumFractionDigits,
        this.minimumSignificantDigits, this.maximumSignificantDigits, this.useGrouping, this.numberStyle,
        this.currency, this.currencyDisplay
      );
    }

    if (this.separators['decimal'] !== undefined && this.numberStyle !== undefined && this.useGrouping !== undefined) {
      this.parseNumber = this._computeParseNumber(this.separators['decimal'], this.numberStyle, this.useGrouping);
    }
  }
  @Watch('numberStyle')
  numberStyleChanged() {
    if (this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined && this.maximumFractionDigits !== undefined &&
    this.minimumSignificantDigits !== undefined && this.maximumSignificantDigits !== undefined && this.useGrouping !== undefined
    && this.numberStyle !== undefined && this.currency !== undefined && this.currencyDisplay !== undefined) {
      this._numberOptions = this._computeNumberOptions(
        this.minimumIntegerDigits, this.minimumFractionDigits, this.maximumFractionDigits,
        this.minimumSignificantDigits, this.maximumSignificantDigits, this.useGrouping, this.numberStyle,
        this.currency, this.currencyDisplay
      );
    }

    if (this.separators['decimal'] !== undefined && this.numberStyle !== undefined && this.useGrouping !== undefined) {
      this.parseNumber = this._computeParseNumber(this.separators['decimal'], this.numberStyle, this.useGrouping);
    }

    if (this._step !== undefined && this.min !== undefined && this.max !== undefined && this.numberStyle !== undefined) {
      this.minimumFractionDigits = this._computeMinimumFractionDigits(this.step, this.min, this.max, this.numberStyle);
    }

    if (
      this.autoPadding !== undefined && this.padLength !== undefined
      && this.default !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this._step !== undefined && this.numberStyle !== undefined
    ) {
      this.minimumIntegerDigits = this._computeMinimumIntegerDigits(
        this.autoPadding, this.padLength, this.default, this.startAt, this.min, this.max, this._step, this.numberStyle
      );
    }
  }
  @Watch('currency')
  currencyChanged() {
    if (this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined && this.maximumFractionDigits !== undefined &&
    this.minimumSignificantDigits !== undefined && this.maximumSignificantDigits !== undefined && this.useGrouping !== undefined
    && this.numberStyle !== undefined && this.currency !== undefined && this.currencyDisplay !== undefined) {
      this._numberOptions = this._computeNumberOptions(
        this.minimumIntegerDigits, this.minimumFractionDigits, this.maximumFractionDigits,
        this.minimumSignificantDigits, this.maximumSignificantDigits, this.useGrouping, this.numberStyle,
        this.currency, this.currencyDisplay
      );
    }
  }
  @Watch('currencyDisplay')
  currencyDisplayChanged() {
    if (this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined && this.maximumFractionDigits !== undefined &&
    this.minimumSignificantDigits !== undefined && this.maximumSignificantDigits !== undefined && this.useGrouping !== undefined
    && this.numberStyle !== undefined && this.currency !== undefined && this.currencyDisplay !== undefined) {
      this._numberOptions = this._computeNumberOptions(
        this.minimumIntegerDigits, this.minimumFractionDigits, this.maximumFractionDigits,
        this.minimumSignificantDigits, this.maximumSignificantDigits, this.useGrouping, this.numberStyle,
        this.currency, this.currencyDisplay
      );
    }
  }

  @Watch('locale')
  _localeChanged(locale: string) {
    if (this.locale !== undefined && this._numberOptions !== undefined && this.unit !== undefined) {
      this.formatNumber = this._computeFormatNumber(this.locale, this._numberOptions, this.unit);
    }

    this._handleLocale(locale);
  }

  // form element

  @Watch('required')
  requiredChanged() {
    if (this.required !== undefined && this.value !== undefined) {
      this._computeInvalid(this.required, this.value);
    }
  }

  @Watch('value')
  valueChanged() {
    if (this.required !== undefined && this.value !== undefined) {
      this._computeInvalid(this.required, this.value);
    }
    this._computeValueIsSet(this.value);
  }

  @Watch('default')
  defaultChanged() {
    this._defaultChanged(this.default);

    if (this.noAutoWidth !== undefined && this.minlength !== undefined
      && this.default !== undefined && this.placeholder !== undefined
      && this.formatNumber !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined
      && this.alwaysSign !== undefined
    ) {
      this._computeMinWidth();
    }

    if (
      this.autoPadding !== undefined && this.padLength !== undefined
      && this.default !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this._step !== undefined && this.numberStyle !== undefined
    ) {
      this.minimumIntegerDigits = this._computeMinimumIntegerDigits(
        this.autoPadding, this.padLength, this.default, this.startAt, this.min, this.max, this._step, this.numberStyle
      );
    }
  }

  // input pattern
  @Watch('noAutoWidth')
  noAutoWidthChanged() {
    if (this.noAutoWidth !== undefined && this.minlength !== undefined
      && this.default !== undefined && this.placeholder !== undefined
      && this.formatNumber !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined
      && this.alwaysSign !== undefined
    ) {
      this._computeMinWidth();
    }
  }
  @Watch('minlength')
  minlengthChanged() {
    if (this.noAutoWidth !== undefined && this.minlength !== undefined
      && this.default !== undefined && this.placeholder !== undefined
      && this.formatNumber !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined
      && this.alwaysSign !== undefined
    ) {
      this._computeMinWidth();
    }
  }
  @Watch('placeholder')
  placeholderChanged() {
    if (this.noAutoWidth !== undefined && this.minlength !== undefined
      && this.default !== undefined && this.placeholder !== undefined
      && this.formatNumber !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined
      && this.alwaysSign !== undefined
    ) {
      this._computeMinWidth();
    }
  }

  @Watch('_minWidthString')
  _minWidthStringChanged() {
    if (this._minWidthString !== undefined && this.hidden !== undefined) {
      this.resize();
    }
  }
  @Watch('hidden')
  hiddenChanged() {
    if (this._minWidthString !== undefined && this.hidden !== undefined) {
      this.resize();
    }
  }

  @Watch('input')
  inputChanged() {
    this._inputChanged();
  }

  // range
  @Watch('valueAsNumber')
  valueAsNumberChanged(newVal: number, oldVal: number) {
    this._valueAsNumberChanged(newVal, oldVal);
  }

  @Watch('saturate')
  saturateChanged() {
    this._updateValue();
  }

  @Watch('noClamp')
  noClampChanged() {
    this._updateValue();
    if (this.minimumFractionDigits !== undefined && this.noClamp !== undefined) {
      this.maximumFractionDigits = this._computeMaximumFractionDigits(this.minimumFractionDigits, this.noClamp);
    }
  }

  @Watch('min')
  minChanged() {
    if (this.min !== undefined && this.max !== undefined) {
      this._minMaxChanged(this.min, this.max);
    }

    if (this._step !== undefined && this.min !== undefined && this.max !== undefined && this.numberStyle !== undefined) {
      this.minimumFractionDigits = this._computeMinimumFractionDigits(this.step, this.min, this.max, this.numberStyle);
    }

    if (
      this.autoPadding !== undefined && this.padLength !== undefined
      && this.default !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this._step !== undefined && this.numberStyle !== undefined
    ) {
      this.minimumIntegerDigits = this._computeMinimumIntegerDigits(
        this.autoPadding, this.padLength, this.default, this.startAt, this.min, this.max, this._step, this.numberStyle
      );
    }

    if (this.noAutoWidth !== undefined && this.minlength !== undefined
      && this.default !== undefined && this.placeholder !== undefined
      && this.formatNumber !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined
      && this.alwaysSign !== undefined
    ) {
      this._computeMinWidth();
    }
  }
  @Watch('max')
  maxChanged() {
    if (this.min !== undefined && this.max !== undefined) {
      this._minMaxChanged(this.min, this.max);
    }

    if (this._step !== undefined && this.min !== undefined && this.max !== undefined && this.numberStyle !== undefined) {
      this.minimumFractionDigits = this._computeMinimumFractionDigits(this.step, this.min, this.max, this.numberStyle);
    }

    if (
      this.autoPadding !== undefined && this.padLength !== undefined
      && this.default !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this._step !== undefined && this.numberStyle !== undefined
    ) {
      this.minimumIntegerDigits = this._computeMinimumIntegerDigits(
        this.autoPadding, this.padLength, this.default, this.startAt, this.min, this.max, this._step, this.numberStyle
      );
    }

    if (this.noAutoWidth !== undefined && this.minlength !== undefined
      && this.default !== undefined && this.placeholder !== undefined
      && this.formatNumber !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined
      && this.alwaysSign !== undefined
    ) {
      this._computeMinWidth();
    }
  }

  @Watch('step')
  stepChanged() {
    if (this.step !== undefined && this.stepMod !== undefined) {
      this._stepChanged(this.step, this.stepMod);
    }
  }
  @Watch('stepMod')
  stepModChanged() {
    if (this.step !== undefined && this.stepMod !== undefined) {
      this._stepChanged(this.step, this.stepMod);
    }
  }

  // number input
  @Watch('formatNumber')
  formatNumberChanged() {
    if (this.formatNumber !== undefined && this.parseNumber !== undefined && this.alwaysSign !== undefined) {
      this._type = this._computeType();
    }
    this._updateValue();

    if (this.noAutoWidth !== undefined && this.minlength !== undefined
      && this.default !== undefined && this.placeholder !== undefined
      && this.formatNumber !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined
      && this.alwaysSign !== undefined
    ) {
      this._computeMinWidth();
    }
  }
  @Watch('parseNumber')
  parseNumberChanged() {
    if (this.formatNumber !== undefined && this.parseNumber !== undefined && this.alwaysSign !== undefined) {
      this._type = this._computeType();
    }
  }

  @Watch('_step')
  underscorestepChanged() {
    if (this._step !== undefined && this.min !== undefined && this.max !== undefined && this.numberStyle !== undefined) {
      this.minimumFractionDigits = this._computeMinimumFractionDigits(this.step, this.min, this.max, this.numberStyle);
    }

    if (
      this.autoPadding !== undefined && this.padLength !== undefined
      && this.default !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this._step !== undefined && this.numberStyle !== undefined
    ) {
      this.minimumIntegerDigits = this._computeMinimumIntegerDigits(
        this.autoPadding, this.padLength, this.default, this.startAt, this.min, this.max, this._step, this.numberStyle
      );
    }
  }

  @Watch('autoPadding')
  autoPaddingChanged() {
    if (
      this.autoPadding !== undefined && this.padLength !== undefined
      && this.default !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this._step !== undefined && this.numberStyle !== undefined
    ) {
      this.minimumIntegerDigits = this._computeMinimumIntegerDigits(
        this.autoPadding, this.padLength, this.default, this.startAt, this.min, this.max, this._step, this.numberStyle
      );
    }
  }
  @Watch('padLength')
  padLengthChanged() {
    if (
      this.autoPadding !== undefined && this.padLength !== undefined
      && this.default !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this._step !== undefined && this.numberStyle !== undefined
    ) {
      this.minimumIntegerDigits = this._computeMinimumIntegerDigits(
        this.autoPadding, this.padLength, this.default, this.startAt, this.min, this.max, this._step, this.numberStyle
      );
    }
  }
  @Watch('startAt')
  startAtChanged() {
    if (
      this.autoPadding !== undefined && this.padLength !== undefined
      && this.default !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this._step !== undefined && this.numberStyle !== undefined
    ) {
      this.minimumIntegerDigits = this._computeMinimumIntegerDigits(
        this.autoPadding, this.padLength, this.default, this.startAt, this.min, this.max, this._step, this.numberStyle
      );
    }

    if (this.noAutoWidth !== undefined && this.minlength !== undefined
      && this.default !== undefined && this.placeholder !== undefined
      && this.formatNumber !== undefined && this.startAt !== undefined
      && this.min !== undefined && this.max !== undefined
      && this.minimumIntegerDigits !== undefined && this.minimumFractionDigits !== undefined
      && this.alwaysSign !== undefined
    ) {
      this._computeMinWidth();
    }
  }

  // intl number format

  private _handleLocale(locale) {
    if (!(locale && Intl.NumberFormat && Intl.NumberFormat.supportedLocalesOf(locale))) {
      this.locale = window.navigator.language;
      return;
    }
    // only `latn`-numeral-system is possible to parse
    const resolvedOptions = new Intl.NumberFormat(locale).resolvedOptions();
    if (resolvedOptions.numberingSystem !== 'latn') {
      // test if numbering system is part of the locale
      if (locale.indexOf('-u-') !== -1) {
        let pos;
        if ((pos = locale.indexOf('-nu-')) !== -1) {
          const end = locale.indexOf('-', pos + 4);
          if (end !== -1) {
            // `latn` is at in beetween
            this.locale = locale.slice(0, pos + 4) + 'latn' + locale.slice(end);
          } else {
            // `latn` is at end position
            this.locale = locale.slice(0, pos + 4) + 'latn';
          }
        } else {
          // numbering-system is not part of locale
          this.locale = locale + '-nu-latn';
        }
      } else {
        // locale has no modifier
        this.locale = locale + '-u-nu-latn';
      }
      return;
    }

    // decimal separator
    const numberString = (0.5).toLocaleString(locale, {
      minimumIntegerDigits: 1,
      minimumFractionDigits: 1
    });
    const decimalSeparator = numberString[1];

    // grouping separator
    const nogroupingString = (1000000).toLocaleString(locale, {
      useGrouping: false
    });
    const groupingString = (1000000).toLocaleString(locale, {
      useGrouping: true
    });

    let groupingSeparator;
    for (let i = 0; i < nogroupingString.length; i++) {
      if (groupingString[i] !== nogroupingString[i]) {
        groupingSeparator = groupingString[i];
        break;
      }
    }

    this.separators = { decimal: decimalSeparator, grouping: groupingSeparator };
  }

  private _computeNumberOptions(
    minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits,
    minimumSignificantDigits, maximumSignificantDigits, useGrouping,
    style, currency, currencyDisplay
  ) {
    const options = {
      minimumIntegerDigits: minimumIntegerDigits || 1,
      minimumFractionDigits: minimumFractionDigits || 0,
      useGrouping: Boolean(useGrouping),
      style: style || 'decimal'
    }
    if (currency !== undefined) {
      options['currency'] = currency;
    }
    if (currencyDisplay !== undefined) {
      options['currencyDisplay'] = currencyDisplay;
    }
    if (maximumFractionDigits !== undefined) {
      options['maximumFractionDigits'] = maximumFractionDigits < minimumFractionDigits ? minimumFractionDigits : maximumFractionDigits;
    }
    if (minimumSignificantDigits !== undefined) {
      options['minimumSignificantDigits'] = minimumSignificantDigits;
    }
    if (maximumSignificantDigits !== undefined) {
      options['maximumSignificantDigits'] =
        maximumSignificantDigits < minimumSignificantDigits ? minimumSignificantDigits : maximumSignificantDigits;
    }
    return options;
  }

  private _computeFormatNumber(locale, numberOptions, unit) {
    if (numberOptions && numberOptions.style === 'currency' && !numberOptions.currency) {
      console.warn('No currency is given. Using number style: \'decimal\'.');
      numberOptions.style = 'decimal';
    }
    if (numberOptions && numberOptions.style !== 'decimal') {
      unit = '';
    }
    const format = new Intl.NumberFormat(locale, numberOptions).format;
    if (unit) {
      return (n) => {
        return ((this.alwaysSign && n >= 0) ? '+' : '') + format(n) + this.unitSeparator + unit;
      }
    }
    return (n) => {
      return ((this.alwaysSign && n >= 0) ? '+' : '') + format(n);
    }
  }

  private _computeParseNumber(decimalSeparator, numberStyle, useGrouping) {
    const regExpGrouping = new RegExp('[' + (this.separators['grouping'] || '') + ']', 'g');
    if (numberStyle === 'percent') {
      if (useGrouping) {
        return (input) => {
          return this._numberUtilities._safeMult(input.replace(regExpGrouping, '').replace(decimalSeparator, '.'), 0.01);
        }
      } else {
        return (input) => {
          return this._numberUtilities._safeMult(parseFloat(input.replace(decimalSeparator, '.')), 0.01);
        }
      }
    }
    if (useGrouping) {
      return (input) => {
        return parseFloat(input.replace(regExpGrouping, '').replace(decimalSeparator, '.').replace(this._regExpNotInNumber, ''));
      }
    } else {
      return (input) => {
        return parseFloat(input.replace(decimalSeparator, '.').replace(this._regExpNotInNumber, ''));
      }
    }
  }

  // form element

  private _computeInvalid(required, value) {
    // this.invalid = Boolean(required && !value);
    this.invalid = required && isNaN(value);
  }

  private _computeValueIsSet(value) {
    this._valueIsSet = value !== undefined;
  }

  private _defaultChanged(def) {
    // TODO: find a way to simultaneously update value and ${propertyForValue}
    // if (def && this.value === undefined) {
    //   this.value = def;
    //   if (this.propertyForValue) {
    //     this[this.propertyForValue] = def;
    //   }
    // }

    // if (!this.input && def) {
    //   this.input = def;
    // }

    if (isNaN(this.valueAsNumber) && !isNaN(def)) {
      this.valueAsNumber = def;
    }
  }

  @Method()
  validate() {
    return !this.invalid;
  }

  // TODO: might remove this
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

  // input pattern
  private _addEventListeners() {
    this.el.addEventListener('focus', this.focusMethod, false);
    this.el.querySelector('#input').addEventListener('focus', this._updateValue, false);
    this.el.querySelector('#input').addEventListener('blur', this._checkInput, false);
    this.el.querySelector('#input').addEventListener('keydown', this._checkKeycode, false);
  }

  private _removeEventListeners() {
    this.el.removeEventListener('focus', this.focusMethod, false);
    this.el.querySelector('#input').removeEventListener('focus', this._updateValue, false);
    this.el.querySelector('#input').removeEventListener('blur', this._checkInput, false);
    this.el.querySelector('#input').removeEventListener('keydown', this._checkKeycode, false);
  }

  @Method()
  focusMethod() {
    this.el.querySelector('#input')['focus']();
    if (this.el.querySelector('#input')['scrollIntoViewIfNeeded']) {
      this.el.querySelector('#input')['scrollIntoViewIfNeeded']();
    }
  }

  @Method()
  blurMethod() {
    this._checkInput();
    this.el.querySelector('#input')['blur']();
  }

  private _checkKeycode(e) {
    // // enter & space
    // if (e.keyCode === 13 || e.keyCode === 32) {
    //   this._checkInput(null);
    //   return;
    // }
    //
    // // esc
    // if (e.keyCode === 27) {
    //   this._updateValue();
    //   e.stopPropagation();
    //   this.blurMethod(null);
    //   return;
    // }
    //
    // if (this.autoResize) {
    //   this._debouncedComputeWidth();
    // }
    switch (e.keyCode) {
      case 9:  // tab // falls-through
      case 13: // enter
        this._checkInput();
        break;
      case 27: // esc
        this._updateValue();
        this.el.querySelector('#input')['blur']();
        break;
        case 38: // up
        e.preventDefault();
        e.stopPropagation();
        this.increase();
        break;
      case 40: // down
        e.preventDefault();
        e.stopPropagation();
        this.decrease();
        break;
    }
  }

  private _checkInput() {
    // this._inputChanged(this.input || '');
    // this._debouncedComputeWidth();
    // if (e && e.stopPropagation) {
    //   e.stopPropagation();
    // }
    if (!this.input) {
      if (!isNaN(this.default)) {
        // TODO: try to update simultaneously
        this.input = this.formatNumber(this.default);
        this.valueAsNumber = +this.default;
        // this.setProperties({
        //   input: this.formatNumber(this.default),
        //   valueAsNumber: +this.default
        // })
      } else {
        this.valueAsNumber = undefined;
      }
      this._debouncedComputeWidth();
      return;
    }
    const value = this._checkValue(this.parseNumber(this.input), this.valueAsNumber);
    // TODO: try to update simultaneously
    this.input = this.formatNumber(value);
    this.valueAsNumber = value;
    // this.setProperties({
    //   input: this.formatNumber(value),
    //   valueAsNumber: value
    // });
    this._debouncedComputeWidth();
  }

  private _updateValue() {
    // if (this.value !== undefined) {
    //   this._reflectValueToProperty(this.value);
    // }
    // this._debouncedComputeWidth();
    // if (e && e.stopPropagation) {
    //   e.stopPropagation();
    // }
    if (this.valueAsNumber !== undefined) {
      this._valueAsNumberChanged(this.valueAsNumber, this.valueAsNumber);
    }
  }

  private _computeMinWidth() {
    // if (this._minWidthComputionJob) {
    //   clearTimeout(this._minWidthComputionJob);
    //   this._minWidthComputionJob = null;
    // }
    //
    // this._minWidthComputionJob = setTimeout(() => {
    //   const def = this.default || '',
    //     placeholder = this.placeholder || '',
    //     minlength = this.minlength || 1,
    //     charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // to compute a random string for minlength
    //   let minlengthString = '';
    //   for (let i = 0; i < minlength; i++) {
    //     minlengthString += charset.charAt(Math.floor(Math.random() * charset.length));
    //   }
    //   this._minWidthString = (this.noAutoWidth ? [minlengthString] : [def, minlengthString]).reduce( (acc, curr) => {
    //     return curr.length > acc.length ? curr : acc;
    //   }, placeholder);
    // }, 0);
    if (this._minWidthComputionJob) {
      clearTimeout(this._minWidthComputionJob);
      this._minWidthComputionJob = null;
    }

    this._minWidthComputionJob = setTimeout(() => {
      const def = this.formatNumber(this.default || 0),
        placeholder = this.placeholder || '',
        startAt = this.formatNumber(this.startAt || 0),
        min = this.formatNumber(this.min || 0),
        max = this.formatNumber(this.max || 0),
        minlength = this.formatNumber(Math.pow(10, Math.ceil(this.minlength || 1) - (this.numberStyle === 'percent' ? 3 : 1)));
      const gen = (!this.alwaysSign && (this.min < 0 || this.max < 0) ? '-' : '')
        + this.formatNumber(Math.pow(10, (this.minimumIntegerDigits || 1) - 1) + Math.pow(10, -(this.minimumFractionDigits || 0)));
      this._minWidthString = (this.noAutoWidth ? [minlength] : [max, min, def, startAt, gen, minlength]).reduce( (acc, curr) => {
        return curr.length > acc.length ? curr : acc;
      }, placeholder);
    }, 0);
  }

  @Method()
  resize() {
    if (!this._minWidthString || this.hidden || this._minSizeJob) {
      return;
    }
    this._minSizeJob = requestAnimationFrame( () => {
      let width = this.el.querySelector('#minsize')['getBoundingClientRect']()['width'];
      // measure the width of the test element
      if (width !== 0) {
        this.el.querySelector('#input')['style']['minWidth'] = `${width}px`;
        this._debouncedComputeWidth();
        this._minSizeJob = null;
      } else {
        // if that fails, clone the test node to document level and add some basic styles, that could define the elements's width
        const minsizeClone = this.el.querySelector('#minsize')['cloneNode'](true);
        const style = document.defaultView.getComputedStyle(this.el.querySelector('#minsize'), '');
        ['font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'min-width', 'max-width'].reduce(
          ( accumulator, currentValue) => {
            if (currentValue && style[currentValue]) {
              minsizeClone['style'][currentValue] = style[currentValue];
            }
            return accumulator;
          }, 'font-family');
        minsizeClone['style']['display'] = 'inline-flex';
        minsizeClone['style']['opacity'] = '0';
        minsizeClone['style']['position'] = 'fixed';
        minsizeClone['style']['left'] = '0';
        minsizeClone['style']['top'] = '0';
        minsizeClone['style']['border'] = 'thin solid transparent';

        document.body.appendChild(minsizeClone);
        requestAnimationFrame( () => {
          width = minsizeClone['getBoundingClientRect']()['width'];
          minsizeClone['parentElement']['removeChild'](minsizeClone);
          this._minSizeJob = null;
          if (width !== 0) {
            this.el.querySelector('#input')['style']['minWidth'] = `${width}px`;
            this._debouncedComputeWidth();
          } else {
            // if it fails again, retry
            this.resize();
          }
        });
      }
    })

  }

  private _debouncedComputeWidth() {
    if (this._activeResizeJob) {
      clearTimeout(this._activeResizeJob);
    }
    this._activeResizeJob = setTimeout(this._computeWidth.bind(this), 0);
  }

  private _computeWidth() {
    this.el.querySelector('#input')['style']['width'] = `${this.el.querySelector('#size')['getBoundingClientRect']()['width']}px`;
  }

  // range
  private _minMaxChanged(min, max) {
    if (+max < +min) {
      // TODO: look for a way to update min and max simultaneously
      this.min = +max;
      this.max = +min;
      // this.setProperties({
      //   min: +max,
      //   max: +min
      // })
    } else {
      this._updateValue();
    }
  }

  private _valueAsNumberChanged(value, oldValue) {
    if (value === undefined) {
      return;
    }

    const finalValue = this._checkValue(value, oldValue);

    if (finalValue !== this.valueAsNumber) {
      this.valueAsNumber = finalValue;
      return;
    }

    if (isNaN(value)) {
      this.input = '';
      return;
    }
    this.input = this.formatNumber(this.valueAsNumber);
  }

  private _checkValue(value, oldValue) {
    if (isNaN(value)) {
      if (!isNaN(oldValue)) {
        return oldValue;
      } else if (!isNaN(this.default)) {
        return this.default;
      } else if (!isNaN(this.min)) {
        return this.min;
      } else if (!isNaN(this.max)) {
        return this.max;
      }
      return 0;
    }

    const saturate = this.saturate,
      min = this.min,
      max = this.max;

    if (min !== undefined && value <= min) {
      if (saturate || value === min || max === undefined || oldValue !== min) {
        return min;
      }
      return max;
    } else if (max !== undefined && value >= max) {
      if (saturate || value === max || min === undefined || max !== oldValue) {
        return max;
      }
      return min;
    } else if (this.noClamp) {
      return value;
    }
    return this._checkStep(value, this._step);
  }

  private _checkStep(value, step) {
    if (!step) {
      return value;
    }
    if (this.default !== undefined) {
      return this._numberUtilities._safeAdd(this._numberUtilities._safeMult(Math.round((value - this.default) / step), step), this.default);
    }
    if (this.min !== undefined) {
      return this._numberUtilities._safeAdd(this._numberUtilities._safeMult(Math.round((value - this.min) / step), step), this.min);
    }
    if (this.max !== undefined) {
      return this._numberUtilities._safeAdd(this._numberUtilities._safeMult(-Math.round((this.max - value) / step), step), this.max);
    }
    return this._numberUtilities._safeMult(Math.round(value / step), step);
  }

  private _stepChanged(step, stepMod) {
    step = step || 0;
    if (step !== Math.abs(step)) {
      this.step = Math.abs(step);
      return;
    }
    this._step = this._numberUtilities._safeMult(step, stepMod || 1);
    this._updateValue();
  }

  // number input
  private _inputChanged() {
    if (this.autoResize) {
      this._debouncedComputeWidth();
    }
  }

  private _computeType() {
    // maximize compatibility for mobile keyboards
    if (this.separators['decimal'] === '.') {
      if (this.numberStyle === 'decimal' && !this.unit && !this.alwaysSign  && !this.padLength && !this.autoPadding) {
        return 'number';
      }
      return 'tel';
    }
    return 'text';
  }

  private _computeMinimumIntegerDigits(autoPadding, padLength, def, startAt, min, max, step, numberStyle) {
    if (numberStyle === 'percent') {
      min = Math.round(min * 100);
      max = Math.round(max * 100);
      def = Math.round(def * 100);
      step = Math.round(step * 100);
      startAt = Math.round(startAt * 100);
    } else {
      min = Math.round(min);
      max = Math.round(max);
      def = Math.round(def);
      step = Math.round(step);
      startAt = Math.round(startAt);
    }
    min = '' + (Math.abs(min) || 0);
    max = '' + (Math.abs(max) || 0);
    def = '' + (Math.abs(def) || 0);
    step = '' + (Math.abs(step) || 0);
    startAt = '' + (Math.abs(startAt) || 0);

    if (autoPadding) {
      return Math.max((padLength || 1), startAt.length, step.length, def.length, min.length, max.length);
    }
    return padLength || 1;
  }

  private _computeMinimumFractionDigits(step, min, max, numberStyle) {
    if (numberStyle === 'percent') {
      min = this._numberUtilities._safeMult(min || 0, 100);
      max = this._numberUtilities._safeMult(max || 0, 100);
      step = this._numberUtilities._safeMult(step || 0.01, 100);
    }

    min = '' + (Math.abs(min) || '');
    max = '' + (Math.abs(max) || '');
    step = '' + step;

    return ['0', step, min, max].reduce( (acc, curr) => {
      const pos = curr.indexOf('.');
      return Math.max((pos < 0) ? 0 : (curr.length - 1 - pos), acc);
    });
  }

  private _computeMaximumFractionDigits(minimumFractionDigits, noClamp) {
    if (noClamp) {
      return 20;
    }
    return minimumFractionDigits;
  }

  // TODO: confirm these
  private increase() {
    this.value = this.value ? this.value + this._step : this.startAt;
    this.input = this.formatNumber(this.value);
  }

  private decrease() {
    this.value = this.value ? this.value - this._step : this.startAt;
    this.input = this.formatNumber(this.value);
  }

  render() {
    return(
      <div>
        STILL TESTING
        <input id="input"
            type={this._type}
            value={this.input}
            step={this.step}
            required={this.required}
            disabled={this.disabled}
            placeholder={this.placeholder}
            spellcheck={false}
            autocomplete="off"/>
        <div id="size">{this.input}</div>
        <div id="minsize">{this._minWidthString}</div>
      </div>
    );
  }
}
