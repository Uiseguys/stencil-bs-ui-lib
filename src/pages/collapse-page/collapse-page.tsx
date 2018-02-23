import { Component } from '@stencil/core';

@Component({
    tag: 'collapse-page',
})
export class CollapsePage {
    cards: any[] = [
        {
            cardHeaderId: 'heading#1',
            cardBodyId: 'collapse#1',
            cardHeaderContent: 'Card Item #1',
            cardBodyContent: 'Card Body #1',
            showOnInit: true
        },
        {
            cardHeaderId: 'heading#2',
            cardBodyId: 'collapse#2',
            cardHeaderContent: 'Card Item #2',
            cardBodyContent: 'Card Body #2',
            showOnInit: false
        },
        {
            cardHeaderId: 'heading#3',
            cardBodyId: 'collapse#3',
            cardHeaderContent: 'Card Item #3',
            cardBodyContent: 'Card Body #3',
            showOnInit: false
        }
    ];

    render() {
        return (
            <div class="container pt-4" >
                <h2 class="mb-4">Collapse component </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3" >
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h3>Usage </h3>
                                            <div>
                                                <scb-collapse
                                                    collapseid="collpaseComponent"
                                                    items={this.cards}>
                                                </scb-collapse>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <pre><code class="lang-tsx">
                                                <span>&lt;scb-collapse</span><br />
                                                <span class="hljs-built_in ml-4">collapseid="collpaseComponent"</span><br />
                                                <span class="hljs-built_in ml-4">items=[Objects]</span>
                                                <span>&gt;</span>
                                                <br />
                                                <span>&lt;/scb-collapse&gt;</span>
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
                                                <td>collapseid</td>
                                                <td>String</td>
                                                <td>'collpaseComponent'</td>
                                                <td>Unique identifier for a collapse component.</td>
                                            </tr>
                                            <tr>
                                                <td>items</td>
                                                <td>Array[Objects]</td>
                                                <td>
                                                    <pre><code class="lang-tsx">
                                                        &#91;&#123;<br />
                                                            cardHeaderId: 'heading#1',<br />
                                                            cardBodyId: 'collapse#1',<br />
                                                            cardHeaderContent: 'Card Item #1',<br />
                                                            cardBodyContent: 'Card Body #1',<br />
                                                            showOnInit: true<br />
                                                        &#125;&#93;
                                                    </code></pre>
                                                </td>
                                                <td>You create cards by creating objects with the given parameters. 'cardHeaderId' and 'cardBodyId' must be unique for each object and between themselves in an object. Set the collapsible element to be open by default using the 'showOnInit'.</td>
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
