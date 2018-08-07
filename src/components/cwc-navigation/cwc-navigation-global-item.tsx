import { Component, Prop, Element } from '@stencil/core';

@Component({
    tag: 'cwc-navigation-global-item',
    styleUrl: 'cwc-navigation-global-item.scss'
})
export class CwcNavigationGlobalItem {

    @Element() hostEl: HTMLElement;

    @Prop() icon: any;
    @Prop() titleText: string;
    @Prop() link: string;
    @Prop() isActive: boolean = false;
    
    render() {
        return this.link ? 
         (
            <div class={`navigation-global-item-wrapper ${this.isActive ? 'is-active' : ''}`}>
                <a href={this.link}>
                    <img class="item-img" src={this.icon} alt={this.titleText} title={this.titleText}/>
                </a>
            </div>
        ) : (
            <div class={`navigation-global-item-wrapper ${this.isActive ? 'is-active' : ''}`}>
                <img class="item-img" src={this.icon} alt={this.titleText} title={this.titleText}/>
            </div>
        )
    }
}