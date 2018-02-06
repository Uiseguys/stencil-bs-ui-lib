import { Component, Prop, Method, Element } from '@stencil/core';


@Component({
    tag: 'cwc-tag',
    styleUrl: 'cwc-tag.scss'
})
export class CwcTag {

    @Prop() text: string = ''
    @Prop() classes: string = undefined
    @Prop() link: string = undefined
    @Prop() imgLink: string = undefined
    @Prop() closable: boolean = false
    @Prop() rounded: boolean = false
    @Prop() limitTo: number = 25;

    @Element() element: HTMLElement;

    @Method()
    close(e?: UIEvent): void {
        if (this.link)
            e.preventDefault()

        this.element.parentElement.removeChild(this.element)
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
        if (this.classes)
            classes += ` ${this.classes} `
        if (this.rounded)
            classes += ' badge-pill'
        if (this.closable)
            classes += ' closable'
        if (!!this.imgLink)
            classes += ' tag-with-image'

        return classes
    }

    render() {
        return this.link ?
            (
                <a class={'badge badge-info ' + this.getClassList()} href={this.link}
                    title={this.link}>
                    {(() => this.imgLink && (
                        <img src={this.imgLink} class="rounded-circle" ></img>
                    ))()}

                    <span class="badge-text">
                        {this.limit(this.text, this.limitTo)}
                    </span>


                    {(() => this.closable &&
                        <span aria-hidden="true" class="btn-close " onClick={(e: UIEvent) => this.close(e)}
                            title="Close">&times;</span>
                    )()}
                </a>
            )
            : (
                <span class={'badge badge-info' + this.getClassList()}
                    title={this.text}>
                    {(() => this.imgLink && (
                        <img src={this.imgLink} class="rounded-circle" ></img>
                    ))()}

                    <span class="badge-text">
                        {this.limit(this.text, this.limitTo)}
                    </span>

                    {(() => this.closable &&
                        <span aria-hidden="true" class="btn-close " onClick={() => this.close()}
                            title="Close">&times;</span>
                    )()}
                </span>
            )

    }
}