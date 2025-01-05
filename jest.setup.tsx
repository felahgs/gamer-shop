/* eslint-disable @next/next/no-img-element */
import "@testing-library/jest-dom";

jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      return <img alt="mocked image" src={props.src} />;
    },
  };
});
