"use client";

import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState("ben");
  const [theme, setTheme] = useState("light");
  const [baseUrl, setBaseUrl] = useState("");
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const badgeUrl = `${baseUrl}/badges/user?username=${username}&theme=${theme}`;
  const markdownCode = `[![Dev.to Profile](${badgeUrl})](https://dev.to/${username})`;
  const htmlCode = `<a href="https://dev.to/${username}"><img src="${badgeUrl}" alt="Dev.to Profile" /></a>`;

  const copyToClipboard = async (
    text: string,
    setter: (val: boolean) => void,
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Badgify Dev.to
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Create dynamic profile badges for your Dev.to account
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h6" gutterBottom>
              1. Customize Your Badge
            </Typography>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Dev.to Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. ben"
              />

              <FormControl component="fieldset">
                <FormLabel component="legend">Badge Theme</FormLabel>
                <RadioGroup
                  row
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <FormControlLabel
                    value="light"
                    control={<Radio />}
                    label="Light"
                  />
                  <FormControlLabel
                    value="dark"
                    control={<Radio />}
                    label="Dark"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" gutterBottom>
              2. Preview
            </Typography>
            <Box
              sx={{
                p: 4,
                display: "flex",
                justifyContent: "center",
                bgcolor: "background.default",
                borderRadius: 2,
                mt: 2,
                minHeight: "100px",
                alignItems: "center",
              }}
            >
              {baseUrl && (
                <Image
                  src={badgeUrl}
                  alt="Dev.to Profile Badge Preview"
                  width={700}
                  height={170}
                  style={{ maxWidth: "100%", height: "auto" }}
                  unoptimized
                />
              )}
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" gutterBottom>
              3. Get the Code
            </Typography>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle2">Markdown</Typography>
                  <Tooltip title={copiedMarkdown ? "Copied!" : "Copy Markdown"}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        copyToClipboard(markdownCode, setCopiedMarkdown)
                      }
                    >
                      {copiedMarkdown ? (
                        <CheckIcon fontSize="small" color="success" />
                      ) : (
                        <ContentCopyIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box
                  component="pre"
                  sx={{
                    p: 2,
                    bgcolor: "background.default",
                    borderRadius: 1,
                    overflowX: "auto",
                    fontSize: "0.875rem",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {markdownCode}
                </Box>
              </Box>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle2">HTML</Typography>
                  <Tooltip title={copiedHtml ? "Copied!" : "Copy HTML"}>
                    <IconButton
                      size="small"
                      onClick={() => copyToClipboard(htmlCode, setCopiedHtml)}
                    >
                      {copiedHtml ? (
                        <CheckIcon fontSize="small" color="success" />
                      ) : (
                        <ContentCopyIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box
                  component="pre"
                  sx={{
                    p: 2,
                    bgcolor: "background.default",
                    borderRadius: 1,
                    overflowX: "auto",
                    fontSize: "0.875rem",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {htmlCode}
                </Box>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
