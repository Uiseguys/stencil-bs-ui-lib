import { Component, Element, Prop, EventEmitter, Event, Method } from '@stencil/core';
import dragula from 'dragula';
import isEqual from 'lodash/isEqual'

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
    @Prop() dragulaOpts: any = {};
    @Prop() handleClass: string = undefined;


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
    @Event() dndmodelupdate: EventEmitter;

    drake: any
    rowElements
    previousState: any[]


    @Method()
    getDrake() {
        return this.drake
    }


    componentDidLoad() {

        this.rowElements = this.rows.map(rowSelector => this.el.querySelector(rowSelector))

        this.previousState = this.getDataModel()
        

        if (this.handleClass) {
            this.dragulaOpts.moves = (el, container, handle) => {
                // HACK: Ugly hack to prevent compiler TS6133 error "value is declared, but its value is never read"
                // Maybe we need to disable 'noUnusedParameters' compiler option.
                container = container, el = el 
                return handle.classList.contains(this.handleClass);
            }
        }

        this.drake = dragula(
            this.rowElements, 
            this.dragulaOpts
        )

        this.drake.on('drag', (el, source) => this.dnddrag.emit({ el, source }) )
        this.drake.on('dragend', el => this.dnddragend.emit({ el }) )
        this.drake.on('drop', (el, target, source, sibling) => {
            const currentDataModel: any[] = this.getDataModel()
            
            if (!isEqual(currentDataModel, this.previousState)) {
                this.dndmodelupdate.emit(currentDataModel)
            } 

            this.dnddrop.emit({ el, target, source, sibling }) 
        } )
        this.drake.on('cancel', (el, container, source) => this.dndcancel.emit({ el, container, source}) )
        this.drake.on('remove', (el, container, source) => this.dndremove.emit({ el, container, source}) )
        this.drake.on('shadow', (el, container, source) => this.dndshadow.emit({ el, container, source}) )
        this.drake.on('over', (el, container, source) => this.dndover.emit({ el, container, source}) )
        this.drake.on('out', (el, container, source) => this.dndout.emit({ el, container, source}) )
        this.drake.on('cloned', (clone, original, type) => this.dndcloned.emit({ clone, original, type}) )

    }

    @Method()
    getDataModel(): any[] {
        const models = [
        ...this.rowElements.map( rowEl => {
                const elementsList = rowEl.querySelectorAll('[data-dnd]')
                if (elementsList.length > 0) {

                    let valuesList = []

                    for (let i = 0; i < elementsList.length; i++) {
                        const element = elementsList[i];
                            valuesList = [...valuesList, element.getAttribute('data-dnd')]
                    }   
                    return valuesList
                }
        })
        ]
    return models
    }

    render() {
        return (
            <div></div>
        );
    }
};  
