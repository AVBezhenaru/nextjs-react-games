import Overlay from '../components/overlay';
import GameScene from '../components/words-field';
import ReduxProvider from '../store/provider';
import '../styles/index.scss';

export default function Home() {
  return (
    <Overlay>
      <ReduxProvider>
        <GameScene />
      </ReduxProvider>
    </Overlay>
  );
}
