import { Component, Event, EventEmitter, State } from '@stencil/core';

/* tslint:disable:member-ordering max-line-length */


@Component({
    tag: 'navigation-page',
    styleUrl: 'navigation-page.scss'
})
export class NavigationPage {

    iconsShown = true;

    @Event() shownavigationtoggle: EventEmitter;
    @Event() shownavigationcontainertoggle: EventEmitter;
    @Event() naviconstoggle: EventEmitter;
    @Event() navigationcomponentnumber: EventEmitter;


    @State() collapse1: boolean = false;
    @State() collapse2: boolean = false;
    @State() collapse3: boolean = false;


    toggleContainerShownClickHandler() {
        this.shownavigationcontainertoggle.emit()
    }
    toggleShowIconsClickHandler() {
        this.naviconstoggle.emit()
    }

    showDemoHandler(i) {
        this.shownavigationtoggle.emit(i)
    }





    @Event() navigationshowcontrol: EventEmitter;



    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-10 col-sm-12">

                        <h2>Navigation Component</h2>


                        <h3 class="api-header">Overview</h3>


                        <p>This is a navigation component made with Atlassian's design guidelines and concepts.</p>
                        <p>It consist of main <code>&lt;cwc-navigation &#x2F;&gt;</code> component and it nested helper components such as:
                        <h5 class="lead mx-2 mt-2">containers:</h5>
                            <ul class="">

                                <li><code>&lt;cwc-navigation-container-section&gt;</code></li>
                                <li><code>&lt;cwc-navigation-global-section&gt;</code></li>

                            </ul>
                            <h5 class="lead mx-2">nested items:</h5>
                            <ul >

                                <li><code>&lt;cwc-navigation-global-item&gt;</code></li>
                                <li><code>&lt;navigation-title&gt;</code></li>
                                <li><code>&lt;navigation-item&gt;</code></li>
                                <li><code>&lt;navibation-item-group&gt;</code></li>

                            </ul>

                        </p>
                        <p>
                            You can use this nested items for quick component protyping (recommended way) or use your own. <br />

                        </p>



                        <h3 class="api-header"> Navigaton component api</h3>
                        <p>
                            The global navigation section is to the far left, and is designed only to display icons.&nbsp;
                            It has primary actions at the top, and secondary actions at the bottom.
                            The container navigation is the right side of the navigation bar, and is where most navigation items should live.
                            The container can be collapsed and expanded.

                            This component has three named slots to place your content: <br />
                            <code>&lt;div slot="primary-actions" /&gt;</code>,<br />
                            <code>&lt;div slot="secondary-actions" /&gt;</code>,<br />
                            <code>&lt;div slot="container-actions" /&gt;</code>.
                        </p>


                        <h3 class="api-header"> Navigation component props</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>isCollapsed</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>true</code></td>
                                    <td>Is container section collapsed or not.</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 class="api-header">Usage</h3>

                        <h5>Basic slots schema:</h5>
                        <p>
                            <div class="btn btn-outline-primary" onClick={() => this.collapse1 = this.booleanToggler(this.collapse1)}>
                                Show/hide code snippet
                            </div>
                        </p>
                        <div class={`collapse ${this.collapse1 ? 'show' : ''}`} id="collapseExample">
                            <div class="card card-body border rounded">
                                <pre class="code-snippet">
                                    <code>
                                        {this.usageText1}
                                    </code>
                                </pre>
                            </div>
                        </div>


                        <h5>Demo usage with navigation components:</h5>

                        <p>
                            <div class="btn btn-outline-primary" onClick={() => this.collapse2 = this.booleanToggler(this.collapse2)}>
                                Show/hide code snippet
                            </div>

                            <div class="btn btn-sm btn-primary mx-2" onClick={() => this.showDemoHandler(1)}>Toggle shown</div>
                            <div class="btn btn-sm btn-primary mx-2" onClick={() => this.toggleContainerShownClickHandler()}>Toggle navigation</div>
                            <div class="btn btn-sm btn-primary mx-2" onClick={() => this.toggleShowIconsClickHandler()}>Toggle icons</div>
                        </p>


                        <div class={`collapse ${this.collapse2 ? 'show' : ''}`} id="collapseExample">
                            <div class="card card-body border rounded">
                                <pre class="code-snippet">
                                    <code>
                                        {this.usageText2}
                                    </code>
                                </pre>
                            </div>
                        </div>


                        <h5>Demo usage with regular html and stencil components in the slots:</h5>

                        <p>
                            <div class="btn btn-outline-primary" onClick={() => this.collapse3 = this.booleanToggler(this.collapse3)}>
                                Show/hide code snippet
                            </div>

                            <div class="btn btn-sm btn-primary mx-2" onClick={() => this.showDemoHandler(2)}>Toggle shown</div>
                        </p>


                        <div class={`collapse ${this.collapse3 ? 'show' : ''}`} id="collapseExample">
                            <div class="card card-body border rounded">
                                <pre class="code-snippet">
                                    <code>
                                        {this.usageText3}
                                    </code>
                                </pre>
                            </div>
                        </div>


                        <h3 class="api-header">Nested components</h3>

                        <h5>Global navigation item</h5>

                        <p>
                            A <code>&lt;cwc-navigation-global-item &#x2F;&gt;</code> component which must be used in primary (top) or secondary (bottom) actions of global container of the navigation component.
                        Can have title, link, active state and icon.
                        </p>
                        <pre><code>
                            {this.navigationGlobalItem}
                        </code></pre>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Required</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>icon</code></td>
                                    <td><code>string</code></td>
                                    <td>yes</td>
                                    <td>Path to the icon.</td>
                                </tr>
                                <tr>
                                    <td><code>titleText</code></td>
                                    <td><code>string</code></td>
                                    <td>no</td>
                                    <td>Title of the element (appears on hover).</td>
                                </tr>
                                <tr>
                                    <td><code>link</code></td>
                                    <td><code>string</code></td>
                                    <td>no</td>
                                    <td>If specified, element is rendered as link.</td>
                                </tr>
                                <tr>
                                    <td><code>isActive</code></td>
                                    <td><code>boolean</code></td>
                                    <td>no</td>
                                    <td>Active state toggler.</td>
                                </tr>
                            </tbody>
                        </table>



                        <h5>Navigation item</h5>

                        <p>
                            <code>&lt;navigation-item &#x2F;&gt;</code> is a main component to show menu items in container section.
                            It can contain an icon at left, <code>`dropIcon`</code> at right, subtitle or can be renderred as link.
                        </p>
                        <pre><code>{this.navigationItem}</code></pre>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Required</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>text</code></td>
                                    <td><code>string</code></td>
                                    <td>yes</td>
                                    <td>Text of the item.</td>
                                </tr>
                                <tr>
                                    <td><code>subtext</code></td>
                                    <td><code>string</code></td>
                                    <td>no</td>
                                    <td>Subtext at bottom.</td>
                                </tr>
                                <tr>
                                    <td><code>titleText</code></td>
                                    <td><code>string</code></td>
                                    <td>no</td>
                                    <td>Title of the element (appears on hover).</td>
                                </tr>
                                <tr>
                                    <td><code>icon</code></td>
                                    <td><code>string</code></td>
                                    <td>no</td>
                                    <td>Path to the icon.</td>
                                </tr>

                                <tr>
                                    <td><code>showIcon</code></td>
                                    <td><code>boolean</code></td>
                                    <td>no</td>
                                    <td>Is main icon shown or not.</td>
                                </tr>

                                <tr>
                                    <td><code>dropIcon</code></td>
                                    <td><code>string</code></td>
                                    <td>no</td>
                                    <td>Icon at right of item text.</td>
                                </tr>
                                <tr>
                                    <td><code>link</code></td>
                                    <td><code>string</code></td>
                                    <td>no</td>
                                    <td>If specified, element is rendered as link.</td>
                                </tr>
                                <tr>
                                    <td><code>isActive</code></td>
                                    <td><code>boolean</code></td>
                                    <td>no</td>
                                    <td>Active state toggler.</td>
                                </tr>
                            </tbody>
                        </table>









                        <h5>Navigation title</h5>

                        <p>
                            <code>&lt;navigation-title &#x2F;&gt;</code> is a title component.
                        </p>
                        <pre><code>{this.navigationTitle}</code></pre>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Required</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>text</code></td>
                                    <td><code>string</code></td>
                                    <td>yes</td>
                                    <td><code>''</code></td>
                                    <td>Text of element.</td>
                                </tr>
                                <tr>
                                    <td><code>icon</code></td>
                                    <td><code>string</code></td>
                                    <td>yes</td>
                                    <td><code>''</code></td>
                                    <td>Path to the icon.</td>
                                </tr>
                                <tr>
                                    <td><code>titleText</code></td>
                                    <td><code>string</code></td>
                                    <td>no</td>
                                    <td></td>
                                    <td>Title of the element (appears on hover).</td>
                                </tr>
                                <tr>
                                    <td><code>showIcon</code></td>
                                    <td><code>boolean</code></td>
                                    <td>no</td>
                                    <td><code>true</code></td>
                                    <td>Title of the element (appears on hover).</td>
                                </tr>
                            </tbody>
                        </table>


                        <h5>Navigation item group</h5>

                        <p>
                            <code>&lt;navigation-item-group &#x2F;&gt;</code> is a wrapper for navigation items with text, title, and optional separator.
                            Content projection is performed by named slot <code>&lt;slot name="navigation-items" &#x2F;&gt;</code>
                        </p>
                        <pre><code>{this.navigationGroup}</code></pre>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Required</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>text</code></td>
                                    <td><code>string</code></td>
                                    <td>no</td>
                                    <td><code>''</code></td>
                                    <td>Text of element.</td>
                                </tr>
                                <tr>
                                    <td><code>titleText</code></td>
                                    <td><code>string</code></td>
                                    <td>no</td>
                                    <td><code>''</code></td>
                                    <td>Text of element.</td>
                                </tr>
                                <tr>
                                    <td><code>hasSeparator</code></td>
                                    <td><code>boolean</code></td>
                                    <td>no</td>
                                    <td><code>'true'</code></td>
                                    <td>Will be rendered separator or not.</td>
                                </tr>

                            </tbody>
                        </table>









                    </div>
                </div>


            </div >
        );
    }


    booleanToggler(bool: boolean): boolean {
        return !bool;
    }

    usageText1 = `
    <cwc-navigation isCollapsed={this.navContainerShown}>
        <div slot="primary-actions">

            {/* Top left container */}

        </div>

        <div slot="secondary-actions">

            {/* Bottom left container */}

        </div>

        <div slot="container-actions">

            {/* Collapsable right */}

        </div>

    </cwc-navigation>

    `

    usageText2 = `
    
           <cwc-navigation isCollapsed={this.isNavigationShown}>

                <div slot="primary-actions">

                        <cwc-navigation-global-item
                            titleText={'Title text'}
                            icon="./assets/icon-1.png" />
                        <cwc-navigation-global-item
                            titleText={'Title text'}
                            icon="./assets/icon/icon-2.png" />
                        <cwc-navigation-global-item isActive={true}
                            titleText={'Title text'}
                            icon="./assets/icon/path-to-icon.png" />

                </div>


                <div slot="secondary-actions">
                        <cwc-navigation-global-item
                            titleText={'Secondary action'}
                            icon="./assets/icon/path-to-icon.png" />
                </div>


                <div slot="container-actions">
                        <navigation-title text="Nav Title"
                            icon="./assets/icon/path-to-icon.png" />


                        <navigation-item-group text="Actions group">

                                <div slot="navigation-items">

                                        <navigation-item showIcon={this.isIconsShown} text="Navigation item" />
                                        <navigation-item showIcon={this.isIconsShown} isActive={true} text={'Active nav item with subtext'}
                                            subText="Subtext of nav item" />
                                        <navigation-item showIcon={this.isIconsShown} text="Basic link" />

                                        <navigation-item showIcon={this.isIconsShown} text="With drop icon"
                                            dropIcon="./assets/path-to-icon.png" />

                                </div>
                        </navigation-item-group>

                <navigation-item-group text="Group with separator" hasSeparator={true}>

                        <div slot="navigation-items">
                                <navigation-item showIcon={this.isIconsShown} text="With dropicon and loooong subtext"
                                    subText="My small subtext"
                                    icon={'./assets/path-to-icon.png'}
                                    dropIcon={'./assets/path-to-icon.png'} />

                                <navigation-item showIcon={this.isIconsShown} text="With dropicon and subtext"
                                    subText="My small subtext"
                                    icon={'./assets/path-to-icon.png'}
                                    dropIcon={'./assets/path-to-icon.png'} />

                                <navigation-item showIcon={this.isIconsShown} text="With mouse events" />
                        </div>
                </navigation-item-group>

                </div>

          </cwc-navigation>

    `

    usageText3 = `
    
      <cwc-navigation isCollapsed={true}>

          <div slot="primary-actions">

            <h3><span class="badge badge-primary">St</span></h3>
            <h3><span class="badge badge-info">St</span></h3>
            <h3><span class="badge badge-secondary">St</span></h3>

          </div>


          <div slot="secondary-actions">
            <cwc-avatar name='John Do' size={42} rounded > </cwc-avatar>
          </div>


        </cwc-navigation>

    `
    navigationGlobalItem = ` 
    <cwc-navigation-global-item
            titleText={'Title text'}
            link="https://github.com"
            icon="./path-to-icon.png" />`

    navigationTitle = `
    <navigation-title text="Nav Title"
            showIcon={true}
            icon="./path-to-icon.png" />`

    navigationItem = `
    <navigation-item showIcon={this.isIconsShown} text="With dropicon and subtext."
            subText="My small subtext"
            icon={'./assets/icon/path-to-icon.png'}
            dropIcon={'./assets/icon/path-to-dropicon.png'} />
    `

    navigationGroup = `
    
            <navigation-item-group text="Actions group">

              <div slot="navigation-items">

                <navigation-item text="Navigation item" />
                <navigation-item link="https://google.com" text="Basic link" />

              </div>
            </navigation-item-group>

    `
}


