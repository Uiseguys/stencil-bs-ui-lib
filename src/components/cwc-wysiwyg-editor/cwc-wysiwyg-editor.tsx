import { Element, Component } from '@stencil/core';

declare var $: any;

@Component({
  tag: 'cwc-wysiwyg-editor',
  styleUrl: 'cwc-wysiwyg-editor.scss'
})
export class CwcWysiwygEditor {
  @Element() _element: HTMLElement;

  componentDidLoad() {
    setTimeout(() => {
      $(this._element)
        .find('.markdown-container')
        .markdown({
          iconlibrary: 'fa'
        });
    });
  }

  render() {
    return (
      <div class="markdown-container" data-provide="markdown-editable">
        <slot />
      </div>
    );
  }
}
