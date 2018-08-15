import { Component, Prop, HostElement, Element, State, Method } from '@stencil/core';
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

  @State() allCheckedState: boolean = false;

  @Element() el: HostElement;

    componentDidLoad() {
      this.el.querySelector('.form-check-input[value=select-all-items]').addEventListener('click', () => this.toggleAll());
    }

    @Method()
    toggleAll() {
        this.allCheckedState
            ? this.uncheckAll()
            : this.checkAll()
    }

    @Method()
    uncheckAll() {
      this.allCheckedState = false;
      this.value = [];
      this.data.forEach((checkbox) => {
        this.el.querySelector(`.form-check-input[value=${checkbox['key']}]`)['checked'] = false;
      });
    }

    @Method()
    checkAll() {
      this.allCheckedState = true;
      this.value = this.data;
      this.data.forEach((checkbox) => {
        this.el.querySelector(`.form-check-input[value=${checkbox['key']}]`)['checked'] = true;
      });
    }

    render() {
      const finalData = [ ...this.data ];
      if (this.allowSelectAll) {
        finalData.unshift({ [this.displayProp]: this.selectAllLabel, key: 'select-all-items' });
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
                <input class="form-check-input" type="checkbox" value={input['key']}/>
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
                <input class="form-check-input" type="checkbox" value={input['key']}/>
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
