import { Box } from "@mui/material";

const { REACT_APP_API_URL } = process.env;

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${REACT_APP_API_URL}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
