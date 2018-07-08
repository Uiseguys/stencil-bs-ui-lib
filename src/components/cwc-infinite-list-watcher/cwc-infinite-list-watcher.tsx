import { Component, Prop, Event, EventEmitter, Method, State } from '@stencil/core';


@Component({
    tag: 'cwc-infinite-list-watcher',
    styleUrl: 'cwc-infinite-list-watcher.scss'
})
export class CwcInfiniteListWatcher {

    @Prop() listSelector: string = '';
    @Prop() lastItemSelector: string = '.list-item-last'
    @Prop() containerSelector: string = '';

    @Prop() bindToList: boolean = false;
    @Prop() bottomOffset?: number = 100;
    @Prop() debounce: number = 300;
    @State() listElement: HTMLElement;

    debounceStatus: boolean = false

    @Event() onBottomReach: EventEmitter

    @Method()
    loadMore() {
        if (!this.debounceStatus) {
            this.startDebounce()

            this.onBottomReach.emit(this.listElement.id && this.listElement.id)
        }
    }

    startDebounce(): void {
        this.debounceStatus = true;

        setTimeout(() =>
            this.debounceStatus = false
            , this.debounce)
    }

    componentWillLoad() {
        console.log('Yo list selector is: ', this.listSelector);
        

        this.listElement = document.querySelector(this.listSelector)

        this.bindToList ?
            this.listElement.addEventListener('scroll', this.listScrollHandler.bind(this))
            : document.addEventListener('scroll', this.windowScrollHandler.bind(this))
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