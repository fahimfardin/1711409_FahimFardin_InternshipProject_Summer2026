import {
  useState,
  useEffect,
} from "react";

import {
  Drawer,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

const stateOptions = {
  Bangladesh: [
    "Barishal",
    "Chattogram",
    "Dhaka",
    "Khulna",
    "Mymensingh",
    "Rajshahi",
    "Rangpur",
    "Sylhet",
  ],
  USA: [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],
  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
  ],
  "United Kingdom": [
    "England",
    "Scotland",
    "Wales",
    "Northern Ireland",
  ],
  Australia: [
    "Australian Capital Territory",
    "New South Wales",
    "Northern Territory",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia",
  ],
};

function LocationDrawer({
  open,
  onClose,
  onSave,
  editingLocation,
}) {
  const [
    locationName,
    setLocationName,
  ] = useState("");

  const [
    country,
    setCountry,
  ] = useState("");

  const [
    type,
    setType,
  ] = useState("");

  const [
    address,
    setAddress,
  ] = useState("");

  const [
    city,
    setCity,
  ] = useState("");

  const [
    zipCode,
    setZipCode,
  ] = useState("");

  const [
    stateProvince,
    setStateProvince,
  ] = useState("");

  const [
    contactName,
    setContactName,
  ] = useState("");

  const [
    phoneNumber,
    setPhoneNumber,
  ] = useState("");

  const [
    errors,
    setErrors,
  ] = useState({});

  useEffect(() => {
    if (editingLocation) {
      setLocationName(
        editingLocation.name || ""
      );

      setCountry(
        editingLocation.country || ""
      );

      setType(
        editingLocation.locationType || ""
      );

      setAddress(
        editingLocation.address || ""
      );

      setCity(
        editingLocation.city || ""
      );

      setZipCode(
        editingLocation.zipCode || ""
      );

      setStateProvince(
        editingLocation.stateProvince ||
          ""
      );

      setContactName(
        editingLocation.contactName ||
          ""
      );

      setPhoneNumber(
        editingLocation.phoneNumber ||
          ""
      );

      setErrors({});
    } else {
      setLocationName("");
      setCountry("");
      setType("");
      setAddress("");
      setCity("");
      setZipCode("");
      setStateProvince("");
      setContactName("");
      setPhoneNumber("");
      setErrors({});
    }
  }, [
    editingLocation,
    open,
  ]);

  const validateForm = () => {
    const newErrors = {};

    if (
      !locationName.trim()
    ) {
      newErrors.locationName =
        "Location name is required";
    }

    if (!country) {
      newErrors.country =
        "Country is required";
    }

    if (!stateProvince) {
      newErrors.stateProvince =
        "State is required";
    }

    if (!address.trim()) {
      newErrors.address =
        "Street address is required";
    }

    if (!city.trim()) {
      newErrors.city =
        "City is required";
    }

    if (!zipCode.trim()) {
      newErrors.zipCode =
        "ZIP Code is required";
    } else {
      const zip =
        zipCode.trim();

      if (
        country === "USA" &&
        !/^\d{5}(-\d{4})?$/.test(
          zip
        )
      ) {
        newErrors.zipCode =
          "Enter a valid US ZIP code";
      }

      if (
        country === "Bangladesh" &&
        !/^\d{4}$/.test(zip)
      ) {
        newErrors.zipCode =
          "Enter a valid Bangladesh postal code";
      }

      if (
        country === "Canada" &&
        !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(
          zip
        )
      ) {
        newErrors.zipCode =
          "Enter a valid Canadian postal code";
      }

      if (
        country === "Australia" &&
        !/^\d{4}$/.test(zip)
      ) {
        newErrors.zipCode =
          "Enter a valid Australian postcode";
      }

      if (
        country ===
          "United Kingdom" &&
        !/^[A-Z0-9]{2,4}[ ]?[A-Z0-9]{3}$/i.test(
          zip
        )
      ) {
        newErrors.zipCode =
          "Enter a valid UK postcode";
      }
    }

    if (!type) {
      newErrors.type =
        "Location type is required";
    }

    setErrors(
      newErrors
    );

    return (
      Object.keys(
        newErrors
      ).length === 0
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    onSave({
      id:
        editingLocation?.id,

      name:
        locationName.trim(),

      country:
        country,

      stateProvince:
        stateProvince,

      address:
        address.trim(),

      city:
        city.trim(),

      zipCode:
        zipCode.trim(),

      client:
        editingLocation?.client ||
        "N/A",

      locationType:
        type,

      status:
        editingLocation?.status ||
        "Active",

      contactName:
        contactName.trim(),

      phoneNumber:
        phoneNumber.trim(),
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          width: {
            xs: "100vw",
            sm: 420,
          },

          maxWidth: "100vw",

          p: 3,

          boxSizing:
            "border-box",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 3,
          }}
        >
          {editingLocation
            ? "Edit Location"
            : "Add Location"}
        </Typography>

        <TextField
          fullWidth
          label="Location Name"
          placeholder="Enter location name"
          margin="normal"
          value={
            locationName
          }
          error={
            !!errors.locationName
          }
          helperText={
            errors.locationName
          }
          onChange={(e) =>
            setLocationName(
              e.target.value
            )
          }
        />

        <TextField
          select
          fullWidth
          label="Country"
          margin="normal"
          value={country}
          onChange={(e) => {
            setCountry(
              e.target.value
            );

            setStateProvince(
              ""
            );
          }}
          error={
            !!errors.country
          }
          helperText={
            errors.country
          }
        >
          <MenuItem value="">
            Select Country
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
          fullWidth
          label="State / Province"
          margin="normal"
          value={
            stateProvince
          }
          onChange={(e) =>
            setStateProvince(
              e.target.value
            )
          }
          error={
            !!errors.stateProvince
          }
          helperText={
            errors.stateProvince
          }
        >
          <MenuItem value="">
            Select State
          </MenuItem>

          {(
            stateOptions[
              country
            ] || []
          ).map((state) => (
            <MenuItem
              key={state}
              value={state}
            >
              {state}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Street Address"
          placeholder="Enter street address"
          margin="normal"
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          error={
            !!errors.address
          }
          helperText={
            errors.address
          }
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="City"
            placeholder="Enter city"
            margin="normal"
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
            error={
              !!errors.city
            }
            helperText={
              errors.city
            }
          />

          <TextField
            fullWidth
            label="ZIP Code"
            placeholder="ZIP"
            margin="normal"
            value={zipCode}
            onChange={(e) =>
              setZipCode(
                e.target.value
              )
            }
            error={
              !!errors.zipCode
            }
            helperText={
              errors.zipCode
            }
          />
        </Box>

        <TextField
          select
          fullWidth
          label="Location Type"
          margin="normal"
          value={type}
          onChange={(e) =>
            setType(
              e.target.value
            )
          }
          error={
            !!errors.type
          }
          helperText={
            errors.type
          }
        >
          <MenuItem value="">
            Select Type
          </MenuItem>

          <MenuItem value="Commercial">
            Commercial
          </MenuItem>

          <MenuItem value="Governmental">
            Governmental
          </MenuItem>

          <MenuItem value="Residential">
            Residential
          </MenuItem>

          <MenuItem value="Educational">
            Educational
          </MenuItem>

          <MenuItem value="Other">
            Other
          </MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Contact Name"
          placeholder="Enter contact name"
          margin="normal"
          value={
            contactName
          }
          onChange={(e) =>
            setContactName(
              e.target.value
            )
          }
        />

        <TextField
          fullWidth
          label="Phone Number"
          placeholder="Enter phone number"
          margin="normal"
          value={
            phoneNumber
          }
          onChange={(e) =>
            setPhoneNumber(
              e.target.value
            )
          }
        />

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "flex-end",
            gap: 2,
            mt: 4,
            pt: 2,
            borderTop:
              "1px solid #e5e7eb",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              textTransform:
                "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={
              handleSubmit
            }
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
            Save Location
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default LocationDrawer;