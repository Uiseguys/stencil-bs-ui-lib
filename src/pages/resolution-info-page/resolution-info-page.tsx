import { Component } from '@stencil/core';

@Component({
    tag: 'resolution-info-page',
    styleUrl: 'resolution-info-page.scss'
})
export class ResolutionInfoPage {

    render() {
        return [
            <cwc-resolution-info width={5000} height={4000} />,
            <cwc-resolution-info width={2560} height={1440} />,
            <cwc-resolution-info width={2048} height={1080} />,

            <cwc-resolution-info width={2048} height={1023} />,

            <cwc-resolution-info width={204} height={204} />
        ]
    }
}