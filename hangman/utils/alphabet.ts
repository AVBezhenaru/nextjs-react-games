const alphabet: string[] = [];

for (let i = 'а'.charCodeAt(0); i <= 'я'.charCodeAt(0); i += 1) {
  alphabet.push(String.fromCharCode(i) as string);
}

export { alphabet };
