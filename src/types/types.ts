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

export type Correctness = 0 | 1;

export type Popular = [name: string, Correctness, number, number];

export interface Article {
  "title": string,
  "categories": string[],
  "names": string[]
};

export interface GameDay {
  "articles": Article[],
  "stats": {
    "articles": {
      "correctRate": number,
      "closeRate": number,
      "popular": Popular[]
    }[]
  }
};

export interface QuestionData {
  "title": string,
  "categories": string[],
  "correctAnswer": Popular,
  "wrongAnswers": Popular[],
  "correctRate": number,
  "closeRate": number,
  "allAnswers": Popular[]
};

export interface QuestionDataWithAnswer extends QuestionData {
  "summary": string,
  "imageData"?: Thumbnail
};
