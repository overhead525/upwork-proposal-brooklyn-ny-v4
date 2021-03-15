import {
  FormDoc,
  FormElementDoc,
  MediaElementDataTupleType,
  MediaElementType,
  UserDoc,
} from "../../../models/types";
import { Document } from "mongoose";
import { loaderConnection } from "../../../lib/database/mongo-client";

import { S3, _Object } from "@aws-sdk/client-s3";
import {
  formElementSchema,
  formSchema,
  userSchema,
} from "../../../models/schema";

interface StoredFormElement extends FormElementDoc, Document {}
interface StoredForm extends FormDoc, Document {}

const FormElement = loaderConnection.model(
  "FormElement",
  formElementSchema,
  "formElements"
);

const Form = loaderConnection.model("Form", formSchema, "forms");

const User = loaderConnection.model("User", userSchema, "users");

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
              if (err) throw err;
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

  public async fetchFormIDs() {
    const formDocs = await Form.find({}, (err) => {
      if (err) throw err;
    });
    return formDocs.map((doc) => doc.id);
  }
}

export class UserLoader {
  private users: UserDoc[] = [];
  private mediaElementDataTuples: MediaElementDataTupleType[];
  private mediaElements: MediaElementType[] = [];
  private S3Instance: S3;
  private FLoader: FormLoader;
  private formIDs: string[];
  private bucketObjects: _Object[];
  private bucketObjectURLs: string[];
  private bucket = "test-upwork-proposal-brooklyn-v4";
  private bucketBaseURL =
    "https://test-upwork-proposal-brooklyn-v4.s3.amazonaws.com/";

  constructor(users: UserDoc[], S3Instance: S3, FLoader: FormLoader) {
    this.users = users;
    this.S3Instance = S3Instance;
    this.FLoader = FLoader;
  }

  private getExtension(url: string) {
    return url.substring(url.lastIndexOf("."), url.length);
  }

  // public async getMediaPool(): FetchedMediaPool {
  private async fetchMediaPool() {
    try {
      this.bucketObjects = await (
        await this.S3Instance.listObjectsV2({
          Bucket: this.bucket,
        })
      ).Contents;
    } catch (error) {
      throw error;
    }
  }

  private fetchObjectURLs() {
    this.bucketObjectURLs = this.bucketObjects.map((obj) => {
      return this.bucketBaseURL + obj.Key;
    });
  }

  private constructMediaElementDataTuples() {
    this.mediaElementDataTuples = this.bucketObjectURLs.map((url, index) => {
      return {
        canononicalName: this.bucketObjects[index].Key,
        url: url,
      } as MediaElementDataTupleType;
    });
  }

  private organizeTuple(tuple: MediaElementDataTupleType) {
    const extension = this.getExtension(tuple.url);
    const filteredElements = this.mediaElements.filter((mediaElement) => {
      return mediaElement.mediaType === extension;
    });

    // There are no matching instances of the extension
    if (filteredElements.length === 0) {
      this.mediaElements.push({
        mediaType: extension,
        data: [tuple],
      });
    }

    // There is already an instance of the extension
    if (filteredElements.length > 0) {
      filteredElements[0].data.push(tuple);
    }
  }

  private splitMediaElementDataTuplesByExtension() {
    this.mediaElementDataTuples.forEach((tuple) => this.organizeTuple(tuple));
  }

  private async assignFormsToUsers() {
    const fairShare = 2;

    this.formIDs = await this.FLoader.fetchFormIDs();

    this.users.forEach((user, index) => {
      if (index === 0) user.forms.push(...this.formIDs.splice(0, 3));
      else user.forms.push(...this.formIDs.splice(0, fairShare));
    });
  }

  private assignMediaToUsers() {
    const fairShare = 2;

    this.users.forEach((user) => {
      this.mediaElements.forEach((mediaElement) => {
        const filteredUserMediaElements = user.media.filter(
          (userMediaElement) => {
            return userMediaElement.mediaType === mediaElement.mediaType;
          }
        );

        if (filteredUserMediaElements.length > 0) {
          filteredUserMediaElements[0].data.push(
            ...mediaElement.data.splice(0, fairShare)
          );
        }

        if (filteredUserMediaElements.length === 0) {
          user.media.push({
            mediaType: mediaElement.mediaType,
            data: [...mediaElement.data.splice(0, fairShare)],
          });
        }
      });
    });
  }

  public async loadUsers() {
    await this.fetchMediaPool();
    this.fetchObjectURLs();
    this.constructMediaElementDataTuples();
    this.splitMediaElementDataTuplesByExtension();
    this.assignMediaToUsers();
    await this.assignFormsToUsers();

    this.users.forEach(async (user) => await User.create(user));
  }
}
