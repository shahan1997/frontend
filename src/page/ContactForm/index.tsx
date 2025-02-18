import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";

const ContactForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No submission logic—just UI
  };

  return (
    <Grid container spacing={4} sx={{ p: 4, maxWidth: "1200px", mx: "auto" }}>
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src="https://i.ibb.co/0yqYDXbw/doodle.jpg"
          alt="Contact Illustration"
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 2,
            objectFit: "cover",
          }}
        />
      </Grid>

      {/* Right Side: Form */}
      <Grid item xs={12} md={6}>
        <Box sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: 600,
              mb: 3,
            }}
          >
            Contact Us
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              name="name"
              label="Your Name"
              value={formValues.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Your Email"
              value={formValues.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="message"
              label="Your Message"
              multiline
              rows={4}
              value={formValues.message}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "black",
                mt: 2,
                py: 1.5,
                width: "100%",
                fontWeight: 600,
                borderRadius: 1,
                textTransform: "none",
              }}
            >
              Send Message
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
