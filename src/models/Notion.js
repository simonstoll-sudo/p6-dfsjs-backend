import mongoose from 'mongoose';

const notionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Notion name is required'],
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const Notion = mongoose.model('Notion', notionSchema);
