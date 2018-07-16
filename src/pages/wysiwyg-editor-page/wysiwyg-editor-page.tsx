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
        <h3>simplest case:</h3>
        <cwc-wysiwyg-editor>
          {`# This one autosaves!
By default, it saves every 10 seconds, but this can be changed. When this textarea is included in a form, it will automatically forget the saved value when the form is submitted.`}
        </cwc-wysiwyg-editor>
        <h3 class="mt-2">disable html and markdown:</h3>
        <cwc-wysiwyg-editor markdown={false} html={false}>
          {`# This one is bare
You can also choose to hide the statusbar and/or toolbar for a simple and clean appearance. This one also checks for misspelled words as you type!`}
        </cwc-wysiwyg-editor>
        <div class="jumbotron pt-3 mt-3">
          <h4>Usage:</h4>
          <pre>
            {`<cwc-wysiwyg-editor>initial content</cwc-wysiwyg-editor>`}
          </pre>

          <h4>Properties:</h4>
          <table class="table prop-table">
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
                  <code>fencing</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>
                  Prefers to wrap code blocks in "fences" (GitHub style) instead
                  of indenting code blocks using four spaces.
                </td>
              </tr>
              <tr>
                <td>
                  <code>markdown</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>Enables Markdown user input mode.</td>
              </tr>
              <tr>
                <td>
                  <code>html</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>Enables HTML user input mode.</td>
              </tr>
              <tr>
                <td>
                  <code>wysiwyg</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>Enables WYSIWYG user input mode.</td>
              </tr>
              <tr>
                <td>
                  <code>defaultMode</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td />
                <td>No</td>
                <td>Sets the default mode for the editor.</td>
              </tr>
            </tbody>
          </table>
          <h4>Functions: </h4>
          <p>
            The editor API allows you to interact with woofmark editor
            instances. This is what you get back from woofmark(textarea,
            options) or woofmark.find(textarea).
          </p>
          <h4>
            <code>editor.addCommand(combo, fn)</code>
          </h4>
          <div>
            Binds a keyboard key combination such as cmd+shift+b to a method
            using kanye. Please note that you should always use cmd rather than
            ctrl. In non-OSX environments it'll be properly mapped to ctrl. When
            the combo is entered, fn(e, mode, chunks) will be called.
          </div>
          <ul>
            <li>
              e is the original event object mode can be markdown, html, or
            </li>
            <li>
              wysiwyg chunks is a chunks object, describing the current state of
            </li>
            <li>the editor</li>
          </ul>
          <p>
            In addition, fn is given a this context similar to that of Grunt
            tasks, where you can choose to do nothing and the command is assumed
            to be synchronous, or you can call this.async() and get back a done
            callback like in the example below.
          </p>
          <pre class="code">
            {`editor.addCommand('cmd+j', function jump (e, mode, chunks) {
  var done = this.async();
  // TODO: async operation
  done();
});
`}
          </pre>

          <h4>
            <code>editor.addCommandButton(id, combo?, fn)</code>
          </h4>
          <p>
            Adds a button to the editor using an id and an event handler. When
            the button is pressed, fn(e, mode, chunks) will be called with the
            same arguments as the ones passed if using editor.addCommand(combo,
            fn).
          </p>
          <p>
            You can optionally pass in a combo, in which case
            editor.addCommand(combo, fn) will be called, in addition to creating
            the command button.
          </p>

          <h4>
            <code>editor.runCommand(fn)</code>
          </h4>
          <p>
            If you just want to run a command without setting up a keyboard
            shortcut or a button, you can use this method. Note that there won't
            be any e event argument in this case, you'll only get chunks, mode
            passed to fn. You can still run the command asynchronously using
            this.async(). Note that the argument order chunks, mode is the
            reverse of that passed to addCommand (mode, chunks).
          </p>

          <h4>
            <code>editor.parseMarkdown()</code>
          </h4>
          <p>This is the same method passed as an option.</p>

          <h4>
            <code>editor.parseHTML()</code>
          </h4>
          <p>This is the same method passed as an option.</p>

          <h4>
            <code>editor.destroy()</code>
          </h4>
          <p
          >{`Destroys the editor instance, removing all event handlers. The editor is reverted to markdown mode, and assigned the proper Markdown source code if needed. Then we go back to being a plain old and dull <textarea> element.`}</p>

          <h4>
            <code>editor.value(text)</code>
          </h4>
          <p>
            If optional Markdown string text is provided, it is used to
            overwrite the current editor content, parsing into HTML if
            necessary. Regardless of whether text is provided, value() returns
            the current Markdown value for the editor.
          </p>

          <h4>
            <code>editor.editable</code>
          </h4>
          <p>
            {`If options.wysiwyg then this will be the contentEditable <div>. Otherwise it'll be set to null.`}
          </p>

          <h4>
            <code>editor.mode</code>
          </h4>
          <p>
            {`The current mode for the editor. Can be markdown, html, or wysiwyg.`}
          </p>

          <h4>
            <code>editor.setMode(mode)</code>
          </h4>
          <p>{`Sets the current mode of the editor.`}</p>

          <h4>
            <code>editor.showLinkDialog()</code>
          </h4>
          <p>
            {`Shows the insert link dialog as if the button to insert a link had been clicked.`}
          </p>

          <h4>
            <code>editor.showImageDialog()</code>
          </h4>
          <p>
            {`Shows the insert image dialog as if the button to insert a image had been clicked.`}
          </p>

          <h4>
            <code>editor.showAttachmentDialog()</code>
          </h4>
          <p>
            {`Shows the insert attachment dialog as if the button to insert a attachment had been clicked.`}
          </p>

          <h4>
            <code>editor.history</code>
          </h4>
          <p>
            {`Exposes a few methods to gain insight into the operation history for the editor instance.`}
          </p>

          <h5>
            <code>editor.history.undo()</code>
          </h5>
          <p>{`Undo the last operation.`}</p>

          <h5>
            <code>editor.history.redo()</code>
          </h5>
          <p>{`Re-applies the most recently undone operation.`}</p>

          <h5>
            <code>editor.history.canUndo()</code>
          </h5>
          <p
          >{`Returns a boolean value indicating whether there are any operations left to undo.`}</p>

          <h5>
            <code>editor.history.canRedo()</code>
          </h5>
          <p
          >{`Returns a boolean value indicating whether there are any operations left to redo.`}</p>
        </div>
      </div>
    );
  }
}
