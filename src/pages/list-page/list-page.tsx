import { Component, State, Listen } from '@stencil/core';


@Component({
    tag: 'list-page',
    styleUrls: [
        'list-page.scss'
    ]
})
export class ListPage {

    @State() users1: any[] = []
    @State() users2: any[] = []

    @Listen('onBottomReach')
    customEventHandler(event) {

        if (event.detail == 'users-infinite') {
            this.initUsers1Data()
        }

        if (event.detail == 'users-boxed') {
            this.initUsers2Data()
        }

    }
    doc: string = 'scb-list.md'

    componentWillLoad() {
        this.initUsers1Data(20)
        this.initUsers2Data(20)
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
        return (
            <div class="card card-18" >
                <img class="card-img-top" src="[[user.picture.large]]" alt="Card image cap" />
                <div class="card-body">
                    <h5 class="card-title capitalized">[[user.name.first]] [[user.name.last]]</h5>
                    <a href="#" class="btn btn-primary">Send message</a>
                </div>
            </div>
        )
    }

    getUserTemplate() {
        return (

            <div class="card col-md-6 col-sm-12" >
                <div class="card-body">
                    <div class="media">
                        <img class="d-flex mr-3 rounded" src="[[user.picture.medium]]" alt="Generic placeholder image" />
                        <div class="media-body">
                            <h5 class="mt-0 capitalized">[[user.name.first]] [[user.name.last]]</h5>

                            <div>
                                <span class="capitalized">
                                    [[user.location.city]], [[user.location.state]],
                                </span>
                                <span> [[user.location.street]] </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getUsersPage(): number {
        return (this.users1.length + this.users2.length) / 10 + 1
    }

    getUsers(count = 10) {

        return new Promise((resolve, reject?) => {

            let request = new XMLHttpRequest();
            request.open('GET', `https://randomuser.me/api/?page=${this.getUsersPage()}&results=${count}&seed=abc`, true);
            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    let data = JSON.parse(request.responseText);
                    let users = data.results
                    resolve(users)
                } else {
                    resolve(false)
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
    
<h1 id="infinite-list-component">Infinite list component</h1>
<h2 id="api-and-usage-">API and usage:</h2>
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
<td><code>template</code></td>
<td><code>VirtualNode</code></td>
<td>yes</td>
<td>-</td>
<td>Template to render.</td>
</tr>
<tr>
<td><code>bindToList</code></td>
<td><code>boolean</code></td>
<td>no</td>
<td><code>false</code></td>
<td>Value which sets if component renders in fixed height wrapper or with infinite height.</td>
</tr>
<tr>
<td><code>debounce</code></td>
<td><code>number</code></td>
<td>no</td>
<td><code>300</code></td>
<td>Debounce time between fired <code>&#39;onBottomReach&#39;</code> event</td>
</tr>
<tr>
<td><code>bottomOffset</code></td>
<td><code>number</code></td>
<td>no</td>
<td><code>false</code></td>
<td>Offset in <code>px</code> from bottom of last list element.</td>
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



                <h4 class="mt-5">Boxed list of users with random data: </h4> <br />

                <scb-list id="users-boxed"
                    items={this.users2}
                    itemAs='user'
                    template={this.getUser2Template()}
                    bindToList={true}
                    wrapperClass='row d-flex justify-content-around mx-0'
                    addClass='my-3'> </scb-list>
                {/* </div> */}
                <br /><br />

                <h4>Infinite list of users with data from <a href="randomuser.me">randomuser.me</a>: </h4>
                <br />
                <div >

                    <scb-list id="users-infinite"
                        items={this.users1}
                        itemAs='user'
                        template={this.getUserTemplate()}
                        bindToList={false}
                        wrapperClass='row'
                        addClass='custom mxy-2'
                        addClassEven='custom-even'
                        addClassFirst='custom-first'>

                    </scb-list>
                </div>
            </div>
        )
    }
}