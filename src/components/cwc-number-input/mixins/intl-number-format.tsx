import { Prop, State, Watch } from '@stencil/core';

// TODO: vanessa - import range mixin for window function utilies

export class IntlNumberFormat {
  @Prop({ mutable: true }) locale: string = window.navigator.language;
  @Prop() decimalSeparator: string;
  @Prop() groupingSeparator: string;
  @Prop({ mutable: true }) minimumFractionDigits: number;
  @Prop({ mutable: true }) maximumFractionDigits: number;
  @Prop({ mutable: true }) minimumIntegerDigits: number;
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

  @State() _numberOptions: number;
  @State() _regExpNotInNumber: number = /[^\d\-+.e]/g;

  componentDidLoad() {
    this._numberOptions = this._computeNumberOptions(
      this.minimumIntegerDigits, this.minimumFractionDigits,
      this.maximumFractionDigits, this.minimumSignificantDigits,
      this.maximumSignificantDigits, this.useGrouping,
      this.numberStyle, this.currency,
      this.currencyDisplay, this.unit);
    this.formatNumber = this._computeFormatNumber(this.locale, this._numberOptions, this.unit);
    this.parseNumber = this._computeParseNumber(this.decimalSeparator, this.numberStyle, this.useGrouping);
  }

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
          minimumIntergerDigits: 1,
          minimumFractionsDigits: 1
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
          options.currency = currency;
        }
        if (currencyDisplay !== undefined) {
          options.currencyDisplay = currencyDisplay;
        }
        if (maximumFractionDigits !== undefined) {
          options.maximumFractionDigits = maximumFractionDigits < minimumFractionDigits
          ? minimumFractionDigits : maximumFractionDigits;
        }
        if (minimumSignificantDigits !== undefined) {
          options.minimumSignificantDigits = minimumSignificantDigits;
        }
        if (maximumSignificantDigits !== undefined) {
          options.maximumSignificantDigits = maximumSignificantDigits < minimumSignificantDigits
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
              return window._numberUtilities._safeMult(input.replace(regExpGrouping, '').replace(decimalSeparator, '.'), 0.01);
            }
          } else {
            return (input) => {
              return window._numberUtilities._safeMult(parseFloat(input.replace(decimalSeparator, '.')), 0.01);
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
}
