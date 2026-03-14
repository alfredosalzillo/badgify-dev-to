import { Box, Container, Link, Typography, Stack } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: "auto",
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="md">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Badgify Dev.to - Dynamic Profile Badges
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              href="https://github.com/alfredosalzillo/badgify-dev-to"
              target="_blank"
              rel="noopener noreferrer"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              GitHub
            </Link>
            <Link
              href="https://dev.to"
              target="_blank"
              rel="noopener noreferrer"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              Dev.to
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
