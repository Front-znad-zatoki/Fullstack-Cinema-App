/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import supertest from 'supertest';

// TODO: CHECK SUPERTEST DEPENDENCY
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
