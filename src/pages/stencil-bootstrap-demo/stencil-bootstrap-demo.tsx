import { Component } from '@stencil/core';

@Component({
    tag: 'stencil-bootstrap-demo',
})
export class StencilBootstrapDemo {
    cards: any[] = [
        {
            cardHeaderId: 'navbarHeading',
            cardBodyId: 'navbarCollapse',
            cardHeaderContent: 'Navbar Component',
            cardBodyContent: '<navbar-page></navbar-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'collapseHeading',
            cardBodyId: 'collapseCollapse',
            cardHeaderContent: 'Collapse Component',
            cardBodyContent: '<collapse-page></collapse-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'tooltipHeading',
            cardBodyId: 'tooltipCollapse',
            cardHeaderContent: 'Tooltip Component',
            cardBodyContent: '<tooltip-page></tooltip-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'modalHeading',
            cardBodyId: 'modalCollapse',
            cardHeaderContent: 'Modal Component',
            cardBodyContent: '<modal-page></modal-page>',
            showOnInit: false
        }
    ];

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 text-center">
                        <h1>Web Components for Bootstrap 4 Beta</h1>
                        <p>Built with <a href="https://stenciljs.com" target="blank">Stencil</a> &lt;3</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">

                        <div id="accordion">
                            <div class="card">
                                <div class="card-header" id="navigationComponent">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#navigationCollapse" aria-expanded="true" aria-controls="navigationCollapse">
                                            Navigation Component
                                        </button>
                                    </h5>
                                </div>
                                <div id="navigationCollapse" class="collapse" aria-labelledby="navigationComponent" data-parent="#accordion">
                                    <div class="card-body">
                                        <navbar-page></navbar-page>
                                    </div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-header" id="tooltipComponent">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#tooltipCollapse" aria-expanded="true" aria-controls="tooltipCollapse">
                                            Tooltip Component
                                        </button>
                                    </h5>
                                </div>
                                <div id="tooltipCollapse" class="collapse" aria-labelledby="tooltipComponent" data-parent="#accordion">
                                    <div class="card-body">
                                        <tooltip-page></tooltip-page>
                                    </div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-header" id="modalComponent">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#modalCollapse" aria-expanded="true" aria-controls="modalCollapse">
                                            Modal Component
                                        </button>
                                    </h5>
                                </div>
                                <div id="modalCollapse" class="collapse" aria-labelledby="modalComponent" data-parent="#accordion">
                                    <div class="card-body">
                                        <modal-page></modal-page>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="videoPlayerComponent">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#videoPlayerCollapse" aria-expanded="true" aria-controls="videoPlayerCollapse">
                                            Video player Component
                                        </button>
                                    </h5>
                                </div>
                                <div id="videoPlayerCollapse" class="collapse" aria-labelledby="videoPlayerComponent" data-parent="#accordion">
                                    <div class="card-body">
                                        <video-player-page></video-player-page>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <scb-collapse collapseid="mainCollapse" items={this.cards}></scb-collapse>
                    </div>
                </div>
            </div>
        );
    }
}
