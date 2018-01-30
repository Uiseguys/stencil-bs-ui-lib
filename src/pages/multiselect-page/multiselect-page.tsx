import { Component, Listen, State } from '@stencil/core';
import get from 'lodash/get'
import filter from 'lodash/filter'

@Component({
    tag: 'multiselect-page',
    styleUrl: 'multiselect-page.scss'
})
export class MultiselectPage {

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
            <cwc-multiselect
                data={this.data}></cwc-multiselect>,

            <br />,
            <br />,
            <br />,
            <br />,
            <h3>Complex Object[] demo!</h3>,
            <cwc-multiselect
                data={this.complex}
                searchKey={this.searchString}
                placeholder="Search something e.g. 'Argentina'"></ cwc-multiselect>,
            <br />, <br />, <br />, <h4>result: </h4>,
            <pre>{JSON.stringify(this.result, null, 2)}</pre>
        ]
    }
}