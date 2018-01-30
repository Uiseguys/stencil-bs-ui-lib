import { Component, State, Prop, Listen, Method, Event, EventEmitter } from '@stencil/core';
import filter from 'lodash/filter'
import get from 'lodash/get';



@Component({
    tag: 'cwc-multiselect',
    styleUrl: 'cwc-multiselect.scss'
})
export class CwcMultiselect {

    @Prop() minSearchLength: number = 1;
    @Prop() data: any[] = []
    @Prop() idValue: string = 'multiselect-' + Date.now();
    @Prop() searchKey: string;
    @Prop() placeholder: string = 'Search something e.g. "Alabama"';


    @State() filterValue: string = '';
    @State() optionsShown: boolean = false;
    @State() focusIndex: number = 0

    private filtered: any[] = []

    @Event() multiselectOnSubmit: EventEmitter;

    multiselectOnSubmitHandler(result) {
        this.multiselectOnSubmit.emit(result)
    }

    /**
     * Life cycle hooks
     */
    componentWillUpdate() {
        if (this.filterValue) {


            if (this.filterValue.length >= this.minSearchLength) {
                this.filtered = this.filter()

                if (this.filtered.length > 0)
                    this.optionsShown = true
            }
        }
    }


    /**
     * Private functions
     */
    private filter() {
        if (typeof this.data[0] == 'string')
            return this.filterStringArray(this.data)

        if (typeof this.data[0] == 'object') {
            return this.findInComplex(this.data, this.searchKey)
        }

    }

    private filterStringArray(data) {
        return filter(data, value => {
            let v = typeof value == 'string'
                ? value
                : value.index

            return v.toLowerCase().indexOf(
                this.filterValue.toLowerCase()) >= 0
        })
    }

    private findInComplex(data, address) {
        let temporary = []
        temporary = data.map(value =>
            ({
                index: get(value, address),
                data: value
            })
        )
        return this.filterStringArray(temporary)

    }


    /**
     * Handlers
     */
    handleInputChange(e) {
        console.log(e)
        this.filterValue = e.data
    }

    handleSelect(value, index) {
        let input: HTMLInputElement = document.querySelector(`#${this.idValue} div.form-control`)

        let result = typeof this.filtered[index] == 'string' ?
            this.filtered[index] :
            this.filtered[index].data


        input.value = value
        console.log(result)

        this.multiselectOnSubmitHandler(result)
        this.close()
    }

    handleHover(i: number) {
        this.focusIndex = i
    }

    /**
     * Public methods
     */
    @Method()
    close() {
        this.focusIndex = 0
        this.filterValue = ''

        this.filtered = []
    }

    render() {

        let input: HTMLTextAreaElement

        return (
            <div id={this.idValue}>
                <div onInput={(e) => this.handleInputChange(e)}
                    //    style={['margin-top'] : '0'}

                    class="form-control" contentEditable={true} >

                    {
                        (() => {
                            return (

                                <span contenteditable={false} class="badge badge-secondary" > New
                                   <span aria-hidden="true">&times;</span>
                                </span>
                            )

                        })()
                    }

                </div>



                {(() => {
                    if (this.filtered.length > 0) {
                        return (
                            <div class="card">
                                {
                                    this.filtered.map((val, i) =>
                                        <option class={"dropdown-item".concat((this.focusIndex == i + 1) ? ' active' : '')}
                                            onClick={(e: any) => this.handleSelect(e.target.value, i)}
                                            onMouseEnter={() => this.handleHover(i + 1)}
                                        >{typeof val == 'string' ? val : val.index}</option>)
                                }
                            </div>

                        )

                    }
                })()}
            </div>
        )
    }


    /** 
     * Keyboard handlers
     * 
     **/

    @Listen('keydown.down')
    handleDownArrow(ev) {
        if (this.focusIndex < this.filtered.length)
            this.focusIndex = this.focusIndex + 1

    }

    @Listen('keydown.up')
    handleUpArrow(ev) {
        if (this.focusIndex > 0) {
            this.focusIndex = this.focusIndex - 1
            ev.preventDefault()
        }
    }

    @Listen('keydown.escape')
    handleEscape(ev) {
        if (this.focusIndex > 0) {
            this.focusIndex = 0
        }
        this.close()
    }

    @Listen('keydown.enter')
    handleEnter(ev) {
        if (this.focusIndex > 0) {
            this.handleSelect(document.querySelectorAll(`#${this.idValue} option`)[this.focusIndex - 1].textContent, this.focusIndex - 1)
        }
    }



}