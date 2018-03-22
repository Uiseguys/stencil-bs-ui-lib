import { Component, Prop, State } from '@stencil/core';
import moment_, { Duration, DurationInputArg2 } from 'moment';
import 'moment/locale/de';

@Component({
    tag: 'cwc-moment'
})
export class CwcMoment {
    @Prop() date: string;
    @Prop() duration: string;
    @Prop() unit: DurationInputArg2 = 'seconds';
    @Prop() separator: string = ':';
    @Prop() format: string;

    @State() momentNow: string;
    @State() durationFormatted: string;

    componentDidLoad() {
        const moment = moment_;

        moment.locale('de', {
            longDateFormat : {
                LT : 'HH:mm',
                LTS : 'HH:mm:ss',
                L : 'DD.MM.YYYY',
                LL : 'D MMMM YYYY',
                LLL : 'D MMMM YYYY HH:mm',
                LLLL : 'dddd D MMMM YYYY HH:mm'
            }
        });

        this.momentNow = null;

        if (this.duration) {
            const durationObj: Duration = moment.duration(Number(this.duration), this.unit);
            this.durationFormatted = durationObj.hours() + this.separator + durationObj.minutes() + this.separator + durationObj.seconds();
        } else {
            this.momentNow = moment(this.date).format(this.format);
        }
    }

    getFormattedString() {

        if (this.durationFormatted) {
            return this.durationFormatted;
        } else if (this.momentNow) {
            return this.momentNow;
        }
    }

    render() {
        return (
            <div>
                {this.getFormattedString()}
            </div>
        )
    }
}
