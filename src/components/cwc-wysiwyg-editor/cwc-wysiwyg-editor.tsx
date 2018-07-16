import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop
} from '@stencil/core';
import '../../lib/simplemde-markdown-editor/simplemde.min';

declare var SimpleMDE: any;
@Component({
  tag: 'cwc-wysiwyg-editor',
  styleUrl: 'cwc-wysiwyg-editor.scss'
})
export class CwcWysiwygEditor {
  @Prop() autoDownloadFontAwesome: boolean = undefined;
  @Prop() autofocus: boolean = false;
  @Prop()
  blockStyles: object = {
    bold: '**',
    code: '```',
    italic: '*'
  };
  @Prop() forceSync: boolean = false;
  @Prop() hideIcons: Array<any> = [];
  @Prop() indentWithTabs: boolean = true;
  @Prop() insertTexts: object = {};
  @Prop() lineWrapping: boolean = true;
  @Prop()
  parsingConfig: object = {
    allowAtxHeaderWithoutSpace: false,
    strikethrough: true,
    underscoresBreakWords: false
  };
  @Prop() placeholder: string;
  @Prop() previewRender: (string?) => string;
  @Prop() promptURLs: boolean = false;
  @Prop()
  renderingConfig: object = {
    singleLineBreaks: true,
    codeSyntaxHighlighting: false
  };
  @Prop() shortcuts: object;
  @Prop() showIcons: Array<string>;
  @Prop() spellChecker: boolean = true;
  @Prop() status: any;
  @Prop() styleSelectedText: boolean = true;
  @Prop() tabSize: number = 2;
  @Prop() toolbar: any;
  @Prop() toolbarTips: boolean = true;
  @Element() _element: HTMLElement;

  @Event() onchange: EventEmitter;

  private _simplemde: any = null;

  @Method()
  getRef() {
    return this._simplemde;
  }

  private _initEditor() {
    this._simplemde = new SimpleMDE({
      autoDownloadFontAwesome: this.autoDownloadFontAwesome,
      autofocus: this.autofocus,
      blockStyles: this.blockStyles,
      forceSync: this.forceSync,
      hideIcons: this.hideIcons,
      indentWithTabs: this.indentWithTabs,
      insertTexts: this.insertTexts,
      lineWrapping: this.lineWrapping,
      parsingConfig: this.parsingConfig,
      placeholder: this.placeholder,
      previewRender: this.previewRender,
      promptURLs: this.promptURLs,
      renderingConfig: this.renderingConfig,
      shortcuts: this.shortcuts,
      showIcons: this.showIcons,
      spellChecker: this.spellChecker,
      status: this.status,
      styleSelectedText: this.styleSelectedText,
      tabSize: this.tabSize,
      toolbar: this.toolbar,
      toolbarTips: this.toolbarTips,
      element: this._element.children[0]
    });

    if (this.onchange) {
      this._simplemde.codemirror.on('change', () => {
        this.onchange.emit(this._simplemde.value());
      });
    }
  }

  componentDidLoad() {
    this._initEditor();
  }

  componentDidUpdate() {
    this._initEditor();
  }

  render() {
    return (
      <textarea>
        <slot />
      </textarea>
    );
  }
}
