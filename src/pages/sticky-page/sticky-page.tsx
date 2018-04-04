import { Component } from '@stencil/core';

@Component({
    tag: 'sticky-page',
    styleUrl: 'sticky-page.scss'

})
export class StickyPage {

    render() {
        return (
            <div class="container mb-5">
                <h1 class="display-4 ">Sticky header component</h1>
                <h3 class="mt-4">Usage</h3>
                <code class="d-block p-3">&lt;cwc-sticky&gt;
                    <p class="p-3">&lt;cwc-sticky-header background="#999999" color="#ffffff"&gt; A &lt;/cwc-sticky-header&gt;</p>
                    <p class="p-3">&lt;cwc-sticky-header background="#e64a19" color="#ffffff"&gt; B &lt;/cwc-sticky-header&gt;</p>
                &lt;/cwc-sticky&gt;</code>

                <cwc-sticky>
                    <cwc-sticky-header background="#999999" color="#ffffff">A</cwc-sticky-header>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>    
                    <cwc-sticky-header background="#e64a19" color="#ffffff">B</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <cwc-sticky-header background="#999999" color="#ffffff">C</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>       
                    <cwc-sticky-header background="#e64a19" color="#ffffff">D</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>          
                    <cwc-sticky-header background="#999999" color="#ffffff">E</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>     
                    <cwc-sticky-header background="#e64a19" color="#ffffff">F</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>               
                    <cwc-sticky-header background="#999999" color="#ffffff">G</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <cwc-sticky-header background="#e64a19" color="#ffffff">H</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>               
                    <cwc-sticky-header background="#999999" color="#ffffff">I</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>     
                    <cwc-sticky-header background="#e64a19" color="#ffffff">J</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>    
                    <cwc-sticky-header background="#999999" color="#ffffff">K</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>  
                    <cwc-sticky-header background="#e64a19" color="#ffffff">L</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>               
                    <cwc-sticky-header background="#999999" color="#ffffff">M</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>               
                    <cwc-sticky-header background="#e64a19" color="#ffffff">N</cwc-sticky-header> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>                                 
                </cwc-sticky>                                                                                    
            </div>
        )
    }
}
