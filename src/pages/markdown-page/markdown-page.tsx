import { Component } from '@stencil/core';

@Component({
    tag: 'markdown-page',
    styleUrl: 'markdown-page.scss'
})
export class MarkdownPage {
    markdownContent: string = "### Holla link"
    markdownContent1: string = "# Header1" +
    " \n This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5." +
    "\n ## Header 2" +
    "\n Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io)." +
    "\n ## Running end-to-end tests" +
    "\n Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/)." +
    "\n ### Bug Fixes" +
    "\n * **common:** more detailed info about error" +
    "\n `fix(common): more detailed info about error`"

    render() {
        return [

            <div class="container mb-5">

                <h1 class="display-4 ">Markdown component</h1>

                <h3>API</h3>
                <h4 class="my-3">Props</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>PropType</th>
                            <th>Required?</th>
                            <th>defaultValue</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>data</code></td>
                            <td><code>string</code></td>
                            <td>yes</td>
                            <td><code>''</code></td>
                            <td>String to render as markdown content to valid HTML .</td>
                        </tr>
                    </tbody>
                </table>

                <h4 class="mt-3">Basic usage</h4>
                <code class="mb-3 d-block p-3">&lt;cwc-markdown data='Holla link' /&gt;</code>
                <cwc-markdown data={this.markdownContent} />
                <cwc-markdown data={this.markdownContent1} />
            </div>

        ]
    }
}
