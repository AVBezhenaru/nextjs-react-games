import React, {ReactNode, useEffect, useState} from "react";
import {SectionLayout} from "./layoutStyle";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({children}: LayoutProps) => {
    const [showing, setShowing] = useState(false);

    useEffect(() => {
        setShowing(true);
    }, []);

    if (!showing) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    } else {
        return (
            <SectionLayout>
                {children}
            </SectionLayout>
        )
    }
    ;
}


export {Layout}
