import { memo, ReactNode, useEffect, useState } from 'react';

import { Tab, TabContent, TabsContainer, TabWrapper } from './tabs.styles';

export type TabData = {
  id: string;
  label: string;
  component: ReactNode;
};

type Props = {
  tabsData: TabData[];
  defaultActiveId?: string;
};

type GetNewTabs = (
  tabsData: TabData[],
  activeTabId: string,
  changeTabHandle: (id: string) => void,
) => ReactNode[];

const getNewTabs: GetNewTabs = (tabsData, activeTabId, changeTabHandle) => {
  return tabsData.map((tabData) => {
    const { id, label } = tabData;

    return (
      <Tab active={activeTabId === id} onClick={() => changeTabHandle(id)} key={id}>
        {label}
      </Tab>
    );
  });
};

export const Tabs = memo((props: Props) => {
  const { tabsData, defaultActiveId } = props;

  const [activeTabId, setActiveTabId] = useState<string>(defaultActiveId || tabsData[0]?.id);
  const [activeTabContent, setActiveTabContent] = useState<ReactNode>();
  const [tabs, setTabs] = useState<ReactNode[]>([]);

  const changeTabHandle = (id: string) => {
    setActiveTabId(id);
  };

  useEffect(() => {
    const activeTabInfo = tabsData.find((tab) => tab.id === activeTabId);
    const newTabs = getNewTabs(tabsData, activeTabId, changeTabHandle);

    if (activeTabInfo) {
      setActiveTabContent(activeTabInfo?.component);
    } else {
      setActiveTabId(tabsData[0]?.id);
      setActiveTabContent(tabsData[0]?.component);
    }

    setTabs(newTabs);
  }, [activeTabId, tabsData]);

  return (
    <TabsContainer>
      <TabWrapper>{tabs}</TabWrapper>
      <TabContent>{activeTabContent}</TabContent>
    </TabsContainer>
  );
});
