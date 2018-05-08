import { Component, Element, Prop, Event, EventEmitter } from '@stencil/core';
import DateRangePicker from 'tiny-date-picker/dist/date-range-picker';
import moment from 'moment';

@Component({
    tag: 'cwc-datepicker',
    styleUrls: ["../../../node_modules/tiny-date-picker/tiny-date-picker.css",
        "../../../node_modules/tiny-date-picker/date-range-picker.css",
        'cwc-datepicker.scss'
    ]
})
export class CwcDatepicker {

    @Prop() startDate: string;
    @Prop() endDate: string;

    @Prop() lang: string = 'en';
    @Prop() format: string = 'MM.DD.YYYY'

    @Event() statechange: EventEmitter;

    @Element() el: HTMLElement;
    container: HTMLElement;

    langConstants = {

        en: {
            days: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
            months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
            today: 'Today',
            clear: 'Clear',
            close: 'Close',
            startDate: 'Start date',
            endDate: 'End date'
        },
        de: {
            days: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
            months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
            today: 'Heute',
            clear: 'Klar',
            close: 'Schließen',
            startDate: 'Frühestens',
            endDate: 'Spätestens'
            
        }
    }

    rangeInputElement: HTMLInputElement 
    dp: any
    range 

    componentDidLoad() {
        this.container = this.el.querySelector('.ex-inputs-picker');
        this.rangeInputElement = this.el.querySelector('.ex-input-daterange');
        const self = this;

        this.dp = DateRangePicker.DateRangePicker(this.container, {
            startOpts: {
                lang: this.langConstants[this.lang] || this.langConstants['en']
            }
        })
            .on('statechange', function (_, rp) {
                // Update the inputs when the state changes
                self.range = rp.state;
            
                self.rangeInputElement.value = self.formInputValueString(self.range.start, self.range.end)

                self.statechange.emit({
                    start: self.range.start,
                    end: self.range.end
                });
            })


        if (this.startDate) {
            
            this.dp.setState({
                start: new Date(this.startDate)
            });
        }
        if (this.endDate) {
            this.dp.setState({
                end: new Date(this.endDate)
            });
        }

        // When the inputs gain focus, show the date range picker
        this.rangeInputElement.addEventListener('focus', () => this.showPicker());
        this.rangeInputElement.addEventListener('change', () => {

            const parsed = this.parseInputString(this.rangeInputElement.value)
            const dateStart = new Date(parsed[0]),
            dateEnd = new Date(parsed[1]);

            this.dp.setState({
                start: !isNaN(dateStart.getTime()) ? dateStart : '',
                end: !isNaN(dateEnd.getTime()) ? dateEnd : ''
            });
        });

        // If focus leaves the root element, it is not in the date
        // picker or the inputs, so we should hide the date picker
        // we do this in a setTimeout because redraws cause temporary
        // loss of focus.
        let previousTimeout;
        this.el.addEventListener('focusout', function hidePicker() {
            clearTimeout(previousTimeout);
            previousTimeout = setTimeout(function () {
                if (!self.el.contains(document.activeElement)) {
                    self.container.classList.remove('ex-inputs-picker-visible');
                }
            }, 10);
        });
    }

    private parseInputString(value: string): string[] {
        const values = value.split('-')
        return values.map(val => val.trim())
    }

    private formInputValueString(startDate, endDate): string {
        return `${startDate ? moment(startDate).format(this.format) : this.langConstants[this.lang].startDate} - ${
            endDate ? moment(endDate).format(this.format) : this.langConstants[this.lang].endDate}`;
    }

    private showPicker() {
        this.container.classList.add('ex-inputs-picker-visible');
    }

    render() {
        return (
            <div class="ex-inputs">
                <input class="ex-input-daterange" placeholder="To date" />
                <div class="ex-inputs-picker"></div>
            </div>
        )
    }

}
