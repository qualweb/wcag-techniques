import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists, ElementIsVisible } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T17 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  @ElementIsVisible
  execute(element: typeof window.qwElement): void {
    const test = new Test();
    const insideLabel = this.isInsideLabelElement(element);
    const type = element.getAttribute('type');

    if (insideLabel) {
      if (type && (type === 'radio' || type === 'checkbox')) {
        const hasTextAfter = this.hasTextAfter(element);
        if (hasTextAfter) {
          test.verdict = 'passed';
          test.resultCode = 'P1';
        } else {
          test.verdict = 'failed';
          test.resultCode = 'F1';
        }
      } else {
        const hasTextBefore = this.hasTextBefore(element);
        if (hasTextBefore) {
          test.verdict = 'passed';
          test.resultCode = 'P1';
        } else {
          test.verdict = 'failed';
          test.resultCode = 'F1';
        }
      }
      test.addElement(element);
      super.addTestResult(test);
    } else {
      const id = element.getAttribute('id');
      if (id) {
        const label = window.qwPage.find(`label[for="${id.trim()}"]`);
        if (label) {
          if (label.isVisible()) {
            const text = label.getText();
            if (text && text.trim() !== '') {
              const ancestor = this.findFirstCommonAncestor(element, label);
              if (ancestor) {
                const firstFound = this.findFirstInDepth(ancestor, [element, label]);
                if (firstFound) {
                  if (type && (type === 'radio' || type === 'checkbox')) {
                    if (firstFound.getSelector() === element.getSelector()) {
                      test.verdict = 'passed';
                      test.resultCode = 'P1';
                    } else {
                      test.verdict = 'failed';
                      test.resultCode = 'F1';
                    }
                  } else {
                    if (firstFound.getSelector() === label.getSelector()) {
                      test.verdict = 'passed';
                      test.resultCode = 'P1';
                    } else {
                      test.verdict = 'failed';
                      test.resultCode = 'F1';
                    }
                  }
                }
              }
            } else {
              test.verdict = 'failed';
              test.resultCode = 'F2';
            }
          } else {
            test.verdict = 'failed';
            test.resultCode = 'F3';
          }

          test.addElement(element);
          super.addTestResult(test);
        }
      }
    }
  }

  private isInsideLabelElement(element: typeof window.qwElement): boolean {
    let labelFound = false;

    let parent = element.getParent();
    while (parent !== null) {
      if (parent.getTagName() === 'label') {
        labelFound = true;
        break;
      }

      parent = parent.getParent();
    }

    return labelFound;
  }

  private hasTextAfter(element: typeof window.qwElement): boolean {
    let hasText = false;

    let parent: typeof window.qwElement | null = element;
    while (parent !== null) {
      if (parent.getTagName() === 'label') {
        break;
      }

      const siblings = parent.getAllNextSiblings();
      for (const sibling of siblings ?? []) {
        if (typeof sibling === 'string') {
          const text = <string>sibling;
          if (text.trim() !== '') {
            hasText = true;
          }
        } else {
          const qwElement = <typeof window.qwElement>sibling;
          const text = qwElement.getText();
          if (text && text.trim() !== '') {
            hasText = true;
          }
        }
      }

      parent = parent.getParent();
    }

    return hasText;
  }

  private hasTextBefore(element: typeof window.qwElement): boolean {
    let hasText = false;

    let parent: typeof window.qwElement | null = element;
    while (parent !== null) {
      if (parent.getTagName() === 'label') {
        break;
      }

      const siblings = parent.getAllPreviousSiblings();
      for (const sibling of siblings ?? []) {
        if (typeof sibling === 'string') {
          const text = <string>sibling;
          if (text.trim() !== '') {
            hasText = true;
          }
        } else {
          const qwElement = <typeof window.qwElement>sibling;
          const text = qwElement.getText();
          if (text && text.trim() !== '') {
            hasText = true;
          }
        }
      }

      parent = parent.getParent();
    }

    return hasText;
  }

  private findFirstCommonAncestor(
    input: typeof window.qwElement,
    label: typeof window.qwElement
  ): typeof window.qwElement | null {
    let inputParent = input.getParent();
    let ancestor = null;

    while (inputParent !== null) {
      let labelParent = label.getParent();
      while (labelParent !== null) {
        if (inputParent.getSelector() === labelParent.getSelector()) {
          ancestor = inputParent;
          break;
        }

        labelParent = labelParent.getParent();
      }

      if (ancestor) {
        break;
      }

      inputParent = inputParent.getParent();
    }

    return ancestor;
  }

  private findFirstInDepth(
    ancestor: typeof window.qwElement,
    elements: Array<typeof window.qwElement>
  ): typeof window.qwElement | null {
    let elementFound: typeof window.qwElement | null = null;

    for (const child of ancestor.getChildren()) {
      for (const element of elements) {
        if (child.getSelector() === element.getSelector()) {
          elementFound = element;
          break;
        }
      }

      if (elementFound) {
        break;
      } else {
        elementFound = this.findFirstInDepth(child, elements);
      }
    }

    return elementFound;
  }
}

export = QW_WCAG_T17;
