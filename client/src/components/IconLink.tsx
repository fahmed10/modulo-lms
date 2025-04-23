import { useNavigate } from "react-router";

export default function IconLink(props: IconLinkProps) {
    const navigate = useNavigate();

    return (
        <span onClick={() => navigate(props.link)} className="border-gray-300 border p-1 m-0.5 rounded-md hover:bg-gray-600 transition-colors cursor-pointer whitespace-nowrap">
            {props.text} {props.icon}
        </span>
    );
}

export interface IconLinkProps {
    link: string,
    text: string,
    icon: React.ReactNode,
}