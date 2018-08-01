import { Component, Prop } from '@stencil/core';


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

    @Prop() icon: any
    @Prop() text: string
    @Prop() subText: string
    @Prop() titleText: string
    @Prop() link: string

    @Prop() compact: boolean = false
    @Prop() showIcon: boolean = false
    @Prop() dropIcon: boolean = false
    
    render() {
        
        return (
            <div class="navigation-item-wrapper ">

              <div class="flex-row">
                    {
                        this.showIcon ? 
                        <div class="icon-wrapper"></div> : null
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
                        <img class="icon-drop" src={this.icon} alt={this.titleText}/> : null
                        // </div> : null
                    }
                </div>
                                  

            </div>
        );
    }
}