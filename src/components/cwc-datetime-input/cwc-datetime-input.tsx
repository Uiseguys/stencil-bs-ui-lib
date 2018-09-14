import { Component, Prop, State, Watch, Element, HostElement, Method } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';

@Component({
    tag: 'cwc-datetime-input',
    styleUrl: 'cwc-datetime-input.scss'
})
export class DatetimeInputComponent {
  // -- form element
  @Prop({ mutable: true, reflectToAttr: true }) required: boolean;
  @Prop({ mutable: true, reflectToAttr: true }) invalid: boolean;
  @Prop({ mutable: true, reflectToAttr: true }) disabled: boolean;
  @Prop({ mutable: true }) name: string;
  @Prop({ mutable: true }) value: Object;
  // @Prop({ mutable: true }) default: Object;

  @State() _valueIsSet: boolean = false;

  @Element() el: HostElement;

  // -- intl date time format
  @Prop({ mutable: true }) locale: string = window.navigator.language;
  @Prop({ mutable: true }) markers: Object = {
    decimalSeparator: null,
    dateSeparator: null,
    timeSeparator: null,
    amString: null,
    pmString: null,
  };

  // -- date time
  @Prop({ mutable: true }) year: number;
  @Prop({ mutable: true }) month: number;
  @Prop({ mutable: true }) day: number;
  @Prop({ mutable: true }) hour: number;
  @Prop({ mutable: true }) hour12: number;
  @Prop({ mutable: true }) isAm: boolean;
  @Prop({ mutable: true }) minute: number;
  @Prop({ mutable: true }) second: number;
  @Prop({ mutable: true }) millisecond: number;
  @Prop({ mutable: true }) datetime: string;
  @Prop({ mutable: true }) date: string;
  @Prop({ mutable: true }) time: string;
  // TODO: check if there is type date on stencil
  @Prop({ mutable: true }) valueAsDate: Date;
  @Prop({ mutable: true }) valueAsNumber: number;
  @Prop({ mutable: true }) default: Object;
  @Prop({ mutable: true }) min: Object;
  @Prop({ mutable: true }) max: Object;
  @Prop({ mutable: true, reflectToAttr: true }) hour12Format: boolean;
  @Prop({ mutable: true }) clamp: string;
  @Prop({ mutable: true }) timezone: string;
  @Prop({ mutable: true }) timezone: string;
  @Prop({ mutable: true }) dateOrder: Object = {
    year: 1,
    month: 3,
    day: 5,
    timeFirst: false,
    dateFirst: true
  };

  @State() _timezoneOffset: number;
  @State() _timeZoneHours: number;
  @State() _timeZoneMinutes: number;
  @State() _recentLocalTimezoneOffset: number;
  @State() _maxDayOfMonth: number;
  @State() _regexpDatetime: RegExp = /^(-?\d+-\d\d-\d\d)?(?:T?(?:(\d\d:\d\d(?::\d\d(?:\.\d\d\d)?)?)([+-]\d\d:\d\d|Z)?)?)$/;
  @State() _regexpTimezone: RegExp = /(?:([+-]\d\d):(\d\d)|Z)$/;
  @State() _regexpTimezone: boolean;
  @State() _timeOnly: boolean = false;



  componentDidLoad() {
    // -- form element
    this.el['tabindex'] = 0;
    this._computeInvalid(this.required, this.value);
    this._computeValueIsSet(this.value);
    this._defaultChanged(this.default);

    // -- intl date time format
    this._localeChanged(this.locale);
  }

  // -- form element
  @Watch('required')
  requiredChanged() {
    this._computeInvalid(this.required, this.value);
  }
  @Watch('value')
  valueChanged() {
    this._computeInvalid(this.required, this.value);
    this._computeValueIsSet(this.value);
  }
  @Watch('default')
  defaultChanged() {
    this._defaultChanged(this.default);
  }

  // -- intl date time format
  @Watch('locale')
  localeChanged() {
    this._localeChanged(this.locale);
  }

  // -- form element
  private _computeInvalid(required, value) {
    this.invalid = Boolean(required && !value);
  }
  private _computeValueIsSet(value) {
    this._valueIsSet = value !== undefined;
  }
  private _defaultChanged(def) {
    if (def && this.value === undefined) {
      this.value = def;
      if (this.propertyForValue) {
        this[this.propertyForValue] = def;
      }
    }
  }
  @Method()
  validate() {
    return !this.invalid;
  }

  // -- intl date time format
  private _localeChanged(locale) {
    if (!(locale && Intl.DateTimeFormat && Intl.DateTimeFormat.supportedLocalesOf(locale))) {
      this.locale = window.navigator.language;
      return;
    }

    // only `gregory`-calendar-system is possible to use
    const resolvedOptions = new Intl.DateTimeFormat(locale).resolvedOptions();
    if (resolvedOptions.calendar !== 'gregory' && resolvedOptions.calendar !== 'iso8601') {
      // test if calendar system is part of the locale
      if (locale.indexOf('-u-') !== -1) {
        let pos;
        if ((pos = locale.indexOf('-ca-')) !== -1) {
          const end = locale.indexOf('-', pos + 4);
          if (end !== -1) {
            // `latn` is at in beetween
            this.locale = locale.slice(0, pos + 4) + 'gregory' + locale.slice(end);
          } else {
            // `latn` is at end position
            this.locale = locale.slice(0, pos + 4) + 'gregory';
          }
        } else {
          // calendar-system is not part of locale
          this.locale = locale + '-ca-gregory';
        }
      } else {
        // locale has no modifier
        this.locale = locale + '-u-ca-gregory';
      }
      return;
    }

    // decimal separator
    const numberString = (0.5).toLocaleString(locale, {
      minimumIntegerDigits: 1,
      // maximumIntegerDigits: 1,
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    });
    const decimalSeparator = numberString[1];

    // date separator
    const d = new Date(Date.UTC(1970, 0, 22, 11, 44, 55));

    // create datestring in locale format
    const formatedDateParts = [
      d.toLocaleDateString(locale, {
        day: '2-digit',
        timeZone: 'UTC',
        hour12: false
      }).replace(/[\u200E\u200F]/g, '').slice(0, 2),
      d.toLocaleDateString(locale, {
        month: '2-digit',
        timeZone: 'UTC',
        hour12: false
      }).replace(/[\u200E\u200F]/g, '').slice(0, 2),
      d.toLocaleDateString(locale, {
        year: '2-digit',
        timeZone: 'UTC',
        hour12: false
      }).replace(/[\u200E\u200F]/g, '').slice(0, 2)
    ];

    // using UTC-timezone to avoid conflicts when comparing
    const dateSeparator = formatedDateParts.reduce((acc, currentValue) => {
      // filter the number in the current locale representation and unicode-left- or right-control-marks
      return acc.replace(currentValue, '').replace(/[\u200E\u200F]/g, '');
    }, d.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      timeZone: 'UTC',
      hour12: false
    }))[0];

    // time separator
    // create datestring in locale format
    const formatedTimeString = d.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
        hour12: false
      }).replace(/[\u200E\u200F]/g, '');

    // using UTC-timezone to avoid conflicts when comparing
    const timeSeparator = formatedTimeString.replace(/[\u200E\u200F]/g, '')[2];

    // am-pm strings
    const formatedTimeParts = formatedTimeString.split(timeSeparator);
    formatedTimeParts.push(timeSeparator);

    // am
    const amString = formatedTimeParts.reduce((acc, currentValue) => {
      return acc.replace(currentValue, '').replace(/[\u200E\u200F\s]/g, '');
    }, d.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      hour12: true,
      // hourCycle: 'h12'
    }));

    formatedTimeParts.push(amString);

    // pm
    d.setUTCHours(23);
    const pmString = formatedTimeParts.reduce((acc, currentValue) => {
      return acc.replace(currentValue, '').replace(/[\u200E\u200F\s]/g, '');
    }, d.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      hour12: true,
      // hourCycle: 'h12'
    }));

    this.markers = {
      decimalSeparator: decimalSeparator,
      dateSeparator: dateSeparator,
      timeSeparator: timeSeparator,
      amString: (!amString || amString === '.') ? 'AM' : amString, // IE fix for languages that usually don't use am-pm suffixes
      pmString: (!pmString || pmString === '.') ? 'PM' : pmString
    };
  }

  // -- date time


  render() {
    return (
      <div>
        TEST
      </div>
    );
  }
}
