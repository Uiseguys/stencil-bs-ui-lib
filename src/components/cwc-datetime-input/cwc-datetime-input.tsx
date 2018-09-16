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
  @Prop({ mutable: true }) default: any;
  @Prop({ mutable: true }) min: Object;
  @Prop({ mutable: true }) max: Object;
  @Prop({ mutable: true, reflectToAttr: true }) hour12Format: boolean;
  @Prop({ mutable: true }) clamp: string;
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
  @State() _dateLocked: boolean;
  @State() _timeOnly: boolean = false;
  @State() __updatingTimezoneOffset: any;
  @State() _min: any;
  @State() _max: any;

  componentDidLoad() {
    // -- form element
    this.el['tabindex'] = 0;
    this._computeInvalid(this.required, this.value);
    this._computeValueIsSet(this.value);
    this._defaultChanged(this.default);

    // -- intl date time format
    this._localeChanged(this.locale);

    // -- date time
    // this._hour12Changed(this.hour12, null);
    // this._isAmChanged(this.isAm, null)
    this._valueAsDateChanged(this.valueAsDate);
    this._valueAsNumberChanged(this.valueAsNumber);
    this._minChanged(this.min);
    this._maxChanged(this.max);
    // this._timezoneChanged(this.timezone, null);
    this._timezoneOffsetChanged(this._timezoneOffset);
    this._maxDayOfMonth = this._computeMaxDayOfMonth(this.year, this.month);
    this._dateLocked = this._ifClamped(this.clamp, 'hour', null);
    this._computeDatetime(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
    this._datetimeChanged(this.datetime);
    this._dateTimeChanged(this.date, this.time);
    this._timeZoneHoursMinutesChanged(this._timeZoneHours, this._timeZoneMinutes);
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

  // -- date time
  @Watch('hour12')
  hour12Changed(newVal, oldVal) {
    this._hour12Changed(newVal, oldVal);
  }
  @Watch('isAm')
  isAmChanged(newVal, oldVal) {
    this._isAmChanged(newVal, oldVal);
  }
  @Watch('valueAsDate')
  valueAsDateChanged(d) {
    this._valueAsDateChanged(d);
  }
  @Watch('valueAsNumber')
  valueAsNumberChanged(value) {
    this._valueAsNumberChanged(value);
  }
  @Watch('min')
  minChanged(min) {
    this._minChanged(min);
  }
  @Watch('max')
  maxChanged(max) {
    this._maxChanged(max);
  }
  @Watch('timezone')
  timezoneChanged(newVal, oldVal) {
    this._timezoneChanged(newVal, oldVal);
  }
  @Watch('_timezoneOffset')
  underscoreTimezoneOffsetChanged(offset) {
    this._timezoneOffsetChanged(offset);
  }
  @Watch('year')
  yearChanged() {
    this._maxDayOfMonth = this._computeMaxDayOfMonth(this.year, this.month);
    this._computeDatetime(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  @Watch('month')
  monthChanged() {
    this._maxDayOfMonth = this._computeMaxDayOfMonth(this.year, this.month);
    this._computeDatetime(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  @Watch('clamp')
  clampChanged() {
    this._dateLocked = this._ifClamped(this.clamp, 'hour', null);
  }
  @Watch('day')
  dayChanged() {
    this._computeDatetime(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  @Watch('hour')
  hourChanged() {
    this._computeDatetime(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  @Watch('minute')
  minuteChanged() {
    this._computeDatetime(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  @Watch('second')
  secondChanged() {
    this._computeDatetime(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  @Watch('millisecond')
  millisecondChanged() {
    this._computeDatetime(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  @Watch('datetime')
  datetimeChanged() {
    this._datetimeChanged(this.datetime);
  }
  @Watch('date')
  dateChanged() {
    this._dateTimeChanged(this.date, this.time);
  }
  @Watch('time')
  timeChanged() {
    this._dateTimeChanged(this.date, this.time);
  }
  @Watch('_timeZoneHours')
  underscoreTimeZoneHoursChanged() {
    this._timeZoneHoursMinutesChanged(this._timeZoneHours, this._timeZoneMinutes);
  }
  @Watch('_timeZoneMinutes')
  underscoreTimeZoneMinutesChanged() {
    this._timeZoneHoursMinutesChanged(this._timeZoneHours, this._timeZoneMinutes);
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

    // -- date time
    if (!def) {
      return;
    }
    if (this.valueAsDate === undefined || this.valueAsNumber === undefined) {
      this._resetDate(null);
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

    // -- date time
    // test locale dateformat, to define the order of the parts of the date
    // create datestring in locale format
    const d1 = new Date(Date.UTC(1970, 10, 22, 18, 44));

    // filter the number in the current locale representation and unicode-left- or right-control-marks
    const formatedDateParts1 = {
      year: d1.toLocaleDateString(locale, {
        year: '2-digit',
        timeZone: 'UTC',
        hour12: false
      }).replace(/[\u200E\u200F]/g, '').slice(0, 2),
      month: d1.toLocaleDateString(locale, {
        month: '2-digit',
        timeZone: 'UTC',
        hour12: false
      }).replace(/[\u200E\u200F]/g, '').slice(0, 2),
      day: d1.toLocaleDateString(locale, {
        day: '2-digit',
        timeZone: 'UTC',
        hour12: false
      }).replace(/[\u200E\u200F]/g, '').slice(0, 2),
      hour: d1.toLocaleTimeString(locale, {
        hour: '2-digit',
        timeZone: 'UTC',
        hour12: false
      }).replace(/[\u200E\u200F]/g, '').slice(0, 2),
    };

    // using UTC-timezone to avoid conflicts when comparing
    const localeDateString = d1.toLocaleString(locale, {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      hour12: false
    }).replace(/[\u200E\u200F]/g, '');

    const occurrence = {
      year: localeDateString.indexOf(formatedDateParts1.year),
      month: localeDateString.indexOf(formatedDateParts1.month),
      day: localeDateString.indexOf(formatedDateParts1.day),
      hour: localeDateString.indexOf(formatedDateParts1.hour)
    };

    // setting datetime order
    const order = {
      year: null,
      month: null,
      day: null,
      timeFirst: occurrence.year > occurrence.hour,
      dateFirst: occurrence.year < occurrence.hour
    };

    if (occurrence.year < occurrence.month) {
      if (occurrence.year < occurrence.day) {
        order.year = 1;
        if (occurrence.month < occurrence.day) {
          order.month = 3;
          order.day = 5;
        } else {
          order.day = 3;
          order.month = 5;
        }
      } else {
        order.day = 1;
        order.year = 3;
        order.month = 5;
      }
    } else {
      if (occurrence.month < occurrence.day) {
        order.month = 1;
        if (occurrence.year < occurrence.day) {
          order.year = 3;
          order.day = 5;
        } else {
          order.day = 3;
          order.year = 5;
        }
      } else {
        order.day = 1;
        order.month = 3;
        order.year = 5;
      }
    }

    this.dateOrder = order;
    this.hour12Format = this.hour12Format === undefined
      ? Boolean(new Intl.DateTimeFormat(locale).resolvedOptions().hour12) : this.hour12Format;
  }

  // -- date time
  @Method()
  now() {
    const d = new Date();
    if (this._timeOnly) {
      if (!this.timezone || !this.date) {
        this.__updatingTimezoneOffset = true;
        this._timezoneOffset = 0;
        this.__updatingTimezoneOffset = false;
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      }
      if (!this.date) {
        d.setUTCFullYear(1970);
        d.setUTCMonth(0);
        d.setUTCDate(1);
      }
    }
    this._setDate(d);
  }

  private _computeDatetime(year, month, day, hour, minute, second, millisecond) {
    if (this.__updatingTimezoneOffset) {
      return;
    }
    let d = new Date(this.valueAsDate);

    if (isNaN(year) && isNaN(month) && isNaN(day) && isNaN(hour) && isNaN(minute) && isNaN(second) && isNaN(millisecond)) {
      if (d !== undefined) {
        this._resetDate(null);
      }
      return;
    } else if (isNaN(d)) {
      d = new Date(this.valueAsNumber !== undefined ? this.valueAsNumber : this.datetime);
      if (isNaN(d)) {
        if (this._timeOnly) {
          if (!this.timezone || !this.date) {
            this.__updatingTimezoneOffset = true;
            this._timezoneOffset = 0;
            this.__updatingTimezoneOffset = false;
            if (this.time) {
              d = new Date('1970-01-01T' + this.time + 'Z');
            } else {
              d = new Date(0);
            }
          }
          if (!this.date) {
            d.setUTCFullYear(1970);
            d.setUTCMonth(0);
            d.setUTCDate(1);
          }
          d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
        } else {
          d = new Date((this.date || this._toDate(new Date())) + 'T' + (this.time || '00:00') + (this.timezone || 'Z'));
          if (!this.timezone) {
            d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
          }
        }
        if (isNaN(d)) {
          d = new Date();
        }
      }
    }

    // shift to UTC
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    if (year !== undefined) {
      d.setUTCFullYear(year);
    }
    if (month !== undefined) {
      d.setUTCMonth(month - 1);
    }
    if (day !== undefined) {
      d.setUTCDate(day);
    }
    if (hour !== undefined) {
      d.setUTCHours(hour);
    }
    if (minute !== undefined) {
      d.setUTCMinutes(minute);
    }
    if (second !== undefined) {
      d.setUTCSeconds(second);
    }
    if (millisecond !== undefined) {
      d.setUTCMilliseconds(millisecond);
    }
    this._correctTimezoneShift(d);
    // shift back from UTC to timezone
    d.setMinutes(d.getMinutes() + this._timezoneOffset);

    this._setDate(d);
  }

  private _dateTimeChanged(date, time) {
    if (this.__updatingTimezoneOffset) {
      return;
    }

    if (date === undefined && time === undefined) {
      if (this.valueAsDate !== undefined) {
        this._resetDate(null);
      }
      return;
    }
    if (!date && this._timeOnly) {
      this.__updatingTimezoneOffset = true;
      this._timezoneOffset = 0;
      this.__updatingTimezoneOffset = false;
      date = '1970-01-01';
    }
    this.datetime = (date || '1970-01-01') + 'T' +
      (time || ((this.timezone && this.timezone.length === 5) ? this.timezone.slice(1) : '00:00')) + (this.timezone || '+00:00');
  }

  private _datetimeChanged(datetime) {
    if (this.__updatingTimezoneOffset) {
      return;
    }

    if (datetime === undefined) {
      if (this.valueAsDate !== undefined) {
        this._resetDate(null);
      }
      return;
    }

    if (typeof datetime === 'object') {
      // 'date' is a Date Object
      this._recentLocalTimezoneOffset = datetime.getTimezoneOffset();
      this._setDate(datetime);
      return;
    }

    let d;
    const match = this._regexpDatetime.exec(datetime);
    if (match === null) {
      return;
    }

    if (match[3] === undefined) {
      d = new Date((match[1] || '1970-01-01') + 'T' + match[2] + 'Z');
      this._checkDefaultTimezone(d);
      d.setMinutes(d.getMinutes() + this._timezoneOffset);
    } else {
      if (match[1] === undefined) {
        match[0] = '1970-01-01T' + match[2] + match[3];
      }
      d = new Date(match[0]);
      if (match[3] !== this.timezone) {
        this.__updatingTimezoneOffset = true;
        const propertiesToChange = this._computeTimezoneOffset(match[3]);
        const fields = Object.keys(propertiesToChange);
        fields.map((field) => {
          this[field] = propertiesToChange[field];
        });
        // this.setProperties(this._computeTimezoneOffset(match[3]));
        this.__updatingTimezoneOffset = false;
      }
    }
    this._setDate(d);
  }

  private _valueAsNumberChanged(value) {
    if (this.__updatingTimezoneOffset) {
      return;
    }

    if (isNaN(value)) {
      return;
    }

    this._setDate(new Date(+value));
  }

  private _valueAsDateChanged(d) {
    if (this.__updatingTimezoneOffset) {
      return;
    }

    if (isNaN(d)) {
      return;
    }

    if (this.valueAsNumber !== +d) {
      this._setDate(new Date(d));
    }
  }

  private _setDate(d) {
    if (!isNaN(d)) {
      this._correctTimezoneShift(d);
      d = this._checkThreshold(d);

      const value = +d;

      if (+this.valueAsDate !== value || this.valueAsNumber !== value) {
        this.valueAsDate = d;
        this.valueAsNumber = value;
        return;
      }
      d = new Date(d);

      // shift date, so that date properties are according to timezone
      d.setMinutes(d.getMinutes() - this._timezoneOffset);

      d = this._clamp(d, this.clamp);
      const year = d.getUTCFullYear(),
        month = d.getUTCMonth() + 1,
        day = d.getUTCDate(),
        hour = d.getUTCHours(),
        minute = d.getUTCMinutes(),
        second = d.getUTCSeconds(),
        millisecond = d.getUTCMilliseconds(),
        hour12 = (hour === 0) ? 12 : (hour > 12 ? hour - 12 : hour),
        isAm = hour < 12,
        date = this.__toDate(year, month, day),
        time = this._dateLocked ? '00:00:00.000' : this.__toTime(hour, minute, second, millisecond),
        datetime = date + 'T' + time + this.timezone;

        // TODO: check
        this.year  = year;
        this.month  = month;
        this.day  = day;
        this.hour  = hour;
        this.minute  = minute;
        this.second  = second;
        this.millisecond  = millisecond;
        this.isAm  = isAm;
        this.hour12  = hour12;
        this.datetime  = datetime;
        this.date  = date;
        this.time  = time;
        // this.setProperties({
        //   year: year,
        //   month: month,
        //   day: day,
        //   hour: hour,
        //   minute: minute,
        //   second: second,
        //   millisecond: millisecond,
        //   isAm: isAm,
        //   hour12: hour12,
        //   datetime: datetime,
        //   date: date,
        //   time: time
        // });
    } else if (!isNaN(d = new Date(this.default))) {
      this._setDate(d);
    } else if (!isNaN(this.valueAsNumber)) {
      this._valueAsNumberChanged(this.valueAsNumber);
    }
  }

  private _resetDate(e) {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (this.default !== undefined) {
      const d = this._fromDatetime(this.default);
      if (!isNaN(d)) {
        this._recentLocalTimezoneOffset = d.getTimezoneOffset();
        this._setDate(d);
        return;
      }
    }

    // TODO: check
    this.valueAsDate = undefined;
    this.valueAsNumber = undefined;
    this.datetime = undefined;
    this.date = undefined;
    this.time = undefined;
    this.year = undefined;
    this.month = undefined;
    this.day = undefined;
    this.hour = undefined;
    this.hour12 = undefined;
    this.isAm = undefined;
    this.minute = undefined;
    this.second = undefined;
    this.millisecond = undefined;
    this.timezone = undefined;
    this._timezoneOffset = undefined;
    this._timeZoneHours = undefined;
    this._timeZoneMinutes = undefined;
    this._recentLocalTimezoneOffset = undefined;
    // this.setProperties({
    //   valueAsDate: undefined,
    //   valueAsNumber: undefined,
    //   datetime: undefined,
    //   date: undefined,
    //   time: undefined,
    //   year: undefined,
    //   month: undefined,
    //   day: undefined,
    //   hour: undefined,
    //   hour12: undefined,
    //   isAm: undefined,
    //   minute: undefined,
    //   second: undefined,
    //   millisecond: undefined,
    //   timezone: undefined,
    //   _timezoneOffset: undefined,
    //   _timeZoneHours: undefined,
    //   _timeZoneMinutes: undefined,
    //   _recentLocalTimezoneOffset: undefined
    // });
  }

  private _fromDatetime(datetime) {
    if (datetime === undefined) {
      return;
    }
    if (typeof datetime === 'object' && datetime.getDate) {
      // 'datetime' is a Date Object
      return datetime;
    }
    if (!isNaN(+datetime)) {
      // 'datetime' is a number
      return new Date(+datetime);
    }
    const match = this._regexpDatetime.exec(datetime);
    if (match) {
      if (match[3] !== undefined) {
        if (match[1] === undefined) {
          match[0] = '1970-01-01T' + match[2] + match[3];
        }
        return new Date(match[0]);
      } else {
        const d = new Date((match[1] || '1970-01-01') + 'T' + (match[2] || '00:00:00.000') + 'Z');
        if (this._timezoneOffset !== undefined) {
          d.setMinutes(d.getMinutes() + this._timezoneOffset);
        } else {
          d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
        }
        return d;
      }
    }
  }

  private _minChanged(min) {
    const d = this._fromDatetime(min);
    if (isNaN(d)) {
      return;
    }
    const max = this.max && this._fromDatetime(this.max);
    if (d > max) {
      // TODO: check
      this.min = this.max;
      this.max = min;
      // this.setProperties({
      //   min: this.max,
      //   max: min
      // });
      return;
    }
    this._min = d;
    if (!isNaN(this.valueAsNumber)) {
      this.valueAsNumber = +this._checkThreshold(new Date(this.valueAsNumber));
    }
  }

  private _maxChanged(max) {
    const d = this._fromDatetime(max);
    if (isNaN(d)) {
      return;
    }
    const min = this.min && this._fromDatetime(this.min);
    if (min > d) {
      // TODO: check
      this.min = max;
      this.max = this.min;
      // this.setProperties({
      //   min: max,
      //   max: this.min
      // });
      return;
    }
    this._max = d;
    if (!isNaN(this.valueAsNumber)) {
      this.valueAsNumber = +this._checkThreshold(new Date(this.valueAsNumber));
    }
  }

  private _checkThreshold(d) {
    if (this._min > d) {
      return new Date(this._min);
    }
    if (this._max < d) {
      return new Date(this._max);
    }
    return d;
  }

  private _toDate(d) {
    if (typeof d === 'number') {
      d = new Date(d);
    }
    const year = d.getFullYear();
    return this._pad(year, year < 0 ? 6 : 4) + '-' + this._pad(d.getMonth() + 1, 2) + '-' + this._pad(d.getDate(), 2);
  }

  private _toUTCDate(d) {
    if (typeof d === 'number') {
      d = new Date(d);
    }
    const year = d.getUTCFullYear();
    return this._pad(year, year < 0 ? 6 : 4) + '-' + this._pad(d.getUTCMonth() + 1, 2) + '-' + this._pad(d.getUTCDate(), 2);
  }

  private __toDate(year, month, day) {
    return this._pad(year, year < 0 ? 6 : 4) + '-' + this._pad(month, 2) + '-' + this._pad(day, 2);
  }

  private _toTime(d) {
    if (typeof d === 'number') {
      d = new Date(d);
    }
    return this._pad(d.getHours(), 2) + ':' + this._pad(d.getMinutes(), 2) + ':' + this._pad(d.getSeconds(), 2)
      + '.' + this._pad(d.getMilliseconds(), 3);
  }

  private _toUTCTime(d) {
    if (typeof d === 'number') {
      d = new Date(d);
    }
    return this._pad(d.getUTCHours(), 2) + ':' + this._pad(d.getUTCMinutes(), 2) + ':'
      + this._pad(d.getUTCSeconds(), 2) + '.' + this._pad(d.getUTCMilliseconds(), 3);
  }

  private __toTime(hour, minute, second, millisecond) {
    return this._pad(hour || 0, 2) + ':' + this._pad(minute || 0, 2)
      + (second !== undefined ? (':' + this._pad(second, 2) + (millisecond !== undefined ? ('.' + this._pad(millisecond, 3)) : '')) : '');
  }

  private _clamp(d, clamp) {
    switch (clamp) {
      case 'year':
      case 'month':
        d.setUTCMonth(0); // falls through
      case 'day':
        d.setUTCDate(1); // falls through
      case 'hour':
        d.setUTCHours(0); // falls through
      case 'minute':
        d.setUTCMinutes(0); // falls through
      case 'second':
        d.setUTCSeconds(0); // falls through
      case 'millisecond':
        d.setUTCMilliseconds(0);
    }
    return d;
  }

  private _pad(n, padLength) {
    const sign = n < 0 ? '-' : '';
    let str = '' + Math.abs(n);
    while (str.length < padLength) {
      str = '0' + str;
    }
    return sign + str;
  }

  private _hour12Changed(hour12, old) {
    if (hour12 === undefined || hour12 === old) { return; }

    this.hour = (hour12 === 12) ? (this.isAm ? 0 : 12) : (this.isAm ? hour12 : hour12 + 12);
  }

  private _isAmChanged(isAm, old) {
    if (isAm === undefined || isAm === old) { return; }

    this._hour12Changed(this.hour12, null);
  }

  private _ifClamped(clamp, comp, hidden) {
    const features = ['month', 'day', 'hour', 'minute', 'second', 'millisecond'];
    const pos = features.indexOf(clamp);
    const index = features.indexOf(comp);
    return hidden || (pos !== -1 && index !== -1 && pos <= index);
  }

  private _checkDefaultTimezone(d) {
    if (this._timezoneOffset === undefined) {
      this.__updatingTimezoneOffset = true;
      if (this.timezone) {
        const propertiesToChange = this._computeTimezoneOffset(this.timezone);
        const fields = Object.keys(propertiesToChange);
        fields.map((field) => {
          this[field] = propertiesToChange[field];
        });
        // this.setProperties(this._computeTimezoneOffset(this.timezone));
      } else {
        const propertiesToChange = this._computeTimezone((d || new Date()).getTimezoneOffset());
        const fields = Object.keys(propertiesToChange);
        fields.map((field) => {
          this[field] = propertiesToChange[field];
        });
        // this.setProperties(this._computeTimezone((d || new Date()).getTimezoneOffset()));
      }
      this.__updatingTimezoneOffset = false;
    }
    if (this._recentLocalTimezoneOffset === undefined) {
      this._recentLocalTimezoneOffset = (d || new Date()).getTimezoneOffset();
    }
  }

  private _correctTimezoneShift(d) {
    this._checkDefaultTimezone(d);
    const localTimezoneOffset = d.getTimezoneOffset();
    if (this._recentLocalTimezoneOffset !== localTimezoneOffset) {
      this.__updatingTimezoneOffset = true;
      // fixing offset when an inner shift occures (e.g. summer- or wintertime)
      this._timezoneOffset = this._timezoneOffset - this._recentLocalTimezoneOffset + localTimezoneOffset;
      this.__updatingTimezoneOffset = false;
    }
    this._recentLocalTimezoneOffset = localTimezoneOffset;
  }

  private _timezoneChanged(timezone, oldValue) {

    if (timezone === undefined) {
      if (this.valueAsDate !== undefined) {
        this._resetDate(null);
      }
      return;
    } else if (!(this._regexpTimezone.exec(timezone))) {
      if (this._regexpTimezone.exec(oldValue)) {
        const propertiesToChange = this._computeTimezoneOffset(oldValue);
        const fields = Object.keys(propertiesToChange);
        fields.map((field) => {
          this[field] = propertiesToChange[field];
        });
        // this.setProperties(this._computeTimezoneOffset(oldValue));
        return;
      }
      const propertiesToChange1 = this
        ._computeTimezone((this.valueAsDate === undefined ? new Date() : new Date(this.valueAsDate)).getTimezoneOffset());
      const fields1 = Object.keys(propertiesToChange1);
      fields1.map((field) => {
        this[field] = propertiesToChange1[field];
      });
      // this.setProperties(this.
        // _computeTimezone((this.valueAsDate === undefined ? new Date() : new Date(this.valueAsDate)).getTimezoneOffset()));
      return;
    }

    const toSet = this._computeTimezoneOffset(timezone);
    if (toSet._timezoneOffset !== this._timezoneOffset) {
      this.__updatingTimezoneOffset = true;
      const fields2 = Object.keys(toSet);
      fields2.map((field) => {
        this[field] = toSet[field];
      });
      // this.setProperties(toSet);
      this.__updatingTimezoneOffset = false;
    }
  }

  private _timezoneOffsetChanged(offsetMinutes) {
    if (offsetMinutes === undefined) {
      return;
    }

    const propertiesToChange = this._computeTimezone(offsetMinutes);
    const fields = Object.keys(propertiesToChange);
    fields.map((field) => {
      this[field] = propertiesToChange[field];
    });
    // this.setProperties(this._computeTimezone(offsetMinutes));
    if (this.date && this.time) {
      this._dateTimeChanged(this.date, this.time);
    }
  }

  private _timeZoneHoursMinutesChanged(hour, minute) {
    if (hour === undefined || minute === undefined) {
      return;
    }
    const offsetMinutes = -(hour < 0 ? -1 : 1) * (Math.abs(hour) * 60 + minute),
      timezone = (hour >= 0 ? '+' : '') + this._pad(hour, 2) + ':' + this._pad(minute, 2);
    if (offsetMinutes !== this._timezoneOffset) {
      this._timezoneOffset = offsetMinutes;
      this.timezone = timezone;
      // this.setProperties({
      //   _timezoneOffset: offsetMinutes,
      //   timezone: timezone
      // });
    } else if (this.timezone !== timezone) {
      this.timezone = timezone;
    }
  }

  private _computeTimezone(offsetMinutes) { // offset in minute
    if (offsetMinutes === undefined) {
      return {};
    } else if (offsetMinutes === 0) {
      return {
        _timezoneOffset: 0,
        _timeZoneHours: 0,
        _timeZoneMinutes: 0,
        timezone: '+00:00'
      };
    }
    const hour = -(offsetMinutes < 0 ? -1 : 1) * Math.floor(Math.abs(offsetMinutes) / 60),
      minute = Math.abs(offsetMinutes) % 60;
    return {
      _timezoneOffset: offsetMinutes,
      _timeZoneHours: hour,
      _timeZoneMinutes: minute,
      timezone: (hour >= 0 ? '+' : '') + this._pad(hour, 2) + ':' + this._pad(minute, 2)
    }
  }

  private _computeTimezoneOffset(timezone) {
    if (timezone === 'Z') {
      return {
        _timezoneOffset: 0,
        _timeZoneHours: 0,
        _timeZoneMinutes: 0,
        timezone: '+00:00'
      };
    }
    const match = this._regexpTimezone.exec(timezone);
    if (match) {
      const hour = +match[1],
        minute = +match[2];
      return {
        _timezoneOffset: (hour > 0 ? -1 : 1) * (Math.abs(hour) * 60 + minute),
        _timeZoneHours: hour,
        _timeZoneMinutes: minute,
        timezone: timezone
      };
    }
  }

  private _computeMaxDayOfMonth(year, month) {
    const d = new Date(year, month, 0);
    d.setFullYear(year);

    if (!isNaN(+d)) {
      return d.getDate();
    }
    return 31;
  }

  render() {
    return (
      <div>
        TEST
      </div>
    );
  }
}
