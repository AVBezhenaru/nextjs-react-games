export default class CellModel {
  isBlack: boolean;
  hasBlackChecker: boolean;
  hasWhiteChecker: boolean;
  kingChecker: boolean = false;
  canBeCaptured: boolean = false;
  selected: boolean = false;
  available: boolean = false;

  constructor(
    isBlack: boolean,
    hasBlackChecker: boolean,
    hasWhiteChecker: boolean
  ) {
    this.isBlack = isBlack;
    this.hasBlackChecker = hasBlackChecker;
    this.hasWhiteChecker = hasWhiteChecker;
  }
}