import { Component } from '@stencil/core';

@Component({
    tag: 'my-checkbox-page',
    styleUrl: 'my-checkbox-page.scss'
})

export class MyCheckboxPage {
    onChange() {

    };

    render() {
        return (
            <div class="container pt-4" >
                <h2 class="mb-4">Checkbox Component</h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3" >
                            <div class="row">
                                <div class="col-lg-2">
                                    <div class="row">
                                        <my-checkbox id="testcheckbox" checkboxTitle="Text CheckBox" onPostValue={this.onChange} value={false}></my-checkbox>
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
                                            <td><code>checkboxTitle</code></td>
                                            <td><code>String</code></td>
                                            <td><code>''</code></td>
                                            <td>This is use to show the label after the checkbox.</td>
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
