import { Component } from '@stencil/core';
import $ from 'jquery';
import 'fullcalendar-scheduler';


@Component({
    tag: 'cwc-schedule',
    // styleUrl: 'cwc-schedule.scss'
})
export class StencilComponent {

    componentDidLoad() {

        const renderTarget: any = $('#scheduler')
        renderTarget.fullCalendar({
            now: '2018-02-07',
            editable: true, // enable draggable events
            aspectRatio: 1.8,
            scrollTime: '00:00', // undo default 6am scrollTime
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            header: {
                left: 'today prev,next',
                center: 'title',
                right: 'timelineDay,timelineThreeDays,agendaWeek,month,listWeek'
            },

            defaultView: 'timelineDay',
            views: {
                timelineThreeDays: {
                    type: 'timeline',
                    duration: { days: 3 }
                }
            },
            resourceLabelText: 'Rooms',
            resources: [
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
                { id: 'f', title: 'Auditorium F', eventColor: 'red' },
                { id: 'g', title: 'Auditorium G' },
                { id: 'h', title: 'Auditorium H' },
                { id: 'i', title: 'Auditorium I' },
                { id: 'j', title: 'Auditorium J' },
                { id: 'k', title: 'Auditorium K' },
                { id: 'l', title: 'Auditorium L' },
                { id: 'z', title: 'Auditorium Z' }
            ],
            events: [
                { id: '1', resourceId: 'b', start: '2018-02-07T02:00:00', end: '2018-02-07T07:00:00', title: 'event 1' },
                { id: '2', resourceId: 'c', start: '2018-02-07T05:00:00', end: '2018-02-07T22:00:00', title: 'event 2' },
                { id: '3', resourceId: 'd', start: '2018-02-06', end: '2018-02-08', title: 'event 3' },
                { id: '4', resourceId: 'e', start: '2018-02-07T03:00:00', end: '2018-02-07T08:00:00', title: 'event 4' },
                { id: '5', resourceId: 'f', start: '2018-02-07T00:30:00', end: '2018-02-07T02:30:00', title: 'event 5' }
            ]

        });

    }


    render() {



        return (
            <div id="scheduler"></div>
        );
    }
}