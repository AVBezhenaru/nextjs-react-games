import { ListPlayersInterface } from '../../interfaces/Interfaces';

export const bids = [
  { value: '0', label: 'нет ставки' },
  { value: '1', label: '50' },
  { value: '2', label: '100' },
  { value: '3', label: '150' },
  { value: '4', label: '200' },
  { value: '5', label: '250' },
  { value: '6', label: '300' },
  { value: '7', label: '350' },
  { value: '8', label: '400' },
  { value: '9', label: '450' },
  { value: '10', label: '500' },
];

export const timeGain = [
  { value: 'no increase', label: 'без прибавки' },
  { value: '1', label: '1 секунда' },
  { value: '2', label: '2 секунды' },
  { value: '3', label: '3 секунды' },
  { value: '5', label: '5 секунд' },
  { value: '10', label: '10 секунд' },
  { value: '15', label: '15 секунд' },
  { value: '30', label: '30 секунд' },
  { value: '45', label: '45 секунд' },
  { value: '60', label: '1 минута' },
];

export const gameMode = [
  { value: 'friendOnline', label: 'с ботом' },
  { value: 'friendOffline', label: 'онлайн' },
];

export const color = [
  { value: 'black', label: 'черные' },
  { value: 'white', label: 'белые' },
];

export const timeGame = [
  { value: 'unlimited', label: 'неограниченно' },
  { value: '3', label: '3 минуты' },
  { value: '5', label: '5 минут' },
  { value: '15', label: '15 минут' },
  { value: '30', label: '30 минут' },
  { value: '45', label: '45 минут' },
  { value: '60', label: '1 час' },
];

export const players: ListPlayersInterface[] = [
  { value: 1, label: { name: 'player 1', bid: '100', colors: 'белые', mode: '' } },
  { value: 2, label: { name: 'player 2', bid: '200', colors: 'черные', mode: '' } },
  { value: 3, label: { name: 'player 3', bid: '300', colors: 'белые', mode: '' } },
  { value: 4, label: { name: 'player 4', bid: '400', colors: 'черные', mode: '' } },
  { value: 5, label: { name: 'player 5', bid: '500', colors: 'белые', mode: '' } },
  { value: 6, label: { name: 'player 6', bid: '10', colors: 'черные', mode: '' } },
  { value: 7, label: { name: 'player 7', bid: '20', colors: 'белые', mode: '' } },
  { value: 8, label: { name: 'player 8', bid: '30', colors: 'черные', mode: '' } },
  { value: 9, label: { name: 'player 9', bid: '40', colors: 'белые', mode: '' } },
  { value: 10, label: { name: 'player 10', bid: '50', colors: 'черные', mode: '' } },
];
