import { Component, Prop, Element, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'cwc-inlineedit',
    styleUrl: 'cwc-inlineedit.scss'
})
export class CwcInlineedit {
    @Prop() label: string;
    @Prop() value = 'A field value';
    @Element() el: HTMLElement;

    @Event() onchange: EventEmitter;
    @Event() onconfirm: EventEmitter;  
    @Event() oncancel: EventEmitter;

    fieldWrapper: HTMLElement;
    inputWrapper: HTMLElement;
    buttonWrapper: HTMLElement;

    componentDidLoad() {
        this.fieldWrapper = this.el.querySelector('.field-wrapper');
        this.inputWrapper = this.el.querySelector('.input-wrapper');
        this.buttonWrapper = this.el.querySelector('.button-wrapper');
        const self = this;

        let previousTimeout;
        this.inputWrapper.querySelector('input').addEventListener('focusout', () => {
            clearTimeout(previousTimeout);
            previousTimeout = setTimeout(function() {
                if (!self.buttonWrapper.contains(document.activeElement)) {
                    self.saveInputText();
                }
            }, 10);            

        });        
        this.inputWrapper.querySelector('input').addEventListener('input', () => { 
            self.onchange.emit(self.inputWrapper.querySelector('input').value);
        });  
    }

    handleFieldClick() {
        const inputEl: HTMLInputElement = this.inputWrapper.querySelector('input');
        const text = this.fieldWrapper.innerText;
        this.fieldWrapper.style.display = 'none';
        this.inputWrapper.style.display = 'block';
        inputEl.value = text;
        inputEl.focus();        
    }

    handleOkClick() {
        this.saveInputText();
    }    

    handleCancelClick() {
        this.inputWrapper.style.display = 'none';
        this.fieldWrapper.style.display = 'inline-block';
        this.oncancel.emit();
        if (this.inputWrapper.querySelector('input').value !== this.fieldWrapper.innerText) {
            this.inputWrapper.querySelector('input').value = this.fieldWrapper.innerText;
            this.onchange.emit(this.inputWrapper.querySelector('input').value);
        }
    }     

    private saveInputText() {
        const value = this.inputWrapper.querySelector('input').value;
        this.fieldWrapper.innerText = value;        
        this.inputWrapper.style.display = 'none';
        this.fieldWrapper.style.display = 'inline-block';
        this.onconfirm.emit(value);
    }

    render() {
        return (
            <div>
                <div class="label-wrapper">
                    <label>{this.label}</label>
                </div>
                <div class="field-wrapper" onClick={ () => this.handleFieldClick()}> 
                    {this.value}
                </div>
                <div class="input-wrapper">
                    <input class="form-control"/>
                    <div class="button-wrapper">
                        <button type="button" class="btn btn-light btn-sm" onClick={() => this.handleOkClick()}>
                            <span><svg width="16" height="16" viewBox="0 0 24 24">
                                <path d="M6.735 12.322a1 1 0 0 0-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 0 0 3.939-3.883l.04-.04a492.598 492.598 0 0 0 3.658-3.643 1 1 0 0 0-1.424-1.404 518.42 518.42 0 0 1-3.64 3.625l-.04.04a2049.114 2049.114 0 0 1-3.775 3.722l-3.098-3.363z" fill="currentColor"/>
                                </svg>
                            </span>
                        </button>
                        <button type="button" class="btn btn-light btn-sm" onClick={() => this.handleCancelClick()}>
                            <span>
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path d="M12 10.586L6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586z" fill="currentColor"/>
                            </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
