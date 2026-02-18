export interface Thumbnail {
  "source": string,
  "width": number,
  "height": number
};

export interface WikiData {
  "query": {
    "pages": {
      "title": string,
      "extract": string,
      "pageimage"?: string,
      "thumbnail"?: Thumbnail
    }[]
  }
};

export interface WikiImageData {
  "query": {
    "normalized": {
      "from": string,
      "to": string
    }[],
    "pages": {
      "title": string,
      "imageinfo": [{
        "descriptionurl": string,
        "extmetadata": {
          "Artist": { "value": string }, // TODO: is artist guaranteed?
          "LicenseShortName": { "value": string },
          "LicenseUrl"?: { "value": string },
        }
      }]
    }[]
  }
};

export type Correctness = 0 | 1;

export type Popular = [name: string, Correctness, number, number];

export interface Article {
  "title": string,
  "suggestedBy"?: string,
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
  "suggestedBy"?: string,
  "categories": string[],
  "allChoices": Popular[],
  "correctRate": number,
  "closeRate": number,
  "allAnswers": Popular[]
};

export interface Attribution {
  "artist"?: string,
  "licenseUrl"?: string,
  "licenseName": string,
  "wikimediaSource": string
};

export interface QuestionDataWithAnswer extends QuestionData {
  "summary": string,
  "imageData"?: Thumbnail,
  "attribution"?: Attribution
};
