import { Component, Listen } from '@stencil/core';

@Component({
    tag: 'modal-page',
})
export class ModalPage {

    @Listen('onOpenModal')
    openModalHandler() {
        console.log('openModalHandler');
    }

    @Listen('onCloseModal')
    closeModalHandler() {
        console.log('closeModalHandler');
    }

    render() {
        return (
            <div class="container pt-4" >
                <h2 class="mb-4">Modal component </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3" >
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h3>Usage </h3>
                                            <p>You can use the 'btntype' attribute to specify the type of the button. See Bootstrap <a href="https://getbootstrap.com/docs/4.0/components/buttons/" target="_blank">Buttons</a> component</p>
                                            <div>
                                                <scb-modal
                                                    btntype="success"
                                                    modalTitle="Info"
                                                    modalContent="Modal Content"
                                                    centered={true}
                                                    animation={true}
                                                    size=""
                                                    backdrop={true}
                                                    keyboard={true}
                                                    modalfocus={true}
                                                    show={true}>
                                                </scb-modal>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-12">
                                        <pre><code class="lang-tsx">
                                            <span>&lt;scb-modal</span><br />
                                            <span class="hljs-built_in ml-4">btntype="success"</span><br />
                                            <span class="hljs-built_in ml-4">modalTitle="Info"</span><br />
                                            <span class="hljs-built_in ml-4">modalContent="Modal Content"</span><br />
                                            <span class="hljs-built_in ml-4">centered=true</span><br />
                                            <span class="hljs-built_in ml-4">animation=true</span><br />
                                            <span class="hljs-built_in ml-4">size=""</span><br />
                                            <span class="hljs-built_in ml-4">backdrop=true</span><br />
                                            <span class="hljs-built_in ml-4">keyboard=true</span><br />
                                            <span class="hljs-built_in ml-4">modalfocus=true</span><br />
                                            <span class="hljs-built_in ml-4">show=true</span>
                                            <span>&gt;</span>
                                            <br />
                                            <span>&lt;/scb-modal&gt;</span>
                                        </code></pre>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Param</th>
                                                <th>Type</th>
                                                <th>Default</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>btntype</td>
                                                <td>String</td>
                                                <td>'primary'</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>modalTitle</td>
                                                <td>String</td>
                                                <td>'Modal Title'</td>
                                                <td>Sets the Modal title</td>
                                            </tr>
                                            <tr>
                                                <td>modalContent</td>
                                                <td>String</td>
                                                <td>'Modal Content'</td>
                                                <td>Sets the Modal content</td>
                                            </tr>
                                            <tr>
                                                <td>centered</td>
                                                <td>Boolean</td>
                                                <td>true</td>
                                                <td>Vertically center the modal</td>
                                            </tr>
                                            <tr>
                                                <td>animation</td>
                                                <td>Boolean</td>
                                                <td>true</td>
                                                <td>For modals that simply appear rather than fade in to view</td>
                                            </tr>
                                            <tr>
                                                <td>size</td>
                                                <td>String</td>
                                                <td>''</td>
                                                <td>Modals have two optional sizes, available via modifier classes to be placed on a .modal-dialog. These sizes kick in at certain breakpoints to avoid horizontal scrollbars on narrower viewports. Acceptable values: 'large', 'small', ''</td>
                                            </tr>
                                            <tr>
                                                <td>backdrop</td>
                                                <td>Boolean | String</td>
                                                <td>true</td>
                                                <td>Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn't close the modal on click.</td>
                                            </tr>
                                            <tr>
                                                <td>keyboard</td>
                                                <td>Boolean</td>
                                                <td>true</td>
                                                <td>Closes the modal when escape key is pressed</td>
                                            </tr>
                                            <tr>
                                                <td>modalfocus</td>
                                                <td>Boolean</td>
                                                <td>true</td>
                                                <td>Puts the focus on the modal when initialized.</td>
                                            </tr>
                                            <tr>
                                                <td>show</td>
                                                <td>Boolean</td>
                                                <td>true</td>
                                                <td>Shows the modal when initialized.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
