import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'cwc-sticky-header',
  styleUrl: 'cwc-sticky-header.scss'
})
export class CwcStickyHeaderComponent {

  @Prop() name: string;

  render() {
    return (
        <div class="test"><slot /></div>
    )
  }
}
