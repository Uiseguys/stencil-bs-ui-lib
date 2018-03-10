import { Component, Element, HostElement, Prop } from '@stencil/core';

@Component({
    tag: 'scb-navbar',
    styleUrl: '../../../node_modules/bootstrap/dist/css/bootstrap.css'
})
export class ScbNavbar {
    @Element() el: HostElement;

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
                        data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <slot name="slot-navbar-brand-right"></slot>


                <div id="navbarSupportedContent" class="collapse navbar-collapse">
                    <slot name="slot-navbar-content"></slot>
                </div>
            </nav>
        )
    }
}
