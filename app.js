const express = require("express");
require('dotenv').config({ path: './sendgrid.env' });

const path = require("path");
const http = require("http");
// מודול שיודע לפתור את בעיית האבטחת של הקורס
// שלא ניתן בברירת מחדל לשלוח מדומיין א' בקשה לדומיין ב
const cors = require("cors");
const {routesInit} = require("./routes/configRoutes");
require("./db/mongoConnect");


const app = express();

// נותן אפשרות לכל דומיין לעשות בקשות לשרת שלנו
app.use(cors());

// מגדיר לשרת שהוא יכול לקבל מידע מסוג ג'ייסון בבאדי בבקשות שהם לא גט
app.use(express.json());

// דואג שתקיית פאבליק כל הקבצים בה יהיו חשופים לצד לקוח
app.use(express.static(path.join(__dirname,"public")));

// פונקציה שמגדירה את כל הראוטים הזמנים באפליקציית
// צד שרת שלנו
routesInit(app);

// הגדרת שרת עם יכולות אפ שמייצג את האקספרס
const server = http.createServer(app);
// משתנה שיגדיר על איזה פורט אנחנו נעבוד
// אנסה לבדוק אם אנחנו על שרת אמיתי ויאסוף את הפורט משם אם לא ואנחנו לוקאלי יעבוד על 3002
let port = process.env.PORT || 3005;
// הפעלת השרת והאזנה לפורט המבוקש
server.listen(port);
