import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { logout } from "../../store/authSlice";
import { useNavigate, NavLink } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        backgroundColor: "transparent",
      }}
    >

      <Box sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 2,
        padding: 2,
        backgroundColor: "transparent",
        boxShadow: "none",
        }}>
        {token ? (
          <>
            <Typography>{user?.email}</Typography>
            <Button variant="outlined" onClick={handleLogout}>Выйти</Button>
          </>
        ) : (
          <>
            <Button component={NavLink} to="/login" variant="outlined">Вход</Button>
            <Button component={NavLink} to="/register" variant="outlined">Регистрация</Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
