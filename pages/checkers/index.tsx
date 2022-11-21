import Link from 'next/link';

export default function index() {
  return (
    <div className="head__page">
      <h2 className="head__page-title">Добро пожаловать в игру</h2>
      <h1 className="head__page-title__head">
        Ш<span>а</span>ш<span>к</span>и
      </h1>
      <div className="container___head__page">
        <Link href="/checkers/ChoosePlayer">
          <span className="head__page-play">Играть онлайн</span>
        </Link>
        <Link href="/checkers/Home">
          <span className="head__page-play">Играть с ботом</span>
        </Link>
      </div>
    </div>
  );
}
