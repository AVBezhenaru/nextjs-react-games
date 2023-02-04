export const SET_COLOR = 'SET_COLOR';

export const setNumberColor = (color: number[]) => {
  return {
    type: SET_COLOR,
    payload: {
      color,
    },
  };
};
