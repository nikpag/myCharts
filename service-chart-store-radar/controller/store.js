const Chart = require("../model/chart_schema");
const mongoose = require('mongoose');
const mime = require('mime-types');


exports.uploadFile = async(req, res) => {
    //if (!req.body || !req.body.file) {
    if (!req.file) {    
      res.status(400).json({ error: 'No file was uploaded' });
      return;
    }

    let username = req.body.username;
    let filename = req.body.filename;
    let filetype = req.body.filetype;
    let file = req.file;
    let date = req.body.creation_timestamp;
    let creation_timestamp = new Date(date);

    //var type = mime.lookup(file);

    if (file['mimetype'] != filetype) {
        console.log('File type parameter is ' + filetype + ' while file type is ' + file['mimetype'] )
        res.status(400).json({ error: 'File type parameter given does not match the provided file type' });
        return;
    }

    try {
        const newChart = new Chart({ 
            username : username,
            filename : filename,
            filetype : filetype,
            file : file.buffer,
            creation_timestamp : creation_timestamp,  
        });
        await newChart.save();
        console.log('File saved in MongoDB with ID:', newChart._id);
        res.status(200).json({message: 'File uploaded and saved successfully.'});
    } 
    catch (error) {
        console.error('Failed to save file:', error);
        res.status(500).send('Failed to save file.');
    }
    


    // Create a new document and save it to the database
/*     const chart = new Chart({
        username : username,
        filename : filename,
        filetype : filetype,
        file : req.file,
        creation_timestamp : creation_timestamp, 
    });

    chart.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save file to database' });
      } else {
        res.json({ message: 'File uploaded and saved successfully' });
      }
    }); */
};
