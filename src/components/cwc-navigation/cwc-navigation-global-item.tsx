import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'cwc-navigation-global-item',
    styleUrl: 'cwc-navigation-global-item.scss'
})
export class CwcNavigationGlobalItem {

    @Prop() icon: any;
    @Prop() titleText: string;
    @Prop() link: string;
    
    render() {

        return this.link ? 
         (
            <div class="navigation-global-item-wrapper">
                <a href={this.link}>
                    <img class="item-img" src={this.icon} alt={this.titleText} title={this.titleText}/>
                </a>
            </div>
        ) : (
            <div class="navigation-global-item-wrapper">
                <img class="item-img" src={this.icon} alt={this.titleText} title={this.titleText}/>
            </div>
        )
    }
}