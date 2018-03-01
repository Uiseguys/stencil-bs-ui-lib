import {Component, Prop, Watch} from '@stencil/core';
import {BootstrapThemeColor} from '../../common/bootstrap-theme-color.type';


@Component({
    tag: 'cwc-progress-bar',
    styleUrl: 'cwc-progress-bar.scss'
})
export class CwcProgressBar {

    @Prop() text: string = ''
    @Prop() progressBarType: BootstrapThemeColor = undefined;
    @Prop() classes: string = undefined
    @Prop() closable: boolean = false
    @Prop() striped: boolean = false
    @Prop() animated: boolean = false
    @Prop() height: number = 20;


    @Watch('text')
    textWatchHandler(val) {
        this.text = val
    }

    @Watch('progressBarType')
    watchHandler(val) {
        this.progressBarType = val
    }


    limit(text: string, count: number): string {
        if (text.length > count - 3) {
            text = text.slice(0, text.length - 3)
            text += '...'
        }

        return text
    }

    getClassList(): string {
        let classes = ''
        if (!!this.progressBarType) {
            classes = ' bg-' + this.progressBarType
        } else {
            classes = ' bg-primary'
        }

        if (this.striped) {
            classes += ` progress-bar-striped `
        }

        if (this.animated) {
            classes += ` progress-bar-animated `
        }
        if (this.classes) {
            classes += ` ${this.classes} `
        }

        if (this.closable) {
            classes += ' closable'
        }
        return classes
    }

    render() {
        return (
        <div>
            <div class={"progress"} style={{height: this.height + 'px'}}>
                <div  class={"progress-bar" + this.getClassList()} role="progressbar" style={{width: '50%'}}>
                    {this.limit(this.text, this.height)}
                 </div>
            </div>
        </div>

        )

    }
}
