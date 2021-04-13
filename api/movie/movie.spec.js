/* eslint-disable node/no-unpublished-import */
/* eslint-disable no-underscore-dangle */
describe('JavaScript sample test', () => {
  describe('given sample', () => {
    describe('when sample', () => {
      it('then sample', () => {
        expect(true).toBeTruthy();
      });
    });
  });
});
/* import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../../test/mockserver.js';
import Movie from './Movie.js';

beforeEach((done) => {
  mongoose.connect(
    'mongodb://localhost:27017/JestDB',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done(),
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

test('GET /api/movies', async () => {
  const movie = await Movie.create({
    title: 'Movie1',
    duration: 100,
    releaseDate: '01-02-2020',
    description: 'Description',
    poster: '...jpg',
    genre: 'thriller',
  });

  await supertest(app)
    .get('/api/movies')
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0]._id).toBe(movie.id);
      expect(response.body[0].title).toBe(movie.title);
      expect(response.body[0].description).toBe(movie.description);
    });
});

test('GET /api/movies/:id', async () => {
  const movie = await Movie.create({
    title: 'Movie2',
    duration: 100,
    releaseDate: '01-02-2020',
    description: 'Description',
    poster: '...jpg',
    genre: 'thriller',
  });

  await supertest(app)
    .get(`/api/movies/${movie.id}`)
    .expect(200)
    .then((response) => {
      expect(response.body._id).toBe(movie.id);
      expect(response.body.title).toBe(movie.title);
      expect(response.body.poster).toBe(movie.poster);
    });
});
 */
