import { HealthCheckRating } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  healthCheckRating: HealthCheckRating;
}

const HeartIcon = ({ healthCheckRating }: Props) => {
  if (healthCheckRating === 0) {
    return <FavoriteIcon htmlColor="green" />;
  } else if (healthCheckRating === 1) {
    return <FavoriteIcon htmlColor="yellow" />;
  } else if (healthCheckRating === 2) {
    return <FavoriteIcon htmlColor="red" />;
  } else {
    return <FavoriteIcon htmlColor="purple" />;
  }
};

export default HeartIcon;
