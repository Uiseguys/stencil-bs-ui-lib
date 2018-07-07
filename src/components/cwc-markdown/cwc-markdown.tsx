import { Component, Prop, State } from '@stencil/core';
// import { BootstrapThemeColor } from '../../common/bootstrap-theme-color.type';
import { initMarkup } from '../../lib/stencil-markdown';

@Component({
  tag: 'cwc-markdown',
  styleUrl: 'cwc-markdown.scss'
})
export class CwcMarkdown {
  @Prop() data: string;
  @State() marked: any;

  constructor() {
    this.marked = initMarkup();
  }

  render() {
    return <div innerHTML={this.marked(this.data)} />;
  }
}
