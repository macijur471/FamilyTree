import React, { FunctionComponent } from "react";
import IconButton from "components/shared/IconButton";
import { TreePanelButtonsWrapper } from "./TreePanelButtons.components";
import { ReactComponent as HTMLIcon } from "images/htmlIcon.svg";
import { ReactComponent as LogoutIcon } from "images/logout.svg";
import { ReactComponent as PdfIcon } from "images/pdfIcon.svg";

const TreePanelButtons: FunctionComponent = () => {
  return (
    <TreePanelButtonsWrapper>
      <IconButton color="orange" icon={<HTMLIcon />} />
      <IconButton color="red" icon={<PdfIcon />} />
      <IconButton color="blue" icon={<LogoutIcon />} />
    </TreePanelButtonsWrapper>
  );
};

export default TreePanelButtons;
