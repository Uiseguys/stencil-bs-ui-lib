import { Component, State } from '@stencil/core';

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

  handleSimpleChange = e => {
    this._simple = e.detail;
  };

  handleAdvancedChange = e => {
    this._advanced = e.detail;
  };

  handleComplexChange = e => {
    this._complex = e.detail;
  };

  toggleFlag = () => {
    this.flag = !this.flag;
  };

  render() {
    return (
      <div>
        <h3>simplest case:</h3>
        <pre class="code">
          <code>
            {`<cwc-mulitselect value="['apple', 'mango', 'banana']" qange="onChange(selectedItems)">
</cwc-multiselect>`}
          </code>
        </pre>
        <cwc-multiselect
          value={this.simple}
          onQange={this.handleSimpleChange}
        />
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
  qange="onChange(selectedItems)">
</cwc-multiselect>`}
          </code>
        </pre>
        <cwc-multiselect
          value={this.advanced}
          onQange={this.handleAdvancedChange}
        />
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
  qange="onChange(selectedItems)">

    <div class="item">Apple</div>
    <div class="item">Mango</div>
    <div class="item">Banana</div>

</cwc-multiselect>`}
          </code>
        </pre>
        <cwc-multiselect
          value={this.advanced}
          onQange={this.handleComplexChange}
        >
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
