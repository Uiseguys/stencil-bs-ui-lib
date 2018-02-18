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
                    title="Info"
                    content="Modal Content"
                    centered={true}
                    animation={true}
                    size=""
                    optBackdrop={true}
                    optKeyboard={true}
                    optFocus={true}
                    optShow={true}>
                </scb-dialog>
    }
}
