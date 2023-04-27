export function regexFilter(param) {
  const filter = [];
  param.forEach((word) => {
    const regex = new RegExp(word, "i");
    const aux = {
      $or: [
        { name: regex },
        { description: regex },
        { brand: regex },
        { category: regex },
        { keywords: regex },
      ],
    };
    filter.push(aux);
  });
  return { $and: filter };
}
