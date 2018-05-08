import { Component, State, Listen } from '@stencil/core';

@Component({
    tag: 'datepicker-page',
})
export class DatepickerPage {

    @State() result;
    @State() currentLanguage = 'en'

    @Listen('statechange')
    stateChangeHandler(e) {
        console.log('got results: ', e.detail)
        this.result = e.detail
    }

    render() {
        return (
            <div class="container pt-4">
                <h2 class="mb-4">Datepicker component </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron pt-3">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h3>Usage </h3>
                                            <div>


                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <pre><code class="lang-tsx">
                                                <span>&lt;cwc-datepicker</span><br />
                                                <span class="hljs-built_in ml-4">start-date="03/25/2018"</span><br />
                                                <span class="hljs-built_in ml-4">end-date="04/12/2018"</span><br />
                                                <span class="hljs-built_in ml-4">lang=&#123;'en'&#125;</span>
                                                <span>&gt;</span>
                                                <br />
                                                <span>&lt;/cwc-datepicker&gt;</span>
                                            </code></pre>

                                            </div>
                                            <div class="col-lg-8">
                                            outputs: <cwc-datepicker
                                                start-date="03/25/2018"
                                                end-date="04/12/2018"
                                                lang={this.currentLanguage}>

                                            </cwc-datepicker>
                                            <br />
                                            <pre>{JSON.stringify(this.result, null, 2)}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Param</th>
                                                <th>Type</th>
                                                <th>Default</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>start-date</td>
                                                <td><code>String</code></td>
                                                <td>''</td>
                                                <td>Start date</td>
                                            </tr>
                                            <tr>
                                                <td>end-date</td>
                                                <td><code>String</code></td>
                                                <td>''</td>
                                                <td>End date</td>
                                            </tr>
                                            <tr>
                                                <td>statechange</td>
                                                <td><code>Event</code></td>
                                                <td></td>
                                                <td>Fired when the date picker's state changes (start or end date is selected).</td>
                                            </tr>
                                            <tr>
                                                <td>lang</td>
                                                <td><code>String</code></td>
                                                <td><code>'en'</code></td>
                                                <td>Datepicker i18n. Currently supported:
                                                    <code>'en'</code>, <code>'de'</code>. Default: <code>'en'</code>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>format</td>
                                                <td><code>String</code></td>
                                                <td><code>'MM.DD.YYYY'</code></td>
                                                <td>Date format
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
