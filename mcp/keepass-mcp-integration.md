# KeePass Integration with MCPs - No Local Credential Storage

## Overview
This guide explains how to use credentials stored in KeePass with Model Context Protocol (MCP) servers without storing credentials locally in configuration files.

## Why This Approach?
- **Security**: Credentials remain encrypted in KeePass
- **No Secrets in Config**: `.vscode/mcp.json` doesn't contain sensitive data
- **Dynamic Loading**: Environment variables are populated at runtime
- **Centralized Management**: All credentials in one secure location

## Prerequisites
1. KeePass installed with a master database
2. KeePass credentials organized in a structure (e.g., `Silkycoders/Database`)
3. A way to access KeePass from command line

## Option 1: KeePass CLI (Cross-Platform)

### Setup
```bash
# Install keepass-cli (requires .NET)
npm install -g keepass-cli
# or
dotnet tool install -g KeePass.CLI
```

### Create Credential Helper Script
**File**: `scripts/load-keepass-env.sh`

```bash
#!/bin/bash
# Load credentials from KeePass into environment variables
# Usage: source ./scripts/load-keepass-env.sh

KEEPASS_DB_PATH="${KEEPASS_DB_PATH:-$HOME/.keepass/mydb.kdbx}"
KEEPASS_ENTRY_PATH="${KEEPASS_ENTRY_PATH:-Silkycoders/Database}"

# Load from KeePass CLI
export DB_USER=$(keepass get "$KEEPASS_ENTRY_PATH" UserName 2>/dev/null)
export DB_PASSWORD=$(keepass get "$KEEPASS_ENTRY_PATH" Password 2>/dev/null)
export DB_HOST=$(keepass get "$KEEPASS_ENTRY_PATH" custom:host 2>/dev/null)
export DB_PORT=$(keepass get "$KEEPASS_ENTRY_PATH" custom:port 2>/dev/null)

# Validate
if [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ]; then
    echo "Error: Failed to load KeePass credentials"
    return 1
fi

echo "✓ Credentials loaded from KeePass"
```

### Update MCP Configuration
**File**: `.vscode/mcp.json`

```jsonc
{
  "servers": {
    "io.github.bytebase/dbhub": {
      "type": "stdio",
      "command": "bash",
      "args": [
        "-c",
        "source ./scripts/load-keepass-env.sh && npx @bytebase/dbhub@latest --transport stdio --dsn 'postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/postgres?sslmode=disable'"
      ]
    }
  }
}
```

## Option 2: PowerShell with KeePass.ps1 Module (Windows)

### Setup
```powershell
# Install KeePass PowerShell module
Install-Module -Name KeePass -Repository PSGallery -Force

# Install keepass-cli
dotnet tool install -g KeePass.CLI
```

### Create Credential Helper Script
**File**: `scripts/Load-KeePassEnv.ps1`

```powershell
<#
.SYNOPSIS
Load KeePass credentials into environment variables for MCP servers
#>
param(
    [string]$KeePassPath = $env:KEEPASS_DB_PATH,
    [string]$EntryPath = "Silkycoders/Database"
)

try {
    # Method 1: Using keepass-cli
    $credentials = @{
        DB_USER     = & keepass get $EntryPath UserName
        DB_PASSWORD = & keepass get $EntryPath Password
        DB_HOST     = & keepass get $EntryPath "custom:host"
        DB_PORT     = & keepass get $EntryPath "custom:port"
    }
    
    # Set environment variables
    foreach ($key in $credentials.Keys) {
        if ($credentials[$key]) {
            [Environment]::SetEnvironmentVariable($key, $credentials[$key], "Process")
            Write-Host "✓ Loaded $key from KeePass"
        }
    }
}
catch {
    Write-Error "Failed to load KeePass credentials: $_"
    exit 1
}
```

### Update MCP Configuration for Windows
**File**: `.vscode/mcp.json`

```jsonc
{
  "servers": {
    "io.github.bytebase/dbhub": {
      "type": "stdio",
      "command": "powershell.exe",
      "args": [
        "-NoProfile",
        "-Command",
        ". ./scripts/Load-KeePassEnv.ps1; npx @bytebase/dbhub@latest --transport stdio --dsn 'postgres://$env:DB_USER:$env:DB_PASSWORD@$env:DB_HOST:$env:DB_PORT/postgres?sslmode=disable'"
      ]
    }
  }
}
```

## Option 3: Python Helper Script (Cross-Platform)

### Create Helper Script
**File**: `scripts/load_keepass_env.py`

```python
#!/usr/bin/env python3
"""
Load KeePass credentials into environment variables
Usage: python scripts/load_keepass_env.py
"""
import subprocess
import os
import sys
from pathlib import Path

def load_from_keepass(entry_path="Silkycoders/Database"):
    """Extract credentials from KeePass and set environment variables"""
    
    credentials = {
        'DB_USER': 'UserName',
        'DB_PASSWORD': 'Password',
        'DB_HOST': 'custom:host',
        'DB_PORT': 'custom:port',
    }
    
    try:
        for env_var, keepass_field in credentials.items():
            result = subprocess.run(
                ['keepass', 'get', entry_path, keepass_field],
                capture_output=True,
                text=True,
                check=False
            )
            if result.returncode == 0:
                value = result.stdout.strip()
                os.environ[env_var] = value
                print(f"✓ Loaded {env_var} from KeePass")
            else:
                print(f"✗ Failed to load {env_var}: {result.stderr}")
                return False
        
        return True
    except FileNotFoundError:
        print("Error: keepass CLI tool not found. Install with: pip install keepass-cli")
        return False

def main():
    """Main entry point"""
    if not load_from_keepass():
        sys.exit(1)
    
    # Execute the next command in argv
    if len(sys.argv) > 1:
        os.execvp(sys.argv[1], sys.argv[1:])

if __name__ == "__main__":
    main()
```

### Update MCP Configuration
**File**: `.vscode/mcp.json`

```jsonc
{
  "servers": {
    "io.github.bytebase/dbhub": {
      "type": "stdio",
      "command": "python",
      "args": [
        "./scripts/load_keepass_env.py",
        "npx",
        "@bytebase/dbhub@latest",
        "--transport",
        "stdio",
        "--dsn",
        "postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/postgres?sslmode=disable"
      ]
    }
  }
}
```

## Option 4: Node.js Helper (If Using Node)

### Install Dependencies
```bash
npm install --save-dev dotenv-cli keepass-cli
```

### Create Helper Script
**File**: `scripts/load-keepass-env.js`

```javascript
#!/usr/bin/env node
/**
 * Load KeePass credentials into environment variables
 * Usage: node scripts/load-keepass-env.js <command> [args...]
 */

const { execSync } = require('child_process');
const { spawn } = require('child_process');

function loadFromKeePass(entryPath = 'Silkycoders/Database') {
  const fields = {
    DB_USER: 'UserName',
    DB_PASSWORD: 'Password',
    DB_HOST: 'custom:host',
    DB_PORT: 'custom:port',
  };

  for (const [envVar, field] of Object.entries(fields)) {
    try {
      const value = execSync(`keepass get ${entryPath} ${field}`, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }).trim();
      
      process.env[envVar] = value;
      console.log(`✓ Loaded ${envVar} from KeePass`);
    } catch (error) {
      console.error(`✗ Failed to load ${envVar}`);
      process.exit(1);
    }
  }
}

// Load credentials
loadFromKeePass();

// Execute the command
const [, , command, ...args] = process.argv;
if (command) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    env: process.env,
  });
  
  child.on('exit', (code) => {
    process.exit(code);
  });
}
```

## KeePass Entry Structure

Organize your KeePass entries like this:

```
Silkycoders/
├── Database
│   ├── UserName: admin
│   ├── Password: [your-password]
│   ├── URL: postgres://localhost:5432/postgres
│   └── Custom Fields:
│       ├── host: localhost
│       ├── port: 5432
│       └── database: postgres
└── API Keys
    ├── GitHub
    └── Azure
```

## Environment Variables in MCP Configuration

Your current MCP config supports variable substitution:

```jsonc
{
  "io.github.bytebase/dbhub": {
    "args": [
      "--dsn",
      "postgres://${DB_USER:defaultuser}:${DB_PASSWORD:defaultpass}@${DB_HOST:localhost}:${DB_PORT:5432}/postgres?sslmode=disable"
    ]
  }
}
```

The format: `${VAR_NAME:default_value}`

## Workflow

### Step 1: Set KeePass Master Password
```bash
export KEEPASS_MASTER_PASSWORD="your-master-password"
# OR use Windows Credential Manager
```

### Step 2: Update Entry Path (Optional)
```bash
export KEEPASS_ENTRY_PATH="Silkycoders/Database"
export KEEPASS_DB_PATH="/path/to/your/database.kdbx"
```

### Step 3: Start VS Code with Loaded Credentials
```bash
# Bash/Shell
source scripts/load-keepass-env.sh && code .

# PowerShell
. ./scripts/Load-KeePassEnv.ps1; code .

# Node
node scripts/load-keepass-env.js code .
```

## Security Best Practices

1. **Never commit credentials to git**:
   ```bash
   echo ".vscode/mcp.json" >> .gitignore  # If it contains hardcoded secrets
   ```

2. **Store master password securely**:
   - Windows: Use Credential Manager
   - Linux: Use `pass` or `secret-tool`
   - macOS: Use Keychain

3. **Restrict script permissions**:
   ```bash
   chmod 700 scripts/load-keepass-env.sh
   chmod 700 scripts/Load-KeePassEnv.ps1
   ```

4. **Use temporary environment variables** (not persistent):
   - All scripts above set process-level env vars only
   - They disappear when the process exits

5. **Audit KeePass access**:
   - Keep KeePass backup secure
   - Use strong master password
   - Enable 2FA if available

## Troubleshooting

### "keepass CLI tool not found"
```bash
# Install the appropriate version for your OS
npm install -g keepass-cli
# or
dotnet tool install -g KeePass.CLI
```

### "Cannot access KeePass database"
```bash
# Check file permissions
ls -la ~/.keepass/mydb.kdbx

# Test keepass CLI directly
keepass get "Silkycoders/Database" UserName
```

### Environment variables not loading
```bash
# Test the script directly
source scripts/load-keepass-env.sh
echo $DB_USER  # Should print your username
```

### Variable substitution not working in MCP config
- Ensure the wrapper script exports variables properly
- Check that `exec` or spawn passes the environment
- Use `env` command to verify: `env | grep DB_`

## Alternative: Using KeePass Browser Extension

For VS Code extensions that need credentials:
1. Install KeePass browser extension
2. Configure MCP to read from KeePass plugin port
3. Less secure than direct CLI access

## References
- [KeePass Official](https://keepass.info/)
- [KeePass CLI Tool](https://github.com/ksmathers/KeePass.CLI)
- [VS Code MCP Documentation](https://marketplace.visualstudio.com/items?itemName=github.copilot)
- [Model Context Protocol Spec](https://modelcontextprotocol.io/)

## Summary

| Method | Platform | Complexity | Security |
|--------|----------|-----------|----------|
| KeePass CLI (Bash) | Linux/WSL | Low | High |
| PowerShell Module | Windows | Low | High |
| Python Script | Cross-platform | Medium | High |
| Node.js Script | Node.js projects | Medium | High |

**Recommended**: Use KeePass CLI with bash for Linux/WSL or PowerShell for Windows.
