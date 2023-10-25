import { Typography } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";
import { useTranslation } from "react-i18next";
import { ChartSectionComponentProps } from "./types";

const ChartSectionComponent: React.FC<ChartSectionComponentProps> = ({
  titleLocalesKey,
  data,
  total,
  totalLocalesKey,
  noDataMessageKey,
}) => {
  const { t } = useTranslation("main-page");

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {t(titleLocalesKey)}
      </Typography>
      {data.length > 0 ? (
        <>
          <PieChart
            data={data}
            radius={50}
            lineWidth={28}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
            labelStyle={{ fontSize: "4px" }}
            animate
          />
          <Typography>
            {t(totalLocalesKey)}: {total}
          </Typography>
        </>
      ) : (
        <Typography>{t(noDataMessageKey)}</Typography>
      )}
    </>
  );
};

export default ChartSectionComponent;
