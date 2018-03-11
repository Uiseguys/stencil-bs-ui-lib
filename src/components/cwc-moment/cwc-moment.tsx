import { Component, Prop, State } from '@stencil/core';
import moment_ from 'moment';

@Component({
    tag: 'cwc-moment',
    styleUrl: '../../../node_modules/bootstrap/dist/css/bootstrap.css'
})
export class CwcMoment {
    @Prop() date: string = '2016-01-10 14:30';
    @Prop() format: string = 'LLLL';

    @State() momentNow: string;

    componentDidLoad() {
        const moment = moment_;
        this.momentNow = moment(this.date).format(this.format);
    }

    render() {
        return (
            <div>
                {this.momentNow}
            </div>
        )
    }
}
