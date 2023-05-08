import {
  Title,
  Info
} from "./initialHeading.style"

export default function InitialHeading({text, info}) {
  return (
    <>
      <Title>{text}</Title>
      <Info>{info}</Info>
    </>
  );
};