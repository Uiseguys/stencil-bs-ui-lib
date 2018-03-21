import { Component } from '@stencil/core';

@Component({
    tag: 'tabs-page',
})
export class TabsPage {
    render() {
        return (
            <div class="container pt-4">
                <h2>Tabs component</h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h3>Usage </h3>
                                    <p>
                                    You've to use the component `stc-tab-header` to render a tab header and the component `stc-tab-content` to render the tab header content. 
                                    The prop <b>name</b> value should be equal for `stc-tab-header` and `stc-tab-content`.
                                    </p>
                                    <div class="bg-white p-2">
                                        <stc-tabs> 
                                            <stc-tab-header slot="header" name="tab1">Tab 1</stc-tab-header>
                                            <stc-tab-header slot="header" name="tab2">Tab 2</stc-tab-header>
                                            <stc-tab-content class="mx-1" slot="content" name="tab1">
                                                Content 1
                                            </stc-tab-content>
                                            <stc-tab-content class="mx-1" slot="content" name="tab2">
                                                Content 2
                                            </stc-tab-content>
                                        </stc-tabs>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-lg-6">
                                    <pre><code class="lang-tsx">
                                    <span>&lt;stc-tabs&gt;</span><br />
                                    <span class="hljs-built_in ml-4">&lt;stc-tab-header slot="header" name="tab1"&gt;Tab 1&lt;/stc-tab-header&gt;</span><br />
                                    <span class="hljs-built_in ml-4">&lt;stc-tab-header slot="header" name="tab2"&gt;Tab 2&lt;/stc-tab-header&gt;</span><br />
                                    <br />
                                    <span class="hljs-built_in ml-4">&lt;stc-tab-content slot="content" name="tab1"&gt;</span><br />
                                    <span class="hljs-built_in ml-4">Content 1</span><br />
                                    <span class="hljs-built_in ml-4">&lt;/stc-tab-content&gt;</span><br />
                                    <br />
                                    <span class="hljs-built_in ml-4">&lt;stc-tab-content slot="content" name="tab2"&gt;</span><br />
                                    <span class="hljs-built_in ml-4">Content 2</span><br />
                                    <span class="hljs-built_in ml-4">&lt;/stc-tab-content&gt;</span><br />
                                    <br />                                    
                                    <span>&lt;/stc-tabs&gt;</span>
                                    </code></pre>
                                </div>
                                <div class="col-lg-6">     
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Param</th>
                                                <th>Type</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>name</td>
                                                <td>String</td>
                                                <td>Identifier to group the content and header</td>
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