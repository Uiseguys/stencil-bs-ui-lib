import { Component } from '@stencil/core';

@Component({
    tag: 'avatar-page',
    styleUrl: 'avatar-page.scss'

})
export class AvatarPage {

    render() {
        return (
        <div class="container mb-5">

        <h1 class="display-4 ">Avatar component</h1>

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
                    <td><code>name</code></td>
                    <td><code>string</code></td>
                    <td>true</td>
                    <td><code></code></td>
                    <td>The name used to generate initials</td>
                </tr>                
                <tr>
                    <td><code>size</code></td>
                    <td><code>number</code></td>
                    <td>false</td>
                    <td><code>64</code></td>
                    <td>Avatar image size in pixels. Between: 16 and 256</td>
                </tr> 
                <tr>
                    <td><code>font-size</code></td>
                    <td><code>number</code></td>
                    <td>false</td>
                    <td><code>0.5</code></td>
                    <td>Font size in percentage of size. Between 0.1 and 1</td>
                </tr>
                <tr>
                    <td><code>length</code></td>
                    <td><code>number</code></td>
                    <td>false</td>
                    <td><code>2</code></td>
                    <td>Length of the generated initials</td>
                </tr>      
                <tr>
                    <td><code>rounded</code></td>
                    <td><code>boolean</code></td>
                    <td>false</td>
                    <td><code>false</code></td>
                    <td>Boolean specifying if the returned image should be a circle</td>
                </tr>
                <tr>
                    <td><code>background</code></td>
                    <td><code>string</code></td>
                    <td>false</td>
                    <td><code>ddd</code></td>
                    <td>Hex color for the image background, without the hash (#)</td>
                </tr>
                <tr>
                    <td><code>color</code></td>
                    <td><code>string</code></td>
                    <td>false</td>
                    <td><code>222</code></td>
                    <td>Hex color for the font, without the hash (#)</td>
                </tr>
                <tr>
                    <td><code>uppercase</code></td>
                    <td><code>boolean</code></td>
                    <td>false</td>
                    <td><code>true</code></td>
                    <td>Decide if the API should uppercase the name/initials</td>
                </tr>
            </tbody>
        </table>


        <h3 class="mt-4">Usage</h3>

        <code class="d-block p-3">&lt;cwc-avatar
                    name='John Do' 
                    &gt; &lt;/cwc-avatar&gt;</code>
        <code class="d-block p-3">&lt;cwc-avatar
                    name='John Do'
                    rounded
                    &gt; &lt;/cwc-avatar&gt;</code>
        <code class="d-block p-3">&lt;cwc-avatar
                    name='John Do'
                    color='ff00ff'
                    &gt; &lt;/cwc-avatar&gt;</code>  
        <code class="d-block p-3">&lt;cwc-avatar
                    name='John Do'
                    background='a0a0a0'
                    &gt; &lt;/cwc-avatar&gt;</code>  
        <code class="d-block p-3">&lt;cwc-avatar
                    name='John Do'
                    font-size=&#123;0.9&#125;
                    &gt; &lt;/cwc-avatar&gt;</code>
        <code class="d-block p-3">&lt;cwc-avatar
                    name='John Do'
                    length=&#123;1&#125;
                    &gt; &lt;/cwc-avatar&gt;</code>
        <code class="d-block p-3">&lt;cwc-avatar
                    name='john Do'
                    uppercase=&#123;false&#125;
                    &gt; &lt;/cwc-avatar&gt;</code>
        <code class="d-block p-3">&lt;cwc-avatar
                    name='John Do'
                    size=&#123;96&#125;
                    &gt; &lt;/cwc-avatar&gt;</code>

            <div class="p-1">
                <cwc-avatar name="John Doe"></cwc-avatar>
                <cwc-avatar name="John Doe" rounded></cwc-avatar>
                <cwc-avatar name="John Doe" color="ff00ff"></cwc-avatar>
                <cwc-avatar name="John Doe" background="a0a0a0"></cwc-avatar>
                <cwc-avatar name="John Doe" font-size={0.9}></cwc-avatar>
                <cwc-avatar name="John Doe" length={1}></cwc-avatar>
                <cwc-avatar name="john Doe" uppercase={false}></cwc-avatar>                
                <cwc-avatar name="John Doe" size={96}></cwc-avatar>
            </div>
        </div>
        )
    }
}