import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import {
  WCAGTechniqueClass,
  ElementExists,
  ElementHasAttributes,
  ElementIsVisible,
  ElementIsWidget
} from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T6 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  @ElementHasAttributes
  @ElementIsVisible
  @ElementIsWidget
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const hasOnkeypress = element.hasAttribute('onkeypress');
    const hasOnkeydown = element.hasAttribute('onkeydown');
    const hasOnkeyup = element.hasAttribute('onkeyup');

    if (!hasOnkeypress && !hasOnkeydown && !hasOnkeyup) {
      test.verdict = 'failed';
      test.description = `The mouse event attribute doesn't have a keyboard equivalent.`;
      test.resultCode = 'RC3';
    } else {
      const keyPress = element.getAttribute('onkeypress');
      const keyDown = element.getAttribute('onkeydown');
      const keyUp = element.getAttribute('onkeyup');

      if (element.hasAttribute('onmousedown')) {
        const event = element.getAttribute('onmousedown');

        if (event === keyPress || event === keyDown || event === keyUp) {
          this.fillPassedResult(test);
        } else {
          this.fillWarningResult(test);
        }
      }

      if (element.hasAttribute('onmouseup')) {
        const event = element.getAttribute('onmouseup');

        if (event === keyPress || event === keyDown || event === keyUp) {
          this.fillPassedResult(test);
        } else {
          this.fillWarningResult(test);
        }
      }

      if (element.hasAttribute('onclick')) {
        const event = element.getAttribute('onclick');

        if (event === keyPress || event === keyDown || event === keyUp) {
          this.fillPassedResult(test);
        } else {
          this.fillWarningResult(test);
        }
      }

      if (element.hasAttribute('onmouseover')) {
        const event = element.getAttribute('onmouseover');

        if (event === keyPress || event === keyDown || event === keyUp) {
          this.fillPassedResult(test);
        } else {
          this.fillWarningResult(test);
        }
      }

      if (element.hasAttribute('onmouseout')) {
        const event = element.getAttribute('onmouseout');

        if (event === keyPress || event === keyDown || event === keyUp) {
          this.fillPassedResult(test);
        } else {
          this.fillWarningResult(test);
        }
      }

      if (element.hasAttribute('onmouseenter')) {
        const event = element.getAttribute('onmouseenter');

        if (event === keyPress || event === keyDown || event === keyUp) {
          this.fillPassedResult(test);
        } else {
          this.fillWarningResult(test);
        }
      }

      if (element.hasAttribute('onmouseleave')) {
        const event = element.getAttribute('onmouseleave');

        if (event === keyPress || event === keyDown || event === keyUp) {
          this.fillPassedResult(test);
        } else {
          this.fillWarningResult(test);
        }
      }

      if (element.hasAttribute('onmousemove')) {
        const event = element.getAttribute('onmousemove');

        if (event === keyPress || event === keyDown || event === keyUp) {
          this.fillPassedResult(test);
        } else {
          this.fillWarningResult(test);
        }
      }

      if (element.hasAttribute('ondblclick')) {
        const event = element.getAttribute('ondblclick');

        if (event === keyPress || event === keyDown || event === keyUp) {
          this.fillPassedResult(test);
        } else {
          this.fillWarningResult(test);
        }
      }

      if (element.hasAttribute('onwheel')) {
        const event = element.getAttribute('onwheel');

        if (event === keyPress || event === keyDown || event === keyUp) {
          this.fillPassedResult(test);
        } else {
          this.fillWarningResult(test);
        }
      }
    }
    test.addElement(element);
    super.addTestResult(test);
  }

  private fillPassedResult(test: Test): void {
    if (test.verdict === 'inapplicable') {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    }
  }

  private fillWarningResult(test: Test): void {
    test.verdict = 'warning';
    test.resultCode = 'W1';
  }
}

export = QW_WCAG_T6;
