const { createCanvas } = require('canvas');

const alternateCapitals = (str) =>
  [...str]
    .map((char, i) => char[`to${i % 2 ? 'Upper' : 'Lower'}Case`]())
    .join('');

const randomText = () =>
  alternateCapitals(Math.random().toString(36).substring(2, 8));
const _generateRandomColour = () => {
  return (
    'rgb(' +
    Math.floor(Math.random() * 255) +
    ', ' +
    Math.floor(Math.random() * 255) +
    ', ' +
    Math.floor(Math.random() * 255) +
    ')'
  );
};
const FONTBASE = 200;
const FONTSIZE = 35;

const relativeFont = (width) => {
  const ratio = FONTSIZE / FONTBASE;
  const size = width * ratio;
  return `${size}px serif`;
};

const configureText = (ctx, width, height) => {
  ctx.font = relativeFont(width);
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  const text = randomText();
  ctx.globalCompositeOperation = 'difference';
  ctx.strokeStyle = 'white';
  ctx.strokeText(text, width / 2, height / 2);
  return text;
};

const generateCaptcha = (width, height) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const text = configureText(ctx, width, height);

  const colour1 = _generateRandomColour();
  const colour2 = _generateRandomColour();
  const gradient1 = ctx.createLinearGradient(0, 0, width, 0);
  gradient1.addColorStop(0, colour1);
  gradient1.addColorStop(1, colour2);

  ctx.fillStyle = gradient1;
  ctx.fillRect(0, 0, width, height);

  const gradient2 = ctx.createLinearGradient(0, 0, width, 0);
  gradient2.addColorStop(0, colour2);
  gradient2.addColorStop(1, colour1);

  ctx.fillStyle = gradient2;
  ctx.setTransform(
    Math.random() / 10 + 0.9,
    0.1 - Math.random() / 5,
    0.1 - Math.random() / 5,
    Math.random() / 10 + 0.9,
    Math.random() * 20 + 10,
    100
  );

  return {
    image: canvas.toDataURL(),
    text: text,
  };
};

module.exports = generateCaptcha;
