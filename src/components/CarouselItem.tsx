import "./CarouselItem.scss";
import { ReactComponent as GithubLogo } from "../images/github.svg";
import { ReactComponent as CloseIcon } from "../images/close.svg";

import React from "react";
import * as helpers from "../helpers";

// Todo: content fading animation not working.
function animateInfoIn(id: string) {
    let preview_info: HTMLElement | null = document.getElementById("previewInfo" + id);
    let carousel_subheading: HTMLElement | null = document.getElementById("carouselSubheading" + id);
    let expanded_info: HTMLElement | null = document.getElementById("expandedInfo" + id);
    let expanded_content: HTMLElement | null = document.getElementById("expandedContent" + id);
    carousel_subheading?.classList.add("fade");
    preview_info?.classList.add("animate-info-forwards");

    // after animation is done, switch to the proper element
    setTimeout(() => {
        expanded_info?.classList.remove("hide");
        preview_info?.classList.add("hide");
        preview_info?.classList.remove("animate-info-forwards");
        expanded_content?.classList.remove("fade");
    }, 500);
}

export function animateInfoOut(id: string) {
    let preview_info: HTMLElement | null = document.getElementById("previewInfo" + id);
    let expanded_info: HTMLElement | null = document.getElementById("expandedInfo" + id);
    let carousel_subheading: HTMLElement | null = document.getElementById("carouselSubheading" + id);
    let expanded_content: HTMLElement | null = document.getElementById("expandedContent" + id);

    expanded_content?.classList.add("fade");
    setTimeout(() => {
        expanded_info?.classList.add("animate-info-backwards");
    }, 250);

    setTimeout(() => {
        preview_info?.classList.remove("hide");
        expanded_info?.classList.add("hide");
        carousel_subheading?.classList.remove("fade");

        expanded_info?.classList.remove("animate-info-backwards");
    }, 750);
}

function buildProjectLink(project_link: string | undefined) {
    if (!project_link) return <></>;

    if (helpers.isURL(project_link)) {
        return (
            <button
                className="carousel-item-button clickable"
                onClick={() => {
                    helpers.openUrl(project_link);
                }}
            >
                <GithubLogo className="gh-logo" />
                View Project Repo
            </button>
        );
    }

    return <p className="carousel-item-link-msg">{project_link}</p>;
}

interface CarouselItemProperties {
    backgroundImage: string;
    heading: string;
    subHeading: string;
    id: string;
    children?: JSX.Element[];
    projectLink?: string;
}

export default function CarouselItem(props: CarouselItemProperties) {
    let img: string = `url('${props.backgroundImage}')`;
    const img_styles: React.CSSProperties = {
        backgroundImage: img,
    };

    // do not hide the first item in the carousel
    let hidden: string = props.id === "0" ? "" : "hide fade";

    let media: JSX.Element = <></>;
    let description: JSX.Element = <></>;
    if (props.children?.length === 2) {
        media = props.children[0];
        description = props.children[1];
    }

    return (
        <div id={"carouselItem" + props.id} className={"carousel-item " + hidden} style={img_styles}>
            <div
                id={"previewInfo" + props.id}
                className="clickable preview-info"
                onClick={() => {
                    animateInfoIn(props.id);
                }}
            >
                <h3 id={"carouselHeading" + props.id}>{props.heading}</h3>
                <p id={"carouselSubheading" + props.id}>{props.subHeading}</p>
            </div>
            <div id={"expandedInfo" + props.id} className="expanded-info hide">
                <h3 className="expanded-info-heading">{props.heading}</h3>
                <div id={"expandedContent" + props.id} className="expanded-content fade">
                    <CloseIcon className="expanded-info-close-icon clickable" onClick={() => animateInfoOut(props.id)} />
                    {media}
                    <div className="expanded-info-panel">
                        {description}
                        {buildProjectLink(props.projectLink)}
                    </div>
                </div>
            </div>
        </div>
    );
}
