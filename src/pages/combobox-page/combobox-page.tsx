import { Component } from '@stencil/core';

@Component({
    tag: 'combobox-page'
})

export class ComboboxPage {
    render() {
        const data = ["Automatic", "Manual"];

        return (
            <div class="container pt-4">
                <h2 class="mb-4">Combobox component</h2>
                <div class="col-lg-12">
                    <cwc-combobox
                        data={data}
                        label="Dropdown"
                        btnText="Select"
                        btnLeftPosition
                        placeholder="Select a value"
                        readonly
                    />
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h3>Usage </h3>
                                            <p class="mt-1"></p>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <pre><code class="lang-tsx">
                                                &lt;cwc-<span class="hljs-built_in">dropdown</span><br />
                                                    &#9;data={data}<br />
                                                    &#9;label="Dropdown"<br />
                                                    &#9;btnText="Select"<br />
                                                    &#9;placeholder="Select a value"<br />
                                                    &#9;btnLeftPosition<br />
                                                    &#9;readonly<br />
                                                    /&gt; <br />
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
                                                <td>id</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>Sets an id on the input</td>
                                            </tr>
                                            <tr>
                                                <td>data</td>
                                                <td>Array&#60;string&#124;number&#62;</td>
                                                <td>[]</td>
                                                <td>Array of string or number data used in the dropdown selection</td>
                                            </tr>
                                            <tr>
                                                <td>label</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>Used for labeling the input group</td>
                                            </tr>
                                            <tr>
                                                <td>btnText</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>Button text</td>
                                            </tr>
                                            <tr>
                                                <td>btnLeftPosition</td>
                                                <td>boolean</td>
                                                <td>false</td>
                                                <td>If true, move the dropdown button to the left of the input</td>
                                            </tr>
                                            <tr>
                                                <td>placeholder</td>
                                                <td>string</td>
                                                <td>''</td>
                                                <td>Input placeholder</td>
                                            </tr>
                                            <tr>
                                                <td>readonly</td>
                                                <td>boolean</td>
                                                <td>false</td>
                                                <td>If true, the input will be readonly</td>
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
