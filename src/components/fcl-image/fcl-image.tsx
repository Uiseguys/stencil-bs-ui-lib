import { Component, Prop, Element, HostElement } from '@stencil/core';

@Component({
    tag: 'fcl-image',
    styleUrl: './css/fcl-image-css.scss'
})
export class FclImage {

    @Prop() brokenUrl: any;
    @Prop() src: any;
    @Prop() height: any;
    @Prop() width: any;

    isError: any = false;

    @Element() el: HostElement;

    handleError() {
        if (!this.isError) {
            this.el.getElementsByTagName('img')[0].src = this.brokenUrl;
            this.isError = true;
        }
    }

    render() {
        return (
            <img src={this.src} onError={ () => this.handleError()}></img>
        );

    }

}
