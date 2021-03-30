import { MongoDataSource } from "apollo-datasource-mongodb";
import {
  Maybe,
  MutationCreateUserArgs,
  MutationDeleteUserArgs,
  MutationUpdateUserUsernameArgs,
  MutationUpdateUserAddFormsArgs,
  MutationUpdateUserDeleteFormsArgs,
  MutationUpdateUserMediaNameArgs,
  MutationUpdateUserMediaUrlArgs,
  MutationUpdateUserAddMediaArgs,
  MutationUpdateUserDeleteMediaArgs,
  QueryGetUserArgs,
  MediaElementDataTuple,
  User,
  MediaElementType,
} from "../../../src/generated/graphql";

interface Context {
  loggedInUser: User;
}

function checkForMatch(value: string, arr: string[]): boolean {
  const possibleIndex = arr.findIndex((el) => el === value);

  // found match
  if (possibleIndex !== -1) {
    arr.splice(possibleIndex, 1);
    return true;
  }

  // did not find match
  return false;
}

export class Users extends MongoDataSource<User, Context> {
  async createUser(args: MutationCreateUserArgs): Promise<Maybe<User>> {
    const newUser: User = {
      ...args,
      forms: [],
      media: [],
    };

    try {
      const response = await this.collection.insertOne(newUser);
      return response.ops[0];
    } catch (error) {
      return error;
    }
  }

  async getUser(args: QueryGetUserArgs): Promise<Maybe<User>> {
    try {
      const response = await this.collection.findOne({
        username: args.username,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateUserUsername(
    args: MutationUpdateUserUsernameArgs
  ): Promise<Maybe<User>> {
    try {
      const response = await this.collection.findOneAndUpdate(
        { id: args.userID },
        { username: args.newUsername }
      );
      return response.value;
    } catch (error) {
      return error;
    }
  }

  async updateUserAddForms(
    args: MutationUpdateUserAddFormsArgs
  ): Promise<Maybe<User>> {
    try {
      const response = await this.findOneById(args.userID);
      const username = response.username;
      const forms = response.forms ? response.forms : [];
      const media = response.media ? response.media : [];

      const newForms = [...forms, ...args.formChanges];

      const updateResponse = await this.collection.findOneAndUpdate(
        { id: args.userID },
        { username, forms: newForms, media }
      );
      return updateResponse.value;
    } catch (error) {
      return error;
    }
  }

  async updateUserDeleteForms(
    args: MutationUpdateUserDeleteFormsArgs
  ): Promise<Maybe<User>> {
    try {
      const response = await this.findOneById(args.userID);
      const username = response.username;
      const forms = response.forms ? response.forms : [];
      const media = response.media ? response.media : [];

      const newForms = forms.filter((formID) => {
        if (args.formChanges.length > 0) {
          const match = checkForMatch(formID, args.formChanges);
          if (match) return false;
        }
        return true;
      });

      const updateResponse = await this.collection.findOneAndUpdate(
        { id: args.userID },
        { username, forms: newForms, media }
      );

      return updateResponse.value;
    } catch (error) {
      return error;
    }
  }

  async updateUserMediaName(
    args: MutationUpdateUserMediaNameArgs
  ): Promise<Maybe<User>> {
    try {
      const response = await this.findOneById(args.userID);
      const forms = response.forms ? response.forms : [];
      const media = response.media ? response.media : [];

      const mediaExtension = args.newMediaName.match(/\.[0-9a-z]+$/i)[0];

      const newMedia = media.map((el: MediaElementType) => {
        if (el.mediaType === mediaExtension) {
          el.data.map((tuple: MediaElementDataTuple) => {
            if (tuple.canononicalName === args.mediaName) {
              tuple.canononicalName = args.newMediaName;
            }
            return tuple;
          });
        }
        return el;
      });

      const updateResponse = await this.collection.findOneAndUpdate(
        { id: args.userID },
        {
          ...response,
          media: newMedia,
        }
      );

      return updateResponse.value;
    } catch (error) {
      return error;
    }
  }

  async updateUserMediaURL(
    args: MutationUpdateUserMediaUrlArgs
  ): Promise<Maybe<User>> {
    try {
      const response = await this.findOneById(args.userID);
      const forms = response.forms ? response.forms : [];
      const media = response.media ? response.media : [];

      const mediaExtension = args.mediaName.match(/\.[0-9a-z]+$/i)[0];

      const newMedia = media.map((el: MediaElementType) => {
        if (el.mediaType === mediaExtension) {
          el.data.map((tuple: MediaElementDataTuple) => {
            if (tuple.canononicalName === args.mediaName) {
              tuple.canononicalName = args.newMediaURL;
            }
            return tuple;
          });
        }
        return el;
      });

      const updateResponse = await this.collection.findOneAndUpdate(
        { id: args.userID },
        {
          ...response,
          media: newMedia,
        }
      );

      return updateResponse.value;
    } catch (error) {
      return error;
    }
  }

  async updateUserAddMedia(
    args: MutationUpdateUserAddMediaArgs
  ): Promise<Maybe<User>> {
    const response = await this.findOneById(args.userID);
    const forms = response.forms ? response.forms : [];
    const media = response.media ? response.media : [];

    const mediaExtension = args.mediaName.match(/\.[0-9a-z]+$/i)[0];

    const newMedia = media.map((el: MediaElementType) => {
      if (el.mediaType === mediaExtension) {
        const newTuple: MediaElementDataTuple = {
          canononicalName: args.mediaName,
          url: args.mediaURL,
        };
        el.data.push(newTuple);
      }
      return el;
    });

    const updateResponse = await this.collection.findOneAndUpdate(
      { id: args.userID },
      {
        ...response,
        media: newMedia,
      }
    );

    return updateResponse.value;
  }

  async updateUserDeleteMedia(
    args: MutationUpdateUserDeleteMediaArgs
  ): Promise<Maybe<User>> {
    try {
      const response = await this.findOneById(args.userID);
      const forms = response.forms ? response.forms : [];
      const media = response.media ? response.media : [];

      const mediaExtension = args.mediaName.match(/\.[0-9a-z]+$/i)[0];

      let newMedia: MediaElementType[] = media.map((el: MediaElementType) => {
        if (el.mediaType === mediaExtension) {
          const index = el.data.findIndex((tuple: MediaElementDataTuple) => {
            tuple.canononicalName = args.mediaName;
          });
          if (index !== -1) {
            el.data.splice(index, 1);
          }

          // Check if data is empty
          if (el.data.length === 0) {
            return null;
          }
        }
      });

      newMedia = newMedia.filter((el) => el !== null);

      const updateResponse = await this.collection.findOneAndUpdate(
        { id: args.userID },
        {
          ...response,
          media: newMedia,
        }
      );

      return updateResponse.value;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(args: MutationDeleteUserArgs): Promise<Maybe<Boolean>> {
    try {
      const response = await this.collection.findOneAndDelete({
        id: args.userID,
      });
      return response.ok === 1;
    } catch (error) {
      return error;
    }
  }
}
