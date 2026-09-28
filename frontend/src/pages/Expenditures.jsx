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

const Expenditures = () => {
 const { token, user } = useAuth();

  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [expenditures, setExpenditures] = useState([]);

  const [expenditureForm, setExpenditureForm] = useState({
    baseId: "",
    equipmentTypeId: "",
    quantity: "",
    expenditureDate: "",
    reason: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Get bases and equipment types
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

  // Get expenditure history
  const getExpenditures = async () => {
    try {
      const response = await api.get("/expenditures/getAllExpenditure", {
        params: {
          baseId:
            user?.roleName === "base_commander"
              ? user.baseId
              : expenditureForm.baseId || undefined,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenditures(response.data.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || error.message);
    }
  };

  useEffect(() => {
    getFilterData();
  }, []);

  useEffect(() => {
    if (token && (user?.roleName !== "base_commander" || user?.baseId)) {
      getExpenditures();
    }
  }, [token, user]);

  useEffect(() => {
    if (user?.roleName === "base_commander" && user?.baseId) {
      setExpenditureForm((previous) => ({
        ...previous,
        baseId: user.baseId,
      }));
    }
  }, [user]);

  // Handle input changes
  const handleChange = (event) => {
    setExpenditureForm({
      ...expenditureForm,
      [event.target.name]: event.target.value,
    });
  };

  // Create expenditure
  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      await api.post("/expenditures/create", expenditureForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Expenditure created successfully");

      setExpenditureForm({
        baseId: "",
        equipmentTypeId: "",
        quantity: "",
        expenditureDate: "",
        reason: "",
      });

      getExpenditures();
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || error.message);
    }
  };

  // Convert Base ID into Base name
  const getBaseName = (baseId) => {
    const base = bases.find((item) => item._id === baseId);

    return base ? base.name : baseId;
  };

  // Convert Equipment ID into Equipment name
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
      {/* Heading */}

      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          textAlign: "center",
        }}
        color="secondary.main"
        gutterBottom
      >
        Expenditures
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          mb: 4,
        }}
        color="secondary.main"
      >
        Record and track expended military assets
      </Typography>

      {/* Error */}

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

      {/* Success */}

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

      {/* Create Expenditure */}

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
          Create Expenditure
        </Typography>

        <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
          {/* Base */}

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
              value={expenditureForm.baseId}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select Base</MenuItem>

              {bases.map((base) => (
                <MenuItem key={base._id} value={base._id}>
                  {base.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Equipment Type */}

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
              value={expenditureForm.equipmentTypeId}
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

          {/* Quantity */}

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
              value={expenditureForm.quantity}
              onChange={handleChange}
              slotProps={{
                htmlInput: {
                  min: 1,
                },
              }}
              required
            />
          </Grid>

          {/* Expenditure Date */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField
              fullWidth
              label="Expenditure Date"
              type="date"
              name="expenditureDate"
              value={expenditureForm.expenditureDate}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              required
            />
          </Grid>

          {/* Reason */}

          <Grid size={12}>
            <TextField
              fullWidth
              label="Reason"
              name="reason"
              value={expenditureForm.reason}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
          </Grid>

          {/* Submit */}

          <Grid size={12}>
            <Button type="submit" variant="contained" size="large">
              Create Expenditure
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Expenditure History */}

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
          Expenditure History
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Base</TableCell>

                <TableCell>Equipment</TableCell>

                <TableCell>Quantity</TableCell>

                <TableCell>Expenditure Date</TableCell>

                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {expenditures.map((expenditure) => (
                <TableRow key={expenditure._id}>
                  <TableCell>{getBaseName(expenditure.baseId)}</TableCell>

                  <TableCell>
                    {getEquipmentName(expenditure.equipmentTypeId)}
                  </TableCell>

                  <TableCell>{expenditure.quantity}</TableCell>

                  <TableCell>
                    {new Date(expenditure.expenditureDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell>{expenditure.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Expenditures;
