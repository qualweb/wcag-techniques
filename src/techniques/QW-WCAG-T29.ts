import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T29 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    if (element.getElementTagName() === 'style') {
      const sheet = <any>element.getElementProperty('sheet');
      for (const rule of sheet.cssRules || []) {
        const style = rule?.style?.cssText;
        if (style) {
          this.checkCssProperty(style, element);
        }
      }
    } else {
      const style = <string>element.getElementAttribute('style');
      this.checkCssProperty(style, element);
    }
  }

  private checkCssProperty(style: string, element: typeof window.qwElement): void {
    const test = new Test();

    const properties = style.split(';').filter((p) => p.trim() !== '') || [style];

    for (const property of properties) {
      if (property.includes('text-align')) {
        const textAlign = property.split(':')[1];
        const isJustified = textAlign.includes('justify');

        if (!isJustified) {
          test.verdict = 'passed';
          test.description = 'This test target has a text-align css property equal to justify.';
          test.resultCode = 'RC1';
        } else {
          test.verdict = 'failed';
          test.description = 'This test target has a text-align css property not equal to justify.';
          test.resultCode = 'RC2';
        }

        test.addElement(element);
        test.attributes = property;

        super.addTestResult(test);
      }
    }
  }
}

export = QW_WCAG_T29;
