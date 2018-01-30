import { Component, State } from '@stencil/core';


@Component({
    tag: 'dropdown-page',
    styleUrl: 'dropdown-page.scss'
})
export class StencilComponent {

    @State() private examplePlacement: string = 'bottom';
    @State() exampleAlignment: string = 'start';
    @State() exampleTriggerOverflow: boolean = false;

    example
    componentDidLoad() {
        this.example = document.getElementById('example1')
        this.example.open()

    }


    formPlacementString() {
        return this.exampleAlignment ?
            `${this.examplePlacement}-${this.exampleAlignment}` :
            `${this.examplePlacement}`
    }


    setExamplePlacement(val: string) {
        this.examplePlacement = val
    }

    setExampleAlignment(val: string) {
        this.exampleAlignment = val
    }

    setExampleTriggerOverflow(val: boolean) {
        this.exampleTriggerOverflow = val
    }

    render() {

        return [
            <br />,
            <br />,
            <br />,
            <br />,
            <br />,
            <br />,
            <div class="container pt-4" >
                <h2 class="mb-4">Dropdown component </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3" >
                            <h3>Usage </h3>
                            <p>To set position of the dropdown component you can pass position and align variables: </p>
                            <div class="row">
                                <div class="col-lg-8">


                                    <cwc-dropdown id="example1"
                                        dropdownPlacement={this.formPlacementString()}
                                        triggerOverflow={this.exampleTriggerOverflow}
                                    >
                                        <div slot="dropdown-trigger">
                                            <button class="btn btn-primary ml-5 mt-2" aria-expanded="true" type="button" >Example dropdown </button>
                                        </div>

                                        <div slot="dropdown-content">
                                            <div>
                                                <a class="dropdown-item" role="presentation" href="#">First example item</a>
                                                <a class="dropdown-item" role="presentation" href="#">Second Item</a>
                                                <a class="dropdown-item" role="presentation" href="#">Third Item</a>
                                            </div>
                                        </div>
                                    </cwc-dropdown>

                                </div>
                                <div class="col-lg-4">
                                    <div class="dropdown">
                                        <button class="btn btn-info dropdown-toggle ml-1 mt-2 w-75"
                                            data-toggle="dropdown" aria-expanded="false"
                                            type="button" >Select position</button>
                                        <div class="dropdown-menu" role="menu">
                                            <a class="dropdown-item"
                                                role="presentation" onClick={(event: UIEvent) => this.setExamplePlacement('bottom')}>Bottom </a>

                                            <a class="dropdown-item"
                                                role="presentation" onClick={(event: UIEvent) => this.setExamplePlacement('left')}>Left </a>

                                            <a class="dropdown-item"
                                                role="presentation" onClick={(event: UIEvent) => this.setExamplePlacement('right')}>Right </a>

                                            <a class="dropdown-item"
                                                role="presentation" onClick={(event: UIEvent) => this.setExamplePlacement('top')}>Top </a>
                                        </div>
                                    </div>
                                    <div class="dropdown">
                                        <button class="btn btn-info dropdown-toggle ml-1 mt-2 w-75"
                                            data-toggle="dropdown" aria-expanded="false"
                                            type="button" >Select alignment</button>
                                        <div class="dropdown-menu" role="menu">
                                            <a class="dropdown-item" role="presentation" onClick={(event: UIEvent) => this.setExampleAlignment('')}>None (centered)</a>
                                            <a class="dropdown-item" role="presentation" onClick={(event: UIEvent) => this.setExampleAlignment('start')}>Start </a>
                                            <a class="dropdown-item" role="presentation" onClick={(event: UIEvent) => this.setExampleAlignment('end')}>End </a>
                                        </div>
                                    </div>
                                    <div class="dropdown" >
                                        <button class="btn btn-info dropdown-toggle ml-1 mt-2 w-75" disabled
                                            data-toggle="dropdown" aria-expanded="false"
                                            type="button" >Button overflow</button>
                                        <div class="dropdown-menu" role="menu">
                                            <a class="dropdown-item" role="presentation" onClick={(event: UIEvent) => this.setExampleTriggerOverflow(true)}>True</a>
                                            <a class="dropdown-item" role="presentation" onClick={(event: UIEvent) => this.setExampleTriggerOverflow(false)}>False</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <pre><code class="lang-tsx">

                                        &lt;cwc-<span class="hljs-built_in">dropdown</span><br />
                                        <span class="hljs-built_in ml-4">dropdown-placement</span>={<span class="hljs-built_in">'{this.formPlacementString()}'</span>} <br />
                                        <span class="ml-4">buttonOverflow={<span class="hljs-literal">'{JSON.stringify(this.exampleTriggerOverflow)}'</span>}
                                        </span>
                                        &gt; <br />&lt;/cwc-<span class="hljs-built_in">dropdown</span>&gt;
                                    </code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            <br />,
            <br />,
            <br />,
            <br />,
            <br />


        ];
    }
}