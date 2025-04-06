import { SECTIONS } from "./Data";
import IconLink from "./IconLink";

export default function SectionLink(props: { section: string }) {
    let section = SECTIONS[props.section];
    return <IconLink link={section.path} text={section.name} icon={section.icon} />;
}