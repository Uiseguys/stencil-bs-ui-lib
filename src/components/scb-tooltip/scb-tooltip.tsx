import { Component, Method, Element, HostElement, Prop, Event, EventEmitter, State } from '@stencil/core';
import Tooltip from 'tooltip.js';

@Component({
    tag: 'scb-tooltip',
    styleUrl: 'scb-tooltip.scss'
})
export class ScbTooltip {
    btn: Element;

    @Element() el: HostElement;

    @Prop() title: string = '';
    @Prop() placement: string = 'top';
    @Prop() delay: any = 0;
    @Prop() trigger: string = 'hover';
    @Prop() offset: string = '';

    @State() tooltip: Tooltip

    componentDidLoad() {
        const template = '<div class="tooltip show" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
        this.btn = this.el.children[0];

        this.tooltip = new Tooltip(this.btn, {
            title: this.title,
            placement: this.placement,
            delay: this.delay,
            trigger: this.trigger,
            offset: this.offset,
            template: template
        });
    }

    render() {
        return (
            <button id="" type="button" class="btn btn-secondary">
                <slot name="btn-content"></slot>
            </button>
        )
    }
}
