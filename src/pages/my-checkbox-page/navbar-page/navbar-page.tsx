import { Component } from '@stencil/core';

@Component({
    tag: 'navbar-page',
})
export class NavbarPage {
    render() {
        return (
            <div class="container pt-4">
                <h2>Navbar component</h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h3>Usage </h3>
                                    <p>If setting a 'navbar-brand' element, set the 'slot="slot-navbar-brand-left"' attribute to show the element on the left side of the 'navbar-toggler' element. Set 'slot="slot-navbar-brand-right"', otherwise. Remove the 'slot' attribute and insert the 'navbar-brand' into 'slot="slot-navbar-content"' element if you don't want it to be shown when 'navbar-toggler' element is visible.</p>
                                    <div>
                                        <scb-navbar
                                            size="lg"
                                            navbarcolor="light"
                                            bgcolor="light"
                                            placement=''>
                                            <a slot="slot-navbar-brand-left" class="navbar-brand" href="#">Navbar</a>

                                            <ul slot="slot-navbar-content" class="navbar-nav mr-auto">
                                                <li class="nav-item active">
                                                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" href="#">Link</a>
                                                </li>
                                                <li class="nav-item dropdown">
                                                    <cwc-dropdown id="example1">
                                                        <a slot="dropdown-trigger" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Todos</a>

                                                        <div slot="dropdown-menu" class="dropdown-menu">
                                                            <a class="dropdown-item" role="presentation" href="#">Static</a>
                                                            <a class="dropdown-item" role="presentation" href="#">Dynamic</a>
                                                            <div class="dropdown-divider"></div>
                                                            <a class="dropdown-item" role="presentation" href="#">Third Item</a>
                                                        </div>
                                                    </cwc-dropdown>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link disabled" href="#">Disabled</a>
                                                </li>
                                            </ul>
                                        </scb-navbar>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-lg-4">
                                    <pre><code class="lang-tsx">
                                        <span>&lt;scb-navbar</span><br />
                                        <span class="hljs-built_in ml-4">size="lg"</span><br />
                                        <span class="hljs-built_in ml-4">navbarcolor="light"</span><br />
                                        <span class="hljs-built_in ml-4">bgcolor="light"</span><br />
                                        <span class="hljs-built_in ml-4">placement=''</span>
                                        <span>&gt;</span>
                                        <br />
                                        <span>&lt;/scb-navbar&gt;</span>
                                    </code></pre>
                                </div>
                                <div class="col-lg-8">
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
                                                <td>size</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>For responsive collapsing set appropriate class to .navbar-expand-&#123;&#125;. Accepted values are: '<strong>sm</strong>', <strong>'md</strong>', '<strong>lg</strong>' or '<strong>xl</strong>'. For navbars that never collapse, leave the property empty.</td>
                                            </tr>
                                            <tr>
                                                <td>navbarcolor</td>
                                                <td>String</td>
                                                <td>'light'</td>
                                                <td>Theming classes. Accepted values are: '<strong>light</strong>' or '<strong>dark</strong>'.</td>
                                            </tr>
                                            <tr>
                                                <td>bgcolor</td>
                                                <td>String</td>
                                                <td>'light'</td>
                                                <td>Background color classes. Accepted values are: '<strong>primary</strong>', '<strong>secondary</strong>', '<strong>success</strong>', '<strong>danger</strong>', '<strong>warning</strong>', '<strong>info</strong>', '<strong>light</strong>' or '<strong>dark</strong>'.</td>
                                            </tr>
                                            <tr>
                                                <td>placement</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>Choose from fixed to the top, fixed to the bottom, or stickied to the top (scrolls with the page until it reaches the top, then stays there). Fixed navbars use position: fixed. Also note that .sticky-top uses position: sticky, which <a href="https://caniuse.com/#feat=css-sticky" target="_blank">isn’t fully supported in every browser</a>. <br />Accepted values are: '<strong>position-static</strong>', '<strong>position-relative</strong>', '<strong>position-absolute</strong>', '<strong>position-fixed</strong>', '<strong>position-sticky</strong>', '<strong>fixed-top</strong>', '<strong>fixed-bottom</strong>', '<strong>sticky-top</strong>'. </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
