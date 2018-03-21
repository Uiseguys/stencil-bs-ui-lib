/*
import { Component, Prop, Method } from '@stencil/core';
import $ from 'jquery';
import 'fullcalendar-scheduler';
import moment from 'moment';


@Component({
    tag: 'cwc-schedule',
    // styleUrl: 'cwc-schedule.scss'
})
export class StencilComponent {

    @Prop() resources: any[] = [];
    @Prop() events: any[] = [];

    @Prop() editable: boolean = true;
    @Prop() now: string = moment().format('YYYY-MM-DD');
    @Prop() aspectRatio: number = 4;

    @Prop() defaultViews: string = 'timelineDay';
    @Prop() scrollTime: string = '00:00';

    @Prop() height: string = '';

    @Prop() header: any = {
        left: 'today prev,next',
        center: 'title',
        right: 'timelineDay,timelineThreeDays,agendaWeek,month,listWeek'
    };

    @Prop() views: any = {
        timelineThreeDays: {
            type: 'timeline',
            duration: { days: 3 }
        }
    };
    @Prop() resourceLabelText: string = 'Rooms';

    renderTarget: any

    @Method()
    getFullCalendarRef() {
        return this.renderTarget
    }

    @Method()
    rerender() {
        this.renderTarget.fullCalendar('render')
    }

    componentDidLoad() {
        this.renderTarget = $('#scheduler')

        this.renderTarget.fullCalendar({
            height: this.height,
            now: this.now,
            editable: this.editable, // enable draggable events
            aspectRatio: this.aspectRatio,
            scrollTime: this.scrollTime, // undo default 6am scrollTime
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            header: this.header,

            defaultView: this.defaultViews,
            views: this.views,
            resourceLabelText: this.resourceLabelText,

            resources: this.resources,
            events: this.events

        });


    }


    render() {

        return (
            <div id="scheduler"></div>
        );
    }
}
*/
