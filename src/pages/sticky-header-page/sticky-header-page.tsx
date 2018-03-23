import { Component } from '@stencil/core';

@Component({
    tag: 'sticky-header-page',
    styleUrl: 'sticky-header-page.scss'

})
export class StickyHeaderPage {

    render() {
        return (
            <div class="container mb-5">
                <h1 class="display-4 ">Sticky header component</h1>
                <cwc-sticky-header><h1>test</h1></cwc-sticky-header>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>         
                <cwc-sticky-header><p>test222</p></cwc-sticky-header> 
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>          
            </div>
        )
    }
}
