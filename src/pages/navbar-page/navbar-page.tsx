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
                                            id="navbarSupportedContent"
                                            size="lg"
                                            navbarColor="light"
                                            bgColor="light"
                                            placement=''>
                                            <a slot="slot-navbar-brand-left" class="navbar-brand" href="#">Navbar</a>

                                            <div slot="slot-navbar-content" id="navbarSupportedContent" class="collapse navbar-collapse">
                                                <ul class="navbar-nav mr-auto">
                                                    <li class="nav-item active">
                                                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#">Link</a>
                                                    </li>
                                                    <li class="nav-item dropdown">
                                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <a class="dropdown-item" href="#">Action</a>
                                                            <a class="dropdown-item" href="#">Another action</a>
                                                            <div class="dropdown-divider"></div>
                                                            <a class="dropdown-item" href="#">Something else here</a>
                                                        </div>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link disabled" href="#">Disabled</a>
                                                    </li>
                                                </ul>

                                                <form class="form-inline my-2 my-lg-0">
                                                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                                </form>
                                            </div>
                                        </scb-navbar>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-lg-4">
                                    <pre><code class="lang-tsx">
                                        <span>&lt;scb-navbar</span><br />
                                        <span class="hljs-built_in ml-4">id="navbarSupportedContent"</span><br />
                                        <span class="hljs-built_in ml-4">size="lg"</span><br />
                                        <span class="hljs-built_in ml-4">navbarColor="light"</span><br />
                                        <span class="hljs-built_in ml-4">bgColor="light"</span><br />
                                        <span class="hljs-built_in ml-4">placement=''</span>
                                        <span>&gt;</span>
                                        <br />
                                        <span>&lt;/cwc-navbar&gt;</span>
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
                                                <td>id</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>Set the same id as 'collapse navbar-collapse' element for the 'navbar-toggler' button element to work.</td>
                                            </tr>
                                            <tr>
                                                <td>size</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>For responsive collapsing set appropriate class to .navbar-expand-&#123;&#125;. Accepted values are: '<strong>sm</strong>', <strong>'md</strong>', '<strong>lg</strong>' or '<strong>xl</strong>'. For navbars that never collapse, leave the property empty.</td>
                                            </tr>
                                            <tr>
                                                <td>navbarColor</td>
                                                <td>String</td>
                                                <td>'light'</td>
                                                <td>Theming classes. Accepted values are: '<strong>light</strong>' or '<strong>dark</strong>'.</td>
                                            </tr>
                                            <tr>
                                                <td>bgColor</td>
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
