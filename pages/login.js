import Link from "next/link";
import { useState } from "react";
import {
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#D84727",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#D84727",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {},
    "&:hover fieldset": {
      borderColor: "#D84727",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D84727",
    },
  },
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginHandler = (e) => {
    e.preventDefault();
    if (username === "ampuh" && password === "ganteng123") {
      router.replace("/");
    }
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <div className="mt-4">
          <CssTextField
            label="Username"
            type="text"
            sx={{ width: "100%" }}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="mt-4">
          <CssTextField
            label="Password"
            type="Password"
            sx={{ width: "100%" }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mt-4 ">
          <button
            // disabled={loading}
            type="submit"
            className="p-2 rounded bg-slate-600 text-white "
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};
export default Login;
