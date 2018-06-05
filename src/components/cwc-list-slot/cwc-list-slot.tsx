import { Component, Prop, Element } from '@stencil/core';


@Component({
    tag: 'cwc-list-slot',
    styleUrl: 'cwc-list-slot.scss'
})
export class CwcListSlot {

    @Prop() data: any[]
    @Element() el: HTMLElement

    clickHandler(e) {
        console.log(this.el)
        console.log(e)
    }

    

    render() {
        return (
            <div >
            <p onClick={ (e) => this.clickHandler(e)}>click me!</p>
                {/* <slot></slot> */}
            </div>
        );
    }
}
