import { Schema, model, Model } from "mongoose";
import { IUser, IUserAttr } from "../interfaces/user";
import { Password } from "../services/password";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;

      return ret;
    }
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await Password.toHash(this.password);
  }

  next();
});

const UserModel: Model<IUser> = model("User", userSchema);

class User extends UserModel {
  constructor(attrs: IUserAttr) {
    super(attrs);
  }
}

export { User };
