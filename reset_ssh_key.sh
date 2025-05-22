#!/bin/bash

# Configurable variables
KEY_NAME="id_ed25519"
EMAIL="pajenkin@umich.edu"

# Step 1: Clear SSH agent
echo "🗑 Clearing existing SSH keys from agent..."
ssh-add -D

# Step 2: Backup old key if exists
if [ -f ~/.ssh/$KEY_NAME ]; then
    echo "📆 Backing up existing key to ~/.ssh/${KEY_NAME}.bak"
    mv ~/.ssh/$KEY_NAME ~/.ssh/${KEY_NAME}.bak
    mv ~/.ssh/${KEY_NAME}.pub ~/.ssh/${KEY_NAME}.pub.bak
fi

# Step 3: Generate new key
echo "🔑 Generating new Ed25519 SSH key..."
ssh-keygen -t ed25519 -C "$EMAIL" -f ~/.ssh/$KEY_NAME

# Step 4: Add key to agent
echo "➕ Adding key to ssh-agent..."
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/$KEY_NAME

# For Mac users, also add to keychain
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Adding key to macOS Keychain..."
    ssh-add --apple-use-keychain ~/.ssh/$KEY_NAME
fi

# Step 5: Configure SSH config
CONFIG_ENTRY="
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/$KEY_NAME
  UseKeychain yes
  AddKeysToAgent yes
"
# Remove any existing entry for github.com first
sed -i.bak '/^Host github.com$/, /^$/d' ~/.ssh/config 2>/dev/null
echo "$CONFIG_ENTRY" >> ~/.ssh/config

# Step 6: Display public key
echo "✅ Your new SSH public key (add this to GitHub Settings → SSH keys):"
cat ~/.ssh/${KEY_NAME}.pub

# Step 7: Test connection
echo "🚀 Testing connection to GitHub..."
ssh -T git@github.com

echo "🎉 Done!"
