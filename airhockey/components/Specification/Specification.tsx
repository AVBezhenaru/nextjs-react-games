import Line from '../Line/Line';
import {
  SpecificationWrapper,
  SpecificationWrapperBox,
  SpecificationTitleH1,
  RulesWrapper,
  HR,
  Li,
} from './index.ts';

const englishRules = [
  `One point is awarded for each goal scored into the opponent's goal. The game is played up to ${7} goals.`,
  `A goal is scored when the puck enters the goal, even if it is not recorded by an electronic scoring device.`,
  `Players may not hit the puck if it is on the opponent's side.`,
  `A player may hit the puck when it is in his own half, fields.`,
];

const russianRules = [
  `За каждую забитую в ворота противника шайбу присуждается одно очко. Игра ведется до 7-ми шайб.`,
  `Гол засчитывается, когда шайба падает в ворота, даже если это не зафиксировано электронным устройством для подсчёта очков.`,
  `Игрокам нельзя бить по шайбе, если она находится на стороне соперника.`,
  `Отбивать шайбу игрок может, когда она находится на его половине поля.`
]

export const Specification = () => (
  <SpecificationWrapper>
    <Line />
    <SpecificationWrapperBox>
      <SpecificationTitleH1>
        Dear friend, please read the rules before you play.
      </SpecificationTitleH1>
      <RulesWrapper>
        {englishRules.map((item, index) => (
          <Li key={index}>{item}</Li>
        ))}
      </RulesWrapper>
      <HR></HR>
      <RulesWrapper>
        {russianRules.map((item, index) => (
          <Li key={index}>{item}</Li>
        ))}
      </RulesWrapper>
    </SpecificationWrapperBox>
  </SpecificationWrapper>
);
