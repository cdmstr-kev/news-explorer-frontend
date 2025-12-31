export const stripHtml = (html) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getTags = (articles) => {
  const allTags = articles.map((article) => article.tag);

  const uniqueTags = [...new Set(allTags)];
  const displayedTags = uniqueTags.slice(0, 2);
  const otherTags = uniqueTags.length - displayedTags.length;

  return { displayedTags, otherTags, uniqueTags };
};
