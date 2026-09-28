import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import api from "../services/api";
import { useAuth } from "../context/useAuth";

const Dashboard = () => {
  const { token } = useAuth();

  const [filters, setFilters] = useState({
    baseId: "",
    equipmentTypeId: "",
    startDate: "",
    endDate: "",
  });

  const [bases, setBases] = useState([]);

  const [equipmentTypes, setEquipmentTypes] = useState([]);

  const [dashboardData, setDashboardData] = useState({
    openingBalance: 0,
    purchases: 0,
    transferIn: 0,
    transferOut: 0,
    netMovement: 0,
    assigned: 0,
    expended: 0,
    closingBalance: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Get dashboard data

  const getDashboard = async () => {
    try {
      setErrorMessage("");

      const response = await api.get("/dashboard", {
        params: {
          baseId: filters.baseId || undefined,

          equipmentTypeId: filters.equipmentTypeId || undefined,

          startDate: filters.startDate || undefined,

          endDate: filters.endDate || undefined,
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboardData(response.data.data);
    } catch (error) {
     

      

      setErrorMessage(error.response?.data?.msg || error.message);
    }
  };

  // Load dashboard when page opens

  useEffect(() => {
    if (token) {
      getDashboard();
    }
  }, [token]);

  // Get bases and equipment types

  useEffect(() => {
    const getFilterData = async () => {
      try {
        const baseResponse = await api.get("/base/getAllBase");

        const equipmentResponse = await api.get(
          "/equipmenttype/getAllEquipmentType",
        );

        setBases(baseResponse.data.data);

        setEquipmentTypes(equipmentResponse.data.data);
      } catch (error) {
        console.log("FILTER ERROR:", error.response?.data || error.message);
      }
    };

    getFilterData();
  }, []);

  // Filter change

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  // Dashboard cards

  const dashboardCards = [
    {
      title: "Opening Balance",
      value: dashboardData.openingBalance,
    },

    {
      title: "Purchases",
      value: dashboardData.purchases,
    },

    {
      title: "Transfer In",
      value: dashboardData.transferIn,
    },

    {
      title: "Transfer Out",
      value: dashboardData.transferOut,
    },

    {
      title: "Net Movement",
      value: dashboardData.netMovement,
    },

    {
      title: "Assigned",
      value: dashboardData.assigned,
    },

    {
      title: "Expended",
      value: dashboardData.expended,
    },

    {
      title: "Closing Balance",
      value: dashboardData.closingBalance,
    },
  ];

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
        textAlign="center"
        color="secondary.main"
        gutterBottom
      >
        Military Asset Dashboard
      </Typography>

      <Typography
        variant="body1"
        textAlign="center"
        color="secondary.main"
        sx={{
          mb: 4,
        }}
      >
        Overview of military asset movement
      </Typography>

      {/* Error */}

      {errorMessage && (
        <Typography
          color="error"
          textAlign="center"
          sx={{
            mb: 3,
          }}
        >
          {errorMessage}
        </Typography>
      )}

      {/* Filters */}

      <Paper
        elevation={3}
        sx={{
          p: {
            xs: 2,
            sm: 3,
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
            mb: 2,
          }}
        >
          Filters
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
        >
          {/* Start Date */}

          <TextField
            fullWidth
            label="Start Date"
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* End Date */}

          <TextField
            fullWidth
            label="End Date"
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Base */}

          <TextField
            fullWidth
            select
            label="Base"
            name="baseId"
            value={filters.baseId}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All Bases</MenuItem>

            {bases.map((base) => (
              <MenuItem key={base._id} value={base._id}>
                {base.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Equipment Type */}

          <TextField
            fullWidth
            select
            label="Equipment Type"
            name="equipmentTypeId"
            value={filters.equipmentTypeId}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All Equipment</MenuItem>

            {equipmentTypes.map((equipment) => (
              <MenuItem key={equipment._id} value={equipment._id}>
                {equipment.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {/* Apply Button */}

        <Button
          variant="contained"
          onClick={getDashboard}
          sx={{
            mt: 3,
          }}
        >
          Apply Filters
        </Button>
      </Paper>

      {/* Dashboard Cards */}

      <Grid container spacing={3}>
        {dashboardCards.map((item) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
            key={item.title}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                height: "100%",
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" fontWeight={600} color="secondary.main">
                {item.title}
              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
                color="secondary.main"
                sx={{
                  mt: 2,
                }}
              >
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
