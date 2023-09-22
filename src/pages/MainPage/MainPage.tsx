import React, { useState } from "react";
import { Tab, TabPanel, Tabs } from "react-tabs";
import Payments from "@components/Payments";
import Incomes from "@components/Incomes";
import Charts from "@components/Charts";
import Settings from "@components/Settings";
import { MainPageContainer, TabButton, TabListWrapper } from "./styles";

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <MainPageContainer>
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <TabListWrapper>
          <Tab>
            <TabButton>Payments</TabButton>
          </Tab>
          <Tab>
            <TabButton>Income</TabButton>
          </Tab>
          <Tab>
            <TabButton>Charts</TabButton>
          </Tab>
          <Tab>
            <TabButton>Settings</TabButton>
          </Tab>
        </TabListWrapper>
        <hr />
        <TabPanel>
          <Payments />
        </TabPanel>
        <TabPanel>
          <Incomes />
        </TabPanel>
        <TabPanel>
          <Charts />
        </TabPanel>
        <TabPanel>
          <Settings />
        </TabPanel>
      </Tabs>
    </MainPageContainer>
  );
};

export default MainPage;
