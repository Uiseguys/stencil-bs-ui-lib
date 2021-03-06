import { Component, Listen, State, Element } from '@stencil/core';
// import template from 'lodash/template'

@Component({
  tag: "dnd-page",
  styleUrl: "dnd-page.scss"
})
export class DndPage {
  animals = ["cat", "dog", "elephant"];

  birds = ["tucano", "crown", "parrot"];

  columns = ["#animals", "#birds"];
  @Element() element: HTMLElement;

  @State() framework: Framework = Framework.stencil;
  @State() dataModel: string = undefined

  // @Listen("dnddragend")
  // customEventHandler(event) {
  //   console.log("Received the custom event: ", event);
  // }

  @Listen('dndmodelupdate') 
    dndModelUpdateHandler(event: CustomEvent) {
      console.log('got model change: ', event.detail)
      this.dataModel = JSON.stringify(event.detail, null, 4)
  }

  componentDidLoad() {
    console.log("The component has been rendered");
  }

  setFramework(framework: Framework): void {
    this.framework = framework;
  }
  render() {
    return [
      <div class="container pt-4">
        <h2 class="mb-4">Drag and drop component </h2>
        <div class="row">
          <div class="col-lg-12">
            <div class="jumbotron pt-3">
              <div class="row">
                <div class="col-lg-12" />
                <div class="col-12 mt-4">
                  <h3>Overview </h3>

                  <p class="mt-1">
                    This is a wrapper component for <a href="https://bevacqua.github.io/dragula/">Dragula</a> drag'n'drop library.
                  </p>
                </div>
                <div class="col-12 mt-4">
                  <h3>Usage </h3>

                  <p class="mt-1 my-0">
                    To instantiate one or more draggable list columns please
                    provide them right into <code>&lt;cwc-dnd&gt;&lt;/cwc-dnd&gt;</code> component. 
                    Also you must pass array of selectors of this
                    lists with <code>rows: string[]</code> property. Also you
                    can declare a <code>handleClass: string</code> property
                    to make the element not draggable itself, but by
                    handler child element with specified class.
                  </p>
                </div>

                <div class="usage-block col-12">
                  <div class="col-12 mt-1">
                    <h4>Basic usage</h4>

                    <div class="buttons-wrapper my-2">
                      <div
                        class={`btn btn-sm ${
                          this.framework === Framework.stencil
                            ? "btn-primary"
                            : "btn-secondary"
                        }`}
                        onClick={() => this.setFramework(Framework.stencil)}
                      >
                        Stencil usage
                      </div>
                      <div
                        class={`btn btn-sm ml-2 ${
                          this.framework === Framework.angular
                            ? "btn-primary"
                            : "btn-secondary"
                        }`}
                        onClick={() => this.setFramework(Framework.angular)}
                      >
                        Angular usage
                      </div>
                    </div>

                    <pre>
                      <code class="lang-tsx">
                        {this.framework === Framework.stencil ? (
                          <div class="stencil-wrapper">
                            <span>
                              &lt;cwc-dnd rows=&#123;[&#x27;#animals&#x27;,
                              &#x27;#birds&#x27;]&#125;
                              class=&quot;row&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-2">
                              &lt;div id=&quot;animals&quot; class=&quot;col-5
                              offset-col-1&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;cat&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;dog&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;elephant&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-2">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-2">
                              &lt;div id=&quot;birds&quot; class=&quot;col-5
                              offset-col-1&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;tucano&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;crown&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;parrot&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-2">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span>&lt;&#x2F;cwc-dnd&gt;</span>
                          </div>
                        ) : (
                          <div class="angular-wrapper">
                            <span>
                              &lt;cwc-dnd [rows]="[&#x27;#animals&#x27;,
                              &#x27;#birds&#x27;]" class=&quot;row&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-2">
                              &lt;div id=&quot;animals&quot; class=&quot;col-5
                              offset-col-1&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;cat&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;dog&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;elephant&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-2">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-2">
                              &lt;div id=&quot;birds&quot; class=&quot;col-5
                              offset-col-1&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;tucano&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;crown&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;parrot&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-2">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span>&lt;&#x2F;cwc-dnd&gt;</span>
                          </div>
                        )}
                      </code>
                    </pre>
                  </div>

                  <div class="col-12 mt-2">
                    <cwc-dnd rows={this.columns}>
                      <div class="wrapper row">
                        <div id="animals" class="col-5 offset-col-1">
                          {this.animals.map(item => (
                            <div class="column card p-2" >
                              <p>{item}</p>
                            </div>
                          ))}
                        </div>
                        <div id="birds" class="col-5 offset-col-1">
                          {this.birds.map(item => (
                            <div class="column card p-2">
                              <p>{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </cwc-dnd>
                  </div>
                </div>
                <div class="usage-block col-12">
                  <div class="col-12 mt-1">
                    <h4>Usage with specified handler and model tracking</h4>
                    <p>You can specify class for dedicated handler element with <code>handleClass</code> property. 
                    In the next example we had added a child element with text "Drag me!" and <code>handle</code> class. 
                    Also we specifieed <code>handleClass="handler"</code> property in drag and drop component. </p>
                    <p>For model tracking we are listening to the <code>dndmodelupdate</code> event 
                    which is emitted every time draggable elements order is changed. Every draggable element you want to track must 
                    have <code>data-dnd</code> attribute which value will be emited in the event.</p>

                    <div class="buttons-wrapper my-2">
                      <div
                        class={`btn btn-sm ${
                          this.framework === Framework.stencil
                            ? "btn-primary"
                            : "btn-secondary"
                        }`}
                        onClick={() => this.setFramework(Framework.stencil)}
                      >
                        Stencil usage
                      </div>
                      <div
                        class={`btn btn-sm ml-2 ${
                          this.framework === Framework.angular
                            ? "btn-primary"
                            : "btn-secondary"
                        }`}
                        onClick={() => this.setFramework(Framework.angular)}
                      >
                        Angular usage
                      </div>
                    </div>

                    <pre>
                      <code class="lang-tsx">
                        {this.framework === Framework.stencil ? (
                          <div class="stencil-wrapper">
                            <span>
                              &lt;cwc-dnd
                              rows=&#123;[&#x27;#animals-with-handler&#x27;,
                              &#x27;#birds-with-handler&#x27;]&#125; handleClass="handler"
                              class=&quot;row&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-2">
                              &lt;div id=&quot;animals-with-handler&quot; class=&quot;col-5
                              offset-col-1&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot; data-dnd=&quot;cat-id&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;cat&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;span class=&quot;badge badge-primary handler
                              w-25 m-2&quot;&gt;Drag me!&lt;&#x2F;span&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot; data-dnd=&quot;dog-id&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;dog&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;span class=&quot;badge badge-primary handler
                              w-25 m-2&quot;&gt;Drag me!&lt;&#x2F;span&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot; data-dnd=&quot;elephant-id&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;elephant&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;span class=&quot;badge badge-primary handler
                              w-25 m-2&quot;&gt;Drag me!&lt;&#x2F;span&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-2">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-2">
                              &lt;div id=&quot;birds-with-handler&quot; class=&quot;col-5
                              offset-col-1&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot; data-dnd=&quot;tucano-id&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;tucano&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;span class=&quot;badge badge-primary handler
                              w-25 m-2&quot;&gt;Drag me!&lt;&#x2F;span&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot; data-dnd=&quot;crown-id&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;crown&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;span class=&quot;badge badge-primary handler
                              w-25 m-2&quot;&gt;Drag me!&lt;&#x2F;span&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot; data-dnd=&quot;parrot-id&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;parrot&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;span class=&quot;badge badge-primary handler
                              w-25 m-2&quot;&gt;Drag me!&lt;&#x2F;span&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-2">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span>&lt;&#x2F;cwc-dnd&gt;</span>
                          </div>



                        ) : (
                          <div class="angular-wrapper">
                            <span>
                              &lt;cwc-dnd [rows]="[&#x27;#animals-with-handler&#x27;,
                              &#x27;#birds-with-handler&#x27;]" handleClass="'handler'" class=&quot;row&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-2">
                              &lt;div id=&quot;animals-with-handler&quot; class=&quot;col-5
                              offset-col-1&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot; data-dnd=&quot;cat-id&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;cat&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;span class=&quot;badge badge-primary handler
                              w-25 m-2&quot;&gt;Drag me!&lt;&#x2F;span&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot; data-dnd=&quot;dog-id&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;dog&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;span class=&quot;badge badge-primary handler
                              w-25 m-2&quot;&gt;Drag me!&lt;&#x2F;span&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot; data-dnd=&quot;elephant-id&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;elephant&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;span class=&quot;badge badge-primary handler
                              w-25 m-2&quot;&gt;Drag me!&lt;&#x2F;span&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-2">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-2">
                              &lt;div id=&quot;birds-with-handler&quot; class=&quot;col-5
                              offset-col-1&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot; data-dnd=&quot;tucano-id&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;tucano&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;span class=&quot;badge badge-primary handler
                              w-25 m-2&quot;&gt;Drag me!&lt;&#x2F;span&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot; data-dnd=&quot;crown-id&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;crown&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;span class=&quot;badge badge-primary handler
                              w-25 m-2&quot;&gt;Drag me!&lt;&#x2F;span&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-4">
                              &lt;div class=&quot;column card p-2&quot; data-dnd=&quot;parrot-id&quot;&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;p&gt;parrot&lt;&#x2F;p&gt;
                            </span>
                            <br />
                            <span class="ml-4 pl-3">
                              &lt;span class=&quot;badge badge-primary handler
                              w-25 m-2&quot;&gt;Drag me!&lt;&#x2F;span&gt;
                            </span>
                            <br />
                            <span class="ml-4">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span class="ml-2">&lt;&#x2F;div&gt;</span>
                            <br />
                            <span>&lt;&#x2F;cwc-dnd&gt;</span>
                          </div>
                        )}
                      </code>
                    </pre>
                  </div>

                  <div class="col-12">
                    <cwc-dnd
                      rows={["#animals-with-handler", "#birds-with-handler"]}
                      handleClass="handler"
                    >
                      <div class="wrapper row">
                        <div
                          id="animals-with-handler"
                          class="col-5 offset-col-1"
                        >
                          {this.animals.map(item => (
                            <div class="column card p-2" data-dnd={`${item}-id`}>
                              <p>{item}</p>
                              <span class="badge badge-primary handler w-25 m-2">
                                Drag me!
                              </span>
                            </div>
                          ))}
                        </div>
                        <div id="birds-with-handler" class="col-5 offset-col-1">
                          {this.birds.map(item => (
                            <div class="column card p-2" data-dnd={`${item}-id`}>
                              <p>{item}</p>
                              <span class="badge badge-primary handler w-25 m-2">
                                Drag me!
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </cwc-dnd>
                    <br/>
                    <h5>Data model: </h5>
                    <div class="model-tracking">
                          <pre id="model-data-target">

                          {
                            this.dataModel ? this.dataModel : <p>Please drag one of elements above to check data model</p> 
                          }

                          </pre>
                    
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mt-4">
                <h3>Props</h3>

                <table class="table mt-2">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>rows</code>
                      </td>
                      <td>
                        <code>string[]</code>
                      </td>
                      <td>
                        <code>[]</code>
                      </td>
                      <td>Array of columns selectors.</td>
                    </tr>

                    <tr>
                      <td>
                        <code>handleClass</code>
                      </td>
                      <td>
                        <code>string</code>
                      </td>
                      <td>
                        <code>undefined</code>
                      </td>
                      <td>
                        Selector of handle to drag. If not defined, full element
                        will be dragable.
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <code>dragulaOpts</code>
                      </td>
                      <td>
                        <a
                          target="_blank"
                          href="https://github.com/bevacqua/dragula#optionsmoves"
                        >
                          dragulaOpts
                        </a>
                      </td>
                      <td>
                        <code>&#123;&#125;</code>
                      </td>
                      <td>Dragula options object.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="col-12">
                <h3>Events</h3>

                <table class="table mt-2">
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Listener Arguments</th>
                      <th>Event Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>dnddrag</code>
                      </td>
                      <td>
                        <code>el, source</code>
                      </td>
                      <td>
                        <code>el</code> was lifted from <code>source</code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>dnddragend</code>
                      </td>
                      <td>
                        <code>el</code>
                      </td>
                      <td>
                        Dragging event for <code>el</code> ended with either{" "}
                        <code>cancel</code>, <code>remove</code>, or{" "}
                        <code>drop</code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>dnddrop</code>
                      </td>
                      <td>
                        <code>el, target, source, sibling</code>
                      </td>
                      <td>
                        <code>el</code> was dropped into <code>target</code>{" "}
                        before a <code>sibling</code> element, and originally
                        came from <code>source</code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>dndcancel</code>
                      </td>
                      <td>
                        <code>el, container, source</code>
                      </td>
                      <td>
                        <code>el</code> was being dragged but it got nowhere and
                        went back into <code>container</code>, its last stable
                        parent; <code>el</code> originally came from{" "}
                        <code>source</code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>dndremove</code>
                      </td>
                      <td>
                        <code>el, container, source</code>
                      </td>
                      <td>
                        <code>el</code> was being dragged but it got nowhere and
                        it was removed from the DOM. Its last stable parent was{" "}
                        <code>container</code>, and originally came from{" "}
                        <code>source</code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>dndshadow</code>
                      </td>
                      <td>
                        <code>el, container, source</code>
                      </td>
                      <td>
                        <code>el</code>, <em>the visual aid shadow</em>, was
                        moved into <code>container</code>. May trigger many
                        times as the position of <code>el</code> changes, even
                        within the same <code>container</code>; <code>el</code>{" "}
                        originally came from <code>source</code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>dndover</code>
                      </td>
                      <td>
                        <code>el, container, source</code>
                      </td>
                      <td>
                        <code>el</code> is over <code>container</code>, and
                        originally came from <code>source</code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>dndout</code>
                      </td>
                      <td>
                        <code>el, container, source</code>
                      </td>
                      <td>
                        <code>el</code> was dragged out of{" "}
                        <code>container</code> or dropped, and originally came
                        from <code>source</code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <code>dndcloned</code>
                      </td>
                      <td>
                        <code>clone, original, type</code>
                      </td>
                      <td>
                        DOM element <code>original</code> was cloned as{" "}
                        <code>clone</code>, of <code>type</code>{" "}
                        <em>
                          (<code>'mirror'</code> or <code>'copy'</code>)
                        </em>. Fired for mirror images and when{" "}
                        <code>copy: true</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="col-12">
                <h3>Methods</h3>

                  <table class="table mt-2">
                    <thead>
                      <tr>
                        <th>Method</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <code>getDrake()</code>
                        </td>
                        <td>
                          <a target="_blank" href="https://github.com/bevacqua/dragula#api">Drake</a> instance.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>getDataModel()</code>
                        </td>
                        <td>
                          Method to retrieve data model.
                        </td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    ];
  }
}

export enum Framework {
  "angular",
  "stencil"
}
