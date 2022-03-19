const dummy = (blogs) => {
  return 1;
};
const totallikes = (blogs) => {
  return blogs.reduce((total, object) => object.likes + total, 0);
};
const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blogs) => {
    return blogs.likes >= max.likes ? blogs : max;
  });
};
const mostLikes = (blogs) => {
  const object = blogs.reduce((max, blogs) => {
    return blogs.likes >= max.likes ? blogs : max;
  });
  return {
    author: object.author,
    likes: object.likes,
  };
};

module.exports = {
  dummy,
  totallikes,
  favoriteBlog,
  mostLikes,
};
