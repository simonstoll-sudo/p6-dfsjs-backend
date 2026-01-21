import mongoose from 'mongoose';

const workshopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Workshop name is required'],
      trim: true
    },
    notions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notion'
      }
    ]
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

export const Workshop = mongoose.model('Workshop', workshopSchema);
