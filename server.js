const express = require('express');
const multiparty = require('multiparty');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to handle CSV file upload
app.post('/upload-csv', (req, res) => {
  // Create a new multiparty form
  const form = new multiparty.Form();

  // Parse the incoming form data
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error processing file upload' });
    }

    // Check if files were uploaded
    if (!files.csvFile || files.csvFile.length === 0) {
      return res.status(400).json({ error: 'No CSV file uploaded' });
    }

    // Get the path of the uploaded file
    const csvFilePath = files.csvFile[0].path;

    // Array to store parsed CSV data
    const results = [];

    // Create a readable stream and pipe it through csv-parser
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        // Log each row to the console
        console.log('Row data:', data);
        
        // Store the row in results array
        results.push(data);
      })
      .on('end', () => {
        // Remove the temporary file
        fs.unlinkSync(csvFilePath);

        // Respond with the parsed data
        res.json({
          message: 'CSV file processed successfully',
          totalRows: results.length,
          data: results
        });

        // Log total rows processed
        // console.log(Total rows processed: ${results.length});
      })
      .on('error', (error) => {
        console.error('Error parsing CSV:', error);
        res.status(500).json({ error: 'Error parsing CSV file' });
      });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});