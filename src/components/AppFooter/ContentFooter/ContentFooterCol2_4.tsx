import { ItemF } from "../constants/constant";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import {
  AccordionDetails,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const customStyle = {
  fontSize: "12px",
  lineHeight: "30px",
  color: "#636363",
  "&:hover": {
    color: "#f03333",
    cursor: "pointer",
  },
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({}) => ({
  "&::before": {
    display: "none",
  },
  backgroundColor: "transparent",
  marginLeft: "-15px",
  width: "100%",
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({}) => ({
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

interface ItemProps {
  item: ItemF;
}

const ContentFooterCol2_4 = ({ item }: ItemProps) => {
  const mobileScreen = useMediaQuery("(max-width:599px)");
  const [expanded, setExpanded] = React.useState<string | false>("panel");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      event.preventDefault();
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <>
      {mobileScreen ? (
        <>
          <Accordion expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}>
            <AccordionSummary
              aria-controls={`${item.title}-content`}
              id={`${item.title}-header`}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "13px",
                  fontWeight: "600",
                  lineHeight: "20px",
                  color: "#636363",
                }}
              >
                {item.title}
              </Typography>
            </AccordionSummary>

            {item.content.length > 0 &&
              item.content.map((element, index) => (
                <AccordionDetails
                  key={index}
                  sx={{ padding: "2px 15px 2px 15px" }}
                >
                  <Typography sx={customStyle}>{element}</Typography>
                </AccordionDetails>
              ))}
          </Accordion>
        </>
      ) : (
        <>
          <Stack sx={{ marginTop: "48px", textAlign: "left" }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "13px",
                fontWeight: "600",
                lineHeight: "20px",
                color: "#636363",
              }}
            >
              {item.title}
            </Typography>
            <Stack sx={{ marginTop: "30px" }}>
              {item.content?.map((element, index) => (
                <Typography key={index} sx={customStyle}>
                  {element}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

export default ContentFooterCol2_4;
