import { Component, Element, Listen } from '@stencil/core';

@Component({
  tag: 'cwc-sticky',
  styleUrl: 'cwc-sticky.scss'
})
export class CwcStickyComponent {

    @Element() sticky: HTMLElement;
    private stickyHeaders = [];
    private isScrollingProcess = false;

    @Listen('document:scroll')
    handleScroll() {
        if (!this.isScrollingProcess) {
            this.isScrollingProcess = true;
            let scrollTop = document.documentElement.scrollTop;
            const stickyLength = this.stickyHeaders.length;
            this.stickyHeaders.forEach((item, index) => {
                const maxScroll = document.documentElement.offsetHeight - window.innerHeight - item.originalHeight;
                const isFixed = item.barEl.classList.contains('fixed');                
                if (!isFixed && item.originalTop !== item.barEl.offsetTop) {
                    item.originalTop = item.barEl.offsetTop;
                }     
                const isAbsolute = item.barEl.classList.contains('absolute');  
                if (item.originalTop <= scrollTop) {
                    if (!isFixed) {
                        const elWidth = item.barEl.offsetWidth;
                        item.barEl.classList.add('fixed');
                        item.barEl.style.width = elWidth + 'px';
                    }
                    if (index < stickyLength - 1 && !isAbsolute) {
                        const nextStickyPosition = this.stickyHeaders[index + 1].originalTop - item.originalHeight;
                        if (scrollTop > nextStickyPosition) {
                            item.barEl.classList.add('absolute');
                            item.barEl.style.top = nextStickyPosition + 'px';
                        }
                    }

                } else if (scrollTop < maxScroll) {
                    if (isFixed) {
                        item.barEl.classList.remove('fixed');
                        item.barEl.style.width = '';
                    }
                    if (index > 0 && this.stickyHeaders[index - 1].barEl.classList.contains('absolute')
                            && scrollTop <= item.originalTop - item.originalHeight) {
                        this.stickyHeaders[index - 1].barEl.classList.remove('absolute');
                        this.stickyHeaders[index - 1].barEl.style.top = '';
                    }
                }
                if (scrollTop !== document.documentElement.scrollTop) {
                    scrollTop = document.documentElement.scrollTop;
                }
            });
            this.isScrollingProcess = false;
        }
    }

    componentDidLoad() {
        const stickyHeaderNodes = this.sticky.querySelectorAll('cwc-sticky-header');
        for ( let i = 0, length = stickyHeaderNodes.length; i < length; i++ ) {
            const barEl: HTMLElement = stickyHeaderNodes.item(i).querySelector('.followMeBar');
            const originalTop = barEl.offsetTop;
            const originalHeight = barEl.offsetHeight;
            barEl.parentElement.style.top = originalHeight + 'px';
            this.stickyHeaders.push({
                element: stickyHeaderNodes.item(i),
                barEl,
                originalHeight,
                originalTop
            });
        }
    }  

    render() {
        return (
            <slot />
        )
      }
}
