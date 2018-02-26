import { Component, Prop, Watch, State, Event, EventEmitter, Element, Method } from '@stencil/core';
import { VirtualNode, ListDataItem } from './cwc-list-interfaces';
import get from 'lodash/get'
import template from 'lodash/template'


/**
 * An infinite list component which
 * 
 * @export
 * @class CwcList
 */
@Component({
    tag: 'cwc-list',
    styleUrl: 'cwc-list.scss'
})

export class CwcList {

    @Prop() items: object[];
    @Prop() itemAs: string = 'item';
    @Prop() template: string;

    @Prop() addClass?: string = '';
    @Prop() addClassFirst?: string = '';
    @Prop() addClassLast?: string = '';
    @Prop() addClassEven?: string = '';
    @Prop() addClassOdd?: string = '';
    @Prop() wrapperClass: string;
    @Prop() bottomOffset?: number = 100;

    @Prop() debounce: number = 300;
    debounceStatus: boolean = false

    @Prop() bindToList: boolean = false;

    @Element() el: HTMLElement;

    @Event() onBottomReach: EventEmitter

    regex = /\[\[+(.*?) ?\]\]+/g;

    /**
     * Method to dispatch HTMLCustomEvent 
     * {@link https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events}
     * If cwc-list has id, this id will be dispatched as event.detail
     * 
     * @memberof StencilComponent
     */
    @Method()
    loadMore() {
        if (!this.debounceStatus) {
            this.startDebounce()
            this.onBottomReach.emit(this.el.id && this.el.id)
        }
    }

    startDebounce(): void {
        this.debounceStatus = true;

        setTimeout(() =>
            this.debounceStatus = false
            , this.debounce)
    }

    componentWillLoad() {

        this.bindToList ?
            this.el.addEventListener('scroll', this.listScrollHandler.bind(this))
            : document.addEventListener('scroll', this.windowScrollHandler.bind(this))
    }

    listScrollHandler() {
        if (this.el.scrollTop + this.el.clientHeight >= this.el.scrollHeight - this.bottomOffset)
            this.loadMore()
    }

    windowScrollHandler() {
        let last = document.querySelector(`#${this.el.id} .list-item-last`)

        if (last.getBoundingClientRect().bottom - this.bottomOffset <= window.innerHeight)
            this.loadMore()
    }

    /**
     * Adds custom class for every first, last, even and odd node
     * 
     * @private
     * @param {string} [base=''] 
     * @param {number} index 
     * @param {number} count 
     * @returns {string} 
     * @memberof StencilComponent
     */
    private addListClasses(base: string = '', index: number, count: number): string {
        let classString = base + ' list-item'.concat(this.addClass && ' ' + this.addClass)
        if (index == 0) {
            classString += ' list-item-first'.concat(this.addClassFirst && ' ' + this.addClassFirst)
        } if (index == count - 1) {
            classString += ' list-item-last'.concat(this.addClassLast && ' ' + this.addClassLast)
        } if (index % 2 == 0) {
            classString += ' list-item-even'.concat(this.addClassEven && ' ' + this.addClassEven)
        } if (Math.abs(index % 2) == 1) {
            classString += ' list-item-odd'.concat(this.addClassOdd && ' ' + this.addClassOdd)
        }
        console.log('returning: ' + ' ' + classString + ' ')
        return classString + ' '
    }



    /**
     * Insert into string helper function
     * 
     * @param {any} str 
     * @param {any} index 
     * @param {any} value 
     * @returns {string} 
     * @memberof CwcList
     */
    insert(str, index, value): string {
        return str.substr(0, index) + value + str.substr(index);
    }


    /**
     * Inserts additional list-item-* classes into string node depends of item position.
     * 
     * @param {any} str 
     * @param {any} index 
     * @returns {string} 
     * @memberof CwcList
     */
    insertClassList(str, index): string {
        let indexCloseTag = str.indexOf('>'),
            indexClass = str.indexOf('class="')

        let isClassPresent = indexClass !== -1 && indexClass < indexCloseTag

        let finalClassList = isClassPresent ?
            this.insert(str, str.indexOf('"', indexClass + 7), this.addListClasses('', index, this.items.length)) :
            this.insert(str, indexCloseTag, this.addListClasses('', index, this.items.length))

        return finalClassList
    }

    render() {

        let tmpl = template(this.template)

        let str = ''
        this.items.map((item, index) => {

            let templateString = tmpl({ [this.itemAs]: item })
            templateString = this.insertClassList(templateString, index)

            str += templateString
        })


        return (

            <div id={this.el.id} class={"item-list-wrapper " + this.wrapperClass}


                innerHTML={str}>
            </div>
        );
    }
}
