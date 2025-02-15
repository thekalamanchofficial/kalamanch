import React from "react";
import { Box, Tab, Tabs } from "@mui/material";

type TabItem<T> = {
  label: string;
  value: T;
};

type CustomTabsProps<T> = {
  tabs: TabItem<T>[];
  activeTab: T;
  onTabChange: (newValue: T) => void;
};

const CustomTabs = <T,>({ tabs, activeTab, onTabChange }: CustomTabsProps<T>) => {
  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    const selectedTab = tabs[newIndex];
    if (selectedTab) {
      onTabChange(selectedTab.value);
    }
  };

  return (
    <Box
      sx={{
        borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
        width: "100%",
      }}
    >
      <Tabs
        value={tabs.findIndex((tab) => tab.value === activeTab)}
        onChange={handleTabChange}
        TabIndicatorProps={{
          style: {
            height: "2px",
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              textTransform: "none",
              color: tabs?.[index]?.value === activeTab ? "primary.main" : "text.secondary",
              fontWeight: tabs?.[index]?.value === activeTab ? "bold" : "normal",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CustomTabs;
