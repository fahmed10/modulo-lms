import { UserRole } from "../Api";
import useUserInfo from "../hooks/useUserInfo";
import { SECTIONS } from "../Sections";
import IconLink from "./IconLink";

export default function SectionLink(props: { section: typeof SECTIONS[UserRole][number]["name"] }) {
    const { role } = useUserInfo();
    const section = SECTIONS[role].find(s => s.name === props.section)!;
    return <IconLink link={section.path} text={section.name} icon={section.icon} />;
}