import { Component, State, Listen } from '@stencil/core';

@Component({
  tag: 'multiselect-page',
  styleUrl: 'multiselect-page.scss'
})
export class MultiselectPage {
  simple = ['apple', 'mango', 'banana'];
  advanced = [
    { id: 'fruit1', name: 'apple' },
    { id: 'fruit2', name: 'mango' },
    { id: 'fruit3', name: 'banana' }
  ];

  @State() _simple = [];
  @State() _advanced = [];
  @State() _complex = [];
  @State() flag = false;

  @Listen('onchange')
  handleOnChange(e) {
    if (e.target.id === 'select1') {
      this._simple = e.detail;
    } else if (e.target.id === 'select2') {
      this._advanced = e.detail;
    } else {
      this._complex = e.detail;
    }
  }

  render() {
    return (
      <div>
        <h2 class="mb-4">Multiselect component </h2>
        <div class="jumbotron pt-3">
          <h4>Usage:</h4>
          <pre>
            {`<cwc-mulitselect value="['apple', 'mango', 'banana']" onchange="onChange($event.detail)">
</cwc-multiselect>`}
          </pre>

          <h4>Properties:</h4>
          <table class="table">
            <thead>
              <tr>
                <th class="mx-1">Param</th>
                <th class="mx-1">Type</th>
                <th class="mx-1">Default</th>
                <th class="mx-1">Required</th>
                <th class="mx-1">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>value</code>
                </td>
                <td>
                  <code>array</code>
                </td>
                <td>
                  <code>[]</code>
                </td>
                <td>Yes</td>
                <td>
                  select values to display checkbox. Following values are
                  available: <br />
                  <code>
                    ['apple', 'mango', 'banana'] <br />
                  </code>
                  <code>
                    {`[
                    {id: 'fruit1', name: 'apple'},
                    {id: 'fruit2, name: 'mango'},
                    {id: 'fruit3', name: 'banana'}
                  ]
                  `}
                  </code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>data-display</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code>name</code>
                </td>
                <td>No</td>
                <td />
              </tr>
              <tr>
                <td>
                  <code>onchange</code>
                </td>
                <td>
                  <code>function</code>
                </td>
                <td />
                <td>No</td>
                <td>Called when values are checked</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>simplest case:</h3>
        <pre class="code">
          <code>
            {`<cwc-mulitselect value="['apple', 'mango', 'banana']" onchange="onChange($event.detail)">
</cwc-multiselect>`}
          </code>
        </pre>
        <cwc-multiselect id="select1" value={this.simple} />
        <h5>result: </h5>
        <pre>{JSON.stringify(this._simple, null, 2)}</pre>

        <br />
        <br />
        <h3>slightly advanced case:</h3>
        <pre class="code">
          <code>
            {`<cwc-mulitselect 
  value="[
     {id: 'fruit1', name: 'apple'},
     {id: 'fruit2, name: 'mango'},
     {id: 'fruit3', name: 'banana'}
   ]"
  data-display="name"
  onchange="onChange($event.detail)">
</cwc-multiselect>`}
          </code>
        </pre>
        <cwc-multiselect id="select2" value={this.advanced} />
        <h5>result: </h5>
        <pre>{JSON.stringify(this._advanced, null, 2)}</pre>

        <h3>most complex use case:</h3>
        <pre class="code">
          <code>
            {`<cwc-mulitselect 
  value="[
     {id: 'fruit1', name: 'apple'},
     {id: 'fruit2, name: 'mango'},
     {id: 'fruit3', name: 'banana'}
   ]"
  onchange="onChange($event.detail)">

    <div class="item">Apple</div>
    <div class="item">Mango</div>
    <div class="item">Banana</div>

</cwc-multiselect>`}
          </code>
        </pre>
        <cwc-multiselect id="select3" value={this.advanced}>
          <div class="item">Apple</div>
          <div class="item">Mango</div>
          <div class="item">Banana</div>
        </cwc-multiselect>
        {/* <button onClick={this.toggleFlag}>Test</button> */}
        <h5>result: </h5>
        <pre>{JSON.stringify(this._complex, null, 2)}</pre>
      </div>
    );
  }
}
