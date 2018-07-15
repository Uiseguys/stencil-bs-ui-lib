import { Component, State } from '@stencil/core';

@Component({
    tag: 'list-page',
    styleUrl: 'list-page.scss'
})
export class ListPage {

    @State() users1: any[] = [];
    @State() users2: any[] = [];

  @State()  pizzas = [
        {
            name: 'Pepperoni',
            price: 10
        },
        {   
            name: 'Quattro formaggi',
            price: 12
        },
        {
            name: 'Havaiian',
            price: 14
        }
    ]

    render() {
        return (

            <div class="container">

                <div>

                    <h1 id="infinite-list-component" class="mb-2">List component</h1>
                    <h2 id="api-and-usage-">Overview</h2>

                    <p>This component renders list of given child elements according to provided data model.<br/>
                    Template interpolation is performed with double square brackets and equals sign <code>`[[= ]]`</code> like in <a href="https://angular.io">Angular</a> or <a href="https://github.com/janl/mustache.js">Mustache</a> templates.</p>
                    <h3 id="props">Props</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Prop</th>
                                <th>PropType</th>
                                <th>Required?</th>
                                <th>defaultValue</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>items</code></td>
                                <td><code>object[]</code></td>
                                <td>yes</td>
                                <td><code>[]</code></td>
                                <td>Array of objects to iterate with template.</td>
                            </tr>
                            <tr>
                                <td><code>itemAs</code></td>
                                <td><code>string</code></td>
                                <td>no</td>
                                <td><code>&#39;item&#39;</code></td>
                                <td>Value associated with current value in template.</td>
                            </tr>
                            <tr>
                                <td><code>addClass</code></td>
                                <td><code>string</code></td>
                                <td>no</td>
                                <td>-</td>
                                <td>Class to add to every template.</td>
                            </tr>
                            <tr>
                                <td><code>addClassFirst</code></td>
                                <td><code>string</code></td>
                                <td>no</td>
                                <td>-</td>
                                <td>Class to add to first template.</td>
                            </tr>
                            <tr>
                                <td><code>addClassLast</code></td>
                                <td><code>string</code></td>
                                <td>no</td>
                                <td>-</td>
                                <td>Class to add to last template.</td>
                            </tr>
                            <tr>
                                <td><code>addClassEven</code></td>
                                <td><code>string</code></td>
                                <td>no</td>
                                <td>-</td>
                                <td>Class to add to even template.</td>
                            </tr>
                            <tr>
                                <td><code>addClassOdd</code></td>
                                <td><code>string</code></td>
                                <td>no</td>
                                <td>-</td>
                                <td>Class to add to odd template.</td>
                            </tr>
                            <tr>
                                <td><code>wrapperClass</code></td>
                                <td><code>string</code></td>
                                <td>no</td>
                                <td>-</td>
                                <td>Class to <code>&lt;div&gt;&lt;/div&gt;</code> wrapper of list.</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <h2 class="mt-5">Usage</h2>
                
                <h5 class="mt-4">Alerts list with simple list data:</h5>

                <code>
                    <p>
                   const pizzas = [&#123;name: 'Pepperoni',price: 10&#125;, &#123;name: 'Quattro formaggi',price: 12&#125;,&#123;name: 'Havaiian',price: 14&#125;]
                    </p>
                    <p>
                    <span>&lt;cwc-list</span><br/>
                        <span class="ml-2">items=<span class="text-danger">&#123;<span class="text-alert">this.pizzas</span>&#125;</span>&gt;</span><br/>
                        <span class="ml-4 pl-2"> 
                            <span class="ml-4 pl-4">
                                &lt;div class="alert alert-primary" role="alert" title=[[=pizza.name]]&gt;<span class="text-success">[[=item.name]]</span> pizza is cooked!&lt;/div&gt;<br/>
                            </span>
                        </span><br/>
                    &lt;/cwc-list&gt; 
                    </p>
                </code>
                <div>
                    <cwc-list id="pizza-list-first" items={this.pizzas}>
                           <div class="alert alert-primary" title="[[=item.name]]" role="alert">[[=item.name]] pizza is cooked!</div>
                    </cwc-list>
                </div>

                <h5 class="mt-4 pt-2">Alerts list with <code>addClassOdd</code>,<code>addClassEven</code>, <code>addClassLast</code> and <code>wrapperClass</code> props.</h5>
                <p>You can also redefine interpolated value with <code>itemAs</code> property.</p>

                
                <code>

                    <p>
                    <span>&lt;cwc-list</span><br/>
                        <span class="ml-2">items=<span class="text-danger">&#123;<span class="text-alert">this.pizzas</span>&#125;</span></span><br/>
                        <span class="ml-2">addClassOdd=<span class="text-info">"alert-secondary"</span></span><br/>
                        <span class="ml-2">addClassEven=<span class="text-info">"alert-success"</span></span><br/>
                        <span class="ml-2">addClassLast=<span class="text-info">"text-center"</span></span><br/>
                        <span class="ml-2">wrapperClass=<span class="text-info">"border-left border-dark"</span></span><br/>
                        <span class="ml-2">itemAs=<span class="text-info">"pizza"</span>&gt;</span><br/>
                        <span class="ml-4 pl-2"> 
                            <span class="ml-4 pl-4">
                                &lt;div class="alert alert-primary" role="alert" title=[[=pizza.name]]&gt;<span class="text-success">[[=pizza.name]]</span> pizza is cooked!&lt;/div&gt;<br/>
                            </span>
                        </span><br/>
                    &lt;/cwc-list&gt; 
                    </p>
                </code>
                <div>
                    <cwc-list id="pizzas-list-second" items={this.pizzas}
                        itemAs="pizza"
                        addClassEven="alert-success"
                        addClassOdd="alert-secondary"
                        addClassLast="text-center"
                        wrapperClass="border-left border-dark">

               
                            <div class="alert " title="[[=pizza.name]]"  role="alert"> [[= pizza.name ]] pizza is cooked!</div>

                    </cwc-list>
                </div>



                {/* <cwc-list id="users-boxed"
                    items={this.users2}
                    itemAs='user'
                    template={this.getUser2Template()}
                    wrapperCla
                    ss='row d-flex justify-content-around mx-0'
                    addClass='my-3'> </cwc-list>

                <br /><br />

                <h4>Infinite list of users with data from <a href="randomuser.me">randomuser.me</a>: </h4>
                <br />
                <div >

                    <br />

                </div> */}
            </div>
        )
    }
}
