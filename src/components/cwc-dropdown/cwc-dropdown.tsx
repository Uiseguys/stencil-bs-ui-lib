import { Component, Element, HostElement, Method, Event, EventEmitter } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';
// declare var window: any;

@Component({
    tag: 'cwc-dropdown',
    styleUrl: 'cwc-dropdown.scss'
})
export class DropdownComponent {
    btn: Element;
    id: string = 'cwc_' + Math.floor(Math.random() * 90000) + 10000;
    content: Element;
    buttons: NodeList;
    openState: boolean = false;

    @Element() el: HostElement;

    @Event() change: EventEmitter;

    componentDidLoad() {
        // window.BSN.initCallback();
        this.btn = this.el.children[0].children[0];
        this.content = this.el.children[0].children[1];
        this.btn.addEventListener('click', () => this.toggle());
        this.close();
        this.buttons = this.el.querySelectorAll('.dropdown-item');
        for ( let i = 0; i < this.buttons.length; i ++ ) {
            this.buttons[i].addEventListener('click', this.selectHandler.bind(this))
        }

    }

    selectHandler(e) {
        this.change.emit(e.target.dataset.value)
    }

    componentWillUpdate() {
        this.openState
            ? this.content.classList.add("show")
            : this.content.classList.remove("show");
    }

    componentDidUnload() {
        for ( let i = 0; i < this.buttons.length; i ++ ) {
            this.buttons[i].removeEventListener('click', this.selectHandler.bind(this))
        }
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
            <div class="dropdown cwc-dropdown">
                <div id={this.id}>
                    <slot name="dropdown-trigger"></slot>
                </div>
                <cwc-popper refid={this.id} arrow={false} isToggleBtn={true}  trigger="click" placement="top" class="cwc-popper-dropdown">
                      <div>
                          <slot name="dropdown-menu"></slot>
                      </div>
                </cwc-popper>
            </div >
        )
    }
}
