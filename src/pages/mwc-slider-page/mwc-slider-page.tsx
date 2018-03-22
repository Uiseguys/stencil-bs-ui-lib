import { Component, State } from '@stencil/core';

@Component({
    tag: 'mwc-slider-page',
    styleUrl: 'mwc-slider-page.scss'
})
export class MwcSliderPage {

    @State() newValue: number;

    stepUp() {
        document.querySelector('mwc-slider').stepup();
    }

    stepDown() {
        document.querySelector('mwc-slider').stepdown();
    }    

    render() {
        return (
        <div class="container mb-5">

        <h1 class="display-4 ">Slider component</h1>

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
                    <td><code>value</code></td>
                    <td><code>number</code></td>
                    <td>false</td>
                    <td><code>50</code></td>
                    <td>value of the slider</td>
                </tr> 
                <tr>
                    <td><code>min</code></td>
                    <td><code>number</code></td>
                    <td>false</td>
                    <td><code>0</code></td>
                    <td>min value of the slider</td>
                </tr> 
                <tr>
                    <td><code>max</code></td>
                    <td><code>number</code></td>
                    <td>false</td>
                    <td><code>100</code></td>
                    <td>max value of the slider</td>
                </tr> 
                <tr>
                    <td><code>step</code></td>
                    <td><code>number</code></td>
                    <td>false</td>
                    <td><code>1</code></td>
                    <td>step value of the slider</td>
                </tr> 
                <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td>false</td>
                    <td><code>false</code></td>
                    <td>disabled the slider</td>
                </tr> 
                <tr>
                    <td><code>slidercolor</code></td>
                    <td><code>string</code></td>
                    <td>false</td>
                    <td><code>#000000</code></td>
                    <td>Slider color in HEX</td>
                </tr>                                                                                                
            </tbody>
        </table>

        <h4 class="my-3">Events</h4>

        <table>
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>change</code></td>
                    <td>dispatched when the slider changed</td>
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
                    <td><code>stepup</code></td>
                    <td>stepup the value</td>
                </tr>
                <tr>
                    <td><code>stepdown</code></td>
                    <td>stepdown the value</td>
                </tr>                
            </tbody>
        </table> 

        <h3 class="mt-4">Usage</h3>

        <code class="mb-3 d-block p-3">&lt;mwc-slider
                    value=&#123;55&#125; 
                    min=&#123;10&#125; 
                    max=&#123;80&#125;
                    step=&#123;10&#125;
                    slidercolor='#BABABA'
                    /&gt;</code>

            <div class="p-1">
                <mwc-slider value={55}
                    min={10}
                    max={80}
                    step={10}
                    slidercolor="#BABABA"
                    onChange={(event: CustomEvent) => this.newValue = event.detail.newValue}
                />
                <span class="ml-5">Change event: {this.newValue}</span>
                <div class="pt-1">
                    <button type="button" class="btn btn-secondary btn-sm" onClick={() => this.stepDown()}>Step down</button>
                    <button type="button" class="btn btn-secondary btn-sm ml-1" onClick={() => this.stepUp()}>Step up</button>
                </div>
            </div>
        </div>
        )
    }
}
