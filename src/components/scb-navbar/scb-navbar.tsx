import { Component, Method, Element, HostElement, Prop, Event, EventEmitter, State } from '@stencil/core';

@Component({
    tag: 'scb-navbar'
})
export class ScbNavbar {
    @Element() el: HostElement;

    @Prop() id: string;
    @Prop() size: string = '';
    @Prop() navbarColor: string = "light"
    @Prop() bgColor: string = "light"
    @Prop() placement: string = '';

    render() {
        return (
            <nav class={
                    'navbar ' +
                    this.placement +
                    (this.size ? ' navbar-expand-'+this.size : ' navbar-expand') +
                    ' navbar-' + this.navbarColor +
                    ' bg-' + this.bgColor}>
                <slot name="slot-navbar-brand-left"></slot>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target={'#' + this.id} aria-controls={this.id} aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <slot name="slot-navbar-brand-right"></slot>

                <slot name="slot-navbar-content"></slot>
            </nav>
        )
    }
}
