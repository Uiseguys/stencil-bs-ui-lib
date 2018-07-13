import {
  Component,
  Element,
  Prop,
  Event,
  EventEmitter,
  Method,
  State,
  Watch
} from '@stencil/core';

const TRANSITION_TIME = 100;
@Component({
  tag: 'cwc-modal'
})
export class CwcModal {
  @Element() el;

  @Prop() btntype: string = 'primary';
  @Prop() modalTitle: string = 'Modal Title';
  @Prop() centered: boolean = true;
  @Prop() animation: boolean = true;

  // 'large' for large modal, 'small' for small modal, '' for default modal
  @Prop() size: string = '';

  // true, false or 'static'
  @Prop() backdrop: any = true;
  @Prop() keyboard: boolean = true;
  @Prop() modalfocus: boolean = true;
  @Prop() show: boolean = undefined;

  @Prop() showButton: boolean = true;
  @Prop() customId: string = 'cwc-modal';
  @Prop() toggle: () => any = null;

  @Event() onOpenModal: EventEmitter;
  @Event() onCloseModal: EventEmitter;

  modalElem: HTMLElement;
  modalContentElem: HTMLElement;
  backdropElem: HTMLElement;

  @State() modalShown: boolean;

  componentDidLoad() {
    if (this.show) this.openModal();
  }

  componentDidUnload() {
    this._removeBackDrop();
    this._removeKeyListener();
  }

  @Watch('show')
  watchHandler(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      if (newValue) {
        setTimeout(() => {
          this.openModal();
        }, 10); // wait until rerendered
      } else {
        this.closeModal();
      }
    }
  }

  @Method()
  openModal() {
    if (this.modalShown) return;

    this.modalElem.style.display = 'block';
    this.modalShown = true;
    // emit event
    this.onOpenModal.emit();
    // add backdrop
    this._addBackDrop();
    // add keyboard
    this._addKeyListener();
    // focus
    if (this.modalfocus) {
      setTimeout(() => {
        this.modalContentElem.focus();
      });
    }
  }

  @Method()
  closeModal() {
    if (!this.modalShown) return;

    this.modalShown = false;
    // emit event
    this.onCloseModal.emit();
    // remove backdrop
    this._removeBackDrop();
    this._removeKeyListener();
    setTimeout(() => {
      this.modalElem.style.display = 'none';
    }, this.animation ? TRANSITION_TIME : 0);
  }

  @Method()
  getModalRef() {
    return this;
  }

  _addBackDrop() {
    if (!this.backdrop) return;

    this.backdropElem = document.createElement('div');
    this.backdropElem.className = 'modal-backdrop fade show';
    document.body.appendChild(this.backdropElem);

    setTimeout(() => {
      document.addEventListener('click', this._handleDocumentClick);
    }, 5);
  }

  _removeBackDrop() {
    if (this.backdropElem) {
      document.body.removeChild(this.backdropElem);
      this.backdropElem = null;
    }
    document.removeEventListener('click', this._handleDocumentClick);
  }

  _addKeyListener() {
    if (this.keyboard) {
      document.addEventListener('keydown', this._handleKeyDown);
    }
  }

  _removeKeyListener() {
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  _handleDocumentClick = e => {
    const elem = document.elementFromPoint(e.clientX, e.clientY);
    if (
      this.modalContentElem.contains(elem) ||
      this.modalContentElem === elem
    ) {
      return;
    }

    this.closeModal();
  };

  _handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.closeModal();
    }
  };

  openModalHandler = () => {
    if (this.show === undefined) this.openModal();
    else if (this.toggle) this.toggle();
  };

  closeModalHandler = () => {
    if (this.show === undefined) this.closeModal();
    else if (this.toggle) this.toggle();
  };

  render() {
    return (
      <div>
        {this.showButton && (
          <button
            class={'btn btn-' + this.btntype}
            type="button"
            onClick={this.openModalHandler}
          >
            Open Modal
          </button>
        )}

        <div
          ref={c => {
            this.modalElem = c;
          }}
          id={this.customId}
          class={{
            modal: true,
            fade: this.animation,
            show: this.modalShown,
            'bd-example-modal-lg': this.size === 'large',
            'bd-example-modal-sm': this.size === 'small'
          }}
          tabindex="-1"
          role="dialog"
          aria-labelledby="modalDialog"
          aria-hidden="true"
        >
          <div
            class={{
              'modal-dialog': true,
              'modal-dialog-centered': this.centered,
              'modal-lg': this.size === 'large',
              'modal-sm': this.size === 'small'
            }}
            role="document"
          >
            <div
              ref={c => {
                this.modalContentElem = c;
              }}
              class="modal-content"
            >
              <div class="modal-header">
                <h5 class="modal-title">{this.modalTitle}</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.closeModalHandler}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <slot />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.closeModalHandler}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
