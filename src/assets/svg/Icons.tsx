import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export interface ISvgProps extends SvgProps {
  width?: number;
  height?: number;
  color?: string;
  xmlnsXlink?: string;
  xmlSpace?: string;
  xmlns?: string;
}
export function ShareIcon({
  width = 20,
  height = 22,
  color = '#fff',
  ...props
}: Readonly<ISvgProps>) {
  return (
    <Svg
      fill="#000"
      height={20}
      width={20}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 481.6 481.6"
      xmlSpace="preserve"
      {...props}>
      <Path d="M381.6 309.4c-27.7 0-52.4 13.2-68.2 33.6l-132.3-73.9c3.1-8.9 4.8-18.5 4.8-28.4 0-10-1.7-19.5-4.9-28.5l132.2-73.8c15.7 20.5 40.5 33.8 68.3 33.8 47.4 0 86.1-38.6 86.1-86.1S429 0 381.5 0s-86.1 38.6-86.1 86.1c0 10 1.7 19.6 4.9 28.5l-132.1 73.8c-15.7-20.6-40.5-33.8-68.3-33.8-47.4 0-86.1 38.6-86.1 86.1s38.7 86.1 86.2 86.1c27.8 0 52.6-13.3 68.4-33.9l132.2 73.9c-3.2 9-5 18.7-5 28.7 0 47.4 38.6 86.1 86.1 86.1s86.1-38.6 86.1-86.1-38.7-86.1-86.2-86.1zm0-282.3c32.6 0 59.1 26.5 59.1 59.1s-26.5 59.1-59.1 59.1-59.1-26.5-59.1-59.1 26.6-59.1 59.1-59.1zM100 299.8c-32.6 0-59.1-26.5-59.1-59.1s26.5-59.1 59.1-59.1 59.1 26.5 59.1 59.1-26.6 59.1-59.1 59.1zm281.6 154.7c-32.6 0-59.1-26.5-59.1-59.1s26.5-59.1 59.1-59.1 59.1 26.5 59.1 59.1-26.5 59.1-59.1 59.1z" />
    </Svg>
  );
}
export function Cart({
  width = 20,
  height = 22,
  color = '#fff',
  ...props
}: Readonly<ISvgProps>) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.3 5H21l-2 7H7.377M20 16H8L6 3H3m6 17a1 1 0 11-2 0 1 1 0 012 0zm11 0a1 1 0 11-2 0 1 1 0 012 0z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function BackIcon({
  width = 20,
  height = 22,
  color = '#fff',
  ...props
}: Readonly<ISvgProps>) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M224 480h640a32 32 0 110 64H224a32 32 0 010-64z" />
      <Path d="M237.248 512l265.408 265.344a32 32 0 01-45.312 45.312l-288-288a32 32 0 010-45.312l288-288a32 32 0 1145.312 45.312L237.248 512z" />
    </Svg>
  );
}
