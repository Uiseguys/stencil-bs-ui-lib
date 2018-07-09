import {
  Element,
  Event,
  EventEmitter,
  Component,
  Listen,
  Prop,
  State,
  Watch
} from '@stencil/core';

@Component({
  tag: 'cwc-multiselect',
  styleUrl: 'cwc-multiselect.scss'
})
export class CwcMultiselect {
  // public members
  @Prop() value: Array<any> = [];
  @Prop() dataDisplay: string = 'name';
  @Prop() selected: Array<any> = [];
  @Event() onchange: EventEmitter;

  // private members
  @Element() _container: HTMLElement;
  @State() _selected: Array<any> = [];
  _isComplex: boolean = false;

  componentWillLoad() {
    if (this.selected !== undefined) {
      this._selected = this.selected;
    }
    this._isComplex = this._container.children.length > 0;
  }

  @Watch('selected')
  watchHandler(newValue) {
    this._selected = newValue;
  }

  @Listen('click')
  handleClick(e) {
    if (!this._isComplex) return;

    // toggle check
    const elem = document.elementFromPoint(e.clientX, e.clientY);
    for (let i = 0; i < this._container.children.length; i += 1) {
      if (
        this._container.children[i] == elem ||
        this._container.children[i].contains(elem)
      ) {
        const isChecked = this._selected.indexOf(this.value[i]) >= 0;
        if (isChecked) {
          this._selected = this._selected.filter(v => v !== this.value[i]);
          this._container.children[i].classList.remove('selected');
        } else {
          this._selected.push(this.value[i]);
          this._container.children[i].classList.add('selected');
        }
        this.onchange.emit([...this._selected]);
        break;
      }
    }
  }

  handleChange = (e, item) => {
    if (e.target.checked) {
      this._selected.push(item);
    } else {
      this._selected = this._selected.filter(v => v !== item);
    }
    this.onchange.emit([...this._selected]);
  };

  render() {
    if (!this.value || !this.value.length) return null;

    if (!this._isComplex) {
      return this.renderSimple();
    } else {
      return this.renderComplex();
    }
  }

  renderSimple() {
    return this.value.map(item => {
      let label;
      if (typeof item === 'object') {
        label = item[this.dataDisplay];
      } else {
        label = item;
      }

      return (
        <div class="position-relative form-check">
          <label class="form-check-label">
            <input
              type="checkbox"
              class="form-check-input"
              checked={this._selected.indexOf(item) > -1}
              onChange={e => {
                this.handleChange(e, item);
              }}
            />
            {label}
          </label>
        </div>
      );
    });
  }

  renderComplex() {
    return <slot />;
  }
}
