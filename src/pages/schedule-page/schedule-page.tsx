import { Component } from '@stencil/core';
import $ from 'jquery'


@Component({
    tag: 'schedule-page',
    // styleUrl: 'schedule-page.scss'
})
export class SchedulePage {

    resources = [
        { id: 'a', title: 'Auditorium A' },
        { id: 'b', title: 'Auditorium B', eventColor: 'green' },
        { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
        {
            id: 'd', title: 'Auditorium D', children: [
                { id: 'd1', title: 'Room D1' },
                { id: 'd2', title: 'Room D2' }
            ]
        },
        { id: 'e', title: 'Auditorium E' },
        { id: 'f', title: 'Auditorium F', eventColor: 'red' }
    ]
    events = [
        { id: '1', resourceId: 'b', start: '2018-02-07T02:00:00', end: '2018-02-07T07:00:00', title: 'event 1' },
        { id: '2', resourceId: 'c', start: '2018-02-07T05:00:00', end: '2018-02-07T22:00:00', title: 'event 2' },
        { id: '3', resourceId: 'd', start: '2018-02-06', end: '2018-02-08', title: 'event 3' },
        { id: '4', resourceId: 'e', start: '2018-02-07T03:00:00', end: '2018-02-07T08:00:00', title: 'event 4' },
        { id: '5', resourceId: 'f', start: '2018-02-07T00:30:00', end: '2018-02-07T02:30:00', title: 'event 5' }
    ]

    componentDidLoad() {
        /** 
         * Little workaround with initialisation of closed collapse.
         * We get reference of fullcalendar object and call rerender function
         */

        // $('#scheduleCollapse').on('shown.bs.collapse', ()=>{})
        const scheduleHeader: any = $('#scheduleHeaderId')
        scheduleHeader.on('click', () => {
            const sch: any = document.getElementById('scheduler-component')
            sch.rerender()
        })
    }


    render() {
        return (
            <div>
                <cwc-schedule id="scheduler-component" resources={this.resources} events={this.events} now={'2018-02-07'} height={'400'} />
            </div>
        );
    }
}