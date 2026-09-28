import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import api from "../services/api";
import { useAuth } from "../context/useAuth";

const Assignments = () => {
 const { token, user } = useAuth();

  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [assignmentForm, setAssignmentForm] = useState({
    baseId: "",
    equipmentTypeId: "",
    personnelName: "",
    quantity: "",
    assignmentDate: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getFilterData = async () => {
    try {
      const baseResponse = await api.get("/base/getAllBase");

      const equipmentResponse = await api.get(
        "/equipmenttype/getAllEquipmentType",
      );

      setBases(baseResponse.data.data);

      setEquipmentTypes(equipmentResponse.data.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || error.message);
    }
  };

  const getAssignments = async () => {
    try {
      const response = await api.get("/assignments/getAllAssignment", {
        params: {
          baseId: assignmentForm.baseId || undefined,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAssignments(response.data.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || error.message);
    }
  };

  useEffect(() => {
    getFilterData();
  }, []);

  useEffect(() => {
    if (token && (user?.roleName !== "base_commander" || user?.baseId)) {
      getAssignments();
    }
  }, [token, user]);

  useEffect(() => {
    if (user?.roleName === "base_commander" && user?.baseId) {
      setAssignmentForm((previous) => ({
        ...previous,
        baseId: user.baseId,
      }));
    }
  }, [user]);

  const handleChange = (event) => {
    setAssignmentForm({
      ...assignmentForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      await api.post("/assignments/create", assignmentForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Assignment created successfully");

      setAssignmentForm({
        baseId: "",
        equipmentTypeId: "",
        personnelName: "",
        quantity: "",
        assignmentDate: "",
      });

      getAssignments();
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || error.message);
    }
  };

  const getBaseName = (baseId) => {
    const base = bases.find((item) => item._id === baseId);

    return base ? base.name : baseId;
  };

  const getEquipmentName = (equipmentTypeId) => {
    const equipment = equipmentTypes.find(
      (item) => item._id === equipmentTypeId,
    );

    return equipment ? equipment.name : equipmentTypeId;
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: {
          xs: 3,
          sm: 5,
        },
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          textAlign: "center",
        }}
        color="secondary.main"
        gutterBottom
      >
        Assignments
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          mb: 4,
        }}
        color="secondary.main"
      >
        Assign military assets to personnel
      </Typography>

      {errorMessage && (
        <Typography
          color="error"
          sx={{
            textAlign: "center",
            mb: 2,
          }}
        >
          {errorMessage}
        </Typography>
      )}

      {successMessage && (
        <Typography
          color="success.main"
          sx={{
            textAlign: "center",
            mb: 2,
          }}
        >
          {successMessage}
        </Typography>
      )}

      <Paper
        elevation={3}
        sx={{
          p: {
            xs: 2,
            sm: 4,
          },
          mb: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          color="secondary.main"
          sx={{
            mb: 3,
          }}
        >
          Create Assignment
        </Typography>

        <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField
              fullWidth
              select
              label="Base"
              name="baseId"
              value={assignmentForm.baseId}
              onChange={handleChange}
              required
              disabled={user?.roleName === "base_commander"}
            >
              <MenuItem value="">Select Base</MenuItem>

              {bases.map((base) => (
                <MenuItem key={base._id} value={base._id}>
                  {base.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField
              fullWidth
              select
              label="Equipment Type"
              name="equipmentTypeId"
              value={assignmentForm.equipmentTypeId}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select Equipment Type</MenuItem>

              {equipmentTypes.map((equipment) => (
                <MenuItem key={equipment._id} value={equipment._id}>
                  {equipment.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField
              fullWidth
              label="Personnel Name"
              name="personnelName"
              value={assignmentForm.personnelName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              name="quantity"
              value={assignmentForm.quantity}
              onChange={handleChange}
              slotProps={{
                htmlInput: {
                  min: 1,
                },
              }}
              required
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Assignment Date"
              type="date"
              name="assignmentDate"
              value={assignmentForm.assignmentDate}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              required
            />
          </Grid>

          <Grid size={12}>
            <Button type="submit" variant="contained" size="large">
              Create Assignment
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          p: {
            xs: 1,
            sm: 3,
          },
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          color="secondary.main"
          sx={{
            mb: 2,
          }}
        >
          Assignment History
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Base</TableCell>

                <TableCell>Equipment</TableCell>

                <TableCell>Personnel</TableCell>

                <TableCell>Quantity</TableCell>

                <TableCell>Assignment Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment._id}>
                  <TableCell>{getBaseName(assignment.baseId)}</TableCell>

                  <TableCell>
                    {getEquipmentName(assignment.equipmentTypeId)}
                  </TableCell>

                  <TableCell>{assignment.personnelName}</TableCell>

                  <TableCell>{assignment.quantity}</TableCell>

                  <TableCell>
                    {new Date(assignment.assignmentDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Assignments;
