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
        <h3>simplest case:</h3>
        <pre class="code">
          <code>
            {`<cwc-mulitselect value="['apple', 'mango', 'banana']" onchange="onChange(selectedItems)">
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
  onchange="onChange(selectedItems)">
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
  onchange="onChange(selectedItems)">

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
