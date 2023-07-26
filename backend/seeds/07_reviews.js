/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('reviews').del()
  await knex('reviews').insert([
    {
      reviewId: 1,
      rating: 4,
      details: "I recently had the pleasure of purchasing a car from Charlie Chicken and I must say  it was a fantastic experience from start to finish. Were incredibly friendly and knowledgeable making the whole process smooth and stress free.",
      reviewer_id: 1,
      user_id: 2,
    },
    {
      reviewId: 2,
      rating: 2,
      details: "I regret choosing  for my car purchase. The whole experience was frustrating and disappointing. I would strongly advise others to steer clear.",
      reviewer_id: 5,
      user_id: 4,
    },
    {
      reviewId: 3,
      rating: 4,
      details: "I recently had the pleasure of purchasing a car from Charlie Chicken and I must say  it was a fantastic experience from start to finish. Were incredibly friendly and knowledgeable making the whole process smooth and stress free.",
      reviewer_id: 1,
      user_id: 2,
    },
    {
      reviewId: 4,
      rating: 2,
      details: "I regret choosing  for my car purchase. The whole experience was frustrating and disappointing. I would strongly advise others to steer clear.",
      reviewer_id: 5,
      user_id: 4,
    },
    {
      reviewId: 5,
      rating: 4,
      details: "I recently had the pleasure of purchasing a car from Charlie Chicken and I must say  it was a fantastic experience from start to finish. Were incredibly friendly and knowledgeable making the whole process smooth and stress free.",
      reviewer_id: 1,
      user_id: 2,
    },
    {
      reviewId: 6,
      rating: 2,
      details: "I regret choosing  for my car purchase. The whole experience was frustrating and disappointing. I would strongly advise others to steer clear.",
      reviewer_id: 5,
      user_id: 4,
    },
    {
      reviewId: 7,
      rating: 4,
      details: "I recently had the pleasure of purchasing a car from Charlie Chicken and I must say  it was a fantastic experience from start to finish. Were incredibly friendly and knowledgeable making the whole process smooth and stress free.",
      reviewer_id: 1,
      user_id: 2,
    },
    {
      reviewId: 8,
      rating: 2,
      details: "I regret choosing  for my car purchase. The whole experience was frustrating and disappointing. I would strongly advise others to steer clear.",
      reviewer_id: 5,
      user_id: 4,
    },
    {
      reviewId: 9,
      rating: 4,
      details: "I recently had the pleasure of purchasing a car from Charlie Chicken and I must say  it was a fantastic experience from start to finish. Were incredibly friendly and knowledgeable making the whole process smooth and stress free.",
      reviewer_id: 1,
      user_id: 2,
    },
    {
      reviewId: 10,
      rating: 2,
      details: "I regret choosing  for my car purchase. The whole experience was frustrating and disappointing. I would strongly advise others to steer clear.",
      reviewer_id: 5,
      user_id: 4,
    },
    {
      reviewId: 11,
      rating: 4,
      details: "I recently had the pleasure of purchasing a car from Charlie Chicken and I must say  it was a fantastic experience from start to finish. Were incredibly friendly and knowledgeable making the whole process smooth and stress free.",
      reviewer_id: 1,
      user_id: 2,
    },
    {
      reviewId: 12,
      rating: 2,
      details: "I regret choosing  for my car purchase. The whole experience was frustrating and disappointing. I would strongly advise others to steer clear.",
      reviewer_id: 5,
      user_id: 4,
    },
    {
      reviewId: 13,
      rating: 4,
      details: "I recently had the pleasure of purchasing a car from Charlie Chicken and I must say  it was a fantastic experience from start to finish. Were incredibly friendly and knowledgeable making the whole process smooth and stress free.",
      reviewer_id: 1,
      user_id: 2,
    },
    {
      reviewId: 14,
      rating: 2,
      details: "I regret choosing  for my car purchase. The whole experience was frustrating and disappointing. I would strongly advise others to steer clear.",
      reviewer_id: 5,
      user_id: 4,
    },
    {
      reviewId: 15,
      rating: 4,
      details: "I recently had the pleasure of purchasing a car from Charlie Chicken and I must say  it was a fantastic experience from start to finish. Were incredibly friendly and knowledgeable making the whole process smooth and stress free.",
      reviewer_id: 1,
      user_id: 2,
    },
    {
      reviewId: 16,
      rating: 2,
      details: "I regret choosing  for my car purchase. The whole experience was frustrating and disappointing. I would strongly advise others to steer clear.",
      reviewer_id: 5,
      user_id: 4,
    },
    {
      reviewId: 17,
      rating: 4,
      details: "I recently had the pleasure of purchasing a car from Charlie Chicken and I must say  it was a fantastic experience from start to finish. Were incredibly friendly and knowledgeable making the whole process smooth and stress free.",
      reviewer_id: 1,
      user_id: 2,
    },
    {
      reviewId: 18,
      rating: 2,
      details: "I regret choosing  for my car purchase. The whole experience was frustrating and disappointing. I would strongly advise others to steer clear.",
      reviewer_id: 5,
      user_id: 4,
    },
    {
      reviewId: 19,
      rating: 4,
      details: "I recently had the pleasure of purchasing a car from Charlie Chicken and I must say  it was a fantastic experience from start to finish. Were incredibly friendly and knowledgeable making the whole process smooth and stress free.",
      reviewer_id: 1,
      user_id: 2,
    },
    {
      reviewId: 20,
      rating: 2,
      details: "I regret choosing  for my car purchase. The whole experience was frustrating and disappointing. I would strongly advise others to steer clear.",
      reviewer_id: 5,
      user_id: 4,
    }
  ]);
  // await knex.raw('SELECT setval(\'reviews_reviewId_seq\', (SELECT MAX(reviewId) from "reviews"));')
  await knex.raw("ALTER SEQUENCE \"reviews_reviewId_seq\" RESTART WITH 21;")
};
