import { DetailsType } from '../../types/types';

export const DETAILS: DetailsType = {
  // position: 0,  
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

export const randomDetail = () => {
  const allDetails = 'IJLOSTZ';
  const randomKey = allDetails[Math.floor(Math.random() * (allDetails.length - 1))];
  console.log('DETAILS[randomKey]', DETAILS[randomKey]);

  return DETAILS[randomKey] || 'I';
};


// export const randomDetail = () => {
//   const allDetails = 'IJLOSTZ';
//   DETAILS.position = DETAILS.position >= allDetails.length - 1 ? 0 : DETAILS.position += 1;
//   const currentDetail = allDetails[DETAILS.position]; 
//   console.log('cur', currentDetail);
//   return currentDetail;
// };