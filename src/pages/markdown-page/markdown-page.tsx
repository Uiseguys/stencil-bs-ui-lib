import { Component } from '@stencil/core';
import { BootstrapThemeColor } from '../../common/bootstrap-theme-color.type';


@Component({
    tag: 'markdown-page',
    styleUrl: 'markdown-page.scss'
})
export class MarkdownPage {

    tagTypes: BootstrapThemeColor[] = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
    ];

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
                <cwc-markdown data='### Holla link' />
            </div>

        ]
    }
}
