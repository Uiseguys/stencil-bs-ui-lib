/*
import { Component, Listen } from '@stencil/core';

@Component({
    tag: 'modal-page',
    styleUrls: [
        './modal-page.scss'
    ]
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
                                            <p>You can use the 'btntype' attribute to specify the type of the button.
                                            See Bootstrap
                                            <a href="https://getbootstrap.com/docs/4.0/components/buttons/"
                                            target="_blank">Buttons</a> component</p>
                                            <div>
                                                <scb-modal
                                                    id="demo-modal-1"
                                                    btntype="success"
                                                    modalTitle="Info"
                                                    modalContent="Modal Content"
                                                    centered={true}
                                                    animation={true}
                                                    size=""
                                                    backdrop={true}
                                                    keyboard={true}
                                                    modalfocus={true}
                                                    showButton={true}
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
                                            <br />
                                            <h4>Methods</h4>
                                            <p><code>openModal()</code></p>
                                            <p><code>closeModal()</code></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="mx-1">Param</th>
                                                <th class="mx-1">Type</th>
                                                <th class="mx-1">Default</th>
                                                <th class="mx-1">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><code>btntype</code></td>
                                                <td><code>string</code></td>
                                                <td><code>'primary'</code></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td><code>modalTitle</code></td>
                                                <td><code>string</code></td>
                                                <td><code>'Modal Title'</code></td>
                                                <td>Sets the Modal title</td>
                                            </tr>
                                            <tr>
                                                <td><code>modalContent</code></td>
                                                <td><code>string</code></td>
                                                <td><code>'Modal Content'</code></td>
                                                <td>Sets the Modal content</td>
                                            </tr>
                                            <tr>
                                                <td><code>centered</code></td>
                                                <td><code>boolean</code></td>
                                                <td><code>true</code></td>
                                                <td>Vertically center the modal</td>
                                            </tr>
                                            <tr>
                                                <td><code>animation</code></td>
                                                <td><code>boolean</code></td>
                                                <td><code>true</code></td>
                                                <td>For modals that simply appear rather than fade in to view</td>
                                            </tr>
                                            <tr>
                                                <td><code>size</code></td>
                                                <td><code>string</code></td>
                                                <td><code>''</code></td>
                                                <td>Modals have two optional sizes, available via modifier
                                                classes to be placed on a .modal-dialog. These sizes kick in at certain
                                                breakpoints to avoid horizontal scrollbars on narrower viewports.
                                                Acceptable values: 'large', 'small', ''</td>
                                            </tr>
                                            <tr>
                                                <td><code>backdrop</code></td>
                                                <td><code>Boolean | String</code></td>
                                                <td><code>true</code></td>
                                                <td>Includes a modal-backdrop element. Alternatively, specify static for
                                                a backdrop which doesn't close the modal on click.</td>
                                            </tr>
                                            <tr>
                                                <td><code>keyboard</code></td>
                                                <td><code>boolean</code></td>
                                                <td><code>true</code></td>
                                                <td>Closes the modal when escape key is pressed</td>
                                            </tr>
                                            <tr>
                                                <td><code>modalfocus</code></td>
                                                <td><code>boolean</code></td>
                                                <td><code>true</code></td>
                                                <td>Puts the focus on the modal when initialized.</td>
                                            </tr>
                                            <tr>
                                                <td><code>show</code></td>
                                                <td><code>boolean</code></td>
                                                <td><code>true</code></td>
                                                <td>Shows the modal when initialized.</td>
                                            </tr>
                                            <tr>
                                                <td><code>showButton</code></td>
                                                <td><code>boolean</code></td>
                                                <td><code>true</code></td>
                                                <td>Shows button for modal toggle or not (which can be toggled by methods).
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><code>customId</code></td>
                                                <td><code>string</code></td>
                                                <td><code>'scb-modal'</code></td>
                                                <td>Id for modal element</td>
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
*/
