import { Component, Element, Method, Prop, Event, EventEmitter } from '@stencil/core';
import '../../lib/woofmark/woofmark.min';
import '../../lib/woofmark/megamark.min';
import '../../lib/woofmark/domador.min';

declare var woofmark: any;
declare var megamark: any;
declare var domador: any;

@Component({
  tag: 'cwc-wysiwyg-editor',
  styleUrl: 'cwc-wysiwyg-editor.scss'
})
export class CwcWysiwygEditor {
  /* used for form-generator */
  @Prop() id: string;
  @Prop() for: string;
  /* /used for form-generator */
  @Prop() fencing: boolean = true;
  @Prop() markdown: boolean = true;
  @Prop() html: boolean = true;
  @Prop() wysiwyg: boolean = true;
  @Prop() defaultMode: string;
  @Prop() images: object;

  @Element() _element: HTMLElement;

  @Event() postValue: EventEmitter;

  private _woofmark: any = null;

  @Method()
  getRef() {
    return this._woofmark;
  }

  private _initEditor() {
    this._woofmark = woofmark(this._element.children[0], {
      fencing: this.fencing,
      markdown: this.markdown,
      html: this.html,
      parseMarkdown: megamark,
      parseHTML: domador,
      render: {
        modes: function (button, id) {
          const modes = {
            html: "HTML",
            markdown: "Markdown",
            wysiwyg: "Preview"
          };
          button.textContent = modes[id];
        },
        commands: function(button, id) {
          const classNames = {
            bold: 'fa fa-bold',
            italic: 'fa fa-italic',
            quote: 'fa fa-quote-left',
            code: 'fa fa-code',
            ol: 'fa fa-list-ol',
            ul: 'fa fa-list-ul',
            link: 'fa fa-link',
            image: 'fa fa-image'
          };
          if (id === 'heading') {
            button.innerHTML = 'H1';
          } else {
            button.className = classNames[id];
          }
        }
      }
    });
  }

  componentDidLoad() {
    const self = this;
    this._initEditor();

    this._woofmark.editable.addEventListener('DOMSubtreeModified', function(e) {
      self.postValue.emit({
          id: self.id,
          value: e.currentTarget.innerHTML,
          type: self.for
      });
    });
  }

  componentDidUpdate() {
    // this._initEditor();
  }

  render() {
    return (
      <textarea>
        <slot />
      </textarea>
    );
  }
}
