/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
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

test('POST /api/movies', async () => {
  const data = {
    title: 'Movie1',
    duration: 100,
    releaseDate: '01-02-2020',
    description: 'Description',
    poster: '...jpg',
    genre: 'thriller',
  };

  await supertest(app)
    .post('/api/movies')
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body.movie._id).toBeTruthy();
      expect(response.body.movie.title).toBe(data.title);
      expect(response.body.movie.duration).toBe(data.duration);

      // Check data in the database
      const movie = await Movie.findOne({
        _id: response.body.movie._id,
      });
      expect(movie).toBeTruthy();
      expect(movie.title).toBe(data.title);
      expect(movie.genre).toBe(data.genre);
    });
});

test('GET /api/movies/:id', async () => {
  const movie = await Movie.create({
    title: 'Movie1',
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

test('PUT /api/movies/:id', async () => {
  const movie = await Movie.create({
    title: 'Movie1',
    duration: 100,
    releaseDate: '01-02-2020',
    description: 'Description',
    poster: '...jpg',
    genre: 'thriller',
  });

  const data = {
    title: 'MovieNew',
    duration: 150,
    releaseDate: '01-02-2020',
    description: 'Description2',
    poster: '...jpg',
    genre: 'thriller comedy',
  };

  await supertest(app)
    .put(`/api/movies/${movie.id}`)
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body.movie._id).toBe(movie.id);
      expect(response.body.movie.title).toBe(data.title);
      expect(response.body.movie.genre).toBe(data.genre);

      // Check the data in the database
      const newMovie = await Movie.findOne({
        _id: response.body.movie._id,
      });
      expect(newMovie).toBeTruthy();
      expect(newMovie.title).toBe(data.title);
      expect(newMovie.genre).toBe(data.genre);
    });
});

test('DELETE /api/movies/:id', async () => {
  const movie = await Movie.create({
    title: 'Movie1',
    duration: 100,
    releaseDate: '01-02-2020',
    description: 'Description',
    poster: '...jpg',
    genre: 'thriller',
  });

  await supertest(app)
    .delete(`/api/movies/${movie.id}`)
    .expect(204)
    .then(async () => {
      expect(await Movie.findOne({ _id: movie.id })).toBeFalsy();
    });
});
