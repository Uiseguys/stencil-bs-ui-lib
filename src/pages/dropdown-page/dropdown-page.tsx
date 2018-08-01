import { Component, Listen, State } from '@stencil/core';

@Component({
    tag: 'dropdown-page',
    styleUrl: 'dropdown-page.scss'
})

export class DropdownPage {
    
    @State() dropdownValue: string

    @Listen('change')
    dropdownHandler(value: CustomEvent): void {
        this.dropdownValue = value.detail
    }

    render() {
        return [
            <div class="container pt-4">
                <h2 class="mb-4">Dropdown component </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3">
                            <div class="row">
                                <div class="col-lg-12">
                                    {
                                        this.dropdownValue 
                                        ? <div class="alert alert-info alert-dismissible fade w-100 show" role="alert">
                                        Outer component got event with `{this.dropdownValue}` value!
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => this.dropdownValue = undefined}>
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>
                                        : <div class="my-4"></div>
                                    }
                                    
                                    <cwc-dropdown id="officialExample" class="mt-4">
                                        <button slot="dropdown-trigger" class="btn btn-primary" 
                                            type="button" data-toggle="dropdown" 
                                            aria-haspopup="true" aria-expanded="true">
                                            {this.dropdownValue  || 'Example dropdown'}
                                        </button>

                                        <div slot="dropdown-menu" class="dropdown-menu">
                                            <div class="dropdown-item" data-value="Automatic" >Automatic</div>
                                            <div class="dropdown-item" data-value="Manual" >Manual</div>
                                        </div>
                                    </cwc-dropdown>
                                </div>


                                <div class="col-12 mt-4">
                                    <h3>Usage </h3>

                                    <p class="mt-1">To use this component, you must pass two named slots into component's tag: <code>dropdown-trigger </code>
                                     and <code>dropdown-menu</code>.
                                        Every dropdown item in <code>dropdown-menu</code> slot must contain <code>data-value</code> attribute.
                                        Event with this value will be emited after user iteraction.</p>
                                </div>


                                <div class="col-12 mt-5">
                                    <pre><code class="lang-tsx">
                                        &lt;cwc-<span class="hljs-built_in">dropdown</span>&gt; <br />
                                        
                                            <span class="ml-2">&lt;button slot="dropdown-trigger" class="btn btn-primary"</span> <br />
                                                <span class="ml-4">type="button" data-toggle="dropdown"</span> <br /> 
                                                <span class="ml-4">aria-haspopup="true" aria-expanded="true"&gt;</span><br />
                                                <span class="ml-4">Click me! </span><br />
                                            <span class="ml-2">&lt;/button&gt;</span><br />

                                        <span class="ml-2">&lt;div slot="dropdown-menu" class="dropdown-menu"&gt;</span><br />
                                        <span class="ml-4">&lt;div class="dropdown-item" data-value="Automatic"&gt;dropdown button 1&lt;/div&gt;</span><br />
                                        <span class="ml-4">&lt;div class="dropdown-item" data-value="Manual"&gt;dropdown button 2&lt;/div&gt;</span> <br />
                                        <span class="ml-2">&lt;/div&gt;</span> <br />
                                        <span class="ml-0">&lt;/cwc-<span class="hljs-built_in">dropdown</span>&gt;</span>
                                    </code></pre>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>,
        ];
    }
}
