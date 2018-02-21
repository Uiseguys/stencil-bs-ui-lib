import { Component, Listen } from '@stencil/core';

@Component({
    tag: 'dialog-page',
})
export class DiaglogPage {

    @Listen('onOpenModal')
    openModalHandler() {
        console.log('openModalHandler');
    }

    @Listen('onCloseModal')
    closeModalHandler() {
        console.log('closeModalHandler');
    }

    render() {
        return <scb-dialog
                    btntype="success"
                    title="Info"
                    content="Modal Content"
                    centered={true}
                    animation={true}
                    size=""
                    backdrop={true}
                    keyboard={true}
                    modalfocus={true}
                    show={true}>
                </scb-dialog>
    }
}
