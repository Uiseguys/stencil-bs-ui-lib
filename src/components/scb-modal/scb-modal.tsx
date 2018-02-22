import { Component, Element, Prop, Event, EventEmitter } from '@stencil/core';

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

    @Event() onOpenModal: EventEmitter;
    @Event() onCloseModal: EventEmitter;

    openModalHandler() {
        this.onOpenModal.emit();
    }

    closeModalHandler() {
        // called when user clicks on cancel or on 'X' icon
        this.onCloseModal.emit();
    }

    render() {
        return (
            <div>
                <button class={'btn btn-' + this.btntype} type="button" data-toggle="modal" data-target="#modalDialog" onClick={this.openModalHandler.bind(this)}>Open Modal</button>

                <div class={{
                        'modal': true,
                        'fade':  this.animation,
                        'bd-example-modal-lg': this.size === 'large',
                        'bd-example-modal-sm': this.size === 'small'
                    }} data-backdrop={this.backdrop} data-keyboard={this.keyboard} data-focus={this.modalfocus} data-show={this.show} id="modalDialog" tabindex="-1" role="dialog" aria-labelledby="modalDialog" aria-hidden="true">
                    <div class={{
                            'modal-dialog': true,
                            'modal-dialog-centered': this.centered,
                            'modal-lg': this.size === 'large',
                            'modal-sm': this.size === 'small'
                        }} role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">{this.modalTitle}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModalHandler.bind(this)}><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body">{this.modalContent}</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.closeModalHandler.bind(this)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
