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

const Transfers = () => {
  const { token } = useAuth();

  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [transfers, setTransfers] = useState([]);

  const [transferForm, setTransferForm] = useState({
    fromBaseId: "",
    toBaseId: "",
    equipmentTypeId: "",
    quantity: "",
    transferDate: "",
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

  const getTransfers = async () => {
    try {
      const response = await api.get("/transfers/getAllTransfer", {
        params: {
          baseId: transferForm.fromBaseId || undefined,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransfers(response.data.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || error.message);
    }
  };

  useEffect(() => {
    getFilterData();
  }, []);

  useEffect(() => {
    if (token) {
      getTransfers();
    }
  }, [token]);

  const handleChange = (event) => {
    setTransferForm({
      ...transferForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      await api.post("/transfers/create", transferForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Transfer created successfully");

      setTransferForm({
        fromBaseId: "",
        toBaseId: "",
        equipmentTypeId: "",
        quantity: "",
        transferDate: "",
      });

      getTransfers();
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
        Transfers
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          mb: 4,
        }}
        color="secondary.main"
      >
        Transfer military assets between bases
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
          Create Transfer
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
              label="From Base"
              name="fromBaseId"
              value={transferForm.fromBaseId}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select From Base</MenuItem>

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
              label="To Base"
              name="toBaseId"
              value={transferForm.toBaseId}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select To Base</MenuItem>

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
              value={transferForm.equipmentTypeId}
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
              label="Quantity"
              type="number"
              name="quantity"
              value={transferForm.quantity}
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
              label="Transfer Date"
              type="date"
              name="transferDate"
              value={transferForm.transferDate}
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
              Create Transfer
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
          Transfer History
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>From Base</TableCell>

                <TableCell>To Base</TableCell>

                <TableCell>Equipment</TableCell>

                <TableCell>Quantity</TableCell>

                <TableCell>Transfer Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {transfers.map((transfer) => (
                <TableRow key={transfer._id}>
                  <TableCell>{getBaseName(transfer.fromBaseId)}</TableCell>

                  <TableCell>{getBaseName(transfer.toBaseId)}</TableCell>

                  <TableCell>
                    {getEquipmentName(transfer.equipmentTypeId)}
                  </TableCell>

                  <TableCell>{transfer.quantity}</TableCell>

                  <TableCell>
                    {new Date(transfer.transferDate).toLocaleDateString()}
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

export default Transfers;
