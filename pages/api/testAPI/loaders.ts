import { FormElement, Form, User } from "../../../models/index";
import { FormDoc, FormElementDoc } from "../../../models/types";
import { Document } from "mongoose";

interface StoredFormElement extends FormElementDoc, Document {}
interface StoredForm extends FormDoc, Document {}

export class FormElementLoader {
  private formElements: FormElementDoc[] = [];

  constructor(formElements: FormElementDoc[]) {
    this.formElements = formElements;
  }

  public loadFormElements() {
    this.formElements.forEach((formElement) => {
      FormElement.create(formElement, async (err, doc: StoredFormElement) => {
        if (err) throw err;
        if (doc.displayFor) {
          FormElement.find(
            { questionKey: doc.questionKey },
            async (err, result: StoredFormElement[]) => {
              result[0].draftOf = result[1].id;
              await result[0].save();
              result[1].displayFor = result[0].id;
              await result[1].save();
            }
          );
        }
      });
    });
  }
}

function findCorrectProperty(object: Object, ...possibleProps: string[]) {
  let correctProperty = null;
  for (let prop of possibleProps) {
    if (object[prop]) {
      correctProperty = prop;
      break;
    }
  }
  return correctProperty;
}

export class FormLoader {
  private forms: FormDoc[] = [];
  private sizeSequence = [3, 2];

  constructor(forms: FormDoc[]) {
    this.forms = forms;
  }

  public loadForms() {
    FormElement.find({}, (err, formElements: StoredFormElement[]) => {
      if (err) throw err;
      this.forms.forEach(async (form, i) => {
        if (this.sizeSequence[i]) {
          for (let j = 0; j < this.sizeSequence[i] * 2; j += 2) {
            if (form.preview.pages[0]) {
              form.preview.pages[0].push(formElements[j].id);
            } else {
              form.preview.pages[0] = [formElements[j].id];
            }
            if (form.published.pages[0]) {
              form.published.pages[0].push(formElements[j + 1].id);
            } else {
              form.published.pages[0] = [formElements[j + 1].id];
            }
          }
        }
        await Form.create(form);
      });
    });
  }
}
