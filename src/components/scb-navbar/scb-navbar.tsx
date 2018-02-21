import { Component, Element, HostElement, Prop } from '@stencil/core';

@Component({
    tag: 'scb-navbar'
})
export class ScbNavbar {
    @Element() el: HostElement;

    @Prop() id: string;
    @Prop() size: string = '';
    @Prop() navbarcolor: string = "light";
    @Prop() bgcolor: string = "light";
    @Prop() placement: string = '';

    render() {
        return (
            <nav class={
                'navbar ' +
                this.placement +
                (this.size ? ' navbar-expand-' + this.size : ' navbar-expand') +
                ' navbar-' + this.navbarcolor +
                ' bg-' + this.bgcolor}>
                <slot name="slot-navbar-brand-left"></slot>

                <button class="navbar-toggler" type="button"
                        data-toggle="collapse" data-target={'#' + this.id} aria-controls={this.id}
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <slot name="slot-navbar-brand-right"></slot>

                <slot name="slot-navbar-content"></slot>
            </nav>
        )
    }
}
