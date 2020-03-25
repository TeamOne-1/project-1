import React, { useState } from "react";
import "./sidebar.css";
import { Link, BrowserRouter as Router } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const Sidebar = () => {
  const links = [
    { url: "/resource", name: "Resource" },
    { url: "/project", name: "Project" },
    { url: "/formula", name: "Formula" }
  ];
  const [open, setOpen] = useState("open");
  const [style, setStyle] = useState("sidebar");
  const handleClick = () => {
    switch (open) {
      case "open":
        setOpen("close");
        setStyle("sidebar active");
        break;
      case "close":
        setOpen("open");
        setStyle("sidebar");
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div className={style}>
        <div className="router">
          <li className="empty-li">
            {open ? (
              <ExpandMoreIcon
                style={{ transform: "rotate(-90deg)" }}
                onClick={handleClick}
              />
            ) : (
              <ExpandMoreIcon
                style={{ transform: "rotate(90deg)" }}
                onClick={handleClick}
              />
            )}
          </li>
          {links.map(link => {
            return (
              <Link className="link" to={link.url} onClick={handleClick}>
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
