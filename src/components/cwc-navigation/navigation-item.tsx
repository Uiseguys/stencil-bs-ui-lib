import { Component, Prop, Element } from '@stencil/core';


/**
 * Navigation item component
 *
 * @export
 * @class NavigationItem
 */
@Component({
    tag: 'navigation-item',
    styleUrl: 'navigation-item.scss'
})


export class NavigationItem {

    @Element() hostEl: HTMLElement;

    @Prop() icon: string
    @Prop() text: string
    @Prop() subText: string
    @Prop() titleText: string
    @Prop() link: string
    @Prop() isActive: boolean = false

    @Prop() compact: boolean = false
    @Prop() showIcon: boolean = false
    @Prop() dropIcon: string = undefined

    componentDidLoad() {
        this.isActive && this.hostEl.classList.add('is-active')
    }
    
    render() {
        
        return (
            <div class={`navigation-item-wrapper ${this.showIcon ? 'icon-shown' : ''}`}>

              <div class="flex-row">
                    {
                        this.showIcon ? 

                        this.icon ? 
                        <img class="icon icon-left" src={this.icon} alt={this.titleText}/> :
                        <div class="icon no-icon" />
                        : null
                    }
                    <div class="text-wrapper">
                        <div class="navigation-text">{this.text}</div>
                        {
                            this.subText ?
                            <div class="navigation-subtext">{this.subText}</div> : null
                        }
                    </div>

                    {
                        this.dropIcon ? 
                        // <div class="icon-wrapper">
                        <img class="icon" src={this.dropIcon} alt={this.titleText}/> : null
                        // </div> : null
                    }
                </div>
                                  

            </div>
        );
    }
}