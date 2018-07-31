import { Component } from '@stencil/core';


@Component({
    tag: 'cwc-navigation-global-section',
    styleUrl: 'cwc-navigation-global-section.scss'
})
export class CwcNavigationGlobalSection {
    
    render() {

        
        return (
            <div class="cwc-navigation-global-section-inner">


                <div class="primary-actions-wrapper" >                     

                    <slot name="primary-actions-lvl-2" />

                </div>

                
                <div class="secondary-actions-wrapper">
                    <slot name="secondary-actions-lvl-2"></slot>
                </div>

            </div>
        );
    }
}