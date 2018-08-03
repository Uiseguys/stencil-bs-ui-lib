import { Component, Listen, State } from '@stencil/core';

@Component({
  tag: 'autocomplete-select-page',
  styleUrl: 'autocomplete-select-page.scss'
})
export class AutocompleteSelectPage {
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

  @State() result;
  @State() textChangeResult;

  @Listen('multiselectOnSubmit')
  typeaheadOnSubmit(e) {
    this.result = e.detail;
  }
  //Listening textchange event from cec-autocomplete-select
  @Listen('textChange')
  textChange(e) {
    this.textChangeResult = e.detail;
  }
  //End
  render() {
    return [
      <h3>Simple String[] data demo!</h3>,
      <cwc-autocomplete-select data = {this.data}/>,
      <h6>Text Change result: {this.textChangeResult}</h6>,

      <br />,
      <br />,
      <h3>Complex Object[] demo!</h3>,
      <cwc-autocomplete-select
        data={this.complex}
        searchKey={this.searchString}
        placeholder="Search something e.g. 'Argentina'"
      />,
      <br />,
      <h4>result: </h4>,
      <pre>{JSON.stringify(this.result, null, 2)}</pre>,
      <br />,
      <br />,
      <cwc-tag text="Holla tag" />,
      <br />,
      <br />,
      <cwc-tag
        text="Holla link"
        imgLink="../../assets/icon/favicon.ico"
        closable={true}
      />,
      <br />,
      <br />,
      <cwc-tag text="Holla rounded tag" rounded={true} closable={true} />,
      <br />,
      <br />,
      <cwc-tag
        text="Holla rounded link"
        imgLink="../../assets/icon/favicon.ico"
      />,
      <br />,
      <br />,
      <cwc-tag
        text="Holla rounded img tag"
        imgLink="../../assets/icon/favicon.ico"
        rounded={true}
      />,
      <br />,
      <br />,
      <cwc-tag
        text="Holla rounded img link"
        limitTo={10}
        imgLink="../../assets/icon/favicon.ico"
        rounded={true}
        closable={true}
      />
      // link='https://google.com'
      // <img src=" ../../assets/icon/favicon.ico" alt="" />
    ];
  }
}
