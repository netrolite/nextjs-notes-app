import ViewsContainer from "@/app/components/Views/ViewsContainer";
import useGetContext from "@/app/hooks/useGetContext";
import { ToolbarContext } from "../../Context";
import FormatTextIcon from "@/icons/svg/formatText.svg";
import ToolbarItem from "../Item";
import ToolbarTextFormatMainView from "./Main";
import ToolbarTextFormatSettingsView from "./Settings";
import { useTranslations } from "next-intl";
import Popover from "@/app/components/Popover";

export default function FormatText() {
  const t = useTranslations("Toolbar.tooltips");
  const { isFormatTextMenuOpen: isOpen, setIsFormatTextMenuOpen: setIsOpen } =
    useGetContext(ToolbarContext);

  return (
    <ToolbarItem
      icon={<FormatTextIcon />}
      onClick={() => setIsOpen((prev) => !prev)}
      tooltipText={t("formatText")}
      hideTooltip={isOpen}
    >
      <Popover {...{ isOpen, setIsOpen }} position="left">
        <ViewsContainer
          centered={true}
          top={40}
          {...{ isOpen, setIsOpen }}
          initMenu="main"
        >
          <ToolbarTextFormatMainView />
          <ToolbarTextFormatSettingsView />
        </ViewsContainer>
      </Popover>
    </ToolbarItem>
  );
}
