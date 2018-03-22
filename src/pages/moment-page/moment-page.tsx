import { Component } from '@stencil/core';

@Component({
    tag: 'moment-page',
})
export class MomentPage {
    render() {
        return (
            <div class="container pt-4">
                <h2 class="mb-4">Moment component </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h3>Usage </h3>
                                            <div>


                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <pre><code class="lang-tsx">
                                                <span>&lt;cwc-moment</span><br />
                                                <span class="hljs-built_in ml-4">date="2016-01-10 14:30"</span><br />
                                                <span class="hljs-built_in ml-4">format="L"</span><span>&gt;</span>
                                                <br />
                                                <span>&lt;/cwc-moment&gt;</span>
                                            </code></pre>

                                            outputs: <cwc-moment date="2016-01-10 14:30" format="L"></cwc-moment>
                                            <br />
                                            <pre><code class="lang-tsx">
                                                <span>&lt;cwc-moment</span><br />
                                                <span class="hljs-built_in ml-4">duration="123412341234123"</span><br />
                                                <span class="hljs-built_in ml-4">unit="seconds"</span><span>&gt;</span>
                                                <br />
                                                <span>&lt;/cwc-moment&gt;</span>
                                            </code></pre>

                                            outputs: <cwc-moment duration="123412341234123" unit="seconds"></cwc-moment>
                                            <br />
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
                                                <td>date</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>Date parameter</td>
                                            </tr>
                                            <tr>
                                                <td>format</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>
                                                    Format the Date e.g:<br />
                                                    <strong>LTS</strong>  : 'h:mm:ss A'<br />
                                                    <strong>LT</strong>   : 'h:mm A'<br />
                                                    <strong>L</strong>    : 'MM/DD/YYYY'<br />
                                                    <strong>LL</strong>   : 'MMMM D, YYYY'<br />
                                                    <strong>LLL</strong>  : 'MMMM D, YYYY h:mm A'<br />
                                                    <strong>LLLL</strong> : 'dddd, MMMM D, YYYY h:mm A'<br />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>duration</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>Duration</td>
                                            </tr>
                                            <tr>
                                                <td>unit</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>Duration Unit</td>
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
