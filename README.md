# Violet Disocrd bot (RSS Messenger) 

## Description

### Violet is a RSS messanger for an Discord Server. It accepts and enpoint and will query that endpoint x amount depending on cron schedule. It will read and build all the items from then json array and store them in a DB. Every time it detects a new items in array it will cross check with pushed message and only send out if the item is new and hasn't been already push as a message to a Discord Server.

    - Takes any kind of json data
    - Keeps track of old pushed message 
    - Multiple messages won't be spammed it will be send on cooldown rate
    - Will auto detect new data item from provided endpoint

## env
    DB_CONNECTION_URL = mongodb://localhost:27017/violet-db (Your-db-conn-string)
    
    WEBHOOK_URL = https://discord.com/api/webhooks/ (Your-webhook-url)
    
    MAIN_SERVER_URL=http://localhost:3030/ (main-server-domain)
