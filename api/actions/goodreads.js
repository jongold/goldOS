import { compose, map, path, pick } from 'ramda';
import goodreads from 'goodreads';
import config from '../../src/config';
const { key, secret, userID } = config.goodreads;
const gr = new goodreads.client({ key, secret });

const justBooks = path(['GoodreadsResponse', 'books', 0, 'book' ]);
const cleanResponse = compose(
  map(pick(['title', 'average_rating', 'image_url', 'link'])),
  justBooks
);

export default function showRead() {
  return new Promise((resolve) => {
    gr.getSingleShelf({
      userID,
      shelf: 'read',
      page: 1
    }, (json) => {
      resolve(cleanResponse(json));
    })
  });
}
