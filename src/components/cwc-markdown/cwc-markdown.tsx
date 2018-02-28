import { Component, Prop, Watch, State } from '@stencil/core';
// import { BootstrapThemeColor } from '../../common/bootstrap-theme-color.type';
import initMarkup from '@ui-guys/stencil-markdown';

@Component({
    tag: 'cwc-markdown',
    styleUrl: 'cwc-markdown.scss'
})
export class CwcMarkdown {

    @Prop() data: string = '';
    @State() marked: initMarkup

    constructor() {
        this.marked = initMarkup();
    }

    @Watch('data')
    textWatchHandler(val) {
        this.data = val
    }



    render() {

        return (
            <div innerHTML={this.marked(this.data)}>
            </div>
        )

    }
}
