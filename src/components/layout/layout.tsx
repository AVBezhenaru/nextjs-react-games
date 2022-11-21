import React, {ReactNode} from "react";
import {SectionLayout} from "./layoutStyle";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({children}: LayoutProps) => {
  return(
      <SectionLayout>
        {children}
      </SectionLayout>
  )
};

export {Layout}
