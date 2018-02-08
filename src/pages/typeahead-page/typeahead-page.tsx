import { Component, Listen, State } from '@stencil/core';
import get from 'lodash/get'
import filter from 'lodash/filter'

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
    ]

    @State() result

    @Listen('typeaheadOnSubmit')
    typeaheadOnSubmit(e) {
        this.result = e.detail
    }
    searchString = 'data.name'

    complexResult = []

    data = ['Alex', 'Alabama', 'Alaska', 'andreas', 'alexandro']


    render() {
        return [
            <h3>Simple String[] data demo!</h3>,
            <cwc-typeahead
                data={this.data}></cwc-typeahead>,

            <br />,
            <br />,
            <br />,
            <br />,
            <h3>Complex Object[] demo!</h3>,
            <cwc-typeahead
                data={this.complex}
                searchKey={this.searchString}
                placeholder="Search something e.g. 'Argentina'"></ cwc-typeahead>,
            <br />, <br />, <br />, <h4>result: </h4>,
            <pre>{JSON.stringify(this.result, null, 2)}</pre>
        ]
    }
}