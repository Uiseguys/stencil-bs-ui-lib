import { Component, Prop, HostElement, Element, Event, EventEmitter, State, Method, Watch } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';

@Component({
    tag: 'cwc-checkbox-group',
    styleUrl: 'cwc-checkbox-group.scss'
})
export class ChecboxGroupComponent {
  @Prop() data: Array<Object> = [];
  @Prop() displayProp: string = 'name';
  @Prop({ mutable: true }) value: Array<Object> = [];
  @Prop() allowSelectAll: boolean = true;
  @Prop() selectAllLabel: string = 'Select all my items';

  @Event() selectionChanged: EventEmitter;

  @State() allCheckedState: boolean = false;
  @State() checkboxStates: Object = {};

  @Element() el: HostElement;

    componentDidLoad() {
      if (this.allowSelectAll) {
        this.el.querySelector(`.form-check-input[value="${this.selectAllLabel}"]`).addEventListener('click', () => this.toggleAll());
      }
      this.data.forEach((checkbox) => {
        this.checkboxStates[checkbox[this.displayProp]] = false;
        this.el.querySelector(`.form-check-input[value="${checkbox[this.displayProp]}"]`)
        .addEventListener('click', () => this.toggle(checkbox));
      });
      if (this.value.length) {
        this.value.forEach((checkbox) => {
          this.checkboxStates[checkbox[this.displayProp]] = true;
          this.el.querySelector(`.form-check-input[value="${checkbox[this.displayProp]}"]`)['checked'] = true;
        });
      }
    }

    @Watch('value')
    watchHandler(newValue: Array<Object>) {
      this.selectionChanged.emit(newValue);
    }

    @Method()
    toggleAll() {
      this.allCheckedState
          ? this.uncheckAll()
          : this.checkAll()
    }

    @Method()
    toggle(checkbox) {
      this.checkboxStates[checkbox[this.displayProp]]
          ? this.uncheck(checkbox)
          : this.check(checkbox)
    }

    @Method()
    uncheckAll() {
      this.allCheckedState = false;
      this.data.forEach((checkbox) => {
        this.checkboxStates[checkbox[this.displayProp]] = false;
        this.el.querySelector(`.form-check-input[value="${checkbox[this.displayProp]}"]`)['checked'] = false;
      });
      this.value = [];
    }

    @Method()
    uncheck(checkbox) {
      this.checkboxStates[checkbox[this.displayProp]] = false;
      this.el.querySelector(`.form-check-input[value="${checkbox[this.displayProp]}"]`)['checked'] = false;
      this.value = this.value.filter((valueObj) => valueObj[this.displayProp] !== checkbox[this.displayProp]);
    }

    @Method()
    checkAll() {
      this.allCheckedState = true;
      this.data.forEach((checkbox) => {
        this.checkboxStates[checkbox[this.displayProp]] = true;
        this.el.querySelector(`.form-check-input[value="${checkbox[this.displayProp]}"]`)['checked'] = true;
      });
      this.value = [ ...this.data ];
    }

    @Method()
    check(checkbox) {
      this.checkboxStates[checkbox[this.displayProp]] = true;
      this.el.querySelector(`.form-check-input[value="${checkbox[this.displayProp]}"]`)['checked'] = true;
      this.value = [ ...this.value, ...[checkbox]];
    }

    render() {
      const finalData = [ ...this.data ];
      if (this.allowSelectAll) {
        finalData.unshift({ [this.displayProp]: this.selectAllLabel });
      }
      const checkboxesPerColumn = Math.ceil(finalData.length / 2);
      const checkboxColumn1 = finalData.slice(0, checkboxesPerColumn);
      const checkboxColumn2 = finalData.slice(checkboxesPerColumn);

        return (
          <div class="row">
            <div class="col-md-6">
            {
              checkboxColumn1.map((input) =>
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value={input[this.displayProp]}/>
                  <label class="form-check-label">
                    {input[this.displayProp]}
                  </label>
                </div>
              )}
            </div>
            <div class="col-md-6">
            {
              checkboxColumn2.map((input) =>
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value={input[this.displayProp]}/>
                  <label class="form-check-label">
                    {input[this.displayProp]}
                  </label>
                </div>
              )}
            </div>
          </div>
        )
    }
}
