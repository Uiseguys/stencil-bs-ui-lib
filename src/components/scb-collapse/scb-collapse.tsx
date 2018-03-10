import { Component, Prop } from '@stencil/core';
import 'bootstrap.native/dist/bootstrap-native-v4';
declare var window: any;

@Component({
    tag: 'scb-collapse',
    styleUrl: '../../../node_modules/bootstrap/dist/css/bootstrap.css'
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

    componentDidLoad() {
        window.BSN.initCallback();
    }

    render() {
        return (
            <div id={this.collapseid}>
                {this.items.map(item =>
                    <div class="card">
                        <div class="card-header" id={item.cardHeaderId}>
                            <h5 class="mb-0">
                                <button class="btn btn-link" data-toggle="collapse" data-target={'#' + item.cardBodyId} data-parent={'#' + this.collapseid} aria-expanded="true" aria-controls={item.cardBodyId}>
                                    {item.cardHeaderContent}
                                </button>
                            </h5>
                        </div>
                        <div id={item.cardBodyId} class={{'collapse': true, 'show': item.showOnInit}} role="tabpanel" aria-labelledby={item.cardHeaderId}>
                            <div class="card-body" innerHTML={item.cardBodyContent}>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
