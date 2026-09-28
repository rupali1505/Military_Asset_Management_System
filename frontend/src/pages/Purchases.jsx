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

const Purchases = () => {
const { token, user } = useAuth();

  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const [purchaseForm, setPurchaseForm] = useState({
    baseId: "",
    equipmentTypeId: "",
    quantity: "",
    purchaseDate: "",
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

 const getPurchases = async () => {
   try {
     const response = await api.get("/purchases/getAllPurchase", {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });

     setPurchases(response.data.data);
   } catch (error) {
     setErrorMessage(error.response?.data?.msg || error.message);
   }
 };
  useEffect(() => {
    getFilterData();
  }, []);

  useEffect(() => {
    if (token) {
      getPurchases();
    }
  }, [token]);
  useEffect(() => {
    if (user?.roleName === "logistics_officer" && user?.baseId) {
      setPurchaseForm((previous) => ({
        ...previous,
        baseId: user.baseId,
      }));
    }
  }, [user]);

  const handleChange = (event) => {
    setPurchaseForm({
      ...purchaseForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleBaseFilter = async (event) => {
    const baseId = event.target.value;

    setPurchaseForm({
      ...purchaseForm,
      baseId: baseId,
    });

    if (!token) {
      return;
    }

    try {
      const response = await api.get("/purchases/getAllPurchase", {
        params: {
          baseId: baseId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPurchases(response.data.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || error.message);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      await api.post("/purchases/create", purchaseForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Purchase created successfully");

      setPurchaseForm({
        baseId: "",
        equipmentTypeId: "",
        quantity: "",
        purchaseDate: "",
      });

      getPurchases();
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || error.message);
    }
  };

  const getBaseName = (baseId) => {

    const base = bases.find(
        (item) => item._id === baseId
    );

    return base ? base.name : baseId;
};

const getEquipmentName = (equipmentTypeId) => {

    const equipment = equipmentTypes.find(
        (item) => item._id === equipmentTypeId
    );

    return equipment
        ? equipment.name
        : equipmentTypeId;
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
        Purchases
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          mb: 4,
        }}
        color="secondary.main"
      >
        Record and view military asset purchases
      </Typography>

      {/* Messages */}

      {errorMessage && (
        <Typography
          color="error"
          sx={{
            textAlign: "center",
            mb: 4,
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

      {/* Purchase Form */}

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
          sx={{ mb: 3 }}
        >
          Add Purchase
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
              value={purchaseForm.baseId}
              onChange={handleBaseFilter}
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
              value={purchaseForm.equipmentTypeId}
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
              value={purchaseForm.quantity}
              onChange={handleChange}
              slotProps={{
                htmlInput: {
                  min: 1,
                },
              }}
              required
            />
          </Grid>

          {/* Purchase Date */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField
              fullWidth
              label="Purchase Date"
              type="date"
              name="purchaseDate"
              value={purchaseForm.purchaseDate}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              required
            />
          </Grid>

          {/* Submit */}

          <Grid size={12}>
            <Button type="submit" variant="contained" size="large">
              Add Purchase
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Purchase History */}

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
          Purchase History
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Base</TableCell>

                <TableCell>Equipment</TableCell>

                <TableCell>Quantity</TableCell>

                <TableCell>Purchase Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {purchases.map((purchase) => (
                <TableRow key={purchase._id}>
                  <TableCell>{getBaseName(purchase.baseId)}</TableCell>

                  <TableCell>
                    {getEquipmentName(purchase.equipmentTypeId)}
                  </TableCell>

                  <TableCell>{purchase.quantity}</TableCell>

                  <TableCell>
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
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

export default Purchases;
