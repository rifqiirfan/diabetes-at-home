# diabetes-at-home

INFO30005 Project - Building a web application for Diabetes@Home

## Timeline

23 March 2022: First commit

8 April 2022: Add instructions

20 April 2022: Merge patient branch to main branch

29 April 2022: Latest commit for Deliverable 2

20 May 2022: Finalized version for Deliverable 3

## Team

| Name                  | Student Number |
| --------------------- | :------------: |
| Rifqi Imaduddin Irfan |    1194580     |
| Haoyu Gu              |    1288074     |
| Ruifeng Zhan          |    1067919     |
| Bowen Xu              |    1183928     |
| Jiayi Zhang           |    1073959     |

## Dependencies

        "alert": "^5.0.10",
        "bcrypt": "^5.0.1",
        "dotenv": "^16.0.0",
        "express": "^4.17.3",
        "express-flash": "^0.0.2",
        "express-handlebars": "^6.0.6",
        "express-session": "^1.17.3",
        "handlebars": "^4.7.7",
        "mongoose": "^6.3.1",
        "nodemon": "^2.0.16",
        "passport": "^0.5.3",
        "passport-local": "^1.0.0"

## General functions

Two informatic pages ("what is diabetes" and "About us") introduce diabetes and the development team.

## Core Functions as the patient

Login to the system as a patient.
Change password.
Entering personal health-information attributes(up to 4) with comments based on the clinician's instruction.
Viewing the previous records from the last 15 days in chart view.
View the leaderboard to see the patients with high engagement levels.

## Core Functions as the clinician

Login to the system as a clinician.
Change password.
Create accounts for patient.
View all records from patient under the own adminstration.
Assign availbility and safety ranges of four health-related attributes for all patients.
View detailed records(values and comments) from patients.
Create and view clinicalNotes for patients.
