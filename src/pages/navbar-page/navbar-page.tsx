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
                                    <scb-navbar id="navbarSupportedContent">
                                        <a slot="slot-navbar-brand" class="navbar-brand" href="#">Navbar</a>

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
                    </div>
                </div>
            </div>
        )
    }
}
