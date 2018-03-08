import { Component } from '@stencil/core';

@Component({
    tag: 'tooltip-page',
})
export class TolltipPage {
    render() {
        return (
            <div class="container pt-4" >
                <h2 class="mb-4">Tooltip component </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3" >
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h3>Usage </h3>
                                            <div>
                                                <scb-tooltip
                                                    type="link"
                                                    href="https://stencil-bs-ui-lib.herokuapp.com/"
                                                    target="_blank"
                                                    tooltipTitle="Tooltip content"
                                                    placement="top"
                                                    trigger="hover focus click">
                                                    <span slot="btn-content">Btn text</span>
                                                </scb-tooltip>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <pre><code class="lang-tsx">
                                                <span>&lt;scb-tooltip</span><br />
                                                <span class="hljs-built_in ml-4">type="link"</span><br />
                                                <span class="hljs-built_in ml-4">href="https://stencil-bs-ui-lib.herokuapp.com/"</span><br />
                                                <span class="hljs-built_in ml-4">target="_blank"</span><br />
                                                <span class="hljs-built_in ml-4">tooltipTitle="Tooltip content"</span><br />
                                                <span class="hljs-built_in ml-4">placement="top"</span><br />
                                                <span class="hljs-built_in ml-4">trigger="hover focus click"</span>
                                                <span>&gt;</span>
                                                <br />
                                                <span>&lt;/scb-tooltip&gt;</span>
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
                                                <td>type</td>
                                                <td>String</td>
                                                <td>'span'</td>
                                                <td>How tooltip is displayed - as a link, button or span</td>
                                            </tr>
                                            <tr>
                                                <td>href</td>
                                                <td>String</td>
                                                <td>'#'</td>
                                                <td>Set href to a link type tooltip. Only of type is 'link'.</td>
                                            </tr>
                                            <tr>
                                                <td>target</td>
                                                <td>String</td>
                                                <td>'_blank'</td>
                                                <td>The target property sets or returns the value of the target attribute of a link. The target attribute specifies where to open the linked document - '_blank', '_self', '_parent', '_top'</td>
                                            </tr>
                                            <tr>
                                                <td>tooltipTitle</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>Default title value if title attribute isn’t present.</td>
                                            </tr>
                                            <tr>
                                                <td>placement</td>
                                                <td>String</td>
                                                <td>bottom</td>
                                                <td>Placement of the popper accepted values: top, right, bottom, left</td>
                                            </tr>
                                            <tr>
                                                <td>delay</td>
                                                <td>Number | Object</td>
                                                <td>0</td>
                                                <td>Delay showing and hiding the tooltip (ms) - does not apply to manual trigger type. If a number is supplied, delay is applied to both hide/show. Object structure is: &#123; show: 500, hide: 100 &#125;</td>
                                            </tr>
                                            <tr>
                                                <td>trigger</td>
                                                <td>String</td>
                                                <td>'hover focus'</td>
                                                <td>How tooltip is triggered - click, hover, focus. You may pass multiple triggers; separate them with a space.</td>
                                            </tr>
                                            <tr>
                                                <td>offset</td>
                                                <td>Number | String</td>
                                                <td>0</td>
                                                <td>Offset of the tooltip relative to its reference. For more information refer to Popper.js’ <a href="https://popper.js.org/popper-documentation.html">offset docs</a>.</td>
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
