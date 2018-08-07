import { Component, Listen, State } from '@stencil/core';

@Component({
  tag: 'autocomplete-select-page',
  styleUrl: 'autocomplete-select-page.scss'
})
export class AutocompleteSelectPage {
  complex = [
    {
      type: 'country',
      data: {
        name: 'Austria',
        capital: 'Vienna'
      }
    },
    {
      type: 'country',
      data: {
        name: 'Australia',
        capital: 'Canberra'
      }
    },
    {
      type: 'country',
      data: {
        name: 'Argentina',
        capital: 'Buenos Aires'
      }
    }
  ];

  searchString = 'data.name';

  complexResult = [];

  data = ['Alex', 'Alabama', 'Alaska', 'andreas', 'alexandro'];

  @State() result;
  @State() textChangeResult;

  @Listen('multiselectOnSubmit')
  typeaheadOnSubmit(e) {
    this.result = e.detail;
  }

  //Listening textchange event from cwc-autocomplete-select
  @Listen('textChange')
  textChange(e) {
    this.textChangeResult = e.detail;
  }
  //End

  render() {
    return (
        <div>
            <div class="container pt-4">
                <h3>Simple String[] data demo!</h3>
                <cwc-autocomplete-select data={this.data} />
                <br />

                <h6>Text Change result: {this.textChangeResult}</h6>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h3>Usage </h3>
                                            <div>


                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <pre><code class="lang-tsx">
                                                {`<cwc-autocomplete-select data={['Alex', 'Alabama', 'Alaska', 'andreas', 'alexandro']}/>`}
                                            </code></pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
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
                                            <td><code>Array</code></td>
                                            <td><code>[]</code></td>
                                            <td>Data to populate in dropdown</td>
                                        </tr>
                                        <tr>
                                            <td>idValue</td>
                                            <td><code>String</code></td>
                                            <td><code>''</code></td>
                                            <td>This is to set the custom id if user wanted and default id will be auto generated</td>
                                        </tr>
                                        <tr>
                                            <td>label</td>
                                            <td><code>String</code></td>
                                            <td><code>''</code></td>
                                            <td>This is to set label of auto complete select</td>
                                        </tr>
                                        <tr>
                                            <td>textChange</td>
                                            <td><code>Event</code></td>
                                            <td></td>
                                            <td>Fired when the user will trying search the result from dropdown list.</td>
                                        </tr>
                                        <tr>
                                            <td>typeaheadOnSubmit</td>
                                            <td><code>Event</code></td>
                                            <td></td>
                                            <td>This event will fire and return the result after select the option from dropdown.</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="container pt-4">
                <h3>Complex Object[] demo!</h3>
                <cwc-autocomplete-select
                    data={this.complex}
                    searchKey={this.searchString}
                />
                <br />

                <h4>result: </h4>
                <pre>{JSON.stringify(this.result, null, 2)}</pre>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h3>Usage </h3>
                                            <div>


                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <pre><code class="lang-tsx">

                                                {`<cwc-autocomplete-select searchKey="data.name" data={[{ type: 'country', data: { name: 'Austria', capital: 'Vienna' } },
{ type: 'country', data: { name: 'Australia', capital: 'Canberra' } },
{ type: 'country', data: { name: 'Argentina', capital: 'Buenos Aires' } }]}/>`}
                                            </code></pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
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
                                            <td><code>Array</code></td>
                                            <td><code>[]</code></td>
                                            <td>Data to populate in dropdown</td>
                                        </tr>
                                        <tr>
                                            <td>idValue</td>
                                            <td><code>String</code></td>
                                            <td><code>''</code></td>
                                            <td>This is to set the custom id if user wanted and default id will be auto generated</td>
                                        </tr>
                                        <tr>
                                            <td>label</td>
                                            <td><code>String</code></td>
                                            <td><code>''</code></td>
                                            <td>This is to set label of auto complete select</td>
                                        </tr>
                                        <tr>
                                            <td>searchKey</td>
                                            <td><code>String</code></td>
                                            <td><code>''</code></td>
                                            <td>This is to search in complex data where we can set the key to get the result</td>
                                        </tr>
                                        <tr>
                                            <td>textChange</td>
                                            <td><code>Event</code></td>
                                            <td></td>
                                            <td>Fired when the user will trying search the result from dropdown list.</td>
                                        </tr>
                                        <tr>
                                            <td>typeaheadOnSubmit</td>
                                            <td><code>Event</code></td>
                                            <td></td>
                                            <td>This event will fire and return the result after select the option from dropdown.</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
  }
}
