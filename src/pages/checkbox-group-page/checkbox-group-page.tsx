import { Component, Prop, State, Listen } from '@stencil/core';

@Component({
    tag: 'checkbox-group-page',
    styleUrl: 'checkbox-group-page.scss'
})

export class DropdownPage {
    @Prop() value: Array<Object> = [
      {name: 'my name', age: '21', address: 'ph'},
    ];
    @State() selectedValues: Array<Object> = this.value;

    @Listen('selectionChanged')
    stateChangeHandler(e) {
      this.selectedValues = e.detail;
    }

    render() {
        const data = [
          {name: 'my name', age: '21', address: 'ph'},
          {name: 'my name1', age: '22', address: 'uk'},
          {name: 'my name2', age: '23' , address: 'us'},
        ];

        return (
          <div>
          <div class="container pt-4" >
              <h2 class="mb-4">Popper component </h2>
              <div class="row">
                  <div class="col-lg-12">
                      <div class="jumbotron pt-3" >
                          <div class="row">
                              <div class="col-lg-5">
                                  <div class="row">
                                      <h3>Usage </h3>
                                  </div>
                                  <br />
                                  <div class="row">
                                      <div class="col-lg-12">
                                          <pre><code class="lang-tsx">
                                              <span>&lt;cwc-checkbox-group</span><br />
                                              <span class="hljs-built_in ml-4">
                                              data="[<br />
                                                        &#09;&#123;"name": "itemname", "key":"value"&#125;,<br />
                                                        &#09;&#123;"name": "itemname-2", "key":"value"&#125; ...<br />
                                                      &#09;]"
                                              </span><br />
                                              <span class="hljs-built_in ml-4">displayProp="'name'"</span><br />
                                              <span class="hljs-built_in ml-4">
                                              value="[<br />
                                                         &#09;&#123;"name": "itemname-3", "key":"value"&#125;<br />
                                                       &#09;]"
                                              </span><br />
                                              <span class="hljs-built_in ml-4">allowSelectAll="true"</span><br />
                                              <span class="hljs-built_in ml-4">selectAllLabel="'Select all my items:'"&gt;</span>
                                              <br />
                                              <span>&lt;/cwc-checkbox-group&gt;</span>
                                          </code></pre>
                                      </div>
                                  </div>
                              </div>

                              <div class="col-lg-7">
                                  <table class="table">
                                      <thead>
                                      <tr>
                                          <th>Param</th>
                                          <th>Type</th>
                                          <th>Default</th>
                                          <th>Description</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                          <td>data</td>
                                          <td>[Object]</td>
                                          <td>[]</td>
                                          <td>Array of objects to be used as values for each checkbox.</td>
                                      </tr>
                                      <tr>
                                          <td>displayProp</td>
                                          <td>String</td>
                                          <td>name</td>
                                          <td>The property from the array of objects
                                          whose value should be used as label for the checkboxes.</td>
                                      </tr>
                                      <tr>
                                          <td>value</td>
                                          <td>[Object]</td>
                                          <td>[]</td>
                                          <td>Array of objects with same fields as in `data` but only contains the selected values.</td>
                                      </tr>
                                      <tr>
                                          <td>allowSelectAll</td>
                                          <td>Boolean</td>
                                          <td>true</td>
                                          <td>When enabled, there will be additional checkbox that when checked,
                                          would select all the checkboxes</td>
                                      </tr>
                                      <tr>
                                          <td>selectAllLabel</td>
                                          <td>String</td>
                                          <td>`Select all my items`</td>
                                          <td>The label to be used for the `select all` checkbox</td>
                                      </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <h3>Example</h3>
          <div class="jumbotron">
          <cwc-checkbox-group
          displayProp='name' value={this.selectedValues} data={data}
          ></cwc-checkbox-group>
          {this.selectedValues
            ? <div>
              {
                this.selectedValues.map((obj) =>
                  <div>{obj['name']} - {obj['age']} - {obj['address']}</div>
                )
              }
            </div>
            : null
          }
          </div>
          </div>
        );
    }
}
