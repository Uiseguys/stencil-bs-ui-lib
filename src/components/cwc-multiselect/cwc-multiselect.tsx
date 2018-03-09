import { Component, State, Prop, Listen, Method, Event, EventEmitter } from '@stencil/core';
import filter from 'lodash/filter'
import get from 'lodash/get';

@Component({
    tag: 'cwc-multiselect',
    styleUrl: 'cwc-multiselect.scss'
})
export class CwcMultiselect {

    @Prop() minSearchLength = 1;
    @Prop() data: any[] = [];
    @Prop() idValue: string = 'multiselect-' + Date.now();
    @Prop() searchKey: string;
    @Prop() placeholder = 'Search something e.g. "Alabama"';


    @State() filterValue = '';
    @State() optionsShown = false;
    @State() focusIndex = 0;
    @State() justAddedLabel = false;

    @State() labels: any[] = [];
    @State() results: any[] = [];

    private filtered: any[] = [];

    @Event() multiselectOnSubmit: EventEmitter;

    @Listen('destroy')
    destroyHandler(event) {
        console.log('Received the custom event: ', event);
    }

    addLabel(label) {
        this.labels = [...this.labels, label];
        this.justAddedLabel = true
    }

    addResult(result: any) {
        if (typeof result === 'string') {
            this.results = [...this.results, result]
        } else {
            this.results = [...this.results, result.data]
        }
    }

    removeResult(index) {
        this.results = this.results.filter((r, i) => { console.log(r); return i !== index });
        this.multiselectOnSubmit.emit(this.results)
    }

    clearLabels() {
        this.labels = []
    }

    removeLabel(label) {
        const index = this.labels.indexOf(label);
        this.removeResult(index);
        this.labels = this.labels.filter((l, i) => { console.log(l); return i !== index })
    }

    multiselectOnSubmitHandler(result) {
        this.addLabel(result);
        this.filterValue = '';
        this.clearTextNodes();

        typeof this.filtered[this.focusIndex - 1] === 'string' ?
            this.addResult(this.filtered[this.focusIndex - 1]) :
            this.addResult(this.filtered[this.focusIndex - 1].data);

        this.multiselectOnSubmit.emit(this.results)
    }

    /**
     * Life cycle hooks
     */
    componentWillUpdate() {
        if (this.filterValue) {

            if (this.filterValue.length >= this.minSearchLength) {
                this.filtered = this.filter();

                if (this.filtered.length > 0) {
                    this.optionsShown = true
                }
            }
        }
    }

    componentDidUpdate() {
        if (this.justAddedLabel) {
            this.setCaretPositionEnd();
            this.justAddedLabel = false
        }
    }


    /**
     * Private functions
     */
    private filter() {
        if (typeof this.data[0] === 'string')
            return this.filterStringArray(this.data);

        if (typeof this.data[0] === 'object') {
            return this.findInComplex(this.data, this.searchKey)
        }

    }

    private filterStringArray(data) {
        return filter(data, value => {
            const v = typeof value === 'string'
                ? value
                : value.index;

            return v.toLowerCase().indexOf(
                    this.filterValue.toLowerCase()) >= 0
        })
    }

    private findInComplex(data, address) {

        const temporary = data.map(value =>
            ({
                index: get(value, address),
                data: value
            })
        );
        return this.filterStringArray(temporary)
    }

    getStringValue(val: string | any): string {
        if (typeof val === 'string') {
            return val
        } else {
            return get(val.data, this.searchKey)
        }
    }

    /**
     * Handlers
     */
    handleInputChange(e) {
        console.log(e);
        this.filterValue = e.data
    }

    handleSelect(value, index) {
        const input: HTMLInputElement = document.querySelector(`#${this.idValue} div.form-control`);
        input.value = value;

        const result = this.getStringValue(this.filtered[index]);
        this.multiselectOnSubmitHandler(result);

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
        this.focusIndex = 0;
        this.filterValue = '';
        this.filtered = []
    }

    render() {

        return (
            <div id={this.idValue}>

                {/* 
                 Render input field

                 */}
                <div onInput={(e) => this.handleInputChange(e)}
                     class="form-control" contentEditable={true}>

                    {/* 
                     Render labels
                     */}

                    {(() => {
                        return this.labels.map((label) =>
                            <scb-badge contenteditable="false">
                                <span contenteditable={false}
                                      class="badge badge-secondary"> {this.getStringValue(label)}
                                    <span aria-hidden="true" onClick={() => this.removeLabel(label)}>&times;</span>
                                </span>
                            </scb-badge>
                        )
                    })()
                    }
                    <span>&#160;</span>
                </div>

                {/* 
                 Render options list
                 */}

                {(() => {
                    if (this.filtered.length > 0) {
                        return (
                            <div class="card">
                                {
                                    this.filtered.map((val, i) =>
                                        <option
                                            class={"dropdown-item".concat((this.focusIndex == i + 1) ? ' active' : '')}
                                            onClick={(e: any) => this.handleSelect(e.target.value, i)}
                                            onMouseEnter={() => this.handleHover(i + 1)}
                                        >{typeof val === 'string' ? val : val.index}</option>)
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
    handleDownArrow() {
        if (this.focusIndex < this.filtered.length) {
            this.focusIndex = this.focusIndex + 1
        }
    }

    @Listen('keydown.up')
    handleUpArrow(ev) {
        if (this.focusIndex > 0) {
            this.focusIndex = this.focusIndex - 1;
            ev.preventDefault()
        }
    }

    @Listen('keydown.escape')
    handleEscape() {
        if (this.focusIndex > 0) {
            this.focusIndex = 0
        }
        this.close()
    }

    @Listen('keydown.enter')
    handleEnter(ev) {
        if (this.focusIndex > 0) {
            this.handleSelect(document.querySelectorAll(`#${this.idValue} option`)[this.focusIndex - 1].textContent, this.focusIndex - 1)
            ev.preventDefault()
        }
    }

    /*
     DOM API functions
     */

    setCaretPositionEnd() {
        const input = document.querySelector(`#${this.idValue} div.form-control`);
        const range = document && document.createRange && document.createRange();
        range.selectNodeContents(input);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range)
        // console.log('caret pos set end')
    }

    clearTextNodes() {
        const input: HTMLInputElement = document.querySelector(`#${this.idValue} div.form-control`);
        console.log('input children: ', input.childNodes);
        for (let i = 0; i < input.childNodes.length; i++) {

            if (input.childNodes[i].nodeName === '#text') {
                input.removeChild(input.childNodes[i])
            }
        }
    }

}