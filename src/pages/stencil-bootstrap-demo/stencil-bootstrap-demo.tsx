import { Component } from '@stencil/core';

@Component({
    tag: 'stencil-bootstrap-demo',
})
export class StencilBootstrapDemo {
    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 text-center">
                        <h1>
                            Web Components for Bootstrap 4 Beta
                        </h1>

                        <p>
                            Built with <a href="https://stenciljs.com" target="blank">Stencil</a> &lt;3
                        </p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div id="accordion">
                            <div class="card">
                                <div class="card-header" id="collapseComponent">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseCollapse" aria-expanded="true" aria-controls="collapseCollapse">
                                            Collapse Component
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseCollapse" class="collapse" aria-labelledby="collapseComponent" data-parent="#accordion">
                                    <div class="card-body">
                                        <collapse-page></collapse-page>
                                    </div>
                                </div>
                            </div>

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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
