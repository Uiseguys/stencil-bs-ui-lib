import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'navigation-title',
    styleUrl: 'navigation-title.scss'
})
export class NavigationTitle {

    @Prop() text: string
    @Prop() icon: string
    @Prop() titleText: string

    @Prop() compact: boolean = false
    @Prop() showIcon: boolean = true
    
    render() {

        return (
            <div class="navigation-title-wrapper">
                {
                    this.showIcon ? 
                    <div class="icon-wrapper">
                        <img src={this.icon} alt={this.titleText}/>
                    </div> : null
                }

                <span class="navigation-text">{this.text}</span>
            </div>
        )
    } 
        
}
