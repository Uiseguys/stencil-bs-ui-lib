import { Component } from '@stencil/core';

@Component({
  tag: 'wysiwyg-editor-page',
  styleUrl: 'wysiwyg-editor-page.scss'
})
export class WysiwygEditorPage {
  render() {
    return (
      <div>
        <h2 class="mb-4">Wysiwyg Editor component </h2>
        <cwc-wysiwyg-editor>
          <h3>This is some editable heading</h3>
          <p>Well, actually all contents within this "markdown-editable" context is really editable. Just click anywhere!</p>
        </cwc-wysiwyg-editor>
      </div>
    );
  }
}
