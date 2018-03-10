import { Component, Element, HostElement, State, Method } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';
declare var window: any;

@Component({
    tag: 'cwc-dropdown',
    styleUrl: 'cwc-dropdown.scss'
})
export class StencilComponent {
    btn: Element;
    content: Element;

    @Element() el: HostElement;

    @State() openState: boolean = false;

    componentDidLoad() {
        window.BSN.initCallback();
        this.btn = this.el.children[0].children[0];
        this.content = this.el.children[0].children[1];
        this.btn.addEventListener('click', () => this.toggle())
        this.close()
    }

    componentWillUpdate() {
        this.openState
            ? this.content.classList.add("show")
            : this.content.classList.remove("show");
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
            <div class="dropdown">
                <slot name="dropdown-trigger"></slot>

                <slot name="dropdown-menu"></slot>
            </div >
        )
    }
}
