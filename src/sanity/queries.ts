export const faqQuery = `*[_type == "faq"] | order(_createdAt asc){
  _id,
  question,
  answer
}`;
