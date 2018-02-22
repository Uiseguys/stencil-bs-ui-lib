import { Component } from '@stencil/core';

@Component({
    tag: 'stencil-bootstrap-demo',
})
export class StencilBootstrapDemo {
    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 text-center">
                        <h1>
                            Web Components for Bootstrap 4 Beta
                        </h1>

                        <p>
                            Built with <a href="https://stenciljs.com" target="blank">Stencil</a> &lt;3
                        </p>
                    </div>
                </div>

                <div class="row">
                    <div>
                       <navbar-page></navbar-page>
                    </div>
                </div>
            </div>
        );
    }
}
