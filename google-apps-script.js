// Google Apps Script for Satit Udomseuksa School RSVP Form
// Version 2.0 - Wide Format Storage
// This script handles storing each piece of parent and student data in its own column
// for easier data management and readability in the Google Sheet.

const SHEET_NAME = "Submissions";

// This function runs when a GET request is made to the script's URL.
// It fetches all data from the sheet and returns it as JSON, reconstructing
// the nested object structure that the frontend expects.
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ "error": `Sheet "${SHEET_NAME}" not found.` }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const dataRange = sheet.getDataRange();
    // If sheet is empty or has only headers, return empty array
    if (dataRange.getNumRows() <= 1) {
        return ContentService
            .createTextOutput(JSON.stringify([]))
            .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = dataRange.getValues();
    const headers = data.shift(); // Remove header row

    // Create a map of header names to their column index for easy lookup
    const headerMap = {};
    headers.forEach((header, index) => {
        headerMap[header.trim()] = index;
    });

    const result = data.map(row => {
      const submission = {
        id: row[headerMap['id']],
        parents: [],
        students: [],
        attendance: row[headerMap['attendance']],
        submissionDate: row[headerMap['submissionDate']]
      };

      // Reconstruct Parents array
      for (let i = 1; i <= 3; i++) {
        const fullName = row[headerMap[`parent${i}_fullName`]];
        if (fullName && String(fullName).trim() !== '') {
          submission.parents.push({
            id: `parent-${i}-${submission.id}`, // Generate a temporary ID for client-side keys
            title: row[headerMap[`parent${i}_title`]],
            fullName: fullName,
            phone: row[headerMap[`parent${i}_phone`]]
          });
        }
      }

      // Reconstruct Students array
      for (let i = 1; i <= 3; i++) {
        const fullName = row[headerMap[`student${i}_fullName`]];
        if (fullName && String(fullName).trim() !== '') {
          submission.students.push({
            id: `student-${i}-${submission.id}`, // Generate a temporary ID
            title: row[headerMap[`student${i}_title`]],
            fullName: fullName,
            program: row[headerMap[`student${i}_program`]],
            className: row[headerMap[`student${i}_className`]]
          });
        }
      }
      return submission;
    });

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error for debugging
    Logger.log(error);
    return ContentService
      .createTextOutput(JSON.stringify({ "error": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// This function runs when a POST request is made to the script's URL.
// It handles adding, updating, or deleting records in the sheet.
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ "result": "error", "message": `Sheet "${SHEET_NAME}" not found.` }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action;

    switch (action) {
      case 'add':
        const submission = requestData.submission;

        // **ADDED VALIDATION**: Ensure the submitted data has the correct structure.
        if (!submission || !Array.isArray(submission.parents) || !Array.isArray(submission.students)) {
            return ContentService
                .createTextOutput(JSON.stringify({ "result": "error", "message": "Invalid submission data structure. 'parents' and 'students' must be arrays." }))
                .setMimeType(ContentService.MimeType.JSON);
        }
        
        const newRow = [];
        
        // Flatten the nested submission object into a single array for the "wide" format.
        newRow.push(submission.id);

        // Add Parents (up to 3)
        for (let i = 0; i < 3; i++) {
            const parent = submission.parents[i];
            if (parent) {
                newRow.push(parent.title || '', parent.fullName || '', parent.phone || '');
            } else {
                newRow.push('', '', ''); // Pad with empty strings for missing parents
            }
        }

        // Add Students (up to 3)
        for (let i = 0; i < 3; i++) {
            const student = submission.students[i];
            if (student) {
                newRow.push(student.title || '', student.fullName || '', student.program || '', student.className || '');
            } else {
                newRow.push('', '', '', ''); // Pad with empty strings for missing students
            }
        }

        newRow.push(submission.attendance);
        newRow.push(submission.submissionDate);

        sheet.appendRow(newRow);
        return ContentService
          .createTextOutput(JSON.stringify({ "result": "success", "data": submission }))
          .setMimeType(ContentService.MimeType.JSON);

      case 'delete':
        const idToDelete = requestData.id;
        const data = sheet.getDataRange().getValues();
        // Find the row index for the given ID (ID is in the first column)
        const rowIndex = data.findIndex(row => row[0] === idToDelete);

        if (rowIndex > -1) {
          // +1 because findIndex is 0-based, but sheet rows are 1-based.
          // The header row is not included in this calculation if it's already stripped,
          // but since we read the whole range, we must account for it.
          // The header is row 1, so data starts at row 2. A findIndex of 0 means the 2nd row of the sheet.
          sheet.deleteRow(rowIndex + 2); 
          return ContentService
            .createTextOutput(JSON.stringify({ "result": "success", "id": idToDelete }))
            .setMimeType(ContentService.MimeType.JSON);
        } else {
          return ContentService
            .createTextOutput(JSON.stringify({ "result": "error", "message": "ID not found" }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      
      default:
        return ContentService
          .createTextOutput(JSON.stringify({ "result": "error", "message": "Invalid action" }))
          .setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
     // Log the error for debugging
    Logger.log(error);
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
