export type Correctness = 0 | 1;

export interface GameDay {
  "articles": Article[],
  "stats": {
    "articles": {
      "popular": Popular[]
    }[]
  }
};

export interface Article {
  "title": string,
  "categories": string[],
  "names": string[]
};

export interface QuestionData {
  "title": string,
  "categories": string[],
  "correctAnswer": Popular,
  "wrongAnswers": Popular[]
};

export interface Thumbnail {
  "source": string,
  "width": number,
  "height": number
};

export interface WikiData {
  query: {
    pages: {
      "title": string,
      "extract": string,
      "thumbnail"?: Thumbnail
    }[]
  }
};

export interface QuestionDataWithAnswer extends QuestionData {
  "summary": string,
  "imageData"?: Thumbnail
};

export type Popular = [string, Correctness, number, number];
