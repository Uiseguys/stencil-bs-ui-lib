import { Component, State, Listen } from '@stencil/core';


@Component({
    tag: 'list-page',
    styleUrls: [
        'list-page.scss'
    ]
})
export class ListPage {

    @State() users1: any[] = [];
    @State() users2: any[] = [];

    @State() lodashData = [
        { name: 'one' },
        { name: 'second' },
        { name: 'third' }
    ]

    pizzas = [
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

    getLodashTemplate() {
        return `<h3 class="demo"><%=item.name%></h3>`

    }

    @Listen('onBottomReach')
    customEventHandler(event) {

        if (event.detail === 'users-infinite') {
            this.initUsers1Data()
        }

        if (event.detail === 'users-boxed') {
            this.initUsers2Data()
        }

    }
    // doc: string = 'cwc-list?.md'

    componentWillLoad() {
        this.initUsers1Data(20);
        this.initUsers2Data(20);
        console.log(this.customEventHandler);
    }

    initUsers1Data(count?: number) {
        this.getUsers(count).then(
            users => this.users1 = this.users1.concat(users)
        )
    }
    initUsers2Data(count?: number) {
        this.getUsers(count).then(
            users =>
                this.users2 = this.users2.concat(users)

        )
    }

    getUser2Template() {
        return `<div class="card card-18">
            <img class="card-img-top" src="<%=user.picture.large%>" alt="Card image cap" />
                <div class="card-body">
                    <h5 class="card-title capitalized"><%=user.name.first%> <%=user.name.last%></h5>
                    <a href="#" class="btn btn-primary">Send message</a>
                </div>
            </div > `

    }

    getUserTemplate() {
        return `<div class="card col-md-6 col-sm-12">
            <div class="card-body" >
                <div class="media">
                    <img class="d-flex mr-3 rounded" src="<%=user.picture.medium%>" alt="Generic placeholder image" />
                    <div class="media-body">
                        <h5 class="mt-0 capitalized"><%=user.name.first%> <%=user.name.last%></h5>

                        <div>
                            <span class="capitalized">
                                <%=user.location.city%>, <%=user.location.state%>,
                                </span>
                            <span> <%=user.location.street%> </span>
                        </div>
                    </div>
                </div>
                </div>
            </div> `

    }

    getUsersPage(): number {
        return (this.users1.length + this.users2.length) / 10 + 1
    }

    getUsers(count = 10) {

        return new Promise((resolve) => {

            const request = new XMLHttpRequest();
            request.open('GET', `https://randomuser.me/api/?page=${this.getUsersPage()}&results=${count}&seed=abc`, true);
            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    const data = JSON.parse(request.responseText);
                    const users = data.results;
                    resolve(users);
                } else {
                    resolve(false);
                    console.error("Users endpoint can't be reached. Status: ", request.status)

                }
            };

            request.onerror = () => console.error("Users endpoint can't be reached.")

            request.send();
        })
    }


    render() {
        return (

            <div class="container">

                <div>

                    <h1 id="infinite-list-component" class="mb-2">List component</h1>
                    <h2 id="api-and-usage-">Overview</h2>

                    <p>This component renders list of given <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot">slot</a> template.<br/>
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

                            {/* <tr>
                                <td><code>bindToList</code></td>
                                <td><code>boolean</code></td>
                                <td>no</td>
                                <td><code>false</code></td>
                                <td>Value which sets if component renders in fixed height wrapper or with infinite height.</td>
                            </tr> */}
                            {/* <tr>
                                <td><code>debounce</code></td>
                                <td><code>number</code></td>
                                <td>no</td>
                                <td><code>300</code></td>
                                <td>Debounce time between fired <code>&#39;onBottomReach&#39;</code> event</td>
                            </tr> */}
                            {/* <tr>
                                <td><code>bottomOffset</code></td>
                                <td><code>number</code></td>
                                <td>no</td>
                                <td><code>false</code></td>
                                <td>Offset in <code>px</code> from bottom of last list element.</td>
                            </tr> */}
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
                            &lt;slot&gt; <br/>
                            <span class="ml-4 pl-4">
                                &lt;div class="alert alert-primary" role="alert" title=[[=pizza.name]]&gt;<span class="text-success">[[=item.name]]</span> pizza is cooked!&lt;/div&gt;<br/>
                            </span>
                            <span class="ml-4 pl-2">&lt;/slot&gt;</span>
                        </span><br/>
                    &lt;/cwc-list&gt; 
                    </p>
                </code>
                <div>
                    <cwc-list items={this.pizzas}>
                        <slot>
                           <div class="alert alert-primary" title="[[=item.name]]" role="alert">[[=item.name]] pizza is cooked!</div>
                        </slot>
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
                            &lt;slot&gt; <br/>
                            <span class="ml-4 pl-4">
                                &lt;div class="alert alert-primary" role="alert" title=[[=pizza.name]]&gt;<span class="text-success">[[=pizza.name]]</span> pizza is cooked!&lt;/div&gt;<br/>
                            </span>
                            <span class="ml-4 pl-2">&lt;/slot&gt;</span>
                        </span><br/>
                    &lt;/cwc-list&gt; 
                    </p>
                </code>
                <div>
                    <cwc-list items={this.pizzas}
                        itemAs="pizza"
                        addClassEven="alert-success"
                        addClassOdd="alert-secondary"
                        addClassLast="text-center"
                        wrapperClass="border-left border-dark">
                        <slot>
                            <div class="alert " title="[[=item.name]]"  role="alert"> [[=pizza.name]] pizza is cooked!</div>
                        </slot>
                    </cwc-list>
                </div>



                {/* <cwc-list id="users-boxed"
                    items={this.users2}
                    itemAs='user'
                    template={this.getUser2Template()}
                    wrapperClass='row d-flex justify-content-around mx-0'
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
