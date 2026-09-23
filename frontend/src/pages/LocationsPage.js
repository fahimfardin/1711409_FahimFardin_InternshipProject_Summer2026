import {
  useState,
  useEffect,
} from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import { DataGrid } from "@mui/x-data-grid";

import LocationDrawer from "../components/Locations/LocationsDrawer";

const API_URL =
  "http://localhost:5000/api/locations";

const formatLocation = (item) => ({
  id: item.id,
  name:
    item.name || "",
  location: [
    item.address,
    item.city,
    item.state_province,
  ]
    .filter(Boolean)
    .join(", "),
  address:
    item.address || "",
  city:
    item.city || "",
  stateProvince:
    item.state_province || "",
  zipCode:
    item.zip_code || "",
  country:
    item.country || "",
  client:
    item.client || "N/A",
  locationType:
    item.location_type || "",
  contactName:
    item.contact_name || "",
  phoneNumber:
    item.phone_number || "",
  status:
    item.status || "Active",
  workOrders:
    Number(
      item.work_orders || 0
    ),
  providers:
    Number(
      item.providers || 0
    ),
  createdDate:
    item.created_at
      ? new Date(
          item.created_at
        ).toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : "",
});

const getColumns = (
  handleView,
  handleEdit,
  handleDelete,
  handleToggleStatus
) => [
  {
    field: "id",
    headerName: "ID",
    width: 55,
    sortable: false,
  },
  {
    field: "name",
    headerName: "Location Name",
    flex: 1.05,
    minWidth: 130,
    sortable: false,
    renderCell: (params) => (
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={params.value}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1.8,
    minWidth: 220,
    sortable: false,
    renderCell: (params) => (
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={params.value}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "country",
    headerName: "Country",
    flex: 0.75,
    minWidth: 90,
    sortable: false,
    renderCell: (params) => (
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={params.value}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "locationType",
    headerName: "Location Type",
    flex: 0.95,
    minWidth: 115,
    sortable: false,
    renderCell: (params) => (
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={params.value}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "client",
    headerName: "Client",
    flex: 0.8,
    minWidth: 90,
    sortable: false,
    renderCell: (params) => (
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={params.value}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "contactName",
    headerName: "Contact Name",
    flex: 0.9,
    minWidth: 110,
    sortable: false,
    renderCell: (params) => (
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={params.value}
      >
        {params.value || "—"}
      </Box>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.65,
    minWidth: 80,
    sortable: false,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={
          params.value === "Active"
            ? "success"
            : "default"
        }
        size="small"
        variant="outlined"
      />
    ),
  },
  {
    field: "workOrders",
    headerName: "Work Orders",
    flex: 0.75,
    minWidth: 95,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "providers",
    headerName: "Providers",
    flex: 0.65,
    minWidth: 85,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "createdDate",
    headerName: "Date Created",
    flex: 0.9,
    minWidth: 105,
    sortable: false,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 0.15,
          pt: "3px",
          boxSizing: "border-box",
        }}
      >
        <Tooltip title="View">
          <IconButton
            color="inherit"
            size="small"
            onClick={() =>
              handleView(params.row)
            }
          >
            <VisibilityOutlinedIcon
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton
            color="primary"
            size="small"
            onClick={() =>
              handleEdit(params.row)
            }
          >
            <EditOutlinedIcon
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            params.row.status === "Active"
              ? "Deactivate"
              : "Activate"
          }
        >
          <IconButton
            color={
              params.row.status === "Active"
                ? "warning"
                : "success"
            }
            size="small"
            onClick={() =>
              handleToggleStatus(
                params.row
              )
            }
          >
            <PowerSettingsNewIcon
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            size="small"
            onClick={() =>
              handleDelete(
                params.row.id
              )
            }
          >
            <DeleteOutlineOutlinedIcon
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];

function LocationsPage() {
  const [
    rows,
    setRows,
  ] = useState([]);

  const [
    drawerOpen,
    setDrawerOpen,
  ] = useState(false);

  const [
    editingLocation,
    setEditingLocation,
  ] = useState(null);

  const [
    viewingLocation,
    setViewingLocation,
  ] = useState(null);

  const [
    viewOpen,
    setViewOpen,
  ] = useState(false);

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState(
    "All Status"
  );

  const [
    countryFilter,
    setCountryFilter,
  ] = useState(
    "All Countries"
  );

  const [
    clientFilter,
    setClientFilter,
  ] = useState(
    "All Clients"
  );

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false);

  const [
    selectedId,
    setSelectedId,
  ] = useState(null);

  const [
    snackbar,
    setSnackbar,
  ] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (
    message,
    severity = "success"
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleSnackbarClose =
    () => {
      setSnackbar((prev) => ({
        ...prev,
        open: false,
      }));
    };

  const loadLocations =
    async () => {
      try {
        const response =
          await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            "Failed to fetch locations"
          );
        }

        const data =
          await response.json();

        setRows(
          data.map(
            formatLocation
          )
        );
      } catch (error) {
        console.error(error);

        showSnackbar(
          "Failed to load locations.",
          "error"
        );
      }
    };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleView = (
    location
  ) => {
    setViewingLocation(
      location
    );

    setViewOpen(true);
  };

  const handleCloseView = () => {
    setViewOpen(false);
    setViewingLocation(null);
  };

  const handleSaveLocation =
    async (locationData) => {
      if (editingLocation) {
        try {
          const response =
            await fetch(
              `${API_URL}/${editingLocation.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  name:
                    locationData.name,
                  country:
                    locationData.country,
                  state_province:
                    locationData.stateProvince,
                  address:
                    locationData.address,
                  city:
                    locationData.city,
                  zip_code:
                    locationData.zipCode,
                  client:
                    locationData.client ||
                    "N/A",
                  location_type:
                    locationData.locationType,
                  status:
                    editingLocation.status ||
                    "Active",
                  contact_name:
                    locationData.contactName
                      ?.trim() || null,
                  phone_number:
                    locationData.phoneNumber
                      ?.trim() || null,
                }),
              }
            );

          if (!response.ok) {
            const errorData =
              await response
                .json()
                .catch(
                  () => null
                );

            throw new Error(
              errorData?.message ||
                "Failed to update location"
            );
          }

          const updatedLocation =
            await response.json();

          setRows(
            (prevRows) =>
              prevRows.map(
                (row) =>
                  row.id ===
                  updatedLocation.id
                    ? formatLocation(
                        updatedLocation
                      )
                    : row
              )
          );

          showSnackbar(
            "Location updated successfully."
          );

          setDrawerOpen(false);
          setEditingLocation(
            null
          );
        } catch (error) {
          console.error(error);

          showSnackbar(
            "Failed to update location. Please try again.",
            "error"
          );
        }

        return;
      }

      try {
        console.log(
          "Sending location:",
          locationData
        );

        const response =
          await fetch(
            API_URL,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                name:
                  locationData.name,
                country:
                  locationData.country,
                state_province:
                  locationData.stateProvince,
                address:
                  locationData.address,
                city:
                  locationData.city,
                zip_code:
                  locationData.zipCode,
                client:
                  locationData.client ||
                  "N/A",
                location_type:
                  locationData.locationType,
                status: "Active",
                contact_name:
                  locationData.contactName
                    ?.trim() || null,
                phone_number:
                  locationData.phoneNumber
                    ?.trim() || null,
              }),
            }
          );

        if (!response.ok) {
          const errorData =
            await response
              .json()
              .catch(
                () => null
              );

          throw new Error(
            errorData?.message ||
              "Failed to save location"
          );
        }

        const savedLocation =
          await response.json();

        console.log(
          "Location returned from API:",
          savedLocation
        );

        const newLocation =
          formatLocation(
            savedLocation
          );

        setRows(
          (prevRows) => [
            ...prevRows,
            newLocation,
          ]
        );

        showSnackbar(
          "Location added successfully."
        );

        setDrawerOpen(false);
        setEditingLocation(
          null
        );
      } catch (error) {
        console.error(error);

        showSnackbar(
          "Failed to save location. Please try again.",
          "error"
        );
      }
    };

  const handleEdit = (
    location
  ) => {
    setEditingLocation(
      location
    );

    setDrawerOpen(true);
  };

  const handleToggleStatus =
    async (location) => {
      const newStatus =
        location.status ===
        "Active"
          ? "Inactive"
          : "Active";

      try {
        const response =
          await fetch(
            `${API_URL}/${location.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                name:
                  location.name,
                country:
                  location.country,
                state_province:
                  location.stateProvince,
                address:
                  location.address,
                city:
                  location.city,
                zip_code:
                  location.zipCode,
                client:
                  location.client ||
                  "N/A",
                location_type:
                  location.locationType,
                status:
                  newStatus,
                contact_name:
                  location.contactName
                    ?.trim() || null,
                phone_number:
                  location.phoneNumber
                    ?.trim() || null,
              }),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to change location status"
          );
        }

        const updatedLocation =
          await response.json();

        setRows(
          (prevRows) =>
            prevRows.map(
              (row) =>
                row.id ===
                updatedLocation.id
                  ? formatLocation(
                      updatedLocation
                    )
                  : row
            )
        );

        if (
          newStatus ===
          "Active"
        ) {
          showSnackbar(
            "Location activated successfully."
          );
        } else {
          showSnackbar(
            "Location deactivated successfully."
          );
        }
      } catch (error) {
        console.error(error);

        showSnackbar(
          "Failed to change location status. Please try again.",
          "error"
        );
      }
    };

  const handleDelete = (
    id
  ) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  const confirmDelete =
    async () => {
      if (!selectedId) {
        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/${selectedId}`,
            {
              method: "DELETE",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to delete location"
          );
        }

        await loadLocations();

        showSnackbar(
          "Location deleted successfully."
        );

        setDeleteOpen(false);
        setSelectedId(null);
      } catch (error) {
        console.error(error);

        showSnackbar(
          "Failed to delete location. Please try again.",
          "error"
        );
      }
    };

  const filteredRows =
    rows.filter((row) => {
      const search =
        searchText
          .trim()
          .toLowerCase();

      const matchesSearch =
        !search ||
        String(
          row.id ?? ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.name || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.location || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.address || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.city || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.stateProvince || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.zipCode || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.country || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.client || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.locationType || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.contactName || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.phoneNumber || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.workOrders ?? ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.providers ?? ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          row.status || ""
        )
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter ===
          "All Status" ||
        row.status ===
          statusFilter;

      const matchesCountry =
        countryFilter ===
          "All Countries" ||
        row.country ===
          countryFilter;

      const matchesClient =
        clientFilter ===
          "All Clients" ||
        row.client ===
          clientFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCountry &&
        matchesClient
      );
    });

  const handleExport = () => {
    const headers = [
      "ID",
      "Name",
      "Full Location",
      "Address",
      "City",
      "State",
      "Zip Code",
      "Country",
      "Client",
      "Location Type",
      "Contact Name",
      "Phone Number",
      "Status",
      "Work Orders",
      "Providers",
      "Created Date",
    ];

    const escapeCsvValue = (value) => {
      return `"${String(
        value ?? ""
      ).replace(
        /"/g,
        '""'
      )}"`;
    };

    const keepAsText = (value) => {
      if (
        value === null ||
        value === undefined ||
        value === ""
      ) {
        return "";
      }

      return `="${String(
        value
      ).replace(
        /"/g,
        '""'
      )}"`;
    };

    const data =
      filteredRows.map(
        (row) => [
          row.id,
          row.name,
          row.location,
          row.address,
          row.city,
          row.stateProvince,
          keepAsText(
            row.zipCode
          ),
          row.country,
          row.client,
          row.locationType,
          row.contactName,
          keepAsText(
            row.phoneNumber
          ),
          row.status,
          row.workOrders,
          row.providers,
          keepAsText(
            row.createdDate
          ),
        ]
      );

    const csvContent =
      "\uFEFF" +
      [headers, ...data]
        .map((row) =>
          row
            .map((value) =>
              escapeCsvValue(
                value
              )
            )
            .join(",")
        )
        .join("\r\n");

    const blob =
      new Blob(
        [csvContent],
        {
          type: "text/csv;charset=utf-8;",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      "locations.csv";

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    URL.revokeObjectURL(
      url
    );
  };

  const handleResetFilters =
    () => {
      setSearchText("");

      setStatusFilter(
        "All Status"
      );

      setCountryFilter(
        "All Countries"
      );

      setClientFilter(
        "All Clients"
      );
    };

  const columns =
    getColumns(
      handleView,
      handleEdit,
      handleDelete,
      handleToggleStatus
    );

  return (
    <Box
      sx={{
        px: {
          xs: 2,
          md: 3,
        },
        py: 3,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
            }}
          >
            Locations
          </Typography>

          <Typography
            sx={{
              color: "#6b7280",
              mt: 0.75,
            }}
          >
            Manage all your locations.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={
            <AddIcon />
          }
          onClick={() => {
            setEditingLocation(
              null
            );

            setDrawerOpen(
              true
            );
          }}
          sx={{
            backgroundColor:
              "#ff6a00",
            textTransform:
              "none",
            fontWeight: 600,
            px: 2.5,
            "&:hover": {
              backgroundColor:
                "#e65f00",
            },
          }}
        >
          Add Location
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          mb: 2,
          justifyContent:
            "flex-end",
        }}
      >
        <Button
          variant="outlined"
          onClick={
            handleResetFilters
          }
          sx={{
            textTransform:
              "none",
          }}
        >
          Reset Filters
        </Button>

        <Button
          variant="outlined"
          onClick={
            handleExport
          }
          sx={{
            textTransform:
              "none",
          }}
        >
          Export
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          alignItems:
            "center",
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <TextField
          placeholder="Search locations..."
          size="small"
          value={searchText}
          onChange={(e) =>
            setSearchText(
              e.target.value
            )
          }
          sx={{
            width: 300,
          }}
          InputProps={{
            startAdornment: (
              <SearchIcon
                sx={{
                  mr: 1,
                  color: "gray",
                }}
              />
            ),
          }}
        />

        <TextField
          select
          size="small"
          value={
            statusFilter
          }
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          sx={{
            width: 145,
          }}
        >
          <MenuItem value="All Status">
            All Status
          </MenuItem>

          <MenuItem value="Active">
            Active
          </MenuItem>

          <MenuItem value="Inactive">
            Inactive
          </MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          value={
            countryFilter
          }
          onChange={(e) =>
            setCountryFilter(
              e.target.value
            )
          }
          sx={{
            width: 145,
          }}
        >
          <MenuItem value="All Countries">
            All Countries
          </MenuItem>

          <MenuItem value="Bangladesh">
            Bangladesh
          </MenuItem>

          <MenuItem value="USA">
            USA
          </MenuItem>

          <MenuItem value="Canada">
            Canada
          </MenuItem>

          <MenuItem value="United Kingdom">
            United Kingdom
          </MenuItem>

          <MenuItem value="Australia">
            Australia
          </MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          value={
            clientFilter
          }
          onChange={(e) =>
            setClientFilter(
              e.target.value
            )
          }
          sx={{
            width: 145,
          }}
        >
          <MenuItem value="All Clients">
            All Clients
          </MenuItem>

          <MenuItem value="ABC Ltd">
            ABC Ltd
          </MenuItem>

          <MenuItem value="XYZ Inc">
            XYZ Inc
          </MenuItem>

          <MenuItem value="Tech Solutions">
            Tech Solutions
          </MenuItem>

          <MenuItem value="Global Corp">
            Global Corp
          </MenuItem>

          <MenuItem value="NextGen Ltd">
            NextGen Ltd
          </MenuItem>
        </TextField>
      </Box>

      <Paper
        elevation={0}
        sx={{
          mt: 2,
          borderRadius: 2,
          overflow: "hidden",
          border:
            "1px solid #e5e7eb",
          width: "100%",
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom:
              "1px solid #e5e7eb",
            backgroundColor:
              "#fafafa",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Showing{" "}
            {
              filteredRows.length
            }{" "}
            {filteredRows.length ===
            1
              ? "Location"
              : "Locations"}
          </Typography>
        </Box>

        <Box
          sx={{
            height: 520,
            width: "100%",
          }}
        >
          <DataGrid
            rows={
              filteredRows
            }
            columns={
              columns
            }
            disableColumnMenu
            disableColumnSorting
            disableColumnReorder
            disableRowSelectionOnClick
            rowHeight={52}
            columnHeaderHeight={48}
            pageSizeOptions={[
              5,
              10,
            ]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders":
                {
                  backgroundColor:
                    "#fafafa",
                  borderBottom:
                    "1px solid #e5e7eb",
                },
              "& .MuiDataGrid-columnHeaderTitle":
                {
                  fontWeight: 600,
                  fontSize: "13px",
                },
              "& .MuiDataGrid-cell":
                {
                  fontSize: "13px",
                  borderBottom:
                    "1px solid #eeeeee",
                  px: 1,
                },
              "& .MuiDataGrid-row:hover":
                {
                  backgroundColor:
                    "#fafafa",
                },
              "& .MuiDataGrid-footerContainer":
                {
                  borderTop:
                    "1px solid #e5e7eb",
                },
              "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus":
                {
                  outline:
                    "none",
                },
            }}
            localeText={{
              noRowsLabel:
                "No locations",
            }}
          />
        </Box>
      </Paper>

      <LocationDrawer
        open={
          drawerOpen
        }
        onClose={() => {
          setDrawerOpen(
            false
          );

          setEditingLocation(
            null
          );
        }}
        onSave={
          handleSaveLocation
        }
        editingLocation={
          editingLocation
        }
      />

      <Dialog
        open={viewOpen}
        onClose={
          handleCloseView
        }
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
          }}
        >
          Location Details
        </DialogTitle>

        <DialogContent
          dividers
        >
          {viewingLocation && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },
                gap: 2.5,
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Location Name
                </Typography>

                <Typography
                  fontWeight={600}
                >
                  {viewingLocation.name ||
                    "—"}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Country
                </Typography>

                <Typography>
                  {viewingLocation.country ||
                    "—"}
                </Typography>
              </Box>

              <Box
                sx={{
                  gridColumn:
                    {
                      xs: "auto",
                      sm: "1 / -1",
                    },
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Location
                </Typography>

                <Typography>
                  {viewingLocation.location ||
                    "—"}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Location Type
                </Typography>

                <Typography>
                  {viewingLocation.locationType ||
                    "—"}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Client
                </Typography>

                <Typography>
                  {viewingLocation.client ||
                    "—"}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Contact Name
                </Typography>

                <Typography>
                  {viewingLocation.contactName ||
                    "—"}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Phone Number
                </Typography>

                <Typography>
                  {viewingLocation.phoneNumber ||
                    "—"}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  ZIP Code
                </Typography>

                <Typography>
                  {viewingLocation.zipCode ||
                    "—"}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Status
                </Typography>

                <Box
                  sx={{
                    mt: 0.5,
                  }}
                >
                  <Chip
                    label={
                      viewingLocation.status
                    }
                    color={
                      viewingLocation.status ===
                      "Active"
                        ? "success"
                        : "default"
                    }
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Work Orders
                </Typography>

                <Typography>
                  {
                    viewingLocation.workOrders
                  }
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Providers
                </Typography>

                <Typography>
                  {
                    viewingLocation.providers
                  }
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Date Created
                </Typography>

                <Typography>
                  {
                    viewingLocation.createdDate ||
                    "—"
                  }
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Button
            onClick={
              handleCloseView
            }
            sx={{
              textTransform:
                "none",
            }}
          >
            Close
          </Button>

          <Button
            variant="contained"
            startIcon={
              <EditOutlinedIcon />
            }
            onClick={() => {
              handleCloseView();

              handleEdit(
                viewingLocation
              );
            }}
            sx={{
              backgroundColor:
                "#ff6a00",
              textTransform:
                "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor:
                  "#e65f00",
              },
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={
          deleteOpen
        }
        onClose={() =>
          setDeleteOpen(false)
        }
      >
        <DialogTitle>
          Delete Location
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you
            want to delete
            this location?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setDeleteOpen(
                false
              )
            }
            sx={{
              textTransform:
                "none",
            }}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={
              confirmDelete
            }
            sx={{
              textTransform:
                "none",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={
          snackbar.open
        }
        autoHideDuration={
          4000
        }
        onClose={
          handleSnackbarClose
        }
        anchorOrigin={{
          vertical:
            "bottom",
          horizontal:
            "right",
        }}
      >
        <Alert
          onClose={
            handleSnackbarClose
          }
          severity={
            snackbar.severity
          }
          variant="filled"
          sx={{
            width: "100%",
          }}
        >
          {
            snackbar.message
          }
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LocationsPage;