import { Component, Method, Element, HostElement, Prop, Event, EventEmitter, State } from '@stencil/core';

@Component({
    tag: 'scb-navbar'
})
export class ScbNavbar {
    @Element() el: HostElement;

    @Prop() id: string;

    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <slot name="slot-navbar-brand"></slot>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target={'#' + this.id} aria-controls={this.id} aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <slot name="slot-navbar-content"></slot>
            </nav>
        )
    }
}
