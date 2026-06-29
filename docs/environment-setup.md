# 開發環境安裝指南

TaskFlow Pro 專案的完整開發環境設定步驟。
適用系統：Windows 10/11

---

## 安裝總覽

```
Windows 11
  └── WSL2（Windows Subsystem for Linux）
        └── Ubuntu 24.04
              ├── Node.js 20 (via nvm)
              ├── Git
              └── Claude Code
  └── VS Code（Windows 安裝，透過 Remote-WSL 連接 Ubuntu）
  └── Docker Desktop（連接 WSL2）
```

---

## 第一步：安裝 WSL2 + Ubuntu

### 1-1 開啟 PowerShell（系統管理員）

按 `Windows 鍵`，搜尋 **PowerShell**，右鍵選「以系統管理員身份執行」

### 1-2 安裝 WSL2

```powershell
wsl --install
```

等待下載安裝完成，**必須重新開機**。

### 1-3 重開機後設定 Ubuntu 使用者

重開機後 Ubuntu 視窗自動跳出，設定帳號密碼：

```
Enter new UNIX username: weishow        # 你的帳號名
New password:                           # 輸入密碼（不會顯示）
Retype new password:                    # 再輸入一次
```

看到 `passwd: password updated successfully` 表示成功。

### 1-4 確認 WSL2 版本

在 PowerShell 執行：

```powershell
wsl --list --verbose
```

確認 VERSION 欄位顯示 `2`：

```
  NAME      STATE    VERSION
* Ubuntu    Running  2
```

> 如果顯示 1，執行：`wsl --set-version Ubuntu 2`

---

## 第二步：在 Ubuntu 安裝開發工具

開啟 Ubuntu 終端機（開始選單搜尋「Ubuntu」），執行以下指令。

### 2-1 更新系統

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential
```

### 2-2 安裝 Node.js（透過 nvm）

```bash
# 安裝 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新載入設定
source ~/.bashrc

# 安裝 Node.js 20 LTS
nvm install 20
nvm use 20

# 確認安裝
node --version   # 應顯示 v20.x.x
npm --version    # 應顯示 10.x.x
```

### 2-3 設定 Git

```bash
git config --global user.name "你的名字"
git config --global user.email "你的email@gmail.com"
git config --global init.defaultBranch main

# 確認設定
git config --list
```

### 2-4 安裝 Claude Code

```bash
npm install -g @anthropic-ai/claude-code

# 確認安裝
claude --version
```

### 2-5 登入 Claude Code

```bash
claude
```

選擇登入方式：
- 按 `1` 選「Claude account with subscription」
- 若瀏覽器未自動開啟，按 `c` 複製網址，貼到瀏覽器
- 在瀏覽器點「Allow」授權
- 回到終端機，選「Yes, I trust this folder」確認

### 2-6 設定預設模型（選 Sonnet，速度快且省用量）

在 Claude Code 介面輸入：

```
/model
```

選 `3. Sonnet`（Sonnet 4.6，日常開發最佳選擇）

---

## 第三步：安裝 VS Code + WSL 整合

### 3-1 安裝 VS Code

前往 [code.visualstudio.com](https://code.visualstudio.com) 下載安裝。

### 3-2 用 WSL 模式開啟專案

在 Ubuntu 終端機輸入：

```bash
cd ~/taskflow-pro
code .
```

VS Code 會自動安裝 WSL 擴充套件。
左下角出現綠色 `WSL: Ubuntu` 標誌 = 設定完成。

---

## 第四步：安裝 Docker Desktop（Step 18 會用到）

1. 前往 [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. 下載 Windows 版，安裝時勾選「Use WSL 2 instead of Hyper-V」
3. 在 Ubuntu 終端機確認：

```bash
docker --version
docker compose version
```

---

## 第五步：建立專案並推上 GitHub

### 5-1 在 GitHub 建立新 Repo

1. 前往 [github.com](https://github.com) 登入
2. 點右上角 `+` → `New repository`
3. Repository name：`taskflow-pro`
4. 選 `Public` 或 `Private`
5. **不要**勾選 Initialize with README（我們自己有）
6. 點 `Create repository`

### 5-2 連結本地專案到 GitHub

```bash
cd ~/taskflow-pro
git remote add origin https://github.com/你的帳號/taskflow-pro.git
git branch -M main
```

### 5-3 第一次推上去

```bash
git add .
git commit -m "[Step 1] Project scaffold + environment setup guide"
git push -u origin main
```

---

## 每次開發的工作流程

```bash
# 1. 開啟 Ubuntu 終端機
# 2. 進入專案
cd ~/taskflow-pro

# 3. 啟動 Claude Code
claude

# 4. 開啟 VS Code（另一個終端機分頁）
code .
```

---

## 常用指令速查

| 指令 | 說明 |
|------|------|
| `claude` | 啟動 Claude Code |
| `/model` | 切換 AI 模型 |
| `/exit` | 離開 Claude Code |
| `code .` | 用 VS Code 開啟當前資料夾 |
| `cd ~` | 回到家目錄 |
| `cd ~/taskflow-pro` | 進入專案資料夾 |

---

## 每步完成後的 Git 推送格式

```bash
git add .
git commit -m "[Step N] 做了什麼"
git push
```

Commit 命名範例：
```
[Step 1] Project scaffold + environment setup guide
[Step 2] Add CLAUDE.md development spec
[Step 3] Add requirements analysis and user stories
[Step 5] Build login page with form validation
```

---

## 安裝完成確認清單

在 Ubuntu 終端機執行：

```bash
echo "=== 環境確認 ===" && \
node --version && \
npm --version && \
git --version && \
claude --version && \
echo "✅ 全部就緒！"
```

全部顯示版本號 = 環境設定 100% 完成。

---

> 文件版本：v1.0 | 對應課程步驟：環境設定（Step 0）
