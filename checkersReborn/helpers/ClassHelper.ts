import classNames from 'classnames';

const createClasses = (entries: [string, boolean][]) => classNames(Object.fromEntries(new Map(entries)));

export default createClasses;