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
import template from 'lodash/template';
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
  retainedInitialValues: any[] = [];
  @Prop() id: string;
  @Prop() label: string;

  @Prop() minSearchLength = 1;
  @Prop() data: any[] = [];
  @Prop() value: any[] = [];
  @Prop() itemAs: string = 'item';
  @Prop() idValue: string = 'multiselect-' + Math.floor(1000 + Math.random() * 9000) + new Date().getUTCMilliseconds();
  @Prop() searchKey: string;
  @Prop() template: string;
  @Prop() placeholder = 'Search something';

  @State() filterValue: string = '';
  @State() optionsShown = false;
  @State() focusIndex = 0;
  @State() justAddedLabel = false;
  @State() autoOpen = false;

  @State() labels: any[] = [];
  @State() labelsAdded: boolean = false;
  @State() results: any[] = [];

  private filtered: any[] = [];

  @Element() el: HTMLElement;

  @Event() multiselectOnSubmit: EventEmitter;
  @Event() postValue: EventEmitter;
  @Event() textChange: EventEmitter;

  @Listen('destroy')
  destroyHandler(event) {
    console.log('Received the custom event: ', event);
  }
  @Watch('autoOpen')
  onAutoOpen(newVal){
      console.log("auto open", newVal);
  }

  @Watch('value')
  reloadValueProp() {
    if (this.retainedInitialValues.toString() !== this.value.toString()) {
      this.loadValueProp();
    }
  }

  addLabel(label) {
    this.labels = [...this.labels, label];
    this.justAddedLabel = true;
    this.renderLabels();
    this.autoOpen = false;
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

    this.postValue.emit({
      id: this.id,
      value: this.results.length ? this.results : null,
      type: 'autocomplete'
    });
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
    if (this.labels.includes(result)) return;
    this.addLabel(result);
    this.filterValue = '';
    this.clearTextNodes();

    /*typeof this.filtered[this.focusIndex - 1] === 'string'
      ? this.addResult(this.filtered[this.focusIndex - 1])
      : this.addResult(this.filtered[this.focusIndex - 1].data);*/
    this.addResult(this.filtered[this.focusIndex - 1]);

    this.multiselectOnSubmit.emit(this.results);

    this.postValue.emit({
      id: this.id,
      value: this.results,
      type: 'autocomplete'
    });
  }

  /** Life cycle hooks **/
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
      this.labelsAdded = true;
    } else {
      this.filtered = this.filter();
    }
  }

  componentDidLoad() {
    // TODO: this line of code is here because removing "import template from 'lodash/template';" will cause this error to happen when you build the project:
    // [ ERROR ]  Minify JS e.name.definition is not a function
    if (this.focusIndex > 999) console.log(template);
    /** */
    this.loadValueProp();
  }

  loadValueProp() {
    this.retainedInitialValues = this.value;
    if (this.value && this.value.length >= 1) {
      this.results = this.value;
      this.value.map((val, key) => {
        if (typeof val === 'string') {
          if (!this.labels.includes(val)) this.labels.push(val);
        } else {
          let tempLabel = get(val, this.searchKey);
          if (!this.labels.includes(tempLabel)) this.labels.push(tempLabel);
        }

        if (key === this.value.length - 1) {
          this.multiselectOnSubmit.emit(this.results);
          setTimeout(() => {
            this.renderLabels();
            this.checkForPlaceholder();

            this.clearTextNodes();
            this.autoOpen = false;
            this.close();
            this.textChange.emit('');
          }, 500);
        }
      });
    }
  }

  private interpolate(template, variables, fallback = '') {
    const regex = /\${[^{]+}/g;
    return template.replace(regex, (match) => {
      const path = match.slice(2, -1).trim();
      return this.getObjPath(path, variables, fallback);
    });
  }

  /** get the specified property or nested property of an object **/
  private getObjPath(path, obj, fallback = '') {
    return path.split('.').reduce((res, key) => res[key] || fallback, obj);
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
      spanHidden.className = 'badge-remove';
      spanEl.appendChild(spanHidden);
      labelEl.appendChild(spanEl);
      input.insertBefore(labelEl, input.childNodes[0]);
    });
  }

  /** Private functions **/
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

  /** Handlers **/
  handleInputChange(e) {
    //let elText = (typeof e.target.textContent !== 'undefined' && typeof e.target.textContent.length !== 'undefined') ? e.target.textContent[e.target.textContent.length-1] : '';
    //this.filterValue = (e && e.target && e.target.childNodes && e.target.childNodes && e.target.childNodes.length && e.target.childNodes[e.target.childNodes.length - 1]) ? e.target.childNodes[e.target.childNodes.length-1].textContent : '';
    if (e && e.target && e.target.childNodes && e.target.childNodes.length && e.target.childNodes[0] && e.target.childNodes[0].nodeName && e.target.childNodes[0].nodeName == '#text' && e.target.childNodes[0].textContent){
      this.filterValue = e.target.childNodes[0].textContent;
    } else {
      this.filterValue = (e && e.target && e.target.childNodes && e.target.childNodes.length && e.target.childNodes[e.target.childNodes.length-1] && e.target.childNodes[e.target.childNodes.length-1].textContent) ? e.target.childNodes[e.target.childNodes.length-1].textContent : '';
    }

    if (['deleteContentBackward', 'deleteContentForward'].indexOf(e.inputType) !== -1) {
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

    this.checkForPlaceholder();
    this.close();
  }

  handleHover(i: number) {
    this.focusIndex = i;
  }

  /** Start - Set Placeholder **/
  checkForPlaceholder(){
    let tagContainerEle = document.querySelector(`#${this.idValue} .form-control`);
    if(tagContainerEle){
      if (tagContainerEle.children && tagContainerEle.children.length > 1 && tagContainerEle.classList){
        tagContainerEle.classList.remove("isPlaceholder");
      } else {
        tagContainerEle.classList.add("isPlaceholder");
      }
    }
  }
  /** End - Set Placeholder **/

  /** Public methods **/
  @Method()
  close() {
    this.focusIndex = 0;
    this.filterValue = '';
    this.filtered = [];
  }

  populateDropdown() {
    let list, templateString, itemValue;

    list = this.filtered.map((val, i) => {
      if (this.template) {
        templateString = this.interpolate(this.template, { [this.itemAs]: val.data });
      } else {
        itemValue = (typeof val == 'string') ? val : val.index;
      }

      return (
        <div class={'dropdown-item'.concat(this.focusIndex === i + 1 ? ' active' : '')}
          onClick={(e: any) => this.handleSelect(e.target.value, i)}
          onMouseEnter={() => this.handleHover(i + 1)}
          data-value={(this.template) ? templateString : itemValue}
          innerHTML={(this.template) ? templateString : itemValue}>
        </div>
      );
    });

    return list;
  }

  render() {
    return [
      <div id={this.idValue} class="form-group cwc-autocomplete">
        <label class="control-label">{this.label}</label>
        <div
          id={this.id}
          class="form-control isPlaceholder"
          contentEditable={true}
          onInput={(e) => this.handleInputChange(e)}
          data-placeholder={this.placeholder}
        >
          <span class="caret" />
        </div>
        <div class="popper-container">
          {this.filtered.length > 0 && (
            <cwc-popper
              autoOpen={this.autoOpen}
              id={`cwc-popper-autocomplete-${this.idValue}`}
              refid={this.idValue}
              trigger="keyup"
              placement="bottom"
              arrow={false}
              autoClose={true}
            >
              <div class="popper">
                <div class="dropdown-menu cwc-popper-autocomplete">
                  {this.populateDropdown()}
                </div>
              </div>
            </cwc-popper>
          )}
        </div>
      </div>
    ];
  }

  /** Keyboard handlers **/
  @Listen('keyup')
  @Listen('click')
  @Listen('keydown')
  handleKeyUpDown(e) {
    // setTimeout(() => {
      //popper will be appear on click if data length will be '<=25'
      if (this.data.length <= 25 && !this.labelsAdded) {
        this.autoOpen = true;
      }
      //End
      let popperContainer = document.querySelector(`#${this.idValue} .popper-container`);
      if (e && typeof e.type !== 'undefined' && e.type === 'click') {
        this.filtered = this.filter();
        if (popperContainer instanceof HTMLElement) {
          popperContainer.style.position = 'relative';
        }
      } else {
        if (popperContainer instanceof HTMLElement) {
          popperContainer.style.position = 'unset';
        }
      }

      let formSelector = `#${this.idValue} div.form-control`;
      let HTMLInputEle = document.querySelector(formSelector);
      if (HTMLInputEle != null) {
        let positionInfo = HTMLInputEle.getBoundingClientRect();
        setTimeout(() => {
          let targetElem = document.querySelector(formSelector + ' + div > cwc-popper > .popper > .cwc-popper-autocomplete');
          if (targetElem instanceof HTMLElement) {
            targetElem.style.width = positionInfo.width + 'px';
          }
        });
      }
    // },200);

    this.labelsAdded = false;
    if (e && (e.type === 'keydown' || e.type === 'keyup')) {
      //this.textChange.emit((e && typeof e.target !== 'undefined' && typeof e.target.childNodes !== 'undefined' && typeof e.target.childNodes.length !== 'undefined') ? e.target.childNodes[e.target.childNodes.length-1].textContent : '');
      let searchText = '';
      if (e && e.target && e.target.childNodes && e.target.childNodes.length && e.target.childNodes[0] && e.target.childNodes[0].nodeName && e.target.childNodes[0].nodeName == '#text' && e.target.childNodes[0].textContent) {
        searchText = e.target.childNodes[0].textContent;
      } else {
        searchText = (e && e.target && e.target.childNodes && e.target.childNodes.length && e.target.childNodes[e.target.childNodes.length-1] && e.target.childNodes[e.target.childNodes.length-1].textContent) ? e.target.childNodes[e.target.childNodes.length-1].textContent : '';
      }
      this.textChange.emit(searchText);
    }
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

  /** DOM API functions **/
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
      //caretEl.innerHTML = '&nbsp;';
      caretEl.innerHTML = '';
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
    this.checkForPlaceholder();

    setTimeout(() => {
      //this.close();
      this.clearTextNodes();
      this.autoOpen = false;
      this.close();
      this.textChange.emit('');
    }, 150)
  }
}
