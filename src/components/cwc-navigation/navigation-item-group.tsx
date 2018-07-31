import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'navigation-item-group',
    styleUrl: 'navigation-item-group.scss'
})
export class NavigationItemGroup {
    

    @Prop() text: string;
    @Prop() titleText: string;
    @Prop() hasSeparator: boolean;


    render() {
        return (

            <div>

                {
                    this.hasSeparator ?
                    <div class="separator"></div> : null
                }

                <div class="group-header" title={this.titleText}>
                    {this.text}
                </div>

                <slot name="navigation-items" />

            </div>
        );
    }
}