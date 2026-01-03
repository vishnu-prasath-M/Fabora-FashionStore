# Stop any running Node.js processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Wait a moment for processes to close
Start-Sleep -Seconds 2

# Remove node_modules and package-lock.json
if (Test-Path ".\node_modules") {
    Remove-Item -Path ".\node_modules" -Recurse -Force
}

if (Test-Path ".\package-lock.json") {
    Remove-Item -Path ".\package-lock.json" -Force
}

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
