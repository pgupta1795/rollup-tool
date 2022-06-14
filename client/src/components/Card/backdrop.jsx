import { Backdrop, CircularProgress } from "@mui/material";
import { StyledDiv } from "../../Styles/StyledDiv";

const CustomBackdrop = ({ loading, children }) => {
  return loading ? (
    <StyledDiv>
      <Backdrop
        className="bgColor"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        invisible={true}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </StyledDiv>
  ) : (
    children
  );
};

export default CustomBackdrop;
