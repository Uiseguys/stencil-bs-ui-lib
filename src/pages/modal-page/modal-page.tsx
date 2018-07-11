import { Component, Listen } from '@stencil/core';

@Component({
  tag: 'modal-page',
  styleUrls: ['./modal-page.scss']
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

  openModal = () => {
    const modal: any = document.getElementById('example_modal');
    modal.openModal();
  };

  render() {
    return (
      <div class="container pt-4">
        <h3 class="mb-4">Modal component </h3>
        <div class="jumbotron pt-3">
          <h4>Usage:</h4>
          <pre>
            {`<scb-modal
  btntype="success"
  modalTitle="Info"
  centered={true}
  animation={true}
  size=""
  backdrop={true}
  keyboard={true}
  modalfocus={true}
  showButton={true}
>
  Put your modal contents here. You can put any content<br />
  <input
    type="text"
    class="form-control"
    name="Name"
    placeholder="Input your name"
  />
</scb-modal>`}
          </pre>

          <h4 class="mb-4">Properties:</h4>
          <table class="table">
            <thead>
              <tr>
                <th class="mx-1">Param</th>
                <th class="mx-1">Type</th>
                <th class="mx-1">Default</th>
                <th class="mx-1">Required</th>
                <th class="mx-1">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>btntype</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code>'primary'</code>
                </td>
                <td>No</td>
                <td />
              </tr>
              <tr>
                <td>
                  <code>modalTitle</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code>'Modal Title'</code>
                </td>
                <td>No</td>
                <td />
              </tr>
              <tr>
                <td>
                  <code>centered</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>true</td>
                <td>No</td>
                <td />
              </tr>
              <tr>
                <td>
                  <code>animation</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>
                  For modals that simply appear rather than fade in to view
                </td>
              </tr>
              <tr>
                <td>
                  <code>size</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code>''</code>
                </td>
                <td>No</td>
                <td>
                  Modals have two optional sizes, available via modifier classes
                  to be placed on a .modal-dialog. These sizes kick in at
                  certain breakpoints to avoid horizontal scrollbars on narrower
                  viewports. Acceptable values: 'large', 'small', ''
                </td>
              </tr>
              <tr>
                <td>
                  <code>backdrop</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>
                  Includes a modal-backdrop element. Alternatively, specify
                  static for a backdrop which doesn't close the modal on click.
                </td>
              </tr>
              <tr>
                <td>
                  <code>keyboard</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>Closes the modal when escape key is pressed</td>
              </tr>
              <tr>
                <td>
                  <code>modalfocus</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>Puts the focus on the modal when initialized.</td>
              </tr>
              <tr>
                <td>
                  <code>show</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>No</td>
                <td>Shows the modal when initialized.</td>
              </tr>
              <tr>
                <td>
                  <code>showButton</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>
                  Shows button for modal toggle or not (which can be toggled by
                  methods).
                </td>
              </tr>
              <tr>
                <td>
                  <code>customId</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code>'scb-modal'</code>
                </td>
                <td>No</td>
                <td>Id for modal element</td>
              </tr>
            </tbody>
          </table>

          <h4>Functions: </h4>
          <p>
            You can get modal instance like following:<br />
            <code>const modal = document.querySelector('scb-modal');</code>
          </p>
          <table class="table">
            <thead>
              <tr>
                <th class="mx-1">Name</th>
                <th class="mx-1">Params</th>
                <th class="mx-1">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>openModal</code>
                </td>
                <td>
                  <code />
                </td>
                <td>Open Modal</td>
              </tr>
              <tr>
                <td>
                  <code>closeModal</code>
                </td>
                <td>
                  <code />
                </td>
                <td>Close Modal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="mt-3">simplest case:</h3>
        <pre class="code">
          <code>
            {`<scb-modal>
  Put your modal contents here. You can put any content.
</scb-modal>`}
          </code>
        </pre>
        <scb-modal>
          Put your modal contents here. You can put any content.
        </scb-modal>

        <h3 class="mt-3">Change Title and button color:</h3>
        <pre class="code">
          <code>
            {`<scb-modal modalTitle="Custom" btntype="success">
  Put your modal contents here. You can put any content.
</scb-modal>`}
          </code>
        </pre>
        <scb-modal modalTitle="Custom" btntype="success">
          Put your modal contents here. You can put any content.
        </scb-modal>

        <h3 class="mt-3">No backdrop, No centered, No animation:</h3>
        <pre class="code">
          <code>
            {`<scb-modal 
    backdrop={false} 
    animation={false} 
    keyboard={false} 
  >
  Put your modal contents here. You can put any content.
</scb-modal>`}
          </code>
        </pre>
        <scb-modal
          backdrop={false}
          animation={false}
          keyboard={false}
          centered={false}
        >
          Put your modal contents here. You can put any content.
        </scb-modal>

        <h3 class="mt-3">Don't display button:</h3>
        <pre class="code">
          <code>
            {`<scb-modal
    id="example_modal" 
    showButton={false}
    id="exampleModal"
  >
  Put your modal contents here. You can put any content.
</scb-modal>
<button class="btn btn-secondary mr-2" onClick={() => {document.getElementById('example_modal').openModal()}}>
  Custom Button
</button>
`}
          </code>
        </pre>
        <scb-modal
          id="example_modal"
          showButton={false}
          onClick={this.openModal}
        >
          Put your modal contents here. You can put any content.
        </scb-modal>
        <button class="btn btn-secondary mr-2" onClick={this.openModal}>
          Custom Button
        </button>
      </div>
    );
  }
}
