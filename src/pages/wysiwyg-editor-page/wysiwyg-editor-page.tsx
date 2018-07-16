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
        <h3 class="mt-2">Hidden toolbar and status bar:</h3>
        <cwc-wysiwyg-editor status={false} toolbar={false}>
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
                  <code>autoDownloadFontAwesome</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>undefined</code>
                </td>
                <td>No</td>
                <td>
                  If set to <code>true</code>, force downloads Font Awesome
                  (used for icons). If set to <code>false</code>, prevents
                  downloading. Defaults to undefined, which will intelligently
                  check whether Font Awesome has already been included, then
                  download accordingly.
                </td>
              </tr>
              <tr>
                <td>
                  <code>autofocus</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>No</td>
                <td>
                  If set to <code>true</code>, autofocuses the editor.
                </td>
              </tr>
              <tr>
                <td>
                  <code>blockStyles</code>
                </td>
                <td>
                  <code>object</code>
                </td>
                <td />
                <td>No</td>
                <td>
                  Customize how certain buttons that style blocks of text
                  behave.<br />
                  <ul>
                    <li>
                      <strong>bold</strong> Can be set to <code>**</code> or{' '}
                      <code>__</code>. Defaults to <code>**</code>.
                    </li>
                    <li>
                      <strong>code</strong> Can be set to <code>```</code> or{' '}
                      <code>~~~</code>. Defaults to <code>```</code>.
                    </li>
                    <li>
                      <strong>italic</strong> Can be set to <code>*</code> or{' '}
                      <code>_</code>. Defaults to <code>*</code>.
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <code>forceSync</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>No</td>
                <td>
                  If set to <code>true</code>, force text changes made in
                  SimpleMDE to be immediately stored in original textarea.
                </td>
              </tr>
              <tr>
                <td>
                  <code>hideIcons</code>
                </td>
                <td>
                  <code>array</code>
                </td>
                <td>
                  <code />
                </td>
                <td>No</td>
                <td>
                  An array of icon names to hide. Can be used to hide specific
                  icons shown by default without completely customizing the
                  toolbar.
                </td>
              </tr>
              <tr>
                <td>
                  <code>indentWithTabs</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>
                  If set to <code>false</code>, indent using spaces instead of
                  tabs.
                </td>
              </tr>
              <tr>
                <td>
                  <code>insertTexts</code>
                </td>
                <td>
                  <code>object</code>
                </td>
                <td />
                <td>No</td>
                <td>
                  Customize how certain buttons that insert text behave. Takes
                  an array with two elements. The first element will be the text
                  inserted before the cursor or highlight, and the second
                  element will be inserted after. For example, this is the
                  default link value: <code>["[", "](http://)"]</code>.
                  <ul>
                    <li>horizontalRule</li>
                    <li>image</li>
                    <li>link</li>
                    <li>table</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <code>lineWrapping</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>
                  If set to <code>false</code>, disable line wrapping.
                </td>
              </tr>
              <tr>
                <td>
                  <code>parsingConfig</code>
                </td>
                <td>
                  <code>object</code>
                </td>
                <td />
                <td>No</td>
                <td>
                  Adjust settings for parsing the Markdown during editing (not
                  previewing).<br />
                  <ul>
                    <li>
                      <strong>allowAtxHeaderWithoutSpace</strong>: If set to{' '}
                      <code>true</code>, will render headers without a space
                      after the #. Defaults to
                      <code>false</code>.
                    </li>
                    <li>
                      <strong>strikethrough</strong>: If set to{' '}
                      <code>false</code>, will not process GFM strikethrough
                      syntax. Defaults to <code>true</code>.
                    </li>
                    <li>
                      <strong>underscoresBreakWords</strong>: If set to{' '}
                      <code>true</code>, let underscores be a delimiter for
                      separating words. Defaults to
                      <code>false</code>.
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <code>placeholder</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code />
                </td>
                <td>No</td>
                <td>Custom placeholder that should be displayed</td>
              </tr>
              <tr>
                <td>
                  <code>previewRender</code>
                </td>
                <td>
                  <code>function</code>
                </td>
                <td />
                <td>No</td>
                <td>
                  Custom function for parsing the plaintext Markdown and
                  returning HTML. Used when user previews.
                </td>
              </tr>
              <tr>
                <td>
                  <code>promptURLs</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>No</td>
                <td>
                  If set to <code>true</code>, a JS alert window appears asking
                  for the link or image URL.
                </td>
              </tr>
              <tr>
                <td>
                  <code>renderingConfig</code>
                </td>
                <td>
                  <code>object</code>
                </td>
                <td />
                <td>No</td>
                <td>
                  If set to <code>true</code>, a JS alert window appears asking
                  for the link or image URL.
                </td>
              </tr>
              <tr>
                <td>
                  <code>shortcuts</code>
                </td>
                <td>
                  <code>array</code>
                </td>
                <td />
                <td>No</td>
                <td>
                  Keyboard shortcuts associated with this instance. Defaults to
                  the array of shortcuts.
                </td>
              </tr>
              <tr>
                <td>
                  <code>showIcons</code>
                </td>
                <td>
                  <code>array</code>
                </td>
                <td />
                <td>No</td>
                <td>
                  An array of icon names to show. Can be used to show specific
                  icons hidden by default without completely customizing the
                  toolbar.
                </td>
              </tr>
              <tr>
                <td>
                  <code>spellChecker</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>
                  If set to <code>false</code>, disable the spell checker.
                </td>
              </tr>
              <tr>
                <td>
                  <code>status</code>
                </td>
                <td />
                <td />
                <td>No</td>
                <td>
                  If set to <code>false</code>, hide the status bar. Defaults to
                  the array of built-in status bar items.
                  <ul>
                    <li>
                      Optionally, you can set an array of status bar items to
                      include, and in what order. You can even define your own
                      custom status bar items.
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <code>styleSelectedText</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
                <td>No</td>
                <td>
                  If set to <code>false</code>, remove the
                  CodeMirror-selectedtext class from selected lines.
                </td>
              </tr>
              <tr>
                <td>
                  <code>tabSize</code>
                </td>
                <td>
                  <code>number</code>
                </td>
                <td>
                  <code>2</code>
                </td>
                <td>No</td>
                <td>If set, customize the tab size.</td>
              </tr>
              <tr>
                <td>
                  <code>toolbar</code>
                </td>
                <td />
                <td />
                <td>No</td>
                <td>
                  If set to <code>false</code>, hide the toolbar. Defaults to
                  the array of icons.
                </td>
              </tr>
              <tr>
                <td>
                  <code>toolbarTips</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>No</td>
                <td>
                  If set to <code>false</code>, disable toolbar button tips.
                </td>
              </tr>
              <tr>
                <td>
                  <code>onchange</code>
                </td>
                <td>
                  <code>function</code>
                </td>
                <td>
                  <code />
                </td>
                <td>No</td>
                <td>This function is called when content is changed.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
