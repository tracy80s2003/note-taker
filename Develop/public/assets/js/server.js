const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');

let notesInfo = [];

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
