import React, { FunctionComponent, useEffect, useRef } from "react";
import { ReactComponent as LoaderSVG } from "images/loader.svg";
import { LoaderWrapper } from "./Loader.components";
import { gsap } from "gsap";

const Loader: FunctionComponent = () => {
  const ref = useRef<null | SVGSVGElement>(null);

  useEffect(() => {
    const trees = ref?.current?.children;
    const tl = gsap.timeline({ repeat: -1 });

    if (!trees) return;
    tl.to(trees, {
      duration: 0.5,
      stagger: 0.3,
      transformOrigin: "50% 50%",
      scale: 0.75,
    }).to(
      trees,
      {
        duration: 0.5,
        stagger: 0.3,
        transformOrigin: "50% 50%",
        scale: 1,
      },
      "-=0.5"
    );
  }, []);

  return (
    <LoaderWrapper>
      <LoaderSVG ref={ref} />
    </LoaderWrapper>
  );
};

export default Loader;
