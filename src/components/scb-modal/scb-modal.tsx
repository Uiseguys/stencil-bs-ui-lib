/*
import { Component, Element, Prop, Event, EventEmitter, Method, State } from '@stencil/core';

import $ from 'jquery'

@Component({
    tag: 'scb-modal'
})
export class ScbModal {
    @Element() el;

    @Prop() btntype: string = 'primary';
    @Prop() modalTitle: string = 'Modal Title';
    @Prop() modalContent: string = 'Modal Content';
    @Prop() centered: boolean = true;
    @Prop() animation: boolean = true;

    // 'large' for large modal, 'small' for small modal, '' for default modal
    @Prop() size: string = '';

    // true, false or 'static'
    @Prop() backdrop: any = true;
    @Prop() keyboard: boolean = true;
    @Prop() modalfocus: boolean = true;
    @Prop() show: boolean = true;

    @Prop() showButton: boolean = true;
    @Prop() customId: string = 'scb-modal'

    @Event() onOpenModal: EventEmitter;
    @Event() onCloseModal: EventEmitter;

    modalReference: JQuery;

    @State() modalShown: boolean;

    componentDidLoad() {
        this.modalReference = $(`#${this.customId}`)
    }

    @Method()
    openModal() {
        this.modalReference.modal('show')
        this.openModalHandler()
    }

    @Method()
    closeModal() {
        this.modalReference.modal('hide')
        this.closeModalHandler()
    }

    @Method()
    getModalRef() {
        return this.modalReference
    }

    openModalHandler() {
        this.onOpenModal.emit();
    }

    closeModalHandler() {
        this.onCloseModal.emit();
    }

    render() {
        return (
            <div>
                {this.showButton
                    ?
                    <button class={'btn btn-' + this.btntype} type="button" data-toggle="modal"
                        data-target={`#${this.customId}`} onClick={this.openModalHandler.bind(this)}>Open Modal</button>
                    : <div data-toggle="modal"
                        data-target={`#${this.customId}`} > </div>
                }

                <div class={{
                    'modal': true,
                    'fade': this.animation,
                    'bd-example-modal-lg': this.size === 'large',
                    'bd-example-modal-sm': this.size === 'small'
                }} data-backdrop={this.backdrop} data-keyboard={this.keyboard}
                    data-focus={this.modalfocus} data-show={this.modalShown} id={this.customId}
                    tabindex="-1" role="dialog" aria-labelledby="modalDialog" aria-hidden="true" >
                    <div class={{
                        'modal-dialog': true,
                        'modal-dialog-centered': this.centered,
                        'modal-lg': this.size === 'large',
                        'modal-sm': this.size === 'small'
                    }} role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">{this.modalTitle}</h5>
                                <button type="button" class="close" data-dismiss="modal"
                                    aria-label="Close" onClick={this.closeModalHandler.bind(this)}>
                                    <span aria-hidden="true">&times;</span>`
                                </button>
                            </div>
                            <div class="modal-body">{this.modalContent}</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-dismiss="modal" onClick={this.closeModalHandler.bind(this)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
*/
