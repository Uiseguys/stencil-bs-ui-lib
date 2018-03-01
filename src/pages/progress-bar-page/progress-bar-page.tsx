import { Component } from '@stencil/core';
import { BootstrapThemeColor } from '../../common/bootstrap-theme-color.type';


@Component({
    tag: 'progress-bar-page',
    styleUrl: 'progress-bar-page.scss'
})
export class ProgressBarPage {

    progressBarTypes: BootstrapThemeColor[] = [
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

                <h1 class="display-4 ">Progress Bar component</h1>

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
                            <td>String to render inside Progress Bar.</td>
                        </tr>

                        <tr>
                            <td><code>height</code></td>
                            <td><code>number</code></td>
                            <td>no</td>
                            <td><code>25</code></td>
                            <td>Trims text to maximum length. Full Progress Bar text still available through hover tooltip</td>
                        </tr>

                        <tr>
                            <td><code>progressBarType</code></td>
                            <td><code>BootstrapThemeColor</code></td>
                            <td>no</td>
                            <td><code>'primary'</code></td>
                            <td>Modifier class to change the appearance of the Progress Bar.</td>
                        </tr>
                        <tr>
                            <td><code>classes</code></td>
                            <td><code>string</code></td>
                            <td>no</td>
                            <td><code>''</code></td>
                            <td>Additional classes to add to the Progress Bar element.</td>
                        </tr>
                        <tr>
                            <td><code>striped</code></td>
                            <td><code>boolean</code></td>
                            <td>no</td>
                            <td><code>false</code></td>
                            <td>Makes Progress Bar striped.</td>
                        </tr>
                        <tr>
                            <td><code>animated</code></td>
                            <td><code>boolean</code></td>
                            <td>no</td>
                            <td><code>false</code></td>
                            <td>Makes Progress Bar animated.</td>
                        </tr>
                    </tbody>
                </table>

                <h3 class="mt-4">Usage</h3>
                <h4 class="mt-3">Basic usage</h4>
                <cwc-progress-bar text='Holla link' progress={10} />
                <code class="mb-3 d-block p-3">&lt;cwc-progress-bar text='Holla link' /&gt;</code>

                <h4 class="mt-3">Bootstrap styles</h4>

                {(() => {
                    return this.progressBarTypes.map(type =>
                        <cwc-progress-bar class="mx-1" text={'Progress Bar ' + type} progressBarType={type} progress={80} />
                    )

                })()}

                <code class="mb-3 d-block p-3">
                    &lt;cwc-progress-bar text='Holla link' progressBarType='primary | secondary | success etc.' /&gt;
                </code>

                <h4 class="mt-3">Max text length</h4>
                <cwc-progress-bar class="mx-1" text={'Lorem ipsum dolor sir amet'} height={10} progress={50}/>
                <code class="mb-3 d-block p-3">&lt;cwc-progress-bar
                    text='Lorem ipsum dolor sir amet' height=&#123;10&#125; /&gt;</code>

                <h4 class="mt-3">Rounded link tag with image</h4>

                <code class="mb-3 d-block p-3">&lt;cwc-progress-bar
                    text='Stencil'<br />
                    striped=&#123;true&#125;
                    animated=&#123;true&#125; /&gt;</code>


                <cwc-progress-bar class="mx-1" text='Stencil'
                    striped={true} animated={true} progress={20}/>
                <cwc-progress-bar class="mx-1" text='Angular'
                    striped={true} animated={true} progress={30}/>
                <cwc-progress-bar class="mx-1" text='React'
                    striped={true} animated={true} progress={40}/>

            </div>

        ]
    }
}
