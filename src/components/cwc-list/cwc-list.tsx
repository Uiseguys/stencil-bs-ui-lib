import { Component, Prop, Element } from '@stencil/core';
import template from 'lodash/template';
import templateSettings from 'lodash/templateSettings';


@Component({
    tag: 'cwc-list',
    styleUrl: 'cwc-list.scss'
})
export class CwcList {


    @Prop() items: object[] = [];
    @Prop() itemAs: string = 'item';
    @Prop() addClass?: string = '';
    @Prop() addClassFirst?: string = '';
    @Prop() addClassLast?: string = '';
    @Prop() addClassEven?: string = '';
    @Prop() addClassOdd?: string = '';
    @Prop() wrapperClass: string = '';

    @Prop() interpolationRegex = /\[\[=+(.*?) ?\]\]+/g;

    @Element() el: HTMLElement;
    templateElement = undefined


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
        templateSettings.interpolate = this.interpolationRegex;

        if (!this.templateElement) {

             this.templateElement = template(this.el.firstElementChild.outerHTML)
        }
  
        this.el.firstElementChild.setAttribute('style', 'display:none;')


        let str = ''
        this.items.map((item, index) => {

            let templateString = this.templateElement({ [this.itemAs]: item })
            templateString = this.insertClassList(templateString, index)

            str += templateString
        })


        return (

            <div id={this.el.id} class={"item-list-wrapper " + this.wrapperClass}
                innerHTML={str}>
            </div>
        );
    }
}