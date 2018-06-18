import { Component, Element, Prop, EventEmitter, Event, Method } from '@stencil/core';
import dragula from 'dragula';
// import underscore from 'underscore'

@Component({
    tag: 'cwc-dnd',
    styleUrls: [
        'cwc-dnd.scss',
        '../../../node_modules/dragula/dist/dragula.css'
    ]
})
export class CwcDnd {
    
    @Element() el: HTMLElement;
    @Prop() rows: string[] = ['div.row-holder'];
    @Prop() draculaOpts: any;


    /**
     * Dragula events
     *
     * @type {EventEmitter}
     * @memberof CwcDnd
     */
    @Event() dnddrag: EventEmitter;
    @Event() dnddragend: EventEmitter;
    @Event() dnddrop: EventEmitter;
    @Event() dndcancel: EventEmitter;
    @Event() dndremove: EventEmitter;
    @Event() dndshadow: EventEmitter;
    @Event() dndover: EventEmitter;
    @Event() dndout: EventEmitter;
    @Event() dndcloned: EventEmitter;


    drake: any


    @Method()
    getDrake() {
        return this.drake
    }


    componentDidLoad() {

        const rowElements = this.rows.map(rowSelector => this.el.querySelector(rowSelector))

        this.drake = dragula(
            rowElements, 
            this.draculaOpts
        )

        this.drake.on('drag', (el, source) => this.dnddrag.emit({ el, source }) )
        this.drake.on('dragend', el => this.dnddragend.emit({ el }) )
        this.drake.on('drop', (el, target, source, sibling) => this.dnddrop.emit({ el, target, source, sibling }) )
        this.drake.on('cancel', (el, container, source) => this.dndcancel.emit({ el, container, source}) )
        this.drake.on('remove', (el, container, source) => this.dndremove.emit({ el, container, source}) )
        this.drake.on('shadow', (el, container, source) => this.dndshadow.emit({ el, container, source}) )
        this.drake.on('over', (el, container, source) => this.dndover.emit({ el, container, source}) )
        this.drake.on('out', (el, container, source) => this.dndout.emit({ el, container, source}) )
        this.drake.on('cloned', (clone, original, type) => this.dndcloned.emit({ clone, original, type}) )

    }

    render() {
        return (
            <div></div>
        );
    }
};  
