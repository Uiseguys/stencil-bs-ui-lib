import { Component, Prop, Element } from '@stencil/core';
import _ from 'lodash';
// import templateSettings from 'lodash/templateSettings';


@Component({
    tag: 'cwc-list',
    styleUrl: 'cwc-list.scss'
})
export class CwcList {


    @Prop() items: any[] = [];
    @Prop() itemAs: string = 'item';
    @Prop() listId: string = '';
    @Prop() addClass?: string = '';
    @Prop() addClassFirst?: string = '';
    @Prop() addClassLast?: string = '';
    @Prop() addClassEven?: string = '';
    @Prop() addClassOdd?: string = '';
    @Prop() wrapperClass: string = '';

    @Prop() interpolationRegex = /\[\[=+(.*?) ?\]\]+/g;

    @Element() el: HTMLElement;
    templateElement = undefined

    templateFn;
    templateSettingsFn;
    constructor() {
        this.templateFn = _.template;
        this.templateSettingsFn = _.templateSettings;

    }


    /**
   * Adds custom class for every first, last, even and odd node
   * 
   * @private
   * @param {string} [base=''] 
   * @param {number} index 
   * @param {number} count 
   * @returns {string} 
   * @memberof StencilComponent
   */
    private addListClasses(base: string = '', index: number, count: number): string {
        let classString = base + ' list-item'.concat(this.addClass && ' ' + this.addClass)
        if (index == 0) {
            classString += ' list-item-first'.concat(this.addClassFirst && ' ' + this.addClassFirst)
        } if (index == count - 1) {
            classString += ' list-item-last'.concat(this.addClassLast && ' ' + this.addClassLast)
        } if (index % 2 == 0) {
            classString += ' list-item-even'.concat(this.addClassEven && ' ' + this.addClassEven)
        } if (Math.abs(index % 2) == 1) {
            classString += ' list-item-odd'.concat(this.addClassOdd && ' ' + this.addClassOdd)
        }

        return classString + ' '
    }


    /**
     * Insert into string helper function
     * 
     * @param {any} str 
     * @param {any} index 
     * @param {any} value 
     * @returns {string} 
     * @memberof CwcList
     */
    insert(str, index, value): string {
        return str.substr(0, index) + value + str.substr(index);
    }


    /**
     * Inserts additional list-item-* classes into string node depends of item position.
     * 
     * @param {any} str 
     * @param {any} index 
     * @returns {string} 
     * @memberof CwcList
     */
    insertClassList(str, index): string {
        const indexCloseTag = str.indexOf('>'),
            indexClass = str.indexOf('class="')

        const isClassPresent = indexClass !== -1 && indexClass < indexCloseTag

        const finalClassList = isClassPresent ?
            this.insert(str, str.indexOf('"', indexClass + 7), this.addListClasses('', index, this.items.length)) :
            this.insert(str, indexCloseTag, this.addListClasses('', index, this.items.length))

        return finalClassList
    }

    render() {
        console.log('Render method! 2');
        console.log('template: ', this.templateFn)
        console.log('templateFn: ', this.templateFn)

        this.templateSettingsFn.interpolate = this.interpolationRegex;



        if (!this.templateElement) {

            console.log('template element NOT present')
            debugger;

            this.templateElement = this.templateFn(this.el.firstElementChild.outerHTML)
            console.log('... and now it is: ', this.templateElement);

        } else {
            console.log('template element present')

        }


        console.log('suka pre items')
        console.log('suka pre items', this.items)

        this.el.firstElementChild.setAttribute('style', 'display:none;')

        console.log('suka items: ', this.items);

        let str = ''
        this.items.map((item, index) => {

            let templateString = this.templateElement({ [this.itemAs]: item })
            templateString = this.insertClassList(templateString, index)

            str += templateString

            console.log(

                'str updated and is: ', str
            );

        })

        console.log('template suka: ', str)


        return (

            <div id={this.listId} class={"item-list-wrapper " + this.wrapperClass}
                innerHTML={str}>
            </div>
        );
    }
}