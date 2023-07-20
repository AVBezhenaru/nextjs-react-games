import Overlay from '../components/overlay';
import GameScene from '../components/words-field';
import ReduxProvider from '../store/provider';
import '../styles/wordle.module.scss';

export default function Home() {
  return (
    <ReduxProvider>
      <Overlay>
        <GameScene />
      </Overlay>
    </ReduxProvider>
  );
}
