import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T9 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    if (page.getElements('h1, h2, h3, h4, h5, h6, [role="heading"]').length === 0) {
      return;
    }

    const evaluation: WCAGTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let equal = true;
    let complete = true;
    //let errorElem = element;
    let hasH1 = (page.getElements('h1')).length > 0;
    let counter = 0;
    let htmlList = page.getElements('body, body *');

    while (equal && complete && hasH1 && counter < htmlList.length) {
      const elem = htmlList[counter];

      const regexp = new RegExp('^h[1-6]$');
      const list = new Array<number>();

      for (const child of elem.getElementChildren() || []) {
        const name = child.getElementTagName();
        if (name && regexp.test(name)) {
          const split = name.split('h');
          list.push(parseInt(split[1]));
        }
      }

     
    if (list.length !== 0) {
      const sortedArray = list.sort((n1, n2) => n1 - n2);

      for (let i = 0; i < list.length; i++) {
        if (list[i] !== sortedArray[i]) {
          equal = false;
          //errorElem = elem;
        }
        if (i > 0 && i - 1 < list.length && sortedArray[i] - sortedArray[i - 1] > 1) {
          complete = false;
          //errorElem = elem;
        }
      }
    }
    counter++;
  }

  if(!equal) { // fails if the headings aren't in the correct order
    evaluation.verdict = 'failed';
    evaluation.description = `Headings are not in the correct order`;
    evaluation.resultCode = 'RC1';
  } else if(!complete) { // fails if a header number is missing
    evaluation.verdict = 'failed';
    evaluation.description = `Heading number is missing`;
    evaluation.resultCode = 'RC2';
  } else if(!hasH1) {
    evaluation.verdict = 'failed';
    evaluation.description = `Headings don't start with h1`;
    evaluation.resultCode = 'RC3';
  } else { // the heading elements are correctly used
  evaluation.verdict = 'warning';
  evaluation.description = 'Please verify that headers are used to divide the page correctly';
  evaluation.resultCode = 'RC4';
}

super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T9;