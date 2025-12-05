# Quiz Management System

### Last Updated - 05/12/2025
### Goal - Enable admin to create quizzes  and allow public users to attempt them and view the final score instanly

### 1. Assumptions
|Area                 | Assumption           |
|---------------------|----------------------|
|Users                |Admin - Internal users , Public Users - Anonymous |
|Quiz                 |MCQ - with one or more than one answers correct |
|Score                |Total Score - total of the all calculated quetions |
|AI                   |Local deployed Ollama model |


### 2. Scope
|Feature | Details|
|--------|---------|
|Admin Panel| -Create quiz , -Quetion Type - MCQ|
|Public Page | View active quizes , Take Quiz, Get final score |
|Data Model | Mongo DB , Store Quiz attempts|
|Backend Api | REST ful endpoints |
|Frontend | Minimal UI|


### 3. Architecture

Frontend -----> Backend -----> Mongo Db