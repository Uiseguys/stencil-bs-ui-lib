import {
    Component, Prop, Method, Event, EventEmitter, State
} from '@stencil/core';

import { IStcTabHeaderData } from './interfaces';

@Component({
    tag: 'stc-tab-header',
    styleUrl: 'tab-header.scss'
})
export class StcTabHeader {

    id: string = generateId();

    @Prop()
    name: string;

    @Event()
    onSelect: EventEmitter;

    @State()
    isSelected: boolean = false;

    @Method()
    getChild(): IStcTabHeaderData {
        return {
            select: this.select.bind(this),
            unselect: this.unselect.bind(this),
            name: this.name,
            id: this.id
        };
    }

    unselect() {
        this.isSelected = false;
    }

    select() {
        this.isSelected = true;
    }

    onClick() {
        this.onSelect.emit(this.getChild());
    }

    render() {

        const classes = {
            'nav-link': true,
            'active': this.isSelected 
        };

        return [
            <div class="nav-item">
                <div class={classes} onClick={this.onClick.bind(this)}>
                    <slot />
                </div>
            </div>,
        ];
    }
}

function generateId(): string {
    return Math.random().toString(36).substr(2, 10);
}
