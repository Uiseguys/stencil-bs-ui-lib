import { Component } from '@stencil/core';
import { BootstrapThemeColor } from '../../common/bootstrap-theme-color.type';


@Component({
    tag: 'tag-page',
    styleUrl: 'tag-page.scss'
})
export class TagPage {

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

                <h1 class="display-4 ">Tag component</h1>

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
                            <td><code>text</code></td>
                            <td><code>string</code></td>
                            <td>yes</td>
                            <td><code>''</code></td>
                            <td>String to render as tag.</td>
                        </tr>

                        <tr>
                            <td><code>limitTo</code></td>
                            <td><code>number</code></td>
                            <td>no</td>
                            <td><code>25</code></td>
                            <td>Trims text to maximum length. Full tag text still available through hover tooltip</td>
                        </tr>

                        <tr>
                            <td><code>tagType</code></td>
                            <td><code>BootstrapThemeColor</code></td>
                            <td>no</td>
                            <td><code>'primary'</code></td>
                            <td>Modifier class to change the appearance of the tag.</td>
                        </tr>
                        <tr>
                            <td><code>classes</code></td>
                            <td><code>string</code></td>
                            <td>no</td>
                            <td><code>''</code></td>
                            <td>Additional classes to add to the tag element.</td>
                        </tr>
                        <tr>
                            <td><code>link</code></td>
                            <td><code>string</code></td>
                            <td>no</td>
                            <td><code>undefined</code></td>
                            <td>If present, the tag will be rendered as <code>&lt;a&gt;</code> anchor tag.</td>
                        </tr>
                        <tr>
                            <td><code>imgLink</code></td>
                            <td><code>string</code></td>
                            <td>no</td>
                            <td><code>undefined</code></td>
                            <td>If present, round image will be rendered at left of the tag text.</td>
                        </tr>
                        <tr>
                            <td><code>closable</code></td>
                            <td><code>boolean</code></td>
                            <td>no</td>
                            <td><code>false</code></td>
                            <td>Close button at the right of the tag text. Fires tag's close() method.</td>
                        </tr>
                        <tr>
                            <td><code>rounded</code></td>
                            <td><code>boolean</code></td>
                            <td>no</td>
                            <td>false</td>
                            <td>Makes tag rounded.</td>
                        </tr>

                        <tr>
                            <td><code>removeOnClose</code></td>
                            <td><code>boolean</code></td>
                            <td>no</td>
                            <td><code>true</code></td>
                            <td>If set <code>true</code>, element will be removed from DOM on <code>close()</code> event.</td>
                        </tr>

                        <tr>
                            <td><code>onCloseData</code></td>
                            <td><code>any</code></td>
                            <td>no</td>
                            <td><code>undefined</code></td>
                            <td>Custom data in <code>tagCloseEvent</code> which is emited every time <code>close()</code> method triggered.</td>
                        </tr>


                    </tbody>
                </table>

                <h4 class="my-3">Methods</h4>

                <table>
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>close()</code></td>
                            <td>Removes tag from DOM.</td>
                        </tr>
                    </tbody>
                </table>



                <h3 class="mt-4">Usage</h3>
                <h4 class="mt-3">Basic usage</h4>
                <cwc-tag text='Holla link' />
                <code class="mb-3 d-block p-3">&lt;cwc-tag text='Holla link' /&gt;</code>

                <h4 class="mt-3">Bootstrap styles</h4>

                {(() => {
                    return this.tagTypes.map(type => <cwc-tag class="mx-1" text={'Tag ' + type} tagType={type} />)

                })()}

                <code class="mb-3 d-block p-3">&lt;cwc-tag text='Holla link' tagType='primary | secondary | success etc.' /&gt;</code>

                <h4 class="mt-3">Max text length</h4>
                <cwc-tag class="mx-1" text={'Lorem ipsum dolor sir amet'} limitTo={10} />
                <code class="mb-3 d-block p-3">&lt;cwc-tag
                    text='Lorem ipsum dolor sir amet' limitTo=&#123;10&#125; /&gt;</code>

                <h4 class="mt-3">Rounded link tag with image</h4>

                <code class="mb-3 d-block p-3">&lt;cwc-tag
                    text='Stencil'
                    link='https://stenciljs.com/' <br />
                    closable=&#123;true&#125;
                    rounded=&#123;true&#125;
                    imgLink='https://stenciljs.com/assets/img/logo.png' /&gt;</code>


                <cwc-tag class="mx-1" text='Stencil' link='https://stenciljs.com/'
                    closable={true} rounded={true} imgLink='https://stenciljs.com/assets/img/logo.png' />
                <cwc-tag class="mx-1" text='Angular' link='https://angular.io'
                    closable={true} rounded={true} imgLink='https://cdn.auth0.com/blog/angular2-series/angular2-logo.png' />
                <cwc-tag class="mx-1" text='React' link='https://reactjs.org/'
                    closable={true} rounded={true} imgLink='http://v.fastcdn.co/u/abda26b9/20243556-0-react-logo.png' />

            </div>

        ]
    }
}