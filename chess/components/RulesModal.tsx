import Image from 'next/image';

import {
  StyledPopup,
  StyledPopupButton,
  StyledPopupSpan,
  StyledPopupFigureCard,
  StyledPopupFigureCardsBlock,
  ImgFigureMove,
} from '../styles/chess.style';
import whiteKing from '../assets/img/white-king.png';

import styles from './RulesModal.module.scss';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const whiteKing = require('../assets/img/white-king.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const blackKing = require('../assets/img/black-king.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const whiteQueen = require('../assets/img/white-queen.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const blackQueen = require('../assets/img/black-queen.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const whiteRook = require('../assets/img/white-rook.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const blackRook = require('../assets/img/black-rook.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const whiteBishop = require('../assets/img/white-bishop.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const blackBishop = require('../assets/img/black-bishop.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const whiteKnight = require('../assets/img/white-knight.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const blackKnight = require('../assets/img/black-knight.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const whitePawn = require('../assets/img/white-pawn.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const blackPawn = require('../assets/img/black-pawn.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bishopMove = require('../assets/img/bishop-move.gif');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rookMove = require('../assets/img/rook-move.gif');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const queenMove = require('../assets/img/queen-move.gif');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knightMove = require('../assets/img/knight-move.gif');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pawnMove = require('../assets/img/pawn-move.gif');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cellExample = require('../assets/img/cell-example.gif');

const RulesModal = () => (
  <StyledPopup
    trigger={
      <StyledPopupButton>
        <span className={styles.mainTitle}> Правила игры</span>
      </StyledPopupButton>
    }
    modal
    closeOnDocumentClick
  >
    <h2 className={styles.title}>Цели игры в шахматы</h2>
    <ol>
      <li className={styles.text}>
        Шахматную партию играют два партнера, которые поочередно передвигают фигуры на квадратной
        доске, называемой шахматной доской. Игрок, имеющий белые фигуры, начинает партию. Считается,
        что за игроком очередь хода, когда сделан ход его партнера.
      </li>
      <li className={styles.text}>
        Целью каждого игрока является поставить короля партнера под удар таким образом, чтобы
        партнер не имел возможного хода, который позволил бы избежать взятия короля на следующем
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        ходу. Считается, что игрок, который достиг этой цели, 'поставил мат' королю партнера и
        выиграл партию. Партнер, королю которого поставлен мат, проиграл партию.
      </li>
      <li className={styles.text}>
        Если позиция такова, что ни один из игроков не может поставить мат, партия заканчивается
        вничью.
      </li>
    </ol>
    <h2 className={styles.text}>Начальная позиция фигур на шахматной доске</h2>
    <ol>
      <li className={styles.text}>
        Шахматная доска состоит из 64-х (сетка 8х8) равных квадратов, попеременно светлых и темных.
        Шахматная доска располагается между игроками так, чтобы ближайшее угловое поле справа от
        игрока было белым.
      </li>
      <li className={styles.text}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}В начале игры один игрок имеет
        16 фигур светлого цвета ("белые" фигуры), другой - 16 фигур темного цвета ("черные" фигуры).
        Эти фигуры, обычно обозначаемые соответствующими символами, следующие:
      </li>
      <StyledPopupFigureCardsBlock>
        <StyledPopupFigureCard>
          <StyledPopupSpan>Белый король</StyledPopupSpan>
          <Image src={whiteKing} alt="white king" />
        </StyledPopupFigureCard>
        <StyledPopupFigureCard>
          <StyledPopupSpan>Черный король</StyledPopupSpan>
          <Image src={blackKing} alt="black king" />
        </StyledPopupFigureCard>
        <StyledPopupFigureCard>
          <StyledPopupSpan>Белый ферзь</StyledPopupSpan>
          <Image src={whiteQueen} alt="white queen" />
        </StyledPopupFigureCard>
        <StyledPopupFigureCard>
          <StyledPopupSpan>Черный ферзь</StyledPopupSpan>
          <Image src={blackQueen} alt="black queen" />
        </StyledPopupFigureCard>
        <StyledPopupFigureCard>
          <StyledPopupSpan>Две белые ладьи</StyledPopupSpan>
          <Image src={whiteRook} alt="white rook" />
        </StyledPopupFigureCard>
        <StyledPopupFigureCard>
          <StyledPopupSpan>Две черные ладьи</StyledPopupSpan>
          <Image src={blackRook} alt="black rook" />
        </StyledPopupFigureCard>
        <StyledPopupFigureCard>
          <StyledPopupSpan>Два белых слона</StyledPopupSpan>
          <Image src={whiteBishop} alt="white bishop" />
        </StyledPopupFigureCard>
        <StyledPopupFigureCard>
          <StyledPopupSpan>Два черных слона</StyledPopupSpan>
          <Image src={blackBishop} alt="black bishop" />
        </StyledPopupFigureCard>
        <StyledPopupFigureCard>
          <StyledPopupSpan>Два белых коня</StyledPopupSpan>
          <Image src={whiteKnight} alt="white knight" />
        </StyledPopupFigureCard>
        <StyledPopupFigureCard>
          <StyledPopupSpan>Два черных коня</StyledPopupSpan>
          <Image src={blackKnight} alt="black knight" />
        </StyledPopupFigureCard>
        <StyledPopupFigureCard>
          <StyledPopupSpan>Восемь белых пешек</StyledPopupSpan>
          <Image src={whitePawn} alt="white pawn" />
        </StyledPopupFigureCard>
        <StyledPopupFigureCard>
          <StyledPopupSpan>Восемь черных пешек </StyledPopupSpan>
          <Image src={blackPawn} alt="black pawn" />
        </StyledPopupFigureCard>
      </StyledPopupFigureCardsBlock>
      <li>
        <span className={styles.text}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Восемь вертикальных рядов полей называются "вертикалями". Восемь горизонтальных рядов
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          полей называются "горизонталями". Прямой ряд полей одинакового цвета, касающихся друг
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          друга углами, называется "диагональю".
        </span>
      </li>
    </ol>
    <h2 className={styles.title}>Ходы фигур</h2>
    <ol>
      <li className={styles.text}>
        Не разрешается ходить фигурой на поле, занятое фигурой того же цвета. Если фигура ходит на
        поле, занятое фигурой партнера, последняя берется и снимается с шахматной доски, что
        является частью того же самого хода. Считается, что фигура нападает на фигуру партнера, если
        фигура может совершить взятие на этом поле в соответствии со статьями 2-8.
      </li>
      <li className={styles.text}>
        Слон может пойти на любое поле по диагонали, на которой он стоит.
        <ImgFigureMove>
          <Image src={bishopMove} alt="bishop-move" />
        </ImgFigureMove>
      </li>
      <li className={styles.text}>
        Ладья может пойти на любое поле по вертикали или горизонтали, на которых она стоит.
        <ImgFigureMove>
          <Image src={rookMove} alt="rook-move" />
        </ImgFigureMove>
      </li>
      <li className={styles.text}>
        Ферзь может пойти на любое поле по вертикали, горизонтали или диагонали, на которых он
        стоит.
        <ImgFigureMove>
          <Image src={queenMove} alt="queen-move" />
        </ImgFigureMove>
      </li>
      <li className={styles.text}>
        При выполнении этих ходов слон, ладья или ферзь не могут передвигаться через какие-либо
        стоящие на их пути фигуры.
      </li>
      <li className={styles.text}>
        Конь может пойти на одно из полей, ближайших к тому, на котором он стоит, но не на той же
        самой горизонтали, вертикали или диагонали.
        <ImgFigureMove>
          <Image src={knightMove} alt="knight-move" />
        </ImgFigureMove>
      </li>
      <li>
        <ol type="a">
          <li className={styles.text}>
            Пешка может пойти вперед на свободное поле, расположенное непосредственно перед ней на
            той же самой вертикали, или
          </li>
          <li className={styles.text}>
            своим первым ходом пешка может пойти как в (а); кроме того, она может продвинуться
            вперед на два поля по той же вертикали при условии, что оба поля свободны, или
          </li>
          <li className={styles.text}>
            пешка может пойти на поле, занятое фигурой партнера, которая находится по диагонали
            перед ней на соседней вертикали, при этом пешка берет эту фигуру.
          </li>
          <ImgFigureMove>
            <Image src={pawnMove} alt="ImgFigureMove" />
          </ImgFigureMove>
          <li className={styles.text}>
            пешка, атакующая поле, пересеченное пешкой партнера, которая одним ходом продвинулась со
            своей начальной позиции на два поля, может взять эту пешку партнера, как будто последняя
            была продвинута только на одно поле. Это взятие может быть осуществлено только на ходу,
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            следующим за этим продвижением, и называется взятием "на проходе".
          </li>
          <li className={styles.text}>
            Когда пешка достигает самой дальней от ее начальной позиции горизонтали, она должна быть
            заменена (и это является частью того же хода) на ферзя, ладью, слона или коня того же
            цвета. Выбор игрока не ограничивается фигурами, которые были взяты ранее. Такая замена
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            пешки на другую фигуру называется "превращением", и действие новой фигуры начинается
            сразу же.
          </li>
        </ol>
      </li>
      <li>
        Имеются два различных способа передвижения короля, посредством:
        <ol type="a">
          <li className={styles.text}>
            передвижения на любое соседнее поле, которое не атаковано одной или несколькими фигурами
            партнера;
          </li>
          <ImgFigureMove>
            <Image src={cellExample} alt="cell-example" />
          </ImgFigureMove>
          Считается, что фигуры партнера атакуют поле, даже если такие фигуры сами не могут ходить.
          <li className={styles.text}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Считается, что король находится "под шахом", если он атакован одной или несколькими
            фигурами партнера, даже если такие фигуры сами не могут ходить. Объявление шаха не
            обязательно.
          </li>
        </ol>
      </li>
      <li className={styles.text}>
        Ни одной фигурой нельзя ходить так, чтобы ставить своего короля под шах или оставлять своего
        короля под шахом.
      </li>
    </ol>
    <h2 className={styles.title}>Завершение игры</h2>
    <ol>
      <li>
        <ol type="a">
          <li className={styles.text}>
            Партия выигрывается игроком, который поставил мат королю партнера. Это сразу заканчивает
            игру, при условии, что ход, создающий позицию, где поставлен мат, был возможным ходом.
          </li>
          <li className={styles.text}>
            Партия выигрывается игроком, партнер которого заявляет, что он сдается. Это сразу
            заканчивает игру.
          </li>
        </ol>
      </li>
      <li>
        <ol type="a">
          <li className={styles.text}>
            Партия заканчивается вничью, когда игрок, который должен ходить, не имеет возможного
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            хода и его король не находится под шахом. Считается, что партия закончилась "патом". Это
            сразу заканчивает игру, при условии, что ход, создающий позицию, где поставлен пат, был
            возможным ходом.
          </li>
          <li className={styles.text}>
            Партия заканчивается вничью, когда возникает позиция, в которой ни один из игроков не
            может поставить мат королю партнера любой серией возможных ходов. Считается, что партия
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            пришла к "мертвой позиции". Это сразу заканчивает игру, при условии, что ход, создающий
            эту позицию, был возможным.
          </li>
          <li className={styles.text}>
            Партия заканчивается вничью по соглашению между двумя партнерами во время игры. Это
            сразу заканчивает игру.
          </li>
          <li className={styles.text}>
            Партия может закончиться вничью, если какая-нибудь одинаковая позиция может возникнуть
            или возникла на шахматной доске, по крайней мере, три раза.
          </li>
          <li className={styles.text}>
            Партия может закончиться вничью, если каждый игрок сделал последние 50 последовательных
            ходов без продвижения какой-либо пешки и без взятия какой-либо фигуры.
          </li>
        </ol>
      </li>
    </ol>
  </StyledPopup>
);

export default RulesModal;
