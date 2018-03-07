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
        return `<div class="card card-18 my-3 mx-3">
                <img class="card-img-top" src="<%=option.visual%>" alt="Card image cap" />
                <div class="card-body">
                    <h5 class="card-title capitalized"><%=option.label%></h5>
                    <button class="btn btn-primary">Select</button>
                </div>
            </div>`
    }

    extenderImagePrefix = [
        {
            id: 1,
            imgPrefix: 'https://cdn4.iconfinder.com/data/icons/world-flags-5-1/100/Gabon-16.png',
            label: 'Gabon'
        },
        {
            id: 2,
            imgPrefix: 'https://cdn4.iconfinder.com/data/icons/world-flags-5-1/100/Gambia-16.png',
            label: 'Gambia'
        },
        {
            id: 3,
            imgPrefix: 'https://cdn4.iconfinder.com/data/icons/world-flags-5-1/100/Georgia-16.png',
            label: 'Georgia'
        },
        {
            id: 4,
            imgPrefix: 'https://cdn0.iconfinder.com/data/icons/flat-round-rectangle-world-flags/180/round_rectangle_germany-16.png',
            label: 'Germany'
        },
        {
            id: 5,
            imgPrefix: 'https://cdn4.iconfinder.com/data/icons/world-flags-5-1/100/Ghana-16.png',
            label: 'Ghana'
        },
        {
            id: 6,
            imgPrefix: 'https://cdn4.iconfinder.com/data/icons/world-flags-5-1/100/Gibraltar-16.png',
            label: 'Gibraltar'
        },
        {
            id: 7,
            imgPrefix: 'https://cdn4.iconfinder.com/data/icons/world-flags-rounded/900/uk_united_kingdom_britain_british_flag-16.png',
            label: 'Great Britain'
        }
    ];

    getImagePrefixTemplate() {
        return `<div class="dropdown-item">
                <img src="<%=option.imgPrefix%>" alt="Card image cap" />
                <%=option.label%>
            </div>`
    }

    @State() result;

    @Listen('typeaheadOnSubmit')
    typeaheadOnSubmit(e) {
        this.result = e.detail
    }

    render() {
        return [
            <p class="my-3 mx-3">
                <h3>Simple String[] data demo!</h3>
                <cwc-typeahead data={this.data}></cwc-typeahead>
            </p>,

            <p class="my-3 mx-3">
                <h3>Complex Object[] demo!</h3>
                <cwc-typeahead
                    data={this.complex}
                    searchKey={this.searchString}
                    placeholder="Search something e.g. 'Argentina'">
                </cwc-typeahead>
            </p>,

            <p class="my-3 mx-3">
                <h3>Complex Object[] with template demo!</h3>
                <cwc-typeahead
                    data={this.myOptions}
                    itemAs='option'
                    searchKey='label'
                    template={this.getTemplate()}
                    highlight={true}
                    placeholder="Search something e.g. 'The'">
                </cwc-typeahead>
            </p>,

            <p class="my-3 mx-3">
                <h3>Autocomplete extender with image prefix</h3>
                <cwc-typeahead
                    data={this.extenderImagePrefix}
                    itemAs='option'
                    searchKey='label'
                    template={this.getImagePrefixTemplate()}
                    highlight={true}
                    placeholder="Search country that starts with 'G'">
                </cwc-typeahead>
            </p>,

            <p class="my-3 mx-3">
                <h3>Google Autocomplete</h3>
                <cwc-typeahead
                    googleAutocomplete={true}
                    placeholder="Search for a location">
                </cwc-typeahead>
            </p>,

            <p class="my-3 mx-3">
                <h4>result: </h4>
                <pre>{JSON.stringify(this.result, null, 2)}</pre>
            </p>,
        ]
    }
}
