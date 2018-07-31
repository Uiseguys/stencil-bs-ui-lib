import { Component } from '@stencil/core';


@Component({
    tag: 'cwc-navigation-container-section',
    styleUrl: 'cwc-navigation-container-section.scss'
})
export class CwcNavigationContainerSection {
    
    render() {
        return (
            <div class="cwc-navigation-container-section-inner">

                <slot name="container-actions-lvl-2"/>

            </div>
        );
    }
}