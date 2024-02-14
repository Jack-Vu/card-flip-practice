const generateCardData = (numberOfCards) => {
  const numberOfImages = numberOfCards / 2;
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 50 + 1);
  };

  let imageIds = [];
  while (imageIds.length < numberOfImages) {
    const randomNumber = generateRandomNumber();
    if (!imageIds.includes(randomNumber)) {
      imageIds.push(randomNumber);
    }
  }
  imageIds = [...imageIds, ...imageIds];
  imageIds.sort(() => Math.random() - 0.5);
  imageIds.sort(() => Math.random() - 0.5);
  const cardData = imageIds.map((imageId, index) => {
    return {
      id: index + 1,
      imageUrl: `/assets/${imageId}.webp`,
      isFlipped: false,
      isMatched: false,
    };
  });
  return cardData;
};

export { generateCardData };
