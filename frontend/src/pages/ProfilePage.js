import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Divider,
  Avatar,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

const API_URL =
  "http://localhost:5000/api/profile";

const formatMemberSince = (value) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
};

function ProfilePage() {
  const [
    editing,
    setEditing,
  ] = useState(false);

  const [
    profile,
    setProfile,
  ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    role: "",
    department: "",
    about: "",
    status: "",
    memberSince: "",
  });

  const [
    formData,
    setFormData,
  ] = useState(profile);

  const [
    errors,
    setErrors,
  ] = useState({});

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    savedMessage,
    setSavedMessage,
  ] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        const response =
          await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            "Failed to load profile."
          );
        }

        const data =
          await response.json();

        const formattedProfile = {
          firstName:
            data.first_name || "",

          lastName:
            data.last_name || "",

          email:
            data.email || "",

          phone:
            data.phone || "",

          city:
            data.city || "",

          country:
            data.country || "",

          role:
            data.role || "",

          department:
            data.department || "",

          about:
            data.about || "",

          status:
            data.status || "Active",

          memberSince:
            data.member_since || "",
        };

        setProfile(
          formattedProfile
        );

        setFormData(
          formattedProfile
        );
      } catch (error) {
        console.error(
          "Profile loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData(profile);
    setErrors({});
    setSavedMessage("");
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData(profile);
    setErrors({});
    setEditing(false);
  };

  const handleSave = async () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName =
        "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName =
        "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^\S+@\S+\.\S+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    }

    if (!formData.city.trim()) {
      newErrors.city =
        "City is required";
    }

    if (!formData.country.trim()) {
      newErrors.country =
        "Country is required";
    }

    if (
      Object.keys(newErrors)
        .length > 0
    ) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSaving(true);
    setSavedMessage("");

    try {
      const response =
        await fetch(API_URL, {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            first_name:
              formData.firstName,

            last_name:
              formData.lastName,

            email:
              formData.email,

            phone:
              formData.phone,

            city:
              formData.city,

            country:
              formData.country,

            role:
              formData.role,

            department:
              formData.department,

            about:
              formData.about,
          }),
        });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to update profile."
        );
      }

      const updatedProfile = {
        firstName:
          data.first_name || "",

        lastName:
          data.last_name || "",

        email:
          data.email || "",

        phone:
          data.phone || "",

        city:
          data.city || "",

        country:
          data.country || "",

        role:
          data.role || "",

        department:
          data.department || "",

        about:
          data.about || "",

        status:
          data.status || "Active",

        memberSince:
          data.member_since || "",
      };

      setProfile(
        updatedProfile
      );

      setFormData(
        updatedProfile
      );

      setEditing(false);

      setSavedMessage(
        "Profile changes saved successfully."
      );

      const existingUser =
        localStorage.getItem(
          "fieldNationUser"
        );

      if (existingUser) {
        try {
          const parsedUser =
            JSON.parse(
              existingUser
            );

          localStorage.setItem(
            "fieldNationUser",
            JSON.stringify({
              ...parsedUser,
              ...data,
            })
          );
        } catch (error) {
          console.error(
            "Failed to update local user:",
            error
          );
        }
      }

      setTimeout(() => {
        setSavedMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      setSavedMessage(
        error.message ||
          "Failed to save profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const fullName =
    `${profile.firstName} ${profile.lastName}`.trim();

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "#f7f8fa",
          minHeight:
            "calc(100vh - 70px)",
          p: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          <Typography
            sx={{
              color: "#6b7280",
            }}
          >
            Loading profile...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f7f8fa",
        minHeight:
          "calc(100vh - 70px)",
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          mb: 3,

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: {
            xs: "flex-start",
            sm: "center",
          },

          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#172033",
            }}
          >
            Profile
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              color: "#6b7280",
            }}
          >
            Manage your account and
            personal information.
          </Typography>
        </Box>

        {!editing && (
          <Button
            variant="contained"
            startIcon={
              <EditOutlinedIcon />
            }
            onClick={handleEdit}
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
            Edit Profile
          </Button>
        )}
      </Box>

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2.5,
              md: 3,
            },

            border:
              "1px solid #e3e6eb",

            borderRadius: 3,

            mb: 3,

            backgroundColor:
              "#ffffff",
          }}
        >
          <Box
            sx={{
              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              gap: 3,

              flexWrap:
                "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems:
                  "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 76,
                  height: 76,

                  backgroundColor:
                    "#ff6a00",

                  fontSize: 28,

                  fontWeight: 600,
                }}
              >
                {profile.firstName
                  .charAt(0)}

                {profile.lastName
                  .charAt(0)}
              </Avatar>

              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color:
                      "#172033",
                  }}
                >
                  {fullName}
                </Typography>

                <Typography
                  sx={{
                    color:
                      "#6b7280",
                    mt: 0.4,
                  }}
                >
                  {profile.email}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 1.2,
                    flexWrap:
                      "wrap",
                  }}
                >
                  <Chip
                    label={
                      profile.status ||
                      "Active"
                    }
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                textAlign: {
                  xs: "left",
                  sm: "right",
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color:
                    "#9ca3af",
                }}
              >
                Member since
              </Typography>

              <Typography
                sx={{
                  fontWeight: 600,
                  color:
                    "#374151",
                  mt: 0.3,
                }}
              >
                {formatMemberSince(
                  profile.memberSince
                )}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "1.7fr 1fr",
            },

            gap: 3,

            mb: 3,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,

              border:
                "1px solid #e3e6eb",

              borderRadius: 3,

              backgroundColor:
                "#ffffff",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color:
                  "#172033",
              }}
            >
              About Me
            </Typography>

            <Divider
              sx={{
                my: 2,
              }}
            />

            {editing ? (
              <TextField
                fullWidth
                multiline
                rows={5}
                label="About"
                name="about"
                value={
                  formData.about
                }
                onChange={
                  handleChange
                }
              />
            ) : (
              <Typography
                sx={{
                  color:
                    "#5f6878",
                  lineHeight: 1.8,
                }}
              >
                {profile.about}
              </Typography>
            )}
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,

              border:
                "1px solid #e3e6eb",

              borderRadius: 3,

              backgroundColor:
                "#ffffff",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color:
                  "#172033",
              }}
            >
              Contact Information
            </Typography>

            <Divider
              sx={{
                my: 2,
              }}
            />

            {editing ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection:
                    "column",
                  gap: 2,
                }}
              >
                <TextField
                  label="Email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  fullWidth
                  error={Boolean(
                    errors.email
                  )}
                  helperText={
                    errors.email
                  }
                />

                <TextField
                  label="Phone"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  fullWidth
                  error={Boolean(
                    errors.phone
                  )}
                  helperText={
                    errors.phone
                  }
                />

                <TextField
                  label="City"
                  name="city"
                  value={
                    formData.city
                  }
                  onChange={
                    handleChange
                  }
                  fullWidth
                  error={Boolean(
                    errors.city
                  )}
                  helperText={
                    errors.city
                  }
                />

                <TextField
                  label="Country"
                  name="country"
                  value={
                    formData.country
                  }
                  onChange={
                    handleChange
                  }
                  fullWidth
                  error={Boolean(
                    errors.country
                  )}
                  helperText={
                    errors.country
                  }
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection:
                    "column",
                  gap: 2.3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                  }}
                >
                  <EmailOutlinedIcon
                    sx={{
                      color:
                        "#6b7280",
                    }}
                  />

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color:
                          "#9ca3af",
                      }}
                    >
                      EMAIL
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {profile.email}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                  }}
                >
                  <PhoneOutlinedIcon
                    sx={{
                      color:
                        "#6b7280",
                    }}
                  />

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color:
                          "#9ca3af",
                      }}
                    >
                      PHONE
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {profile.phone}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                  }}
                >
                  <LocationOnOutlinedIcon
                    sx={{
                      color:
                        "#6b7280",
                    }}
                  />

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color:
                          "#9ca3af",
                      }}
                    >
                      LOCATION
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {profile.city},{" "}
                      {profile.country}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 3,

            border:
              "1px solid #e3e6eb",

            borderRadius: 3,

            backgroundColor:
              "#ffffff",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color:
                "#172033",
            }}
          >
            Work Information
          </Typography>

          <Divider
            sx={{
              my: 2,
            }}
          />

          {editing ? (
            <Box
              sx={{
                display: "grid",

                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },

                gap: 2,
              }}
            >
              <TextField
                label="First Name"
                name="firstName"
                value={
                  formData.firstName
                }
                onChange={
                  handleChange
                }
                error={Boolean(
                  errors.firstName
                )}
                helperText={
                  errors.firstName
                }
              />

              <TextField
                label="Last Name"
                name="lastName"
                value={
                  formData.lastName
                }
                onChange={
                  handleChange
                }
                error={Boolean(
                  errors.lastName
                )}
                helperText={
                  errors.lastName
                }
              />

              <TextField
                label="Role"
                name="role"
                value={
                  formData.role
                }
                onChange={
                  handleChange
                }
              />

              <TextField
                label="Department"
                name="department"
                value={
                  formData.department
                }
                onChange={
                  handleChange
                }
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",

                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr 1fr",
                },

                gap: 3,
              }}
            >
              <Box>
                <BusinessCenterOutlinedIcon
                  sx={{
                    color:
                      "#ff6a00",
                    mb: 0.7,
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    display:
                      "block",
                    color:
                      "#9ca3af",
                  }}
                >
                  ROLE
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {profile.role}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    display:
                      "block",
                    color:
                      "#9ca3af",
                  }}
                >
                  DEPARTMENT
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {profile.department}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    display:
                      "block",
                    color:
                      "#9ca3af",
                  }}
                >
                  ACCOUNT STATUS
                </Typography>

                <Chip
                  label={
                    profile.status ||
                    "Active"
                  }
                  size="small"
                  color="success"
                  sx={{
                    mt: 0.5,
                  }}
                />
              </Box>
            </Box>
          )}

          {!editing && (
            <>
              <Divider
                sx={{
                  my: 3,
                }}
              />

              <Typography
                variant="caption"
                sx={{
                  color:
                    "#9ca3af",
                  fontWeight: 600,
                }}
              >
                AREAS OF WORK
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 1.2,
                  flexWrap:
                    "wrap",
                }}
              >
                <Chip
                  label="Locations"
                  size="small"
                />

                <Chip
                  label="Workforce"
                  size="small"
                />

                <Chip
                  label="Operations"
                  size="small"
                />

                <Chip
                  label="Management"
                  size="small"
                />
              </Box>
            </>
          )}

          {editing && (
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "flex-end",
                alignItems:
                  "center",
                gap: 1.5,
                mt: 3,
                pt: 3,
                borderTop:
                  "1px solid #e3e6eb",
              }}
            >
              {savedMessage && (
                <Typography
                  sx={{
                    color:
                      savedMessage.includes(
                        "successfully"
                      )
                        ? "success.main"
                        : "error.main",

                    mr: "auto",

                    fontWeight: 500,
                  }}
                >
                  {savedMessage}
                </Typography>
              )}

              <Button
                variant="outlined"
                onClick={
                  handleCancel
                }
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
                  handleSave
                }
                disabled={
                  saving
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
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default ProfilePage;