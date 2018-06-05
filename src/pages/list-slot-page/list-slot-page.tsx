import { Component } from '@stencil/core';


@Component({
    tag: 'list-slot-page',
    styleUrl: 'list-slot-page.scss'
})
export class ListSlotPage {

    data = [
        'cat',
        'dog',
        'anaconda'
    ]

    render() {
        return (
            <cwc-list-slot data={this.data}>
                <slot>
                    <p>Holla slot!</p>
                </slot>    
            </cwc-list-slot>
        );
    }
}