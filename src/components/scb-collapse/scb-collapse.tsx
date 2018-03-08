import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'scb-collapse'
})
export class ScbCollapse {

    @Prop() collapseid: string = 'collpaseComponent';
    @Prop() items: any[] = [
        {
            cardHeaderId: 'heading#1',
            cardBodyId: 'collapse#1',
            cardHeaderContent: 'Card Item #1',
            cardBodyContent: 'Card Body #1',
            showOnInit: true
        }
    ];

    render() {
        return (
            <div id={this.collapseid}>
                {this.items.map(item =>
                    <div class="card">
                        <div class="card-header" id={item.cardHeaderId}>
                            <h5 class="mb-0">
                                <button class="btn btn-link" data-toggle="collapse" data-target={'#' + item.cardBodyId} aria-expanded="true" aria-controls={item.cardBodyId}>
                                    {item.cardHeaderContent}
                                </button>
                            </h5>
                        </div>
                        <div id={item.cardBodyId} class={{'collapse': true, 'show': item.showOnInit}} aria-labelledby={item.cardHeaderId} data-parent={'#' + this.collapseid}>
                            <div class="card-body" innerHTML={item.cardBodyContent}>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
