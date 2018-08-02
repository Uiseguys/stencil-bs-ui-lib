import {
    Component,
    Element,
    State,
    Prop,
    Listen,
    Method,
    Event,
    EventEmitter,
    Watch
} from '@stencil/core';
import filter from 'lodash/filter';
import get from 'lodash/get';

@Component({
    tag: 'cwc-autocomplete-select',
    styles: `
    example {
      width: 100%;
    }
  `,
    styleUrl: 'cwc-autocomplete-select.scss',
})
export class CwcAutocompleteSelect {
    /* used for form-generator component */
    @Prop() id: string;
    @Prop() label: string;
    /* /used for form-generator component */

    @Prop() minSearchLength = 1;
    @Prop() data: any[] = [];
    @Prop() idValue: string = 'multiselect-' + Date.now();
    @Prop() searchKey: string;
    @Prop() placeholder = 'Search something e.g. "Alabama"';

    @State() openState: boolean = false;
    @State() filterValue: string = '';
    @State() optionsShown = false;
    @State() focusIndex = 0;
    @State() justAddedLabel = false;
    @State() autoOpen = false;

    @State() labels: any[] = [];
    @State() results: any[] = [];

    private filtered: any[] = [];

    @Element() el: HTMLElement;

    @Event() multiselectOnSubmit: EventEmitter;
    @Event() postValue: EventEmitter;

    @Listen('destroy')
    destroyHandler(event) {
        console.log('Received the custom event: ', event);
    }
    @Watch('autoOpen')
    onAutoOpen(newVal){
        console.log("auto open", newVal);
    }

    addLabel(label) {
        this.labels = [...this.labels, label];
        this.justAddedLabel = true;
        this.renderLabels();
    }

    addResult(result: any) {
        if (typeof result === 'string') {
            this.results = [...this.results, result];
        } else {
            this.results = [...this.results, result.data];
        }
    }

    removeResult(index) {
        this.results = this.results.filter((_, i) => i !== index);
        this.multiselectOnSubmit.emit(this.results);

        /* used for form-generator component */
        this.postValue.emit({
          id: this.id,
          value: this.results.length ? this.results : null,
          type: 'autocomplete'
        });
        /* /used for form-generator component */
    }

    clearLabels() {
        this.labels = [];
        this.renderLabels();
    }

    removeLabel(label) {
        const index = this.labels.indexOf(label);
        this.removeResult(index);
        this.labels = this.labels.filter((_, i) => i !== index);
        this.renderLabels();
    }

    multiselectOnSubmitHandler(result) {
        this.addLabel(result);
        this.filterValue = '';
        this.clearTextNodes();

        typeof this.filtered[this.focusIndex - 1] === 'string'
            ? this.addResult(this.filtered[this.focusIndex - 1])
            : this.addResult(this.filtered[this.focusIndex - 1].data);

        this.multiselectOnSubmit.emit(this.results);

        /* used for form-generator component */
        this.postValue.emit({
          id: this.id,
          value: this.results,
          type: 'autocomplete'
        });
        /* /used for form-generator component */
    }

    /**
     * Life cycle hooks
     */
    componentWillUpdate() {
        if (this.filterValue) {
            if (this.filterValue.length >= this.minSearchLength) {
                this.filtered = this.filter();

                if (this.filtered.length > 0) {
                    this.optionsShown = true;
                }
            }
        }
    }

    componentDidUpdate() {
        if (this.justAddedLabel) {
            this.setCaretPositionEnd();
            this.justAddedLabel = false;
        }
    }

    private removeAlllabels() {
        const labels = document.querySelectorAll(
            `#${this.idValue} div.form-control scb-badge`
        );
        let i = labels.length - 1;
        while (i >= 0) {
            labels[i].remove();
            i--;
        }
    }

    private renderLabels() {
        this.removeAlllabels();
        const input: HTMLInputElement = document.querySelector(
            `#${this.idValue} div.form-control`
        );
        this.labels.forEach(label => {
            const labelEl = document.createElement('scb-badge');
            labelEl.contentEditable = 'false';
            const spanEl = document.createElement('span');
            spanEl.contentEditable = 'false';
            spanEl.className = 'badge badge-secondary';
            spanEl.innerText = this.getStringValue(label);
            const spanHidden = document.createElement('span');
            spanHidden.contentEditable = 'false';
            spanHidden['aria-hidden'] = 'true';
            spanHidden.onclick = () => this.removeLabel(label);
            spanHidden.innerHTML = '&times;';
            spanEl.appendChild(spanHidden);
            labelEl.appendChild(spanEl);
            input.insertBefore(labelEl, input.childNodes[0]);
        });
    }

    /**
     * Private functions
     */
    private filter() {
        if (typeof this.data[0] === 'string') {
            return this.filterStringArray(this.data);
        }

        if (typeof this.data[0] === 'object') {
            return this.findInComplex(this.data, this.searchKey);
        }
    }

    private filterStringArray(data) {
        return filter(data, value => {
            const v = typeof value === 'string' ? value : value.index;
            this.filterValue = this.filterValue || '';
            return v.toLowerCase().indexOf(this.filterValue.toLowerCase()) >= 0;
        });
    }

    private findInComplex(data, address) {
        const temporary = data.map(value => ({
            index: get(value, address),
            data: value
        }));
        return this.filterStringArray(temporary);
    }

    getStringValue(val: string | any): string {
        if (typeof val === 'string') {
            return val;
        } else {
            return get(val.data, this.searchKey);
        }
    }

    /**
     * Handlers
     */
    handleInputChange(e) {
        let elText = (typeof e.target.textContent !== 'undefined' && typeof e.target.textContent.length !== 'undefined') ? e.target.textContent[e.target.textContent.length-1] : '';
        this.filterValue =  e.target.textContent || elText;
        this.openState = true;
        if (
            ['deleteContentBackward', 'deleteContentForward'].indexOf(e.inputType) !==
            -1
        ) {
            const caretEl = document.querySelector(
                `#${this.idValue} div.form-control span.caret`
            );
            if (!caretEl) {
                this.createCaretEl();
            }
            this.renderLabels();
        }
    }

    handleSelect(value, index) {
        const input: HTMLInputElement = document.querySelector(
            `#${this.idValue} div.form-control`
        );
        input.value = value;

        const result = this.getStringValue(this.filtered[index]);
        this.multiselectOnSubmitHandler(result);

        this.close();
    }

    handleHover(i: number) {
        this.focusIndex = i;
    }

    /**
     * Public methods
     */
    @Method()
    close() {
        this.focusIndex = 0;
        this.filterValue = '';
        this.filtered = [];
        this.openState = false;
    }

    render() {
        return [
            <div id={this.idValue} class="form-group cwc-autocomplete">
                <label class="control-label">{this.label}</label>
                <div
                    id={this.id}
                    class="form-control"
                    contentEditable={true}
                    onInput={(e) => this.handleInputChange(e)}
                >
                    <span class="caret" />
                </div>
                <div class="popper-container">
                    {this.filtered.length > 0 && (
                        <cwc-popper
                            autoOpen={this.autoOpen}
                            id={`cwc-popper-autocomplete-${this.idValue}`}
                            refid={this.idValue} trigger="keyup" placement="bottom" arrow={false} autoClose={true}>
                            <div class="popper">
                                <div class="dropdown-menu cwc-popper-autocomplete">
                                    {this.filtered.map((val, i) => (
                                        <div class={'dropdown-item'.concat(this.focusIndex === i + 1 ? ' active' : '')}
                                                onClick={(e: any) => this.handleSelect(e.target.value, i)}
                                                onMouseEnter={() => this.handleHover(i + 1)}
                                                data-value={typeof val === 'string' ? val : val.index}>
                                            {typeof val === 'string' ? val : val.index}

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </cwc-popper>
                    )}
                </div>
            </div>
        ];
    }

    /**
     * Keyboard handlers
     *
     **/


    @Listen('keyup')
    @Listen('click')
    @Listen('keydown')
    handleKeyUpDown(e) {


        if(this.data.length <= 3)
            this.autoOpen = true;
        let popperContainer = document.querySelector(`#${this.idValue} .popper-container`);
        if(e && typeof e.type !== 'undefined' && e.type === 'click'){
            // Popper will be appear if result length will be <= 25'
            this.filtered = this.filter();
            /*if(this.data.length == 5)
                this.openState=true;*/
            //End
            if(popperContainer instanceof HTMLElement){
                popperContainer.style.position = 'relative';
            }
        }else{
            if(popperContainer instanceof HTMLElement){
                popperContainer.style.position = 'unset';
            }
        }

        setTimeout(() => {
            let formSelector = `#${this.idValue} div.form-control`;
            let HTMLInputEle = document.querySelector(formSelector);
            if(HTMLInputEle != null){
                let positionInfo = HTMLInputEle.getBoundingClientRect();
                setTimeout(() => {
                    let targetElem = document.querySelector(formSelector + ' + div > cwc-popper > .popper > .cwc-popper-autocomplete');
                    if(targetElem instanceof HTMLElement){
                        targetElem.style.width = positionInfo.width + 'px';
                    }
                });
            }
        },300);

    }

    @Listen('keydown.down')
    handleDownArrow() {
        if (this.focusIndex < this.filtered.length) {
            this.focusIndex = this.focusIndex + 1;
        }
    }

    @Listen('keydown.up')
    handleUpArrow(ev) {
        if (this.focusIndex > 0) {
            this.focusIndex = this.focusIndex - 1;
            ev.preventDefault();
        }
    }

    @Listen('keydown.escape')
    handleEscape() {
        if (this.focusIndex > 0) {
            this.focusIndex = 0;
        }
        this.close();
    }

    @Listen('keydown.enter')
    handleEnter(ev) {
        if (this.focusIndex > 0) {
            //const options = document.querySelector(`#${this.idValue}`).nextElementSibling.querySelectorAll('div.dropdown-item');
            const options = document.querySelector(`#${this.idValue} .popper > div.cwc-popper-autocomplete`).querySelectorAll('div.dropdown-item');
            this.handleSelect(
                options[this.focusIndex - 1].textContent,
                this.focusIndex - 1
            );
            ev.preventDefault();
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
        selection.addRange(range);
    }

    clearTextNodes() {
        const input: HTMLInputElement = document.querySelector(
            `#${this.idValue} div.form-control`
        );
        for (let i = 0; i < input.childNodes.length; i++) {
            if (input.childNodes[i].nodeName === '#text') {
                input.removeChild(input.childNodes[i]);
            }
        }
        const caretEl = document.querySelector(
            `#${this.idValue} div.form-control span.caret`
        );
        if (caretEl) {
           // caretEl.innerHTML = '&nbsp;';
        } else {
            this.createCaretEl();
        }
    }

    private createCaretEl() {
        const input: HTMLInputElement = document.querySelector(
            `#${this.idValue} div.form-control`
        );
        const caretEl = document.createElement('span');
        caretEl.className = 'caret';
       // caretEl.innerHTML = '&nbsp;';
        input.appendChild(caretEl);
    }

    @Listen('focusout')
    clearResultOnFocusout() {
        setTimeout(() => {
            //this.close();
            this.clearTextNodes();
            // this.openState = false;
            this.autoOpen = false;
             this.close();

        }, 150)
    }

}
