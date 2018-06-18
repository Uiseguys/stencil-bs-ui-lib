import { Component } from '@stencil/core';

@Component({
    tag: 'resolution-info-page',
    styleUrl: 'resolution-info-page.scss'
})
export class ResolutionInfoPage {

    render() {
        return [
            <br/>,
            <p>4096x2160:</p>, 
            <cwc-resolution-info width={4096} height={2160} />,
            <br/>,
            <p>2560x1440:</p>, 
            <cwc-resolution-info width={2560} height={1440} />,
            <br/>,
            <p>2048x1080:</p>, 
            <cwc-resolution-info width={2048} height={1080} />,
            
            <br/>,
            <p>204x204:</p>, 
            <cwc-resolution-info width={204} height={204} />,
            <br/>,
            <p>960x540:</p>, 
            <cwc-resolution-info width={960} height={540} />,
            <br/>,
            <p>4096x540:</p>, 
            <cwc-resolution-info width={4096} height={540} />,
            <p>1280x720:</p>, 
            <cwc-resolution-info width={1280} height={720} />,
        ]
    }
}