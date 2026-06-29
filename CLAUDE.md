# CLAUDE.md — TaskFlow Pro AI 開發規範

> 本文件是 Claude Code 的行為準則。每次開始工作前必須讀取並遵守。

---

## 1. 專案簡介

**TaskFlow Pro** 是一套企業級任務管理系統，提供團隊任務分派、進度追蹤、優先序管理、成員協作等功能。

### 目標使用者
- 中小企業團隊（5～100 人）
- 專案經理、部門主管、一般成員

### 核心功能（分階段開發）
- 使用者帳號系統（登入、註冊、權限管理）
- 任務管理（建立、指派、狀態追蹤）
- 專案管理（多專案、里程碑）
- 儀表板（統計圖表、待辦清單）
- 通知系統（任務提醒、截止日期）
- 報表匯出（CSV、PDF）

---

## 2. 技術架構

### 前端
- **語言**：HTML5、CSS3、純 JavaScript（ES6+）
- **不使用框架**：不引入 React、Vue、Angular（除非課程明確要求）
- **CSS 方法論**：BEM 命名法（`.block__element--modifier`）
- **HTTP 請求**：使用原生 `fetch` API

### 後端
- **執行環境**：Node.js 20 LTS
- **框架**：Express.js
- **認證**：JWT（jsonwebtoken）+ bcryptjs 密碼雜湊
- **API 風格**：RESTful API
- **環境變數**：dotenv（`.env` 檔案）

### 資料庫
- **引擎**：SQLite（透過 `better-sqlite3` 套件）
- **遷移**：手動 SQL migration 檔案（`scripts/migrations/`）
- **不使用 ORM**（直接寫 SQL，方便學習）

### 開發工具
- **版本控制**：Git + GitHub
- **編輯器**：VS Code（WSL Remote）
- **AI 輔助**：Claude Code（Sonnet 4.6）
- **容器化**：Docker（Step 18 後啟用）

---

## 3. 資料夾結構

```
taskflow-pro/
├── frontend/                  # 前端靜態檔案
│   ├── index.html             # 首頁（登入後導向）
│   ├── login.html             # 登入頁
│   ├── register.html          # 註冊頁
│   ├── dashboard.html         # 儀表板
│   ├── tasks.html             # 任務列表
│   ├── task-detail.html       # 任務詳情
│   ├── projects.html          # 專案管理
│   ├── css/
│   │   ├── reset.css          # CSS reset
│   │   ├── variables.css      # CSS 自訂變數（顏色、字型）
│   │   ├── components.css     # 共用元件樣式
│   │   └── pages/             # 各頁面專屬樣式
│   │       ├── login.css
│   │       ├── dashboard.css
│   │       └── tasks.css
│   └── js/
│       ├── api.js             # API 請求封裝（統一的 fetch 函式）
│       ├── auth.js            # 認證工具（token 存取/驗證）
│       ├── utils.js           # 共用工具函式
│       └── pages/             # 各頁面邏輯
│           ├── login.js
│           ├── dashboard.js
│           └── tasks.js
│
├── backend/                   # 後端 Node.js/Express
│   ├── server.js              # 伺服器入口點
│   ├── app.js                 # Express 應用設定
│   ├── config/
│   │   └── database.js        # 資料庫連線設定
│   ├── routes/                # 路由定義
│   │   ├── auth.routes.js
│   │   ├── tasks.routes.js
│   │   ├── projects.routes.js
│   │   └── users.routes.js
│   ├── controllers/           # 業務邏輯
│   │   ├── auth.controller.js
│   │   ├── tasks.controller.js
│   │   ├── projects.controller.js
│   │   └── users.controller.js
│   ├── middleware/            # 中介層
│   │   ├── auth.middleware.js  # JWT 驗證
│   │   ├── validate.middleware.js  # 輸入驗證
│   │   └── error.middleware.js    # 統一錯誤處理
│   └── models/               # 資料存取層（SQL 查詢）
│       ├── user.model.js
│       ├── task.model.js
│       └── project.model.js
│
├── scripts/
│   ├── migrations/            # 資料庫 migration SQL 檔案
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_projects.sql
│   │   └── 003_create_tasks.sql
│   └── seed.js                # 測試資料種子
│
├── docs/                      # 文件
│   ├── environment-setup.md   # 環境安裝指南
│   ├── api-spec.md            # API 規格文件
│   └── database-schema.md     # 資料庫結構說明
│
├── .env                       # 環境變數（不進 git）
├── .env.example               # 環境變數範本（進 git）
├── .gitignore
├── package.json
├── CLAUDE.md                  # 本文件
└── README.md
```

---

## 4. 命名規範

### 4-1 檔案命名
| 類型 | 規則 | 範例 |
|------|------|------|
| HTML 頁面 | kebab-case | `task-detail.html` |
| CSS 檔案 | kebab-case | `task-detail.css` |
| JS 頁面邏輯 | kebab-case | `task-detail.js` |
| JS 模組（後端） | kebab-case + 類型後綴 | `task.controller.js` |
| SQL migration | 數字前綴 + kebab-case | `001_create_users.sql` |

### 4-2 JavaScript 變數與常數
```js
// 變數：camelCase
const taskTitle = '完成報告';
let currentUserId = 42;

// 常數（不變的設定值）：SCREAMING_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = '/api/v1';

// 布林值：以 is / has / can 開頭
const isLoggedIn = true;
const hasPermission = false;
const canEdit = true;
```

### 4-3 函式命名
```js
// 動詞開頭，camelCase，名稱要能說明行為
function getUserById(id) { ... }
function createTask(taskData) { ... }
function validateEmailFormat(email) { ... }
function renderTaskList(tasks) { ... }
function handleFormSubmit(event) { ... }

// 非同步函式加上 async，不需要 Async 後綴
async function fetchUserProfile(userId) { ... }
```

### 4-4 CSS 類別命名（BEM）
```css
/* Block（元件） */
.task-card { }

/* Element（子元素，雙底線） */
.task-card__title { }
.task-card__status { }
.task-card__footer { }

/* Modifier（狀態變化，雙連字號） */
.task-card--completed { }
.task-card--overdue { }
.task-card__status--in-progress { }
```

### 4-5 資料庫欄位
```sql
-- snake_case，複數表名，id 結尾的外鍵
CREATE TABLE users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    email       TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    display_name TEXT NOT NULL,
    role        TEXT NOT NULL DEFAULT 'member',  -- 'admin' | 'manager' | 'member'
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    description TEXT,
    status      TEXT NOT NULL DEFAULT 'todo',    -- 'todo' | 'in_progress' | 'done'
    priority    TEXT NOT NULL DEFAULT 'medium',  -- 'low' | 'medium' | 'high'
    due_date    DATE,
    project_id  INTEGER REFERENCES projects(id),
    assignee_id INTEGER REFERENCES users(id),
    creator_id  INTEGER NOT NULL REFERENCES users(id),
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 4-6 API 路由命名
```
GET    /api/v1/tasks          # 取得列表
GET    /api/v1/tasks/:id      # 取得單筆
POST   /api/v1/tasks          # 建立
PUT    /api/v1/tasks/:id      # 完整更新
PATCH  /api/v1/tasks/:id      # 部分更新
DELETE /api/v1/tasks/:id      # 刪除
```

---

## 5. 程式碼規範

### 5-1 縮排與格式
- 縮排：**2 個空格**（不用 Tab）
- 最大行寬：**100 字元**
- 字串：優先使用**單引號** `'`，模板字串用反引號 `` ` ``
- 分號：**必須加分號**
- 每個檔案結尾留一個空行

### 5-2 JavaScript 規範
```js
// 正確：使用 const / let，禁止 var
const db = require('../config/database');
let retryCount = 0;

// 正確：箭頭函式（回呼用）
const tasks = rawData.map((row) => ({
  id: row.id,
  title: row.title,
}));

// 正確：解構賦值
const { id, email, role } = req.user;
const { title, description, priority } = req.body;

// 正確：可選鏈與空值合併
const userName = user?.profile?.displayName ?? '未命名使用者';

// 正確：async/await（禁止巢狀 .then().then()）
async function getTaskWithAssignee(taskId) {
  const task = await taskModel.findById(taskId);
  const assignee = await userModel.findById(task.assignee_id);
  return { ...task, assignee };
}
```

### 5-3 錯誤處理規範
**後端 Controller 必須包在 try/catch：**
```js
async function createTask(req, res, next) {
  try {
    const { title, description, priority, due_date, project_id } = req.body;
    const task = await taskModel.create({
      title,
      description,
      priority,
      due_date,
      project_id,
      creator_id: req.user.id,
    });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);  // 傳給統一錯誤處理 middleware
  }
}
```

**統一錯誤回應格式：**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "標題不能為空",
    "details": []
  }
}
```

**前端 fetch 必須處理錯誤：**
```js
async function createTask(taskData) {
  try {
    const response = await fetch('/api/v1/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(taskData),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error?.message || '建立任務失敗');
    }
    return result.data;
  } catch (error) {
    showErrorMessage(error.message);
    throw error;
  }
}
```

### 5-4 輸入驗證規範
- 所有前端表單送出前必須在 JS 驗證
- 所有後端路由接收資料前必須再次驗證（不信任前端）
- 使用 `validate.middleware.js` 集中管理驗證邏輯

### 5-5 SQL 規範
```js
// 正確：使用參數化查詢（防 SQL Injection）
const task = db.prepare(`
  SELECT t.*, u.display_name as assignee_name
  FROM tasks t
  LEFT JOIN users u ON t.assignee_id = u.id
  WHERE t.id = ? AND t.creator_id = ?
`).get(taskId, userId);

// 錯誤（絕對禁止）：字串拼接 SQL
const task = db.exec(`SELECT * FROM tasks WHERE id = ${taskId}`);  // 危險！
```

### 5-6 註解規範
- 只在**非顯而易見的邏輯**加註解
- 不要解釋「做了什麼」，要解釋「為什麼這樣做」
- 函式加 JSDoc（後端 model 和 controller 必須）

```js
/**
 * 取得使用者的任務列表，依優先序和截止日期排序
 * @param {number} userId - 使用者 ID
 * @param {Object} filters - 篩選條件
 * @param {string} [filters.status] - 任務狀態篩選
 * @param {string} [filters.priority] - 優先序篩選
 * @returns {Array} 任務陣列
 */
function getTasksByUser(userId, filters = {}) { ... }
```

---

## 6. 每次完成功能後必須做的事

**每完成一個功能步驟（Step），立刻執行以下指令：**

```bash
# 1. 確認修改的檔案
git status

# 2. 加入所有變更（或指定檔案）
git add .

# 3. 提交，訊息格式見第 8 節
git commit -m "[Step N] 動詞 + 說明"

# 4. 推上 GitHub
git push
```

### 何時該 commit？
- 完成一個完整功能（例：登入 API 建立完成）
- 完成一個頁面（例：登入頁 HTML + CSS + JS 完成）
- 修復一個 bug
- 新增一個 migration 檔案

### 不要在以下情況 commit
- 程式碼有語法錯誤（SyntaxError）
- 伺服器無法啟動
- 未完成的半成品功能（加 `WIP:` 前綴除外）

---

## 7. 禁止事項

### 7-1 安全性禁止
```js
// 禁止：硬寫密碼、密鑰、Token 在程式碼中
const JWT_SECRET = 'my-secret-key-123';  // 絕對禁止！

// 正確：從環境變數讀取
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET 環境變數未設定');
```

```js
// 禁止：將密碼明文存入資料庫
db.prepare('INSERT INTO users (password) VALUES (?)').run(password);  // 禁止！

// 正確：使用 bcryptjs 雜湊
const passwordHash = await bcrypt.hash(password, 12);
db.prepare('INSERT INTO users (password_hash) VALUES (?)').run(passwordHash);
```

### 7-2 JavaScript 禁止
```js
// 禁止：使用 var
var userName = 'test';  // 禁止！改用 const 或 let

// 禁止：== 比較（使用 ===）
if (userId == '42') { }  // 禁止！改用 ===

// 禁止：console.log 留在正式功能程式碼（除錯期間可用，完成後清除）
console.log('debug:', data);  // 完成功能前必須移除

// 禁止：巢狀回呼（Callback Hell）
getUserById(id, function(user) {
  getTasksByUser(user.id, function(tasks) { ... });  // 禁止！改用 async/await
});
```

### 7-3 錯誤處理禁止
```js
// 禁止：空的 catch（吞掉錯誤）
try {
  await createTask(data);
} catch (e) { }  // 禁止！至少要 next(e) 或 console.error(e)

// 禁止：不處理 Promise rejection
fetchData();  // 禁止！必須 await 或 .catch()
```

### 7-4 資料庫禁止
```js
// 禁止：SQL 字串拼接（SQL Injection 風險）
db.exec(`SELECT * FROM users WHERE email = '${email}'`);  // 禁止！

// 禁止：在 route 直接寫 SQL（應放在 model 層）
router.get('/tasks', (req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks').all();  // 禁止！
});
```

### 7-5 Git 禁止
- 禁止將 `.env` 推上 GitHub（確認 `.gitignore` 已包含）
- 禁止 `git push --force`（會覆蓋歷史）
- 禁止 commit 訊息只寫 `fix`、`update`、`change`（必須說明內容）
- 禁止將 `node_modules/` 推上 GitHub

---

## 8. Git Commit 訊息格式

### 格式
```
[Step N] 動詞 + 說明（繁體中文或英文皆可）
```

### 動詞選擇
| 動詞 | 使用時機 |
|------|---------|
| `新增` / `Add` | 加入全新的檔案、功能、路由 |
| `建立` / `Create` | 建立新的模組、頁面、資料表 |
| `實作` / `Implement` | 完成一段業務邏輯 |
| `修復` / `Fix` | 修 bug |
| `更新` / `Update` | 修改現有功能 |
| `重構` / `Refactor` | 不改功能，只改結構 |
| `移除` / `Remove` | 刪除檔案或功能 |
| `設定` / `Setup` | 初始化設定、環境配置 |

### 範例
```bash
git commit -m "[Step 0] 初始化專案 + 環境設定指南"
git commit -m "[Step 1] 建立 CLAUDE.md 開發規範"
git commit -m "[Step 2] 新增需求分析與使用者故事"
git commit -m "[Step 3] 建立資料庫 Schema（users、projects、tasks）"
git commit -m "[Step 4] 實作 Express 伺服器基礎架構"
git commit -m "[Step 5] 實作使用者註冊與登入 API"
git commit -m "[Step 6] 建立登入頁面 HTML + CSS"
git commit -m "[Step 7] 實作登入頁面 JS 表單驗證與 API 串接"
git commit -m "[Step 8] 修復登入後 Token 未存入 localStorage 的問題"
```

### 多步驟合併 commit（不建議，除非步驟太細碎）
```bash
git commit -m "[Step 5-6] 實作完整認證系統（API + 登入頁面）"
```

---

## 9. 環境變數規範

`.env.example`（必須進 git，不含真實值）：
```env
# 伺服器設定
PORT=3000
NODE_ENV=development

# JWT 設定
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# 資料庫
DATABASE_PATH=./data/taskflow.db

# CORS（前端來源）
FRONTEND_ORIGIN=http://localhost:5500
```

`.env`（不進 git，含真實值）：
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=實際的亂數密鑰請用openssl_rand_-base64_32產生
JWT_EXPIRES_IN=7d
DATABASE_PATH=./data/taskflow.db
FRONTEND_ORIGIN=http://localhost:5500
```

---

## 10. API 回應格式規範

**成功回應：**
```json
{
  "success": true,
  "data": { },
  "message": "任務建立成功"
}
```

**列表回應：**
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

**錯誤回應：**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "找不到指定的任務"
  }
}
```

**HTTP 狀態碼對應：**
| 狀態碼 | 使用情境 |
|--------|---------|
| 200 | 成功（GET、PUT、PATCH、DELETE） |
| 201 | 建立成功（POST） |
| 400 | 請求格式錯誤、驗證失敗 |
| 401 | 未登入或 Token 無效 |
| 403 | 已登入但無權限 |
| 404 | 資源不存在 |
| 500 | 伺服器內部錯誤 |

---

> 文件版本：v1.0 | 建立日期：2026-06-29 | 課程：TaskFlow Pro 企業任務管理系統
