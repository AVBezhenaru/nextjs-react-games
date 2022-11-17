import { DetailsType } from '../../types/types';

export const DETAILS: DetailsType = {
  // 0: { shape: [[[0]], [[0]]], color: '0, 0, 0' },
  I: {
    shape: [
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    color: '80, 227, 230',
  },
  J: {
    shape: [
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
    ],
    color: '36, 95, 223',
  },
  L: {
    shape: [
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
    ],
    color: '223, 173, 36',
  },
  O: {
    shape: [
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 1],
      ],
    ],
    color: '190, 80, 120',
  },
  S: {
    shape: [
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ],
    color: '190, 80, 120',
  },
  T: {
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
    color: '132, 65, 198',
  },
  Z: {
    shape: [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
    color: '227, 78, 78',
  },
};

export const determineColor = (key: string) => {
  // console.log('key', key);
  switch (key) {
    case 'I':
      return '80, 227, 230';
    case 'J':
      return '36, 95, 223';
    case 'L':
      return '223, 173, 36';
    case 'O':
      return '190, 80, 120';
    case 'S':
      return '190, 80, 120';
    case 'T':
      return '132, 65, 198';
    case 'Z':
      return '227, 78, 78';
    default:
      break;
  }
};

export const randomDetail = () => {
  const allDetails = 'IJLOSTZ';
  const randomKey = allDetails[Math.floor(Math.random() * allDetails.length)];
  determineColor(randomKey);
  return DETAILS[randomKey as keyof DetailsType];
};
