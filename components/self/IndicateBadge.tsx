import React from "react";
import { Badge } from "../ui/badge";
import { MdDone } from "react-icons/md";
import { ImSpinner3 } from "react-icons/im";
import { BiError } from "react-icons/bi";
import { Action } from "@/types";

const IndicateBadge = (action: Action) => {
  if (action.is_error) {
    return (
      <Badge variant="destructive" className="flex gap-2">
        <span>Error Converting File</span>
        <BiError />
      </Badge>
    );
  } else if (action.is_converted) {
    return (
      <Badge variant="default" className="flex gap-2 bg-green-500">
        <span>Done</span>
        <MdDone />
      </Badge>
    );
  } else if (action.is_converting) {
    return (
      <Badge variant="default" className="flex gap-2">
        <span>Converting</span>
        <span className="animate-spin">
          <ImSpinner3 />
        </span>
      </Badge>
    );
  }
  return null; // Handle any other cases here
};

export default IndicateBadge;
