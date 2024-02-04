import { Schema, Document, model } from 'mongoose';

interface IArticle extends Document {
  title: string;
  body: string;
  numberOfLikes: number;
}

const articleSchema = new Schema<IArticle>({
  title: String,
  body: String,
  numberOfLikes: Number,
});

const Article = model<IArticle>('Article', articleSchema);

export default Article;
