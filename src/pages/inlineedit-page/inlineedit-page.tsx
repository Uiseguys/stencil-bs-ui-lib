import { Component, State, Listen } from '@stencil/core';

@Component({
    tag: 'inlineedit-page',
})
export class InlineeditPage {

    @State() changeResult;

    @Listen('onchange')
    stateChangeHandler(e) {
        console.log('got results: ', e.detail)
        this.changeResult = e.detail
    }

    render() {
        return (
            <div class="container pt-4">
                <h2 class="mb-4">Inlineedit component </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="pt-3">
                            <div class="row">
                                <div class="col-lg-12">
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
                                                <span>&lt;cwc-inlineedit</span><br />
                                                <span class="hljs-built_in ml-4">label="Field label"</span><br />
                                                <span class="hljs-built_in ml-4">value="Example of text"</span><span>&gt;</span>
                                                <br />
                                                <span>&lt;/cwc-inlineedit&gt;</span>
                                            </code></pre>

                                            outputs:<br/><br/> 
                                            <cwc-inlineedit
                                                        label="Field label"
                                                        value="Example of text"
                                                    >
                                            </cwc-inlineedit>
                                            <br />
                                            <pre>onchange event: {this.changeResult}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
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
                                                <td>label</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>Field label</td>
                                            </tr>   
                                            <tr>
                                                <td>value</td>
                                                <td>String</td>
                                                <td>'A field value'</td>
                                                <td>Field value</td>
                                            </tr>       
                                            <tr>
                                                <td>onchange</td>
                                                <td>Event</td>
                                                <td></td>
                                                <td>Handler called when input is changed.</td>
                                            </tr>   
                                            <tr>
                                                <td>onconfirm</td>
                                                <td>Event</td>
                                                <td></td>
                                                <td>Handler called when checkmark is clicked. Also by default called when the input loses focus.</td>
                                            </tr>  
                                            <tr>
                                                <td>oncancel</td>
                                                <td>Event</td>
                                                <td></td>
                                                <td>Handler called when the cross is clicked on.</td>
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
