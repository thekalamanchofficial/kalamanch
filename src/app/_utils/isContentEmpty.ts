const isContentEmpty = (html: string) => {
  const strippedContent = html.replace(/<(.|\n)*?>/g, "").trim();
  return strippedContent === "";
};

export default isContentEmpty;