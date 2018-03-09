import { Component, Prop, Element, HostElement, State, Method, Watch } from '@stencil/core';
import Popper from 'popper.js';
// import Popper from 'popper.js/dist/popper.js';

@Component({
    tag: 'cwc-dropdown',
    styleUrl: 'cwc-dropdown.scss'
})
export class StencilComponent {

    @Prop() dropdownPlacement: any = 'top-start';
    @Prop() triggerOverflow: boolean = true;
    @Prop() offsetString: string = '';

    @State() openState: boolean = true;

    @Element() el: HostElement;

    @State() popper: Popper
    btn: Element
    content: Element

    componentWillUpdate() {
        this.popper.scheduleUpdate()
    }

    @Watch('dropdownPlacement')
    placementDidChangeHandler(newValue) {
        this.popper.options.placement = newValue
    }
    @Watch('triggerOverflow')
    overflowDidChangeHandler(newValue) {
        this.popper.options.modifiers.offset.offset = newValue ?
            '-10%r, -110%' :
            ''
    }

    componentDidLoad() {
        if (this.el && this.el.children
            && this.el.children[0]
            && this.el.children[0].children[0]
            && this.el.children[0].children[0].children[0]) {
            this.btn = this.el.children[0].children[0].children[0].children[0]
            this.content = this.el.children[0].children[1]

            this.popper = new Popper(this.btn, this.content, {
                placement: this.dropdownPlacement,
                removeOnDestroy: true,
                modifiers: {
                    offset: {
                        offset: this.triggerOverflow ?
                            '-10%r, -110%' : ''
                    }
                }
            });
            this.btn.addEventListener('click', () => this.toggle())
        }

        this.close()
    }


    @Method()
    toggle() {
        this.openState
            ? this.close()
            : this.open()
    }

    @Method()
    close() {
        this.openState = false
    }

    @Method()
    open() {
        this.openState = true;
        this.btn.addEventListener('blur', () => this.onBlurHandler(), true);
    }

    onBlurHandler() {
        this.close()
    }

    render() {

        return (
            <div class="dropup">
                <div class="trigger" >
                    <slot name="dropdown-trigger"></slot>
                </div>

                <div class={'content dropdown-menu ' +
                    (this.openState ? 'show' : '')}
                    onClick={() => this.toggle()} >
                    <slot name="dropdown-content"></slot>
                </div>
            </div >
        )

    }
}
