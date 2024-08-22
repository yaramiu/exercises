import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Gender } from "../../types";

interface Props {
  gender: Gender;
}

const GenderIcon = ({ gender }: Props) => {
  if (gender === "male") {
    return <MaleIcon />;
  } else if (gender === "female") {
    return <FemaleIcon />;
  } else {
    return <TransgenderIcon />;
  }
};

export default GenderIcon;
