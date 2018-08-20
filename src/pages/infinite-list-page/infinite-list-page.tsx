import { Component, State } from "@stencil/core";

@Component({
  tag: "infinite-list-page",
  styleUrl: "infinite-list-page.scss"
})
export class CwcInfiniteList {
  @State() users1: any[] = [];
  @State() users2: any[] = [];

  componentWillLoad() {
    this.initUsers1()
    this.initUsers2()
  }

  initUsers1(count?: number) {
    const page = this.getPage(this.users1)
    this.getUsers(count, page).then(users => this.users1 = this.users1.concat(users));
  }

  initUsers2(count?: number) {
    const page = this.getPage(this.users2)
    this.getUsers(count, page).then(users => this.users2 = this.users2.concat(users));
  }

  getPage(data: any[]): number {
    return data.length / 10 + 1;
  }

  getUsers(count = 10, page = 2) {
    return new Promise(resolve => {
      const request = new XMLHttpRequest();
      request.open(
        "GET",
        `https://randomuser.me/api/?page=${page}&results=${count}&seed=abc`,
        true
      );
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const data = JSON.parse(request.responseText);
          const users = data.results;
          resolve(users);
        } else {
          resolve(false);
          console.error(
            "Users endpoint can't be reached. Status: ",
            request.status
          );
        }
      };

      request.onerror = () => console.error("Users endpoint can't be reached.");

      request.send();
    });
  }

  render() {
    return [
      <div class="container">
        <div>
          <h1 class="mb-2">Infinite list watcher component</h1>

          <h2 id="api-and-usage">Overview</h2>
          <p>
            This is a helper component for creating infinite list components. It
            handles viewport reach in infinite lists or scroll position in
            containers which are explicitly sized.
          </p>

          <h3>
            Usage with <code>cwc-list</code> component inside container with data from <a href="randomuser.me">randomuser.me</a>
          </h3>

          <pre>
            {`
<cwc-infinite-list-watcher 
    onOnBottomReach={this.loadMoreUsers()}
    listSelector="#list-in-container"
    lastItemSelector="div.boxed-item-last"
    bindToList={true}>

    <cwc-list 
        items={this.users}
        listId="list-in-container"
        wrapperClass='row d-flex justify-content-around mx-0 list-1-wrapper'
        addClassLast="boxed-item-last"
        addClass='my-3'>

        <div class="w-100">
          <div class="card rounded my-1 p-2 w-100 text-capitalize">
            <h3 class="my-0">
                [[= user.name.first ]] [[= user.name.last ]]
            </h3>
          </div>
        </div>

        </cwc-list>
</cwc-infinite-list-watcher>
                   `}
          </pre>

          <cwc-infinite-list-watcher
            onOnBottomReach={() => this.initUsers1()}
            listSelector="#list-in-container"
            lastItemSelector="div.boxed-item-last"
            debounce={1000}
            bindToList={true}
          >
            <cwc-list
              items={this.users1}
              itemAs="user"
              listId="list-in-container"
              wrapperClass="row d-flex justify-content-around mx-0 list-1-wrapper "
              addClassLast="boxed-item-last"
              addClass="my-1 shadow-sm p-3 mb-2 mx-2 bg-white rounded"
            >

              <div class="card rounded my-1 p-2 w-100 text-capitalize">
                <h3 class="my-0">
                  [[= user.name.first ]] [[= user.name.last ]]
                </h3>
              </div>

            </cwc-list>
          </cwc-infinite-list-watcher>

          <br />

          <h2 id="props">Props</h2>

          <table class="table mt-2">
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
                <td>
                  {" "}
                  {/* prop */}
                  <code>listSelector</code>
                </td>
                <td>
                  {" "}
                  {/* type */}
                  <code>String</code>
                </td>
                <td>
                  {" "}
                  {/* required */}
                  yes
                </td>
                <td>
                  {" "}
                  {/* default */}
                  <code>''</code>
                </td>
                <td>
                  {" "}
                  {/* description */}
                  Selector of the list element.
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  {/* prop */}
                  <code>lastItemSelector</code>
                </td>
                <td>
                  {" "}
                  {/* type */}
                  <code>String</code>
                </td>
                <td>
                  {" "}
                  {/* required */}
                  yes
                </td>
                <td>
                  {" "}
                  {/* default */}
                  <code>'.list-item-last'</code>
                </td>
                <td>
                  {" "}
                  {/* description */}
                  Selector of the last element of list.
                </td>
              </tr>
              <tr>
                <td>
                  <code>bindToList</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>no</td>
                <td>
                  <code>false</code>
                </td>
                <td>
                  Value which sets if component renders in fixed height wrapper
                  or with infinite height.
                </td>
              </tr>
              <tr>
                <td>
                  <code>debounce</code>
                </td>
                <td>
                  <code>number</code>
                </td>
                <td>no</td>
                <td>
                  <code>300</code>
                </td>
                <td>
                  Debounce time between fired{" "}
                  <code>&#39;onBottomReach&#39;</code> event
                </td>
              </tr>
              <tr>
                <td>
                  <code>bottomOffset</code>
                </td>
                <td>
                  <code>number</code>
                </td>
                <td>no</td>
                <td>
                  <code>false</code>
                </td>
                <td>
                  Offset in <code>px</code> from bottom of last list element.
                </td>
              </tr>
            </tbody>
          </table>

          <h2>
            Usage with <code>cwc-list</code> as infinite list.
          </h2>
        </div>
      </div>,

      <pre>
        {`
          <cwc-infinite-list-watcher
            onOnBottomReach={() => this.loadMoreUsers()}
            listSelector="#users-infinite"
            lastItemSelector=".custom-last"
            />

          <cwc-list
            id="users-infinite"
            items={this.users}
            itemAs="user"
            wrapperClass="row"
            addClassLast="custom-last"
            >
            <div class="card col-md-5 m-2 col-sm-12 shadow p-3 mb-2 mx-2 bg-white rounded">
              <div class="card-body">
                <div class="media">
                  <img
                    class="d-flex mr-3 rounded"
                    src="[[=user.picture.medium]]"
                    alt="Generic placeholder image"
                  />
                  <div class="media-body">
                    <h5 class="mt-0 capitalized">
                      [[=user.name.first]] [[=user.name.last]]
                    </h5>

                    <div>
                      <span class="capitalized">
                        [[=user.location.city]], [[=user.location.state]],
                      </span>
                      <span> [[=user.location.street]] </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </cwc-list>
          `}
      </pre>,

      <cwc-infinite-list-watcher
        onOnBottomReach={() => this.initUsers2()}
        listSelector="#users-infinite"
        lastItemSelector=".custom-last"
      />,

      <cwc-list
        id="users-infinite"
        items={this.users2}
        itemAs="user"
        wrapperClass="row"
        addClass="custom mxy-2"
        addClassEven="custom-even"
        addClassFirst="custom-first"
        addClassLast="custom-last"
      >
        <div class="card col-md-5 m-2 col-sm-12 shadow p-3 mb-2 mx-2 bg-white rounded">
          <div class="card-body">
            <div class="media">
              <img
                class="d-flex mr-3 rounded"
                src="[[=user.picture.medium]]"
                alt="Generic placeholder image"
              />
              <div class="media-body">
                <h5 class="mt-0 capitalized">
                  [[=user.name.first]] [[=user.name.last]]
                </h5>

                <div>
                  <span class="capitalized">
                    [[=user.location.city]], [[=user.location.state]],
                  </span>
                  <span> [[=user.location.street]] </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </cwc-list>
    ];
  }
}
