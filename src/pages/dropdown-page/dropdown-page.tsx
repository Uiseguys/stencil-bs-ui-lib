import { Component } from '@stencil/core';


@Component({
    tag: 'dropdown-page',
    styleUrl: 'dropdown-page.scss'
})
export class StencilComponent {
    render() {
        return [
            <div class="container pt-4">
                <h2 class="mb-4">Dropdown component </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3">
                            <h3>Usage </h3>
                            <p>To set position of the dropdown component you can pass position and align variables: </p>
                            <div class="row">
                                <div class="col-lg-8">
                                    <cwc-dropdown id="officialExample">
                                        <button slot="dropdown-trigger" class="btn btn-primary" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Example dropdown </button>

                                        <div slot="dropdown-menu" class="dropdown-menu">
                                            <a class="dropdown-item" role="presentation" href="#">Static</a>
                                            <a class="dropdown-item" role="presentation" href="#">Dynamic</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" role="presentation" href="#">Third Item</a>
                                        </div>
                                    </cwc-dropdown>
                                </div>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <div class="col-12">
                                    <pre><code class="lang-tsx">
                                        &lt;cwc-<span class="hljs-built_in">dropdown</span>&gt;&lt;/cwc-<span class="hljs-built_in">dropdown</span>&gt;
                                    </code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
        ];
    }
}
