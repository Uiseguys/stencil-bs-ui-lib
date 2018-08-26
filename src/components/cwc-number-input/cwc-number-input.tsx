import { Component, State, Prop, Watch, Element, HostElement, Method } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';

@Component({
    tag: 'cwc-number-input',
    styleUrl: 'cwc-number-input.scss'
})
export class NumberInputComponent {
  @Prop({ mutable: true }) padLength: number;
  @Prop({ mutable: true }) autoPadding: boolean;
  @Prop({ mutable: true }) minimumFractionDigits: number;
  @Prop({ mutable: true }) maximumFractionDigits: number;
  @Prop({ mutable: true }) minimumIntegerDigits: number;
  // @Prop({ mutable: true }) value: number;
  @Prop({ mutable: true }) startAt: number;
  @Prop({ mutable: true }) propertyForValue: string = 'valueAsNumber';

  @State() _type: string;

  @Element() el: HostElement;

  // intl num format props
  @Prop({ mutable: true }) locale: string = window.navigator.language;
  @Prop() decimalSeparator: string;
  @Prop() groupingSeparator: string;
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

  @State() _numberOptions: Object;
  @State() _regExpNotInNumber: RegExp = /[^\d\-+.e]/g;
  // @State() _numberOptions: number;
  // @State() _regExpNotInNumber: number = /[^\d\-+.e]/g;

  // input pattern
  @Prop({ mutable: true }) type: string = 'text';
  @Prop({ mutable: true }) input: string;
  @Prop({ mutable: true }) placeholder: string;
  @Prop({ mutable: true }) default: any;
  // @Prop({ mutable: true }) default: string;
  @Prop({ mutable: true }) minlength: number;
  @Prop({ mutable: true }) noAutoWidth: boolean;
  @Prop({ mutable: true }) autoResize: boolean;
  @Prop({ mutable: true }) hidden: boolean;

  @State() _minWidthString: string;

  // form element
  @Prop({ mutable: true, reflectToAttr: true }) required: boolean;
  @Prop({ mutable: true, reflectToAttr: true }) invalid: boolean;
  @Prop({ mutable: true, reflectToAttr: true }) disabled: boolean;
  @Prop({ mutable: true }) name: string;
  @Prop({ mutable: true }) value: Object;

  @State() _valueIsSet: boolean = false;

  // Range
  @Prop({ mutable: true }) min: number;
  @Prop({ mutable: true }) max: number;
  @Prop({ mutable: true }) step: number = 1;
  @Prop({ mutable: true }) stepMod: number = 1;
  @Prop({ mutable: true }) valueAsNumber: number;
  @Prop({ mutable: true }) saturate: boolean;
  @Prop({ mutable: true }) noClamp: boolean;

  @State() _step: number = 1;

  @State() _activeResizeJob: any;
  @State() _minSizeJob: any;
  @State() _minWidthComputionJob: any;

  componentDidLoad() {
    // intl num format
    this._numberOptions = this._computeNumberOptions(
      this.minimumIntegerDigits, this.minimumFractionDigits,
      this.maximumFractionDigits, this.minimumSignificantDigits,
      this.maximumSignificantDigits, this.useGrouping,
      this.numberStyle, this.currency,
      this.currencyDisplay);
      // this.currencyDisplay, this.unit);
    this.formatNumber = this._computeFormatNumber(this.locale, this._numberOptions, this.unit);
    this.parseNumber = this._computeParseNumber(this.decimalSeparator, this.numberStyle, this.useGrouping);

    // number input
    this._type = this._computeType();
    // this._type = this._computeType(this.formatNumber, this.parseNumber, this.alwaysSign);
    this.minimumFractionDigits = this._computeMinimumFractionDigits(this._step, this.min, this.max, this.numberStyle);
    this.maximumFractionDigits = this._computeMaximumFractionDigits(this.minimumFractionDigits, this.noClamp);
    this.minimumIntegerDigits = this._computeMinimumIntegerDigits(
      this.autoPadding, this.padLength, this.default, this.startAt, this.min, this.max, this._step, this.numberStyle
    );
  }

  // Range
  @Watch('min')
  _minMaxChangedForMin(min: number) {
    if (+this.max < +min) {
      this.min  = +this.max;
      this.max = +min;
    } else {
      this._updateValue();
    }
  }

  @Watch('max')
  _minMaxChangedForMax(max: number) {
    if (+max < +this.min) {
      this.min  = +max;
      this.max = +this.min;
    } else {
      this._updateValue();
    }
  }

  _checkValue(value, oldValue) {
    const defaultStr = this.default;
    if (isNaN(value)) {
      if (!isNaN(oldValue)) {
        return oldValue;
      } else if (!isNaN(defaultStr)) {
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

  _updateValue() {
    if (this.valueAsNumber !== undefined) {
      this._valueAsNumberChanged(this.valueAsNumber, this.valueAsNumber);
    }
  }

  @Watch('saturate')
  _updateValueForSaturate() {
    this._updateValue();
  }

  @Watch('noClamp')
  _updateValueForNoClamp() {
    this._updateValue();
  }

  @Watch('formatNumber')
  _updateValueForFormatNumber() {
    this._updateValue();
  }

  @Watch('alwaysSign')
  _updateValueForAlwaysSign() {
    this._updateValue();
  }

  _checkStep(value, step) {
    if (!step) {
      return value;
    }
    if (this.default !== undefined) {
      return this._safeAdd(this._safeMult(Math.round((value - parseFloat(this.default)) / step), step), parseFloat(this.default));
    }
    if (this.min !== undefined) {
      return this._safeAdd(this._safeMult(Math.round((value - this.min) / step), step), this.min);
    }
    if (this.max !== undefined) {
      return this._safeAdd(this._safeMult(-Math.round((this.max - value) / step), step), this.max);
    }
    return this._safeMult(Math.round(value / step), step);
  }

  _safeMult(a, b) {
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

    let wholeStr = `${whole}`;
    for (let i = wholeStr.length; i < decimal; i++) {
      wholeStr = '0' + wholeStr;
    }
    return +(sign + wholeStr.slice(0, wholeStr.length - decimal) + '.' + wholeStr.slice(wholeStr.length - decimal));
  }

  _safeAdd(a, b) {
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

  _stepChanged() {
    const step = this.step || 0;
    if (step !== Math.abs(step)) {
      this.step = Math.abs(step);
      return;
    }
    this._step = this._safeMult(step, this.stepMod || 1);
    this._updateValue();
  }

  @Watch('step')
  _stepChangedForStep() {
    this._stepChanged();
  }

  @Watch('stepMod')
  _stepChangedForStepMod() {
    this._stepChanged();
  }

  // form element
  @Method()
  validate() {
    return !this.invalid;
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
      // TODO: vanessa - find another way
      // @Watch(prop)
      // _reflectPropertyToValue(newValue1: Object) {
      //   this.value = newValue1;
      // }
      // @Watch('value')
      // _reflectValueToProperty(newValue2: Object) {
      //   this[prop] = newValue2;
      // }
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

  // range
  @Method()
  connectedCallback() {
    // TODO -vanessa: figure out what this is
    // super.connectedCallback();
    // this._ensureAttribute('tabindex', 0);
    this.focusMethod = this.focusMethod.bind(this);
    this._updateValue = this._updateValue.bind(this);
    this._checkInput = this._checkInput.bind(this);
    this._checkKeycode = this._checkKeycode.bind(this);
    this._addEventListeners();
    setTimeout(this.resize.bind(this), 0);
    if (this.valueAsNumber === undefined && !isNaN(this.default)) {
      this.valueAsNumber = parseFloat(this.default);
    }
  }

  @Method()
  disconnectedCallback() {
    // TODO - vanessa: what is this
    // super.disconnectedCallback();
    this._removeEventListeners();
  }

  _addEventListeners() {
    this.el.addEventListener('focus', this.focusMethod, false);
    this.el.querySelector('#input').addEventListener('focus', this._updateValue, false);
    this.el.querySelector('#input').addEventListener('blur', this._checkInput, false);
    this.el.querySelector('#input').addEventListener('keydown', this._checkKeycode, false);
  }

  _removeEventListeners() {
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
    // this._checkInput(e);
    this.el.querySelector('#input')['blur']();
  }

  @Method()
  resize() {
    // console.log('resizing');
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
        minsizeClone['style'].display = 'inline-flex';
        minsizeClone['style'].opacity = '0';
        minsizeClone['style'].position = 'fixed';
        minsizeClone['style'].left = '0';
        minsizeClone['style'].top = '0';
        minsizeClone['style'].border = 'thin solid transparent';

        document.body.appendChild(minsizeClone);
        requestAnimationFrame( () => {
          width = minsizeClone['getBoundingClientRect']().width;
          minsizeClone.parentElement.removeChild(minsizeClone);
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

  @Watch('_minWidthString')
  resizeForMinWidthString() {
    this.resize();
  }

  @Watch('hidden')
  resizeForHidden() {
    this.resize();
  }

  _debouncedComputeWidth() {
    if (this._activeResizeJob) {
      clearTimeout(this._activeResizeJob);
    }
    this._activeResizeJob = setTimeout(this._computeWidth.bind(this), 0);
  }

  _computeWidth() {
    if (!this.el.querySelector('#input')['style']) {
      this.el.querySelector('#input')['style'] = {};
    }
    this.el.querySelector('#input')['style'].width = `${this.el.querySelector('#size')['getBoundingClientRect']().width}px`;
  }

  // intl number format
  @Watch('locale')
  _localeChanged(newValue: string) {
    const locale = newValue;
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

        this.decimalSeparator = decimalSeparator;
        this.groupingSeparator = groupingSeparator;
  }

  _computeNumberOptions(
    minimumIntegerDigits, minimumFractionDigits,
    maximumFractionDigits, minimumSignificantDigits,
    maximumSignificantDigits, useGrouping,
    style, currency, currencyDisplay) {
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
          options['maximumFractionDigits'] = maximumFractionDigits < minimumFractionDigits
          ? minimumFractionDigits : maximumFractionDigits;
        }
        if (minimumSignificantDigits !== undefined) {
          options['minimumSignificantDigits'] = minimumSignificantDigits;
        }
        if (maximumSignificantDigits !== undefined) {
          options['maximumSignificantDigits'] = maximumSignificantDigits < minimumSignificantDigits
          ? minimumSignificantDigits : maximumSignificantDigits;
        }
        return options;
      }

    _computeFormatNumber(locale, numberOptions, unit) {
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

    _computeParseNumber(decimalSeparator, numberStyle, useGrouping) {
        const regExpGrouping = new RegExp('[' + (this.groupingSeparator || '') + ']', 'g');
        if (numberStyle === 'percent') {
          if (useGrouping) {
            return (input) => {
              return this._safeMult(input.replace(regExpGrouping, '').replace(decimalSeparator, '.'), 0.01);
            }
          } else {
            return (input) => {
              return this._safeMult(parseFloat(input.replace(decimalSeparator, '.')), 0.01);
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


  // number input
  _checkKeycode(e) {
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
        // TODO - vanessa: fix
        // this.increase();
        break;
      case 40: // down
        e.preventDefault();
        e.stopPropagation();
        // TODO - vanessa: fix
        // this.decrease();
        break;
    }
  }

  // TODO: vanessa - fix
  // from InputPattern
  @Watch('required')
  _computeInvalid(required: boolean) {
    // this.invalid = required && isNaN(this.value);
    this.invalid = required && isNaN(this.value[this.propertyForValue]);
  }

  @Watch('value')
  _computeValueIsSetandInvalid(newValue: string) {
    this._valueIsSet = newValue !== undefined;
    this.invalid = this.required && isNaN(newValue[this.propertyForValue]);
  }

  _checkInput() {
    if (!this.input) {
      if (!isNaN(this.default)) {
        this.input = this.formatNumber(this.default);
        this.valueAsNumber =  +this.default;
      } else {
        this.valueAsNumber = undefined;
      }
      this._debouncedComputeWidth();
      return;
    }
    const value = this._checkValue(this.parseNumber(this.input), this.valueAsNumber);
    this.input = this.formatNumber(value);
    this.valueAsNumber = value;
    this._debouncedComputeWidth();
  }

  @Watch('input')
  _inputChanged() {
    if (this.autoResize) {
      this._debouncedComputeWidth();
    }
  }

  @Watch('valueAsNumber')
  _valueAsNumberChanged(newValue: number, oldValue: number) {
    let value = newValue;
    if (value !== undefined) {
      value = this._checkValue(value, oldValue);

      if (value !== this.valueAsNumber) {
        this.valueAsNumber = value;
        return;
      }
    }

    if (isNaN(value)) {
      this.input = '';
      return;
    }
    this.input = this.formatNumber(this.valueAsNumber);
  }

  _defaultChanged(newDef) {
    if (isNaN(this.valueAsNumber) && !isNaN(newDef)) {
      this.valueAsNumber = newDef;
    }
  }

  _computeMinWidth() {
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

// from input pattern
  @Watch('default')
  _defaultChangedAndComputeMinWidth(newDef: string) {
    this._defaultChanged(newDef);
    this._computeMinWidth();
  }

  _computeType() {
    // maximize compatibility for mobile keyboards
    if (this.decimalSeparator === '.') {
      if (this.numberStyle === 'decimal' && !this.unit && !this.alwaysSign  && !this.padLength && !this.autoPadding) {
        return 'number';
      }
      return 'tel';
    }
    return 'text';
  }

  @Watch('formatNumber')
  _computeMinWidth1() {
    this._computeMinWidth();
  }

  @Watch('startAt')
  _computeMinWidth2() {
    this._computeMinWidth();
  }

  @Watch('min')
  _computeMinWidth3() {
    this._computeMinWidth();
  }

  @Watch('max')
  _computeMinWidth4() {
    this._computeMinWidth();
  }

  @Watch('minimumIntegerDigits')
  _computeMinWidth5() {
    this._computeMinWidth();
  }

  @Watch('minimumFractionDigits')
  _computeMinWidth6() {
    this._computeMinWidth();
  }

  @Watch('alwaysSign')
  _computeMinWidth7() {
    this._computeMinWidth();
  }

  @Watch('noAutoWidth')
  _computeMinWidth8() {
    this._computeMinWidth();
  }

  @Watch('minlength')
  _computeMinWidth9() {
    this._computeMinWidth();
  }

  @Watch('placeholder')
  _computeMinWidth10() {
    this._computeMinWidth();
  }

  _computeMinimumIntegerDigits(autoPadding, padLength, def, startAt, min, max, step, numberStyle) {
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

  _computeMinimumFractionDigits(step, min, max, numberStyle) {
    if (numberStyle === 'percent') {
      min = this._safeMult(min || 0, 100);
      max = this._safeMult(max || 0, 100);
      step = this._safeMult(step || 0.01, 100);
    }

    min = '' + (Math.abs(min) || '');
    max = '' + (Math.abs(max) || '');
    step = '' + step;

    return ['0', step, min, max].reduce( (acc, curr) => {
      const pos = curr.indexOf('.');
      return Math.max((pos < 0) ? 0 : (curr.length - 1 - pos), acc);
    });
  }

  _computeMaximumFractionDigits(minimumFractionDigits, noClamp) {
    if (noClamp) {
      return 20;
    }
    return minimumFractionDigits;
  }

  render() {
    return (
      <div>
      <input id="input"
            type={this._type}
            value={this.input}
            step={this.step}
            required={this.required}
            disabled={this.disabled}
            placeholder={this.placeholder}
            spellcheck="false"
            autocomplete="off" />
        <div id="size">{this.input}</div>
        <div id="minsize">{this._minWidthString}</div>
      </div>
    );
  }
}
