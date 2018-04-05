import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'cwc-sticky-header',
  styleUrl: 'cwc-sticky-header.scss'
})
export class CwcStickyHeaderComponent {

    @Prop() background: string = "#999999";
    @Prop() color: string = "#ffffff";
    @Element() header: HTMLElement;

    componentDidLoad() {
        const barEl: HTMLElement = this.header.querySelector('.followMeBar');
        barEl.style.background = this.background;
        barEl.style.color = this.color;
    }

    render() {
        return (
            <div class="followWrap">
              <div class="followMeBar"><slot /></div>
            </div>
        )
      }
}
