import { Component } from '@stencil/core';

@Component({
    tag: 'popper-page',
})
export class TolltipPage {
    render() {
        return (
            <div class="container pt-4" >
                <h2 class="mb-4">Popper component </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3" >
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="row">
                                        <h3 id="test">Usage </h3>
                                        <div>
                                            <cwc-popper
                                                arrow
                                                placement="left"
                                                refid="test"
                                                trigger="hover">
                                                <div slot="dropdown-menu" class="dropdown-menu" >
                                                    <div class="dropdown-item" data-value="Automatic">Automatic</div>
                                                    <div class="dropdown-item" data-value="Manual" >Manual</div>
                                                </div>
                                            </cwc-popper>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <pre><code class="lang-tsx">
                                                <span>&lt;cwc-popper</span><br />
                                                <span class="hljs-built_in ml-4">refid="Div1"</span><br />
                                                <span class="hljs-built_in ml-4">placement="top"</span><br />
                                                <span class="hljs-built_in ml-4">trigger="hover"</span><br />
                                                <span class="hljs-built_in ml-4">arrow</span>
                                                <span>&gt;</span>
                                                <br />
                                                <span>&lt;/cwc-popper&gt;</span>
                                            </code></pre>
                                        </div>
                                    </div>
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
                                            <td>refid</td>
                                            <td>String</td>
                                            <td>'div1'</td>
                                            <td>Id of the target element were we need to show popup. If we new set refid by default this will show parallel to mouse pointer</td>
                                        </tr>
                                        <tr>
                                            <td>placement</td>
                                            <td>String</td>
                                            <td>bottom</td>
                                            <td>Placement of the popper accepted values: top, right, bottom, left</td>
                                        </tr>
                                        <tr>
                                            <td>trigger</td>
                                            <td>String</td>
                                            <td>'hover'</td>
                                            <td>How tooltip is triggered - click, hover, focus. You need to pass single triggers;</td>
                                        </tr>
                                        <tr>
                                            <td>arrow</td>
                                            <td>Boolean</td>
                                            <td>true</td>
                                            <td>Use for showing arrow on popper, Default value is `true`.</td>
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
