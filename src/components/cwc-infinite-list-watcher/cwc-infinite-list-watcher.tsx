import { Component, Prop, Event, EventEmitter, Method, State } from '@stencil/core';


@Component({
    tag: 'cwc-infinite-list-watcher',
    styleUrls: [
        'cwc-infinite-list-watcher.scss'
    ]
})
export class CwcInfiniteListWatcher {

    @Prop() listSelector: string = '';
    @Prop() lastItemSelector: string = '.list-item-last'

    @Prop() bindToList: boolean = false;
    @Prop() bottomOffset?: number = 50;
    @Prop() debounce: number = 300;
    
    @State() listElement: HTMLElement;

    debounceStatus: boolean = false

    @Event() onBottomReach: EventEmitter

    constructor() {
        console.log('Holla watcher!');
        
    }

    @Method()
    loadMore() {
        if (!this.debounceStatus) {
            this.startDebounce()

            this.onBottomReach.emit(this.listElement.id && this.listElement.id)
        } else {
            console.log('debounce is enabled');
            
        }
    }

    startDebounce(): void {
        this.debounceStatus = true;

        setTimeout(() => {

            // Triggers additional check if list was scrolled down during debounce
            this.debounceStatus = false
            this.bindToList ? 
                this.listScrollHandler() : 
                this.windowScrollHandler()
        }, this.debounce)
    }

    componentDidLoad() {
        this.listElement = document.querySelector(this.listSelector)

        if (this.listElement) {
            
            this.bindToList ?
                this.listElement.addEventListener('scroll', this.listScrollHandler.bind(this))
                : document.addEventListener('scroll', this.windowScrollHandler.bind(this))
        } else {
            console.error(`List watcher component can't bind to given selector ${this.listSelector}.`)
        }        
    }


    listScrollHandler() {
        if (this.listElement.scrollTop + this.listElement.clientHeight >= this.listElement.scrollHeight - this.bottomOffset) {

            this.loadMore()
        }
    }

    windowScrollHandler() {
        const last = document.querySelector(`#${this.listElement.id} ${this.lastItemSelector}`)

        if (last.getBoundingClientRect().bottom - this.bottomOffset <= window.innerHeight) {
            this.loadMore()
        }
    }

    render() {
        return (
            <div class="inifinite-list-watcher"></div>
        );
    }
}