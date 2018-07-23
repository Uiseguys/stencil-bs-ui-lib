import { Component } from '@stencil/core';

@Component({
    tag: 'my-switch-page',
    styleUrl: 'my-switch-page.scss'
})

export class MySwitchPage {
    onChange() {
        //console.log("event", event);
    };

    render() {
        return (
            <div class="container pt-4" >
                <h2 class="mb-4">Switch Component</h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3" >
                            <div class="row">
                                <div class="col-lg-2">
                                    <div class="row">
                                        <cwc-switch id="testswitch" onPostValue={this.onChange} labelON="On" labelOFF="Off" value={true} ></cwc-switch>
                                    </div>
                                </div>

                                <div class="col-lg-10">
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
                                            <td><code>id</code></td>
                                            <td><code>String</code></td>
                                            <td><code>''</code></td>
                                            <td>The Id used to identify uniquecly</td>
                                        </tr>
                                        <tr>
                                            <td><code>for</code></td>
                                            <td><code>String</code></td>
                                            <td><code>''</code></td>
                                            <td>The for attribute specifies which form element a label is bound to.</td>
                                        </tr>
                                        <tr>
                                            <td><code>value</code></td>
                                            <td><code>Boolean</code></td>
                                            <td><code>false</code></td>
                                            <td>Use to set the checkbox status checked or unchecked, Default value is <code>false</code>.</td>
                                        </tr>
                                        <tr>
                                            <td><code>onPostValue</code></td>
                                            <td><code>function</code></td>
                                            <td><code>''</code></td>
                                            <td>This will called when value will change.</td>
                                        </tr>
                                        <tr>
                                            <td><code>labelON</code></td>
                                            <td><code>String</code></td>
                                            <td><code>''</code></td>
                                            <td>This label will show when switch value is <code>true</code></td>
                                        </tr>
                                        <tr>
                                            <td><code>labelOFF</code></td>
                                            <td><code>String</code></td>
                                            <td><code>''</code></td>
                                            <td>This label will show when switch value is <code>false</code></td>
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
