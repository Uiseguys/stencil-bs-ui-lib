import { Component, Listen, State } from '@stencil/core';

@Component({
    tag: 'typeahead-page',
    styleUrl: 'typeahead-page.scss'
})
export class StencilComponent {

    complex = [
        {
            type: 'country',
            data: {
                name: 'Austria',
                capital: 'Vienna'
            }
        },
        {
            type: 'country',
            data: {
                name: 'Australia',
                capital: 'Canberra'
            }
        },
        {
            type: 'country',
            data: {
                name: 'Argentina',
                capital: 'Buenos Aires'
            }
        }
    ];

    searchString = 'data.name';

    complexResult = [];

    data = ['Alex', 'Alabama', 'Alaska', 'andreas', 'alexandro'];

    myOptions = [
        {
            id: 1,
            visual: 'http://lorempixel.com/400/200/',
            label: 'The item label 1'
        },
        {
            id: 2,
            visual: 'http://lorempixel.com/400/200/',
            label: 'The item label 2'
        },
        {
            id: 3,
            visual: 'http://lorempixel.com/400/200/',
            label: 'The item label 3'
        }
    ]

    getTemplate() {
        return (
            <div class="card card-18 my-3 mx-3">
                <img class="card-img-top" src="[[option.visual]]" alt="Card image cap" />
                <div class="card-body">
                    <h5 class="card-title capitalized">[[option.label]]</h5>
                    <a href="#" class="btn btn-primary">Send message</a>
                </div>
            </div>
        )
    }

    @State() result;

    @Listen('typeaheadOnSubmit')
    typeaheadOnSubmit(e) {
        this.result = e.detail
    }

    render() {
        return [
            <h3>Simple String[] data demo!</h3>,
            <cwc-typeahead data={this.data}></cwc-typeahead>,

            <br />,
            <br />,
            <br />,
            <br />,
            <h3>Complex Object[] demo!</h3>,
            <cwc-typeahead
                data={this.complex}
                searchKey={this.searchString}
                placeholder="Search something e.g. 'Argentina'">
            </cwc-typeahead>,

            <br />,
            <br />,
            <br />,
            <br />,
            <h3>Complex Object[] with template demo!</h3>,
            <cwc-typeahead
                data={this.myOptions}
                dataAs='option'
                searchKey='option.label'
                template={this.getTemplate()}
                placeholder="Search something e.g. 'The'">
            </cwc-typeahead>,
            <br />,
            <br />,
            <br />,
            <h4>result: </h4>,
            <pre>{JSON.stringify(this.result, null, 2)}</pre>
        ]
    }
}
