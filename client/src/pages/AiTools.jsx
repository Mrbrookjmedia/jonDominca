import React, { useState } from "react";
import { 
  Tabs, Tab, Box, TextField,Grid  ,
  MenuItem, Button, Dialog, DialogTitle, 
  DialogContent, Typography, CircularProgress,
  Card, CardContent, CardMedia, Chip
} from "@mui/material";
// import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

const StyledTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1976d2',
  },
});

const StyledTab = styled(Tab)({
  textTransform: 'none',
  fontSize: '1rem',
  '&.Mui-selected': {
    color: '#1976d2',
  },
});

const FormPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [vogueInputs, setVogueInputs] = useState({});
  const [hauteInputs, setHauteInputs] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const vogueFields = [
    { name: "gender", label: "Gender", options: ["Female", "Male", "Non-binary"] },
    { name: "season", label: "Season", options: ["Spring", "Summer", "Autumn", "Winter"] },
    { name: "celebrity", label: "Style Inspiration", type: "text" },
    { name: "country", label: "Location", type: "text" },
    { name: "faceType", label: "Face Shape", options: ["Oval", "Round", "Square", "Heart"] },
    { name: "faceColor", label: "Skin Tone", options: ["Fair", "Medium", "Olive", "Deep"] },
  ];

  const hauteFields = [
    { name: "gender", label: "Gender", options: ["men", "women", "unisex"] },
    { name: "masterCategory", label: "Category", options: ["apparel", "accessories", "footwear"] },
    { name: "subCategory", label: "Sub Category", type: "text" },
    { name: "articleType", label: "Item Type", type: "text" },
    { name: "baseColour", label: "Preferred Color", type: "text" },
    { name: "season", label: "Season", options: ["summer", "winter", "autumn", "spring"] },
    { name: "usage", label: "Occasion", options: ["casual", "formal", "sports", "party"] },
  ];

  const handleInputChange = (setter) => (e) => {
    setter(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (apiUrl, data) => {
    setLoading(true);


     // Add null check for data.user_features
  if (!data?.user_features) {
    setResults({ error: "Missing user features" });
    setOpen(true);
    setLoading(false);
    return;
  }

// Normalize input values
const normalizedData = {
  user_features: Object.fromEntries(
    Object.entries(data.user_features).map(([key, value]) => [key, typeof value === 'string' ? value.toLowerCase() : value])
  )
};


    try {
      console.log('Request Payload:', data); // Debugging payload
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`HTTP error! status ${response.status}`);
      const result = await response.json();
      console.log('API Response:', result); // Debugging response
      setResults(result);
      setOpen(true);
    } catch (error) {
      console.error("API Error:", error);
      setResults({ error: "Failed to get recommendations. Please try again." });
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <StyledTabs value={activeTab} onChange={(e, newVal) => setActiveTab(newVal)}>
        <StyledTab label="VogueRadar™ Trend Analysis" />
        <StyledTab label="HauteMatch™ Personal Stylist" />
      </StyledTabs>

      <Box sx={{ mt: 4 }}>
        {activeTab === 0 ? (
          <Grid container spacing={3}>
            {vogueFields.map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                {field.options ? (
                  <TextField
                    select
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={vogueInputs[field.name] || ''}
                    onChange={handleInputChange(setVogueInputs)}
                    variant="outlined"
                  >
                    {field.options.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={vogueInputs[field.name] || ''}
                    onChange={handleInputChange(setVogueInputs)}
                    variant="outlined"
                  />
                )}
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {hauteFields.map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                {field.options ? (
                  <TextField
                    select
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={hauteInputs[field.name] || ''}
                    onChange={handleInputChange(setHauteInputs)}
                    variant="outlined"
                  >
                    {field.options.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={hauteInputs[field.name] || ''}
                    onChange={handleInputChange(setHauteInputs)}
                    variant="outlined"
                  />
                )}
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            disabled={loading}
            onClick={() => activeTab === 0 
              ? handleSubmit(import.meta.env.VITE_TRENDFORECASTER_API, { user_features: vogueInputs })
              : handleSubmit(import.meta.env.VITE_VIRTUAL_STYLIST_API, { user_features: hauteInputs })
            }
            sx={{ px: 6, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Get Recommendations'}
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid #eee' }}>
          AI Fashion Recommendations
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {results?.error ? (
            <Typography color="error">{results.error}</Typography>
          ) : activeTab === 0 ? (
            <Box sx={{ whiteSpace: 'pre-wrap' }}>
              <Typography variant="h6" gutterBottom>
                {results?.data?.metadata?.analyzed_for?.gender} • {results?.data?.metadata?.analyzed_for?.season}
              </Typography>
              <Typography variant="body1">
                {results?.data?.recommendations}
              </Typography>
            </Box>
          ) : (

        <Grid container spacing={3}>
        {results?.recommendations?.length > 0 ? (
          results.recommendations.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image || `https://source.unsplash.com/random?fashion=${index}`}
                  alt={item.productDisplayName}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.productDisplayName || "Fashion Item"}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <Chip label={item.articleType} size="small" sx={{ mr: 1 }} />
                    <Chip label={item.baseColour} size="small" color="primary" />
                    {item.season && <Chip label={item.season} size="small" sx={{ ml: 1 }} />}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {[item.masterCategory, item.subCategory].filter(Boolean).join(' • ')}
                  </Typography>
                  {item.usage && (
                    <Typography variant="body2" mt={1}>
                      Perfect for: {item.usage}
                    </Typography>
                  )}
                  {item.price && (
                    <Typography variant="body1" mt={2} fontWeight="bold">
                      ${Number(item.price).toFixed(2)}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ width: '100%', textAlign: 'center' }}>
            No recommendations found matching your criteria
          </Typography>
        )}
      </Grid>
    )}
  </DialogContent>

      </Dialog>
    </Box>
  );
};

export default FormPage;