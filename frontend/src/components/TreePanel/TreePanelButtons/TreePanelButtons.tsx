import React, { FunctionComponent } from "react";
import IconButton from "components/shared/IconButton";
import { TreePanelButtonsWrapper } from "./TreePanelButtons.components";
import { ReactComponent as HTMLIcon } from "images/htmlIcon.svg";
import { ReactComponent as LogoutIcon } from "images/logout.svg";
import { ReactComponent as PdfIcon } from "images/pdfIcon.svg";
import { useUserContext } from "context/UserContext/useUserContext";

const TreePanelButtons: FunctionComponent = () => {
  const { changeUserContextValue } = useUserContext();
  return (
    <TreePanelButtonsWrapper data-cy="export-buttons">
      <IconButton color="orange" icon={<HTMLIcon />} />
      <IconButton color="red" icon={<PdfIcon />} />
      <IconButton
        color="blue"
        icon={<LogoutIcon />}
        onClick={() =>
          changeUserContextValue({ isLoggedIn: false, username: undefined })
        }
      />
    </TreePanelButtonsWrapper>
  );
};

export default TreePanelButtons;
