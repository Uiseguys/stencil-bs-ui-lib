import { Prop, Method, Watch, Element, HostElement } from '@stencil/core';
import FormElement from './form-element';

export class InputPattern extends FormElement {
  @Prop({ mutable: true }) type: string = 'text';
  @Prop({ mutable: true }) input: string;
  @Prop({ mutable: true }) placeholder: string;
  @Prop({ mutable: true }) default: string;
  @Prop({ mutable: true }) minlength: number;
  @Prop({ mutable: true }) noAutoWidth: boolean;
  @Prop({ mutable: true }) autoResize: boolean;
  @Prop({ mutable: true }) hidden: boolean;
  @Prop({ mutable: true }) propertyForValue: string = 'input';

  @Prop() _minWidthString: string;

  @Element() el: HostElement;

  @Method()
  connectedCallback() {
    super.connectedCallback();
    this.focus = this.focus.bind(this);
    this._updateValue = this._updateValue.bind(this);
    this._checkInput = this._checkInput.bind(this);
    this._checkKeycode = this._checkKeycode.bind(this);
    this._addEventListeners();
    setTimeout(this.resize.bind(this), 0);
  }

  @Method()
  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeEventListeners();
  }

  _addEventListeners() {
    this.el.addEventListener('focus', this.focus, false);
    this.el.querySelector('#input').addEventListener('focus', this._updateValue, false);
    this.el.querySelector('#input').addEventListener('blur', this._checkInput, false);
    this.el.querySelector('#input').addEventListener('keydown', this._checkKeycode, false);
  }

  _removeEventListeners() {
    this.el.removeEventListener('focus', this.focus, false);
    this.el.querySelector('#input').removeEventListener('focus', this._updateValue, false);
    this.el.querySelector('#input').removeEventListener('blur', this._checkInput, false);
    this.el.querySelector('#input').removeEventListener('keydown', this._checkKeycode, false);
  }

  focus() {
    this.el.querySelector('#input').focus();
    if (this.el.querySelector('#input').scrollIntoViewIfNeeded) {
      this.el.querySelector('#input').scrollIntoViewIfNeeded();
    }
  }

  blur(e) {
    this._checkInput(e);
    this.el.querySelector('#input').blur();
  }

  _checkKeycode(e) {
    if (super._checkKeycode) {
      super._checkKeycode(e);
    }
    // enter & space
    if (e.keyCode === 13 || e.keyCode === 32) {
      this._checkInput();
      return;
    }

    // esc
    if (e.keyCode === 27) {
      this._updateValue();
      e.stopPropagation();
      this.blur();
      return;
    }

    if (this.autoResize) {
      this._debouncedComputeWidth();
    }
  }

  _inputChanged(input) {
    if (input !== undefined) {
      this._reflectPropertyToValue(input);
    }
    if (this.autoResize) {
      this._debouncedComputeWidth();
    }
  }

  @Watch('default')
  _defaultChangedAndComputeMinWidth(newDefault) {
    if (!this.input && newDefault) {
      this.input = newDefault;
    }

    if (this._minWidthComputionJob) {
      clearTimeout(this._minWidthComputionJob);
      this._minWidthComputionJob = null;
    }

    this._minWidthComputionJob = setTimeout(() => {
      const def = this.default || '',
        placeholder = this.placeholder || '',
        minlength = this.minlength || 1,
        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // to compute a random string for minlength
      let minlengthString = '';
      for (let i = 0; i < minlength; i++) {
        minlengthString += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      this._minWidthString = (this.noAutoWidth ? [minlengthString] : [def, minlengthString]).reduce( (acc, curr) => {
        return curr.length > acc.length ? curr : acc;
      }, placeholder);
    }, 0);
  }

  _checkInput(e) {
    this._inputChanged(this.input || '');
    this._debouncedComputeWidth();
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
  }

  _updateValue(e) {
    if (this.value !== undefined) {
      this._reflectValueToProperty(this.value);
    }
    this._debouncedComputeWidth();
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
  }

  @Watch('noAutoWidth')
  _computeMinWidthForNoAutoWidth() {
    if (this._minWidthComputionJob) {
      clearTimeout(this._minWidthComputionJob);
      this._minWidthComputionJob = null;
    }

    this._minWidthComputionJob = setTimeout(() => {
      const def = this.default || '',
        placeholder = this.placeholder || '',
        minlength = this.minlength || 1,
        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // to compute a random string for minlength
      let minlengthString = '';
      for (let i = 0; i < minlength; i++) {
        minlengthString += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      this._minWidthString = (this.noAutoWidth ? [minlengthString] : [def, minlengthString]).reduce( (acc, curr) => {
        return curr.length > acc.length ? curr : acc;
      }, placeholder);
    }, 0);
  }

  @Watch('minlength')
  _computeMinWidthForMinlength() {
    if (this._minWidthComputionJob) {
      clearTimeout(this._minWidthComputionJob);
      this._minWidthComputionJob = null;
    }

    this._minWidthComputionJob = setTimeout(() => {
      const def = this.default || '',
        placeholder = this.placeholder || '',
        minlength = this.minlength || 1,
        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // to compute a random string for minlength
      let minlengthString = '';
      for (let i = 0; i < minlength; i++) {
        minlengthString += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      this._minWidthString = (this.noAutoWidth ? [minlengthString] : [def, minlengthString]).reduce( (acc, curr) => {
        return curr.length > acc.length ? curr : acc;
      }, placeholder);
    }, 0);
  }

  @Watch('placeholder')
  _computeMinWidthForPlaceholder() {
    if (this._minWidthComputionJob) {
      clearTimeout(this._minWidthComputionJob);
      this._minWidthComputionJob = null;
    }

    this._minWidthComputionJob = setTimeout(() => {
      const def = this.default || '',
        placeholder = this.placeholder || '',
        minlength = this.minlength || 1,
        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // to compute a random string for minlength
      let minlengthString = '';
      for (let i = 0; i < minlength; i++) {
        minlengthString += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      this._minWidthString = (this.noAutoWidth ? [minlengthString] : [def, minlengthString]).reduce( (acc, curr) => {
        return curr.length > acc.length ? curr : acc;
      }, placeholder);
    }, 0);
  }

  @Watch('_minWidthString')
  resizeForMinWidthString() {
    if (!this._minWidthString || this.hidden || this._minSizeJob) {
      return;
    }
    this._minSizeJob = requestAnimationFrame( () => {
      let width = this.el.querySelector('#minsize').getBoundingClientRect().width;
      // measure the width of the test element
      if (width !== 0) {
        this.el.querySelector('#input').style.minWidth = `${width}px`;
        this._debouncedComputeWidth();
        this._minSizeJob = null;
      } else {
        // if that fails, clone the test node to document level and add some basic styles, that could define the elements's width
        const minsizeClone = this.el.querySelector('#minsize').cloneNode(true);
        const style = document.defaultView.getComputedStyle(this.el.querySelector('#minsize'), '');
        ['font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'min-width', 'max-width'].reduce(
          ( accumulator, currentValue) => {
            if (currentValue && style[currentValue]) {
              minsizeClone.style[currentValue] = style[currentValue];
            }
          }, 'font-family');
        minsizeClone.style.display = 'inline-flex';
        minsizeClone.style.opacity = '0';
        minsizeClone.style.position = 'fixed';
        minsizeClone.style.left = '0';
        minsizeClone.style.top = '0';
        minsizeClone.style.border = 'thin solid transparent';

        document.body.appendChild(minsizeClone);
        requestAnimationFrame( () => {
          width = minsizeClone.getBoundingClientRect().width;
          minsizeClone.parentElement.removeChild(minsizeClone);
          this._minSizeJob = null;
          if (width !== 0) {
            this.el.querySelector('#input').style.minWidth = `${width}px`;
            this._debouncedComputeWidth();
          } else {
            // if it fails again, retry
            this.resize();
          }
        });
      }
    })

  }

  @Watch('hidden')
  resizeForHidden() {
    if (!this._minWidthString || this.hidden || this._minSizeJob) {
      return;
    }
    this._minSizeJob = requestAnimationFrame( () => {
      let width = this.el.querySelector('#minsize').getBoundingClientRect().width;
      // measure the width of the test element
      if (width !== 0) {
        this.el.querySelector('#input').style.minWidth = `${width}px`;
        this._debouncedComputeWidth();
        this._minSizeJob = null;
      } else {
        // if that fails, clone the test node to document level and add some basic styles, that could define the elements's width
        const minsizeClone = this.el.querySelector('#minsize').cloneNode(true);
        const style = document.defaultView.getComputedStyle(this.el.querySelector('#minsize'), '');
        ['font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'min-width', 'max-width'].reduce(
          ( accumulator, currentValue) => {
            if (currentValue && style[currentValue]) {
              minsizeClone.style[currentValue] = style[currentValue];
            }
          }, 'font-family');
        minsizeClone.style.display = 'inline-flex';
        minsizeClone.style.opacity = '0';
        minsizeClone.style.position = 'fixed';
        minsizeClone.style.left = '0';
        minsizeClone.style.top = '0';
        minsizeClone.style.border = 'thin solid transparent';

        document.body.appendChild(minsizeClone);
        requestAnimationFrame( () => {
          width = minsizeClone.getBoundingClientRect().width;
          minsizeClone.parentElement.removeChild(minsizeClone);
          this._minSizeJob = null;
          if (width !== 0) {
            this.el.querySelector('#input').style.minWidth = `${width}px`;
            this._debouncedComputeWidth();
          } else {
            // if it fails again, retry
            this.resize();
          }
        });
      }
    })

  }

  _debouncedComputeWidth() {
    if (this._activeResizeJob) {
      clearTimeout(this._activeResizeJob);
    }
    this._activeResizeJob = setTimeout(this._computeWidth.bind(this), 0);
  }

  _computeWidth() {
    this.el.querySelector('#input').style.width = `${this.el.querySelector('#size').getBoundingClientRect().width}px`;
  }

  @Watch('input')
  _inputChanged(input: string) {
    if (input !== undefined) {
      this._reflectPropertyToValue(input);
    }
    if (this.autoResize) {
      this._debouncedComputeWidth();
    }
  }

  inputTemplate() {
    return (
      <input id="input"
            type={this.type}
            value={this.input}
            placeholder={this.placeholder}
            required={this.required}
            disabled={this.disabled}
            spellcheck="false"
            autocomplete="off"/>
    );
  }

  render() {
    return (
      <div>
        {this.inputTemplate()}
        <div id="size">{this.input}</div>
        <div id="minsize">{this._minWidthString}</div>
      </div>
    );
  }
}
