import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import "./App.css";
import { doTask, fetchUserScore, login, register } from "./axios/api";
import { IUserScore } from "./types/backend";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { loginUser } from "./redux/slice";
import { socket } from "./config/socket";

interface State {
  username: string;
  password: string;
  score: number;
  loading: boolean;
}
function App() {
  const dispatch = useAppDispatch();
  const userLogin = useAppSelector((state) => state.userLogin.user);
  const [openForm, setOpenForm] = useState<string | null>(null);
  const [users, setUsers] = useState<IUserScore[] | null>(null);
  const [user, setUser] = useState<string>("");
  const [state, setState] = useState<State>({
    username: "",
    password: "",
    score: 0,
    loading: false,
  });

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };
  useEffect(() => {
    socket.on("allScoresUpdated", (updatedScores) => {
      setUsers(updatedScores);
    });
    return () => {
      socket.off("allScoresUpdated");
    };
  }, []);
  const fetchData = async () => {
    const rs = await fetchUserScore();
    if (rs.status == "success") {
      setUsers(rs.data);
    } else {
      alert(rs.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleSubmit = async () => {
    updateState({ loading: true });
    if (openForm === "Login") {
      const rs = await login(state.username, state.password);
      if (rs.status === "success") {
        alert(rs.message);
        setUser(rs.data.username);
        dispatch(loginUser(rs.data));
        handleCloseForm();
      } else {
        alert(rs.message);
      }
      updateState({ loading: false });
    } else if (openForm === "Register") {
      const rs = await register(state.username, state.password);
      if (rs.status === "success") {
        alert(rs.message);
        handleCloseForm();
      } else {
        alert(rs.message);
      }
      updateState({ loading: false });
    } else if (openForm === "Task") {
      const rs = await doTask(userLogin.username, state.score);
      if (rs.status === "success") {
        alert(rs.message);
      } else {
        alert(rs.message);
      }
      updateState({ loading: false });
    }
    handleCloseForm();
  };

  const handleOpenForm = (formType: string) => setOpenForm(formType);
  const handleCloseForm = () => setOpenForm(null);

  const renderForm = (title: string) => (
    <Dialog open={Boolean(openForm)} onClose={handleCloseForm}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {title === "Task" ? (
          <TextField
            label="Enter Score"
            type="number"
            fullWidth
            margin="normal"
            onChange={(e) => updateState({ score: parseInt(e.target.value) })}
          />
        ) : (
          <>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              onChange={(e) => updateState({ username: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              onChange={(e) => updateState({ password: e.target.value })}
            />
          </>
        )}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            loading={state.loading}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
  return (
    <Box p={5} textAlign="center">
      <Stack direction="row" spacing={10}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            User Scoreboard
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Username</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Score </strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={() => handleOpenForm("Login")}>
              Login
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleOpenForm("Register")}
            >
              Register
            </Button>
            <Button variant="outlined" onClick={() => handleOpenForm("Task")}>
              Task
            </Button>
          </Box>
          {openForm && renderForm(openForm)}
        </Box>
      </Stack>
    </Box>
  );
}

export default App;
