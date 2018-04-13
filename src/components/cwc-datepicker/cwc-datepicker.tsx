import { Component, Element, Prop, Event, EventEmitter } from '@stencil/core';
import DateRangePicker from 'tiny-date-picker/dist/date-range-picker';
import moment from 'moment'

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

    @Event() statechange: EventEmitter;

    @Element() el: HTMLElement;
    container: HTMLElement;

    componentDidLoad() {
        this.container = this.el.querySelector('.ex-inputs-picker');
        const txtStart: HTMLInputElement = this.el.querySelector('.ex-inputs-start');
        const txtEnd: HTMLInputElement = this.el.querySelector('.ex-inputs-end');
        const self = this;

        // Inject DateRangePicker into our container
        const dp = DateRangePicker.DateRangePicker(this.container)
            .on('statechange', function (_, rp) {
                // Update the inputs when the state changes
                const range = rp.state;
                txtStart.value = range.start ? moment(range.start).format('MM/DD/YYYY') : '';
                txtEnd.value = range.end ? moment(range.end).format('MM/DD/YYYY') : '';
                self.statechange.emit({
                    start: range.start, 
                    end: range.end
                });
            });
        
        if (this.startDate) {
            dp.setState({
                start: new Date(this.startDate)
            });
        }
        if (this.endDate) {
            dp.setState({
                end: new Date(this.endDate)
            });
        }

        // When the inputs gain focus, show the date range picker
        txtStart.addEventListener('focus', () => this.showPicker());
        txtEnd.addEventListener('focus', () => this.showPicker());

        txtStart.addEventListener('change', () => {
            const date = new Date(txtStart.value);
            dp.setState({
                start: !isNaN(date.getTime()) ? date : ''
            });
        });
        txtEnd.addEventListener('change', () => {
            const date = new Date(txtEnd.value);
            dp.setState({
                end: !isNaN(date.getTime()) ? date : ''
            });
        });        

        // If focus leaves the root element, it is not in the date
        // picker or the inputs, so we should hide the date picker
        // we do this in a setTimeout because redraws cause temporary
        // loss of focus.
        let previousTimeout;
        this.el.addEventListener('focusout', function hidePicker() {
            clearTimeout(previousTimeout);
            previousTimeout = setTimeout(function() {
                if (!self.el.contains(document.activeElement)) {
                    self.container.classList.remove('ex-inputs-picker-visible');
                }
            }, 10);
        });        

    }

    private showPicker() {
        this.container.classList.add('ex-inputs-picker-visible');
    }

    render() {
        return (
            <div class="ex-inputs">
                <input class="ex-inputs-start" placeholder="From date" /> - <input class="ex-inputs-end" placeholder="To date" />
                <div class="ex-inputs-picker"></div>
            </div>
        )
    }

}
