import {
  TreeListTextFilter,
  TreeListTextEditor,
} from "@progress/kendo-react-treelist";
import LinkCell from "./Cell/LinkCell";
import * as ServiceUtils from "../../utils/ServiceUtils";

export const DEFAULT_COLUMN_KEYS = [
  "type",
  "name",
  "revision",
  "state",
  "title",
  "description",
  "owner",
  "created",
  "modified",
];

export const DEFAULT_COLUMNS = [
  {
    field: "name",
    title: "Name",
    width: "15%",
    expandable: true,
  },
  {
    field: "type",
    title: "Type",
    width: "7%",
  },
  {
    field: "revision",
    title: "Revision",
    width: "5%",
  },
  {
    field: "state",
    title: "State",
    width: "5%",
  },
  {
    field: "title",
    title: "Title",
    width: "15%",
    filter: TreeListTextFilter,
    editCell: TreeListTextEditor,
    cell: LinkCell,
  },
  {
    field: "description",
    title: "Description",
    filter: TreeListTextFilter,
    editCell: TreeListTextEditor,
    width: "13%",
  },
  {
    field: "owner",
    title: "Owner",
    width: "10%",
  },
  {
    field: "created",
    title: "Created Date",
    width: "10%",
    format: "{0:d}",
  },
  {
    field: "modified",
    title: "Modified Date",
    width: "10%",
    format: "{0:d}",
  },
];

export const KEY_IDENTIFIER = "dseno:EnterpriseAttributes";
export const OBJECT_COLUMNS = (type) => {
  const customAttributes = ServiceUtils.getCustomAttributeKeys(type);
  const customColumns = customAttributes.map((customAttribute) => {
    const displayTitle = customAttribute["Label"];
    const attribute = customAttribute["Attribute"];
    return {
      field: attribute,
      title: displayTitle,
      width: "15%",
      editCell: TreeListTextEditor,
    };
  });
  return [...DEFAULT_COLUMNS.slice(0, -2), ...customColumns];
};
