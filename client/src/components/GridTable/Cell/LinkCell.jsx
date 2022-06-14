import { Link } from "react-router-dom";
import Paths from "../../../utils/Paths";

const LinkCell = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const cellData = dataItem[field];
  const id = dataItem.id;
  const type = dataItem.type;
  const path = `${Paths.HOME}/${type}/${id}`;
  return (
    <td
      colSpan="1"
      aria-colindex="5"
      aria-selected="false"
      role="gridcell"
      data-grid-col-index="4"
      className="table-column"
    >
      <div className="link">
        <Link className="link" to={"../" + path}>
          {cellData}
        </Link>
      </div>
    </td>
  );
};

export default LinkCell;
